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







// Header load (Top Header + Navbar)
function initializeDropdown() {
  // Add hover event listeners to new dropdown
  const newDropdown = document.querySelector('.new-dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');
  
  if (newDropdown && dropdownContent) {
    newDropdown.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
      dropdownContent.classList.add('show');
    });
    
    newDropdown.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(() => {
        dropdownContent.classList.remove('show');
      }, 300);
    });
    
    // Keep dropdown open when hovering over dropdown content
    dropdownContent.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
    });
    
    dropdownContent.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(() => {
        dropdownContent.classList.remove('show');
      }, 300);
    });
    
    // Add hover event listeners to tab links
    const tabLinks = document.querySelectorAll('.tab-link');
    console.log("Found tab links:", tabLinks.length);
    
    tabLinks.forEach((tabLink) => {
      tabLink.addEventListener("mouseenter", function() {
        const tabId = this.getAttribute("data-tab");
        if (tabId) {
          // Remove active class from all tab links
          const allTabLinks = document.querySelectorAll(".tab-link");
          allTabLinks.forEach((link) => link.classList.remove("active"));
          
          // Add active class to current tab link
          this.classList.add("active");
          
          // Hide all tab contents
          const allTabContents = document.querySelectorAll(".tab-content");
          allTabContents.forEach((content) => content.classList.remove("active"));
          
          // Show the selected tab content
          const selectedContent = document.getElementById(tabId + "-content");
          if (selectedContent) {
            selectedContent.classList.add("active");
            console.log("Tab content shown:", tabId + "-content");
          }
        }
      });
    });
  }
  
  // Add hover effects to interactive items
  const interactiveItems = document.querySelectorAll('.style-item, .brand-item');
  
  interactiveItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
}



  
  // Car brands data with emojis as logos
  const carBrands = [
    { name: "Toyota", image: "../../images/cars/toyota-logos-brands-10.png" },
    { name: "Nissan", image: "../../images/cars/pngwing.com.png" },
    { name: "Hyundai", image: "../../images/cars/hyundai-logo-white.jpg" },
    { name: "Mercedes-Benz", image: "../../images/cars/Mercedes-Benz-Logo.png" },
    { name: "BMW", image: "../../images/cars/BMW-Logo.png" },
    { name: "Chevrolet", image: "../../images/cars/Chevrolet-Logo-2010.png" },
    { name: "Ford", image: "../../images/cars/Ford-Logo-1965-present.png" },
    { name: "Honda", image: "../../images/cars/wp3351340.png" },
    { name: "Lexus", image: "../../images/cars/Lexus-Logo.png" },
    { name: "Audi", image: "../../images/cars/Audi-Symbol.png" },
    { name: "KIA", image: "../../images/cars/Kia-Logo.png" },
    { name: "Mitsubishi", image: "../../images/cars/Mitsubishi-emblem-1024x768.png" },
    { name: "BYD", image: "../../images/cars/byd-logo-1-01.jpg" },
    { name: "Bestune", image: "../../images/cars/bestune-logo-600x1100-show.png" },
    { name: "DFSK", image: "../../images/cars/DFSK-logo-2025-klein.png" },
    { name: "Mahindra", image: "../../images/cars/Mahindra-Mahindra-New-Logo.png" },
    { name: "Volkswagen", image: "../../images/cars/brand-volkswagen-png-logo-17.png" },
    {
      name: "Infiniti",
      image:
        "../../images/cars/257-2576555_infiniti-car-logo-infiniti-car-logo-png-transparent.png",
    },
    { name: "Jeep", image: "../../images/cars/Jeep_logo.png" },
    { name: "Land Rover", image: "../../images/cars/Land-Rover-Logo-1986-present.png" },
    { name: "Porsche", image: "../../images/cars/Porsche-Logo.png" },
    { name: "Maserati", image: "../../images/cars/Maserati-Symbol.png" },
    { name: "Ferrari", image: "../../images/cars/Ferrari-Logo.png" },
    { name: "Lamborghini", image: "../../images/cars/lamborghini_PNG10709.png" },
    { name: "Bentley", image: "../../images/cars/Bentley-Symbol.png" },
    {
      name: "Rolls-Royce",
      image:
        "../../images/cars/rolls-royce-brand-logo-car-symbol-black-design-british-automobile-illustration-free-vector.jpg",
    },
    { name: "McLaren", image: "../../images/cars/Mclaren_PNG49.png" },
    {
      name: "Bugatti",
      image: "../../images/cars/5a953454320e8d398b2dcc5babf78014.jpg",
    },
    { name: "Pagani", image: "../../images/cars/419-4194037_pagani-logo-png.png" },
    {
      name: "Koenigsegg",
      image: "../../images/cars/f2bf43_179328483f634f938a5a638b192b6005~mv2.png",
    },
    { name: "Tesla", image: "../../images/cars/tesla-logo-7408969_1280.png" },
    { name: "Lucid", image: "../../images/cars/lucid-motors3169.jpg" },
    { name: "Rivian", image: "../../images/cars/Rivian-Logo-Electric.png" },
    { name: "Polestar", image: "../../images/cars/polestar.png" },
    { name: "Genesis", image: "../../images/cars/Genesis-Logo.png" },
    { name: "Acura", image: "../../images/cars/Acura-Embleme.jpg" },
    { name: "Cadillac", image: "../../images/cars/Cadillac-Logo-PNG-Isolated-HD.png" },
    { name: "Lincoln", image: "../../images/cars/10418.jpg" },
    { name: "Chrysler", image: "../../images/cars/Chrysler-Emblem.png" },
    { name: "Dodge", image: "../../images/cars/dodge-logo-black-and-white.png" },
    { name: "Ram", image: "../../images/cars/Los-Angeles-Rams-logo.png" },
    { name: "GMC", image: "../../images/cars/gmc-logo-vector-21.jpg" },
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





