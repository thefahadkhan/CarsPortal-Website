// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all popup triggers and popups
  const popupTriggers = {
      'priceRangeBtn': 'priceRangePopup',
      'carMakeBtn': 'carMakePopup',
      'seatsBtn': 'seatsPopup',
      'bodyTypesBtn': 'bodyTypesPopup',
      'transmissionBtn': 'transmissionPopup',
      'cylindersBtn': 'cylindersPopup',
      'moreFiltersBtn': 'moreFiltersPopup'
  };

  // Add click listeners to all triggers
  Object.keys(popupTriggers).forEach(triggerId => {
      const trigger = document.getElementById(triggerId);
      const popup = document.getElementById(popupTriggers[triggerId]);
      
      if (trigger && popup) {
          trigger.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              // Close all other popups
              document.querySelectorAll('.popup-overlay').forEach(p => {
                  p.classList.remove('active');
              });
              
              // Open this popup
              popup.classList.add('active');
          });
      }
  });

  // Close popup when clicking close button or overlay
  document.querySelectorAll('.popup-overlay').forEach(popup => {
      popup.addEventListener('click', function(e) {
          if (e.target === this) {
              this.classList.remove('active');
          }
      });
  });

  document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          this.closest('.popup-overlay').classList.remove('active');
      });
  });

  // Handle Done and Reset buttons
  document.querySelectorAll('.done-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          this.closest('.popup-overlay').classList.remove('active');
      });
  });

  document.querySelectorAll('.reset-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const popup = this.closest('.popup-overlay');
          
          // Reset checkboxes
          popup.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
              checkbox.checked = false;
          });
          
          // Reset selected options
          popup.querySelectorAll('.selected').forEach(option => {
              option.classList.remove('selected');
          });
          
          // Reset input fields
          popup.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => {
              input.value = '';
          });
          
          // Reset selects
          popup.querySelectorAll('select').forEach(select => {
              select.selectedIndex = 0;
          });
      });
  });

  // Handle selectable options (seats, cylinders, body types)
  document.querySelectorAll('.seat-option, .cylinder-option, .body-type-option').forEach(option => {
      option.addEventListener('click', function() {
          // Toggle selection
          this.classList.toggle('selected');
      });
  });

  // Handle brand selection
  document.querySelectorAll('.brand-item').forEach(item => {
      item.addEventListener('click', function() {
          const carMakeBtn = document.getElementById('carMakeBtn');
          carMakeBtn.innerHTML = `<i class="fas fa-search"></i> ${this.textContent}`;
          document.getElementById('carMakePopup').classList.remove('active');
      });
  });

  // Brand search functionality
  const brandSearch = document.querySelector('.brand-search');
  if (brandSearch) {
      brandSearch.addEventListener('input', function() {
          const searchTerm = this.value.toLowerCase();
          const brandItems = document.querySelectorAll('.brand-item');
          
          brandItems.forEach(item => {
              const brandName = item.textContent.toLowerCase();
              if (brandName.includes(searchTerm)) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  }

  // Close popups when pressing Escape key
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
          document.querySelectorAll('.popup-overlay.active').forEach(popup => {
              popup.classList.remove('active');
          });
      }
  });

  // Add smooth hover effects to car cards
  document.querySelectorAll('.car-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
      });
  });

  // Add interactive effects to buttons
  document.querySelectorAll('.btn-view-detail, .btn-used-cars').forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          // Add click animation
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
              this.style.transform = 'scale(1)';
          }, 100);
      });
  });
});







// // Header load (Top Header + Navbar)
document.addEventListener("DOMContentLoaded", () => {
  // Load navbar & footer with fallback paths and cache-busting
  loadPartial("navbar", "navbar.html")
    .then(() => initializeDropdown())
    .catch(err => console.warn("Navbar not loaded:", err));

  loadPartial("footer", "footer.html")
    .catch(err => console.warn("Footer not loaded:", err));
});

let dropdownTimeout;

/** Try to fetch a file from several candidate paths (absolute + relative depths) */
async function fetchWithFallback(file) {
  // depths to try from current page
  const relDepths = ["", "../", "../../", "../../../", "../../../../"];
  // candidates: absolute root + relative depths
  const candidates = ["/" + file, ...relDepths.map(d => d + file)];

  for (const path of candidates) {
    try {
      const url = new URL(path, window.location.origin);
      const res = await fetch(url.toString() + (url.search ? "&" : "?") + "nocache=" + Date.now(), { cache: "no-store" });
      if (res.ok) {
        const html = await res.text();
        return { html, baseUrl: url }; // baseUrl = where the partial came from
      }
    } catch (_) {
      // try next
    }
  }
  throw new Error("None of the candidate paths worked for " + file);
}

/** Inject partial into a container by id, then fix relative asset URLs inside it */
async function loadPartial(containerId, file) {
  const { html, baseUrl } = await fetchWithFallback(file);
  const container = document.getElementById(containerId);
  if (!container) throw new Error(`#${containerId} not found in DOM`);
  container.innerHTML = html;

  // Fix <img src>, <source srcset> relative to the partial's own location
  fixRelativeAssets(container, baseUrl);
}

/** Convert relative asset URLs inside inserted HTML to absolute (based on partial's URL) */
function fixRelativeAssets(scopeEl, baseUrl) {
  // Fix <img src="">
  scopeEl.querySelectorAll("img[src]").forEach(img => {
    const src = img.getAttribute("src");
    if (isRelative(src)) img.src = new URL(src, baseUrl).toString();
  });

  // Fix <source srcset=""> (for <picture> or <video>)
  scopeEl.querySelectorAll("source[srcset]").forEach(source => {
    const srcset = source.getAttribute("srcset");
    if (!srcset) return;
    const fixed = srcset.split(",").map(part => {
      const [url, desc] = part.trim().split(/\s+/, 2);
      return (isRelative(url) ? new URL(url, baseUrl).toString() : url) + (desc ? " " + desc : "");
    }).join(", ");
    source.setAttribute("srcset", fixed);
  });

  // (Optional) Fix CSS background images in inline styles
  scopeEl.querySelectorAll("[style]").forEach(el => {
    const style = el.getAttribute("style");
    if (!style) return;
    const fixed = style.replace(/url\((['"]?)([^'")]+)\1\)/g, (_, q, url) => {
      return "url(" + (isRelative(url) ? new URL(url, baseUrl).toString() : url) + ")";
    });
    if (fixed !== style) el.setAttribute("style", fixed);
  });
}

function isRelative(url) {
  return url && !/^([a-z]+:)?\/\//i.test(url) && !url.startsWith("/");
}

/* ================================
   Your existing dropdown behavior
   ================================ */
function initializeDropdown() {
  const newDropdown = document.querySelector(".new-dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (newDropdown && dropdownContent) {
    newDropdown.addEventListener("mouseenter", function () {
      clearTimeout(dropdownTimeout);
      dropdownContent.classList.add("show");
    });

    newDropdown.addEventListener("mouseleave", function () {
      dropdownTimeout = setTimeout(() => {
        dropdownContent.classList.remove("show");
      }, 300);
    });

    dropdownContent.addEventListener("mouseenter", function () {
      clearTimeout(dropdownTimeout);
    });

    dropdownContent.addEventListener("mouseleave", function () {
      dropdownTimeout = setTimeout(() => {
        dropdownContent.classList.remove("show");
      }, 300);
    });

    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach((tabLink) => {
      tabLink.addEventListener("mouseenter", function () {
        const tabId = this.getAttribute("data-tab");
        if (tabId) {
          document.querySelectorAll(".tab-link").forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          const selectedContent = document.getElementById(tabId + "-content");
          if (selectedContent) selectedContent.classList.add("active");
        }
      });
    });
  }

  const interactiveItems = document.querySelectorAll(".style-item, .brand-item");
  interactiveItems.forEach(item => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}


  
  // Car brands data with emojis as logos
  const carBrands = [
    { name: "Toyota", image: "../../../images/cars/toyota-logos-brands-10.png" },
    { name: "Nissan", image: "../../../images/cars/pngwing.com.png" },
    { name: "Hyundai", image: "../../../images/cars/hyundai-logo-white.jpg" },
    { name: "Mercedes-Benz", image: "../../../images/cars/Mercedes-Benz-Logo.png" },
    { name: "BMW", image: "../../../images/cars/BMW-Logo.png" },
    { name: "Chevrolet", image: "../../../images/cars/Chevrolet-Logo-2010.png" },
    { name: "Ford", image: "../../../images/cars/Ford-Logo-1965-present.png" },
    { name: "Honda", image: "../../../images/cars/wp3351340.png" },
    { name: "Lexus", image: "../../../images/cars/Lexus-Logo.png" },
    { name: "Audi", image: "../../../images/cars/Audi-Symbol.png" },
    { name: "KIA", image: "../../../images/cars/Kia-Logo.png" },
    { name: "Mitsubishi", image: "../../../images/cars/Mitsubishi-emblem-1024x768.png" },
    { name: "BYD", image: "../../../images/cars/byd-logo-1-01.jpg" },
    { name: "Bestune", image: "../../../images/cars/bestune-logo-600x1100-show.png" },
    { name: "DFSK", image: "../../../images/cars/DFSK-logo-2025-klein.png" },
    { name: "Mahindra", image: "../../../images/cars/Mahindra-Mahindra-New-Logo.png" },
    { name: "Volkswagen", image: "../../../images/cars/brand-volkswagen-png-logo-17.png" },
    {
      name: "Infiniti",
      image:
        "../../../images/cars/257-2576555_infiniti-car-logo-infiniti-car-logo-png-transparent.png",
    },
    { name: "Jeep", image: "../../../images/cars/Jeep_logo.png" },
    { name: "Land Rover", image: "../../../images/cars/Land-Rover-Logo-1986-present.png" },
    { name: "Porsche", image: "../../../images/cars/Porsche-Logo.png" },
    { name: "Maserati", image: "../../../images/cars/Maserati-Symbol.png" },
    { name: "Ferrari", image: "../../../images/cars/Ferrari-Logo.png" },
    { name: "Lamborghini", image: "../../../images/cars/lamborghini_PNG10709.png" },
    { name: "Bentley", image: "../../../images/cars/Bentley-Symbol.png" },
    {
      name: "Rolls-Royce",
      image:
        "../../../images/cars/rolls-royce-brand-logo-car-symbol-black-design-british-automobile-illustration-free-vector.jpg",
    },
    { name: "McLaren", image: "../../../images/cars/Mclaren_PNG49.png" },
    {
      name: "Bugatti",
      image: "../../../images/cars/5a953454320e8d398b2dcc5babf78014.jpg",
    },
    { name: "Pagani", image: "../../../images/cars/419-4194037_pagani-logo-png.png" },
    {
      name: "Koenigsegg",
      image: "../../../images/cars/f2bf43_179328483f634f938a5a638b192b6005~mv2.png",
    },
    { name: "Tesla", image: "../../../images/cars/tesla-logo-7408969_1280.png" },
    { name: "Lucid", image: "../../../images/cars/lucid-motors3169.jpg" },
    { name: "Rivian", image: "../../../images/cars/Rivian-Logo-Electric.png" },
    { name: "Polestar", image: "../../../images/cars/polestar.png" },
    { name: "Genesis", image: "../../../images/cars/Genesis-Logo.png" },
    { name: "Acura", image: "../../../images/cars/Acura-Embleme.jpg" },
    { name: "Cadillac", image: "../../../images/cars/Cadillac-Logo-PNG-Isolated-HD.png" },
    { name: "Lincoln", image: "../../../images/cars/10418.jpg" },
    { name: "Chrysler", image: "../../../images/cars/Chrysler-Emblem.png" },
    { name: "Dodge", image: "../../../images/cars/dodge-logo-black-and-white.png" },
    { name: "Ram", image: "../../../images/cars/Los-Angeles-Rams-logo.png" },
    { name: "GMC", image: "../../../images/cars/gmc-logo-vector-21.jpg" },
  ];
  
  // Global variables for brands functionality
  let showingAllBrands = false;
  let selectedBrand = "";
  
  // Render brands grid
  function renderBrands() {
    const brandsGrid = document.getElementById("brandsGrid");
    const showMoreBtn = document.getElementById("showMoreBtn");
  
    const brandsToShow = showingAllBrands ? carBrands : carBrands.slice(0, 16);
  
    brandsGrid.innerHTML = "";
  
    brandsToShow.forEach((brand, index) => {
      const brandItem = document.createElement("div");
      brandItem.className = "brand-item";
      brandItem.style.animationDelay = `${index * 0.05}s`;
      brandItem.onclick = () => selectBrand(brand.name);
  
      brandItem.innerHTML = `
              <div class="brand-logo">
                  <img src="${brand.image}" alt="${brand.name}" />
              </div>
              <div class="brand-name">${brand.name}</div>
          `;
  
      brandsGrid.appendChild(brandItem);
    });
  
    // Update show more button
    if (showingAllBrands) {
      showMoreBtn.textContent = "Show Less";
      showMoreBtn.style.background = "#1e40af";
      showMoreBtn.style.color = "white";
      showMoreBtn.style.borderColor = "#1e40af";
    } else {
      showMoreBtn.textContent = "Show More";
      showMoreBtn.style.background = "#f3f4f6";
      showMoreBtn.style.color = "#374151";
      showMoreBtn.style.borderColor = "#e5e7eb";
    }
  }
  
  // Toggle show more/less brands
  function toggleShowMore() {
    showingAllBrands = !showingAllBrands;
    renderBrands();
  }
  
  // Select brand from grid
  function selectBrand(brandName) {
    selectedBrand = brandName;
    console.log("Selected brand:", brandName);
    // You can add additional functionality here, such as filtering search results
  }
  
  // Initialize brands functionality when page loads
  document.addEventListener('DOMContentLoaded', function() {
    renderBrands();
  });







  
/* Main Container for Car Listings */
const carListingsData = [
  {
    id: 1,
    title: "Used 2021 Audi Q7",
    model: "Quattro AWD 4dr 55 TFSI",
    price: "$429,980",
    mileage: "98 miles",
    location: "Los Angeles, CA",
    distance: "Free",
    fuelEconomy: "22 CITY / 28 HWY MPG",
    photos: 45,
    status: "JUST SOLD",
    statusClass: "car-listings-just-sold",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    title: "Used 2022 Mercedes-Benz S-Class",
    model: "S 580 4MATIC Sedan",
    price: "$89,500",
    mileage: "12K miles",
    location: "Beverly Hills, CA",
    distance: "8 mi.",
    fuelEconomy: "19 CITY / 29 HWY MPG",
    photos: 52,
    status: "LUXURY PICK",
    statusClass: "car-listings-luxury-pick",
    image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    title: "New 2024 BMW X7",
    model: "xDrive40i Sports Activity",
    price: "$76,800",
    mileage: "0 miles",
    location: "Manhattan, NY",
    distance: "—",
    fuelEconomy: "21 CITY / 26 HWY MPG",
    photos: 38,
    status: "NEW ARRIVAL",
    statusClass: "car-listings-just-arrived",
    image: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    title: "Used 2023 Tesla Model X",
    model: "Plaid AWD SUV",
    price: "$94,990",
    mileage: "3,200 miles",
    location: "San Jose, CA",
    distance: "15 mi.",
    fuelEconomy: "102 CITY / 99 HWY MPGe",
    photos: 41,
    status: "ELECTRIC PICK",
    statusClass: "car-listings-electric-pick",
    image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    title: "Used 2022 Porsche Cayenne",
    model: "Turbo S E-Hybrid Coupe",
    price: "$142,900",
    mileage: "5,800 miles",
    location: "Miami Beach, FL",
    distance: "12 mi.",
    fuelEconomy: "14 CITY / 17 HWY MPG",
    photos: 47,
    status: "PERFORMANCE SUV",
    statusClass: "car-listings-performance-suv",
    image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 6,
    title: "New 2024 Lexus LX",
    model: "600 F Sport AWD",
    price: "$108,500",
    mileage: "0 miles",
    location: "Houston, TX",
    distance: "—",
    fuelEconomy: "17 CITY / 22 HWY MPG",
    photos: 35,
    status: "LUXURY SUV",
    statusClass: "car-listings-luxury-suv",
    image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 7,
    title: "Used 2023 Jaguar F-PACE",
    model: "SVR AWD SUV",
    price: "$79,900",
    mileage: "4,100 miles",
    location: "Chicago, IL",
    distance: "18 mi.",
    fuelEconomy: "16 CITY / 23 HWY MPG",
    photos: 43,
    status: "SPORT SUV",
    statusClass: "car-listings-sport-suv",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 8,
    title: "Used 2022 Range Rover Sport",
    model: "HSE Dynamic P400",
    price: "$87,500",
    mileage: "7,200 miles",
    location: "Scottsdale, AZ",
    distance: "22 mi.",
    fuelEconomy: "19 CITY / 25 HWY MPG",
    photos: 39,
    status: "PREMIUM SUV",
    statusClass: "car-listings-premium-suv",
    image: "https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 9,
    title: "New 2024 Cadillac Escalade",
    model: "Premium Luxury AWD",
    price: "$89,990",
    mileage: "0 miles",
    location: "Dallas, TX",
    distance: "—",
    fuelEconomy: "14 CITY / 19 HWY MPG",
    photos: 44,
    status: "LUXURY SUV",
    statusClass: "car-listings-luxury-suv",
    image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 10,
    title: "Used 2023 Genesis GV80",
    model: "3.5T Prestige AWD",
    price: "$64,900",
    mileage: "6,500 miles",
    location: "Atlanta, GA",
    distance: "14 mi.",
    fuelEconomy: "21 CITY / 25 HWY MPG",
    photos: 36,
    status: "LUXURY PICK",
    statusClass: "car-listings-luxury-pick",
    image: "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 11,
    title: "Used 2022 Maserati Levante",
    model: "Trofeo AWD SUV",
    price: "$119,900",
    mileage: "3,800 miles",
    location: "Las Vegas, NV",
    distance: "9 mi.",
    fuelEconomy: "13 CITY / 18 HWY MPG",
    photos: 48,
    status: "EXOTIC SUV",
    statusClass: "car-listings-exotic-suv",
    image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 12,
    title: "New 2024 Lincoln Navigator",
    model: "Reserve L AWD",
    price: "$95,500",
    mileage: "0 miles",
    location: "Detroit, MI",
    distance: "—",
    fuelEconomy: "16 CITY / 20 HWY MPG",
    photos: 42,
    status: "LUXURY SUV",
    statusClass: "car-listings-luxury-suv",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 13,
    title: "Used 2023 Alfa Romeo Stelvio",
    model: "Quadrifoglio AWD",
    price: "$72,900",
    mileage: "4,200 miles",
    location: "Boston, MA",
    distance: "11 mi.",
    fuelEconomy: "17 CITY / 24 HWY MPG",
    photos: 37,
    status: "PERFORMANCE SUV",
    statusClass: "car-listings-performance-suv",
    image: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 14,
    title: "Used 2022 Volvo XC90",
    model: "T8 Inscription AWD",
    price: "$58,900",
    mileage: "8,100 miles",
    location: "Seattle, WA",
    distance: "16 mi.",
    fuelEconomy: "27 CITY / 29 HWY MPG",
    photos: 33,
    status: "HYBRID SUV",
    statusClass: "car-listings-hybrid-suv",
    image: "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 15,
    title: "New 2024 Acura MDX",
    model: "Type-S SH-AWD",
    price: "$67,300",
    mileage: "0 miles",
    location: "Denver, CO",
    distance: "—",
    fuelEconomy: "17 CITY / 21 HWY MPG",
    photos: 40,
    status: "SPORT SUV",
    statusClass: "car-listings-sport-suv",
    image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 16,
    title: "Used 2023 Infiniti QX80",
    model: "Luxe AWD SUV",
    price: "$69,500",
    mileage: "5,900 miles",
    location: "Phoenix, AZ",
    distance: "13 mi.",
    fuelEconomy: "14 CITY / 20 HWY MPG",
    photos: 34,
    status: "LUXURY SUV",
    statusClass: "car-listings-luxury-suv",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 17,
    title: "Used 2022 Ferrari 488",
    model: "GTB Coupe",
    price: "$289,900",
    mileage: "1,200 miles",
    location: "Newport Beach, CA",
    distance: "7 mi.",
    fuelEconomy: "15 CITY / 19 HWY MPG",
    photos: 55,
    status: "SUPERCAR",
    statusClass: "car-listings-supercar",
    image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 18,
    title: "Used 2023 Lamborghini Urus",
    model: "Performante AWD",
    price: "$279,900",
    mileage: "2,100 miles",
    location: "Miami, FL",
    distance: "5 mi.",
    fuelEconomy: "12 CITY / 17 HWY MPG",
    photos: 62,
    status: "SUPER SUV",
    statusClass: "car-listings-super-suv",
    image: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 19,
    title: "New 2024 Bentley Bentayga",
    model: "V8 AWD SUV",
    price: "$219,900",
    mileage: "0 miles",
    location: "San Francisco, CA",
    distance: "—",
    fuelEconomy: "14 CITY / 24 HWY MPG",
    photos: 46,
    status: "ULTRA LUXURY",
    statusClass: "car-listings-ultra-luxury",
    image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 20,
    title: "Used 2022 Rolls-Royce Cullinan",
    model: "Black Badge AWD",
    price: "$389,900",
    mileage: "3,500 miles",
    location: "Beverly Hills, CA",
    distance: "4 mi.",
    fuelEconomy: "12 CITY / 18 HWY MPG",
    photos: 58,
    status: "ULTRA LUXURY",
    statusClass: "car-listings-ultra-luxury",
    image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 21,
    title: "Used 2023 McLaren 720S",
    model: "Spider Convertible",
    price: "$319,900",
    mileage: "1,800 miles",
    location: "Austin, TX",
    distance: "6 mi.",
    fuelEconomy: "15 CITY / 22 HWY MPG",
    photos: 51,
    status: "SUPERCAR",
    statusClass: "car-listings-supercar",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 22,
    title: "New 2024 Aston Martin DBX",
    model: "707 AWD SUV",
    price: "$239,900",
    mileage: "0 miles",
    location: "Nashville, TN",
    distance: "—",
    fuelEconomy: "13 CITY / 18 HWY MPG",
    photos: 49,
    status: "EXOTIC SUV",
    statusClass: "car-listings-exotic-suv",
    image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 23,
    title: "Used 2022 Bugatti Chiron",
    model: "Sport Coupe",
    price: "$2,899,900",
    mileage: "800 miles",
    location: "Monaco",
    distance: "International",
    fuelEconomy: "9 CITY / 14 HWY MPG",
    photos: 67,
    status: "HYPERCAR",
    statusClass: "car-listings-hypercar",
    image: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 24,
    title: "Used 2023 Koenigsegg Regera",
    model: "Hybrid Megacar",
    price: "$1,899,900",
    mileage: "1,100 miles",
    location: "Monterey, CA",
    distance: "25 mi.",
    fuelEconomy: "12 CITY / 16 HWY MPG",
    photos: 72,
    status: "HYPERCAR",
    statusClass: "car-listings-hypercar",
    image: "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 25,
    title: "New 2024 Ford Mustang",
    model: "GT Premium Fastback",
    price: "$47,900",
    mileage: "0 miles",
    location: "Detroit, MI",
    distance: "—",
    fuelEconomy: "16 CITY / 24 HWY MPG",
    photos: 28,
    status: "MUSCLE CAR",
    statusClass: "car-listings-muscle-car",
    image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 26,
    title: "Used 2023 Chevrolet Corvette",
    model: "Z06 Coupe",
    price: "$129,900",
    mileage: "2,800 miles",
    location: "Charlotte, NC",
    distance: "19 mi.",
    fuelEconomy: "12 CITY / 20 HWY MPG",
    photos: 45,
    status: "SPORTS CAR",
    statusClass: "car-listings-sports-car",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 27,
    title: "Used 2022 Dodge Challenger",
    model: "SRT Hellcat Redeye",
    price: "$89,900",
    mileage: "4,500 miles",
    location: "Las Vegas, NV",
    distance: "11 mi.",
    fuelEconomy: "13 CITY / 22 HWY MPG",
    photos: 32,
    status: "MUSCLE CAR",
    statusClass: "car-listings-muscle-car",
    image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 28,
    title: "New 2024 Toyota Supra",
    model: "3.0 Premium RWD",
    price: "$56,500",
    mileage: "0 miles",
    location: "Los Angeles, CA",
    distance: "—",
    fuelEconomy: "22 CITY / 30 HWY MPG",
    photos: 31,
    status: "SPORTS CAR",
    statusClass: "car-listings-sports-car",
    image: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 29,
    title: "Used 2023 Nissan GT-R",
    model: "NISMO AWD Coupe",
    price: "$219,900",
    mileage: "1,900 miles",
    location: "San Diego, CA",
    distance: "17 mi.",
    fuelEconomy: "16 CITY / 22 HWY MPG",
    photos: 41,
    status: "SUPERCAR",
    statusClass: "car-listings-supercar",
    image: "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 30,
    title: "Used 2022 Honda NSX",
    model: "Type S Hybrid AWD",
    price: "$189,900",
    mileage: "3,200 miles",
    location: "Portland, OR",
    distance: "23 mi.",
    fuelEconomy: "21 CITY / 22 HWY MPG",
    photos: 38,
    status: "HYBRID SUPERCAR",
    statusClass: "car-listings-hybrid-supercar",
    image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 31,
    title: "New 2024 Rivian R1S",
    model: "Adventure Package AWD",
    price: "$78,900",
    mileage: "0 miles",
    location: "Denver, CO",
    distance: "—",
    fuelEconomy: "102 CITY / 88 HWY MPGe",
    photos: 35,
    status: "ELECTRIC SUV",
    statusClass: "car-listings-electric-suv",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 32,
    title: "Used 2023 Lucid Air",
    model: "Dream Edition RWD",
    price: "$149,900",
    mileage: "2,100 miles",
    location: "Palo Alto, CA",
    distance: "8 mi.",
    fuelEconomy: "131 CITY / 126 HWY MPGe",
    photos: 44,
    status: "LUXURY ELECTRIC",
    statusClass: "car-listings-luxury-electric",
    image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

// Pagination variables
let carListingsCurrentPage = 1;
const carListingsCardsPerPage = 8;
const carListingsTotalPages = Math.ceil(carListingsData.length / carListingsCardsPerPage);

// DOM elements
const carListingsCarGrid = document.getElementById("car-listings-carGrid");
const carListingsPageNumbers = document.getElementById("car-listings-pageNumbers");
const carListingsPrevBtn = document.getElementById("car-listings-prevBtn");
const carListingsNextBtn = document.getElementById("car-listings-nextBtn");

// Function to create car card HTML
function createCarListingsCard(car) {
  return `
    <div class="car-listings-car-card">
      <div class="car-listings-car-image">
        <img src="${car.image}" alt="${car.title}">
        <div class="car-listings-status-label ${car.statusClass}">${car.status}</div>
      </div>
      <div class="car-listings-car-header">
        <span class="car-listings-photo-count">${car.photos} Photos</span>
        <span class="car-listings-video-icon"><a href="#"><ion-icon name="caret-forward-outline"></ion-icon> Video Tour</a></span>
      </div>
      <div class="car-listings-car-details">
        <h3>${car.title}</h3>
        <p class="car-listings-car-model">${car.model}</p>
        <p class="car-listings-car-price">${car.price}</p>
        <p class="car-listings-car-info">
          <span class="car-listings-mileage">${car.mileage}</span> • 
          <span class="car-listings-location">${car.location}</span> • 
          <span class="car-listings-distance">${car.distance}</span>
        </p>
        <p class="car-listings-fuel-economy">${car.fuelEconomy}</p>
        <div class="car-listings-card-actions">
          <button class="car-listings-primary-btn">🗓 Schedule Test Drive</button>
          <a href="#" class="car-listings-secondary-btn">Learn More</a>
        </div>
        <div class="car-listings-card-footer">
          <a href="#"><ion-icon name="git-compare-outline"></ion-icon> Compare</a>
          <a href="#"><i class="ri-save-3-line"></i> Save</a>
          <a href="#">👁 View Details</a>
        </div>
      </div>
    </div>
  `;
}

// Function to display cars for current page
function displayCarListings(page) {
  const startIndex = (page - 1) * carListingsCardsPerPage;
  const endIndex = startIndex + carListingsCardsPerPage;
  const carsToDisplay = carListingsData.slice(startIndex, endIndex);

  carListingsCarGrid.innerHTML = carsToDisplay.map(car => createCarListingsCard(car)).join('');
}

// Function to create page numbers
function createCarListingsPageNumbers() {
  carListingsPageNumbers.innerHTML = '';

  for (let i = 1; i <= carListingsTotalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `car-listings-page-btn ${i === carListingsCurrentPage ? 'current' : ''}`;
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => {
      carListingsCurrentPage = i;
      displayCarListings(carListingsCurrentPage);
      updateCarListingsPaginationControls();
    });
    carListingsPageNumbers.appendChild(pageBtn);
  }
}

// Function to update pagination controls
function updateCarListingsPaginationControls() {
  const allPageBtns = carListingsPageNumbers.querySelectorAll('.car-listings-page-btn');
  allPageBtns.forEach((btn, index) => {
    btn.classList.toggle('current', index + 1 === carListingsCurrentPage);
  });

  carListingsPrevBtn.disabled = carListingsCurrentPage === 1;
  carListingsNextBtn.disabled = carListingsCurrentPage === carListingsTotalPages;
}

// Event listeners for previous/next buttons
carListingsPrevBtn.addEventListener('click', () => {
  if (carListingsCurrentPage > 1) {
    carListingsCurrentPage--;
    displayCarListings(carListingsCurrentPage);
    updateCarListingsPaginationControls();
  }
});

carListingsNextBtn.addEventListener('click', () => {
  if (carListingsCurrentPage < carListingsTotalPages) {
    carListingsCurrentPage++;
    displayCarListings(carListingsCurrentPage);
    updateCarListingsPaginationControls();
  }
});

// Mobile Menu Manager for Car Listings
class CarListingsMobileMenuManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupSidebarToggle();
    this.setupOutsideClick();
    this.setupResizeHandler();
  }

  setupSidebarToggle() {
    let sidebarToggle = document.querySelector('.car-listings-mobile-sidebar-toggle');
    if (!sidebarToggle) {
      sidebarToggle = document.createElement('button');
      sidebarToggle.className = 'car-listings-mobile-sidebar-toggle';
      sidebarToggle.innerHTML = '☰ Filters';
      sidebarToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1001;
        padding: 12px 16px;
        background: #4d78bc;
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: none;
      `;
      document.body.appendChild(sidebarToggle);
    }

    const sidebar = document.querySelector('.car-listings-left-sidebar');

    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('car-listings-mobile-sidebar-open');
      });
    }

    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        sidebarToggle.style.display = 'block';
      } else {
        sidebarToggle.style.display = 'none';
        sidebar.classList.remove('active');
        document.body.classList.remove('car-listings-mobile-sidebar-open');
      }
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
  }

  setupOutsideClick() {
    document.addEventListener('click', (e) => {
      const sidebar = document.querySelector('.car-listings-left-sidebar');
      const sidebarToggle = document.querySelector('.car-listings-mobile-sidebar-toggle');

      if (sidebar.classList.contains('active') && 
          !sidebar.contains(e.target) && 
          !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        document.body.classList.remove('car-listings-mobile-sidebar-open');
      }
    });
  }

  setupResizeHandler() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.car-listings-left-sidebar');
        sidebar.classList.remove('active');
        document.body.classList.remove('car-listings-mobile-sidebar-open');
      }
    });
  }
}

// Sidebar tab functionality
const carListingsSidebarTabBtns = document.querySelectorAll('.car-listings-sidebar-tab-btn');
const carListingsSidebarTabContents = document.querySelectorAll('.car-listings-sidebar-tab-content');

carListingsSidebarTabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const targetTab = this.dataset.tab;

    carListingsSidebarTabBtns.forEach(b => b.classList.remove('active'));
    carListingsSidebarTabContents.forEach(c => c.classList.remove('active'));

    this.classList.add('active');
    document.getElementById('car-listings-' + targetTab + '-tab').classList.add('active');
  });
});

// Accordion functionality for filters
const carListingsDetailsElements = document.querySelectorAll('.car-listings-filter-section');

carListingsDetailsElements.forEach(details => {
  details.addEventListener('toggle', function() {
    const arrow = this.querySelector('.car-listings-arrow');
    if (this.open) {
      arrow.style.transform = 'rotate(180deg)';
    } else {
      arrow.style.transform = 'rotate(0deg)';
    }
  });
});

// Search functionality
const carListingsSearchBtn = document.querySelector('.car-listings-search-btn');
const carListingsSearchInput = document.querySelector('.car-listings-search-input');

if (carListingsSearchBtn && carListingsSearchInput) {
  carListingsSearchBtn.addEventListener('click', () => {
    const searchTerm = carListingsSearchInput.value.trim();
    console.log('Car Listings Search:', searchTerm);
    // Add search logic here
  });

  carListingsSearchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const searchTerm = this.value.trim();
      console.log('Car Listings Search Enter:', searchTerm);
      // Add search logic here
    }
  });
}

// Sort button functionality
const carListingsSortBtn = document.querySelector('.car-listings-sort-btn');
if (carListingsSortBtn) {
  carListingsSortBtn.addEventListener('click', () => {
    console.log('Car Listings Sort clicked');
    // Add sorting logic here
  });
}

// Slider functionality for real-time value updates
function initializeCarListingsSliders() {
  // Distance slider
  const distanceSlider = document.getElementById('car-listings-distanceSlider');
  const distanceValue = document.getElementById('car-listings-distanceValue');

  if (distanceSlider && distanceValue) {
    distanceSlider.addEventListener('input', function() {
      const value = this.value;
      if (value >= 100) {
        distanceValue.textContent = '100+ mi';
      } else {
        distanceValue.textContent = value + ' mi';
      }
    });
  }

  // Price slider
  const priceSlider = document.getElementById('car-listings-priceSlider');
  const priceValue = document.getElementById('car-listings-priceValue');
  const minPriceInput = document.getElementById('car-listings-minPrice');
  const maxPriceInput = document.getElementById('car-listings-maxPrice');

  if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', function() {
      const value = parseInt(this.value);
      if (value >= 200000) {
        priceValue.textContent = '$200k+';
      } else {
        priceValue.textContent = '$' + value.toLocaleString();
      }

      if (maxPriceInput) {
        maxPriceInput.value = value.toLocaleString();
      }
    });
  }

  // Connect price inputs to slider
  if (minPriceInput && priceSlider) {
    minPriceInput.addEventListener('input', function() {
      const value = parseInt(this.value.replace(/,/g, '')) || 0;
      if (value <= parseInt(priceSlider.max)) {
        priceSlider.min = value;
      }
    });
  }

  if (maxPriceInput && priceSlider) {
    maxPriceInput.addEventListener('input', function() {
      const value = parseInt(this.value.replace(/,/g, '')) || 200000;
      if (value >= parseInt(priceSlider.min)) {
        priceSlider.value = value;
        priceSlider.dispatchEvent(new Event('input'));
      }
    });
  }

  // Year slider
  const yearSlider = document.getElementById('car-listings-yearSlider');
  const yearValue = document.getElementById('car-listings-yearValue');

  if (yearSlider && yearValue) {
    yearSlider.addEventListener('input', function() {
      yearValue.textContent = this.value;
    });
  }

  // Mileage slider
  const mileageSlider = document.getElementById('car-listings-mileageSlider');
  const mileageValue = document.getElementById('car-listings-mileageValue');

  if (mileageSlider && mileageValue) {
    mileageSlider.addEventListener('input', function() {
      const value = parseInt(this.value);
      if (value >= 100000) {
        mileageValue.textContent = '100k+ mi';
      } else if (value >= 1000) {
        mileageValue.textContent = Math.round(value / 1000) + 'k mi';
      } else {
        mileageValue.textContent = value + ' mi';
      }
    });
  }

  // Fuel Economy slider
  const fuelEconomySlider = document.getElementById('car-listings-fuelEconomySlider');
  const fuelEconomyValue = document.getElementById('car-listings-fuelEconomyValue');

  if (fuelEconomySlider && fuelEconomyValue) {
    fuelEconomySlider.addEventListener('input', function() {
      const value = parseInt(this.value);
      if (value >= 50) {
        fuelEconomyValue.textContent = '50+ MPG';
      } else {
        fuelEconomyValue.textContent = value + ' MPG';
      }
    });
  }
}

// Initialize the car listings application
document.addEventListener('DOMContentLoaded', () => {
  displayCarListings(carListingsCurrentPage);
  createCarListingsPageNumbers();
  updateCarListingsPaginationControls();
  initializeCarListingsSliders();

  // Initialize mobile menu manager
  const carListingsMobileMenuManager = new CarListingsMobileMenuManager();
  window.carListingsMobileMenuManager = carListingsMobileMenuManager;
});

// Smooth scrolling for anchor links
document.querySelectorAll('.car-listings-card-footer a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Debounced resize handler
let carListingsResizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(carListingsResizeTimeout);
  carListingsResizeTimeout = setTimeout(() => {
    console.log('Car Listings Window resized:', window.innerWidth, 'x', window.innerHeight);
  }, 250);
});