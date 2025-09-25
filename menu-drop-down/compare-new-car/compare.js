let currentSlideIndex = 0;
        const slideWidth = 345; // Card width + gap

        // Tab switching functionality
        function showTab(tabName) {
            currentSlideIndex = 0;
            updateSliderPosition();
            
            // Hide all grids
            const grids = document.querySelectorAll('.car-grid');
            grids.forEach(grid => {
                grid.classList.remove('active');
            });

            // Show selected grid
            const selectedGrid = document.getElementById(tabName + '-grid');
            if (selectedGrid) {
                selectedGrid.classList.add('active');
            }

            // Update tab buttons
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Slider functionality
        function slideLeft() {
            const activeGrid = document.querySelector('.car-grid.active');
            const totalCards = activeGrid.children.length;
            const visibleCards = Math.floor(activeGrid.parentElement.offsetWidth / slideWidth);
            const maxSlides = Math.max(0, totalCards - visibleCards);
            
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateSliderPosition();
            }
        }

        function slideRight() {
            const activeGrid = document.querySelector('.car-grid.active');
            const totalCards = activeGrid.children.length;
            const visibleCards = Math.floor(activeGrid.parentElement.offsetWidth / slideWidth);
            const maxSlides = Math.max(0, totalCards - visibleCards);
            
            if (currentSlideIndex < maxSlides) {
                currentSlideIndex++;
                updateSliderPosition();
            }
        }

        function updateSliderPosition() {
            const activeGrid = document.querySelector('.car-grid.active');
            if (activeGrid) {
                const translateX = -currentSlideIndex * slideWidth;
                activeGrid.style.transform = `translateX(${translateX}px)`;
            }
        }

        // FAQ accordion functionality
        function toggleFaq(element) {
            const faqItem = element.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            const allFaqItems = document.querySelectorAll('.faq-item');
            allFaqItems.forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }

        // Add car functionality (placeholder)
        function addCar(slot) {
            alert(`Add car to slot ${slot} - This would open a car selection modal`);
        }

        // Navigation dots functionality (placeholder)
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });

        // Compare button functionality (placeholder)
        document.querySelectorAll('.card-compare-btn, .compare-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Compare functionality would be implemented here');
            });
        });

        // Initialize slider position
        window.addEventListener('load', () => {
            updateSliderPosition();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            currentSlideIndex = 0;
            updateSliderPosition();
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
  
  
  // Footer load
  fetch("../../footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });








// Car data for different categories
const carData = {
    SUV: [
      {
        car1: { name: "Land Rover Range Rover Sport 2025", price: "475,610", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "BMW X5 2025", price: "450,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Volkswagen Tiguan 2025", price: "113,900", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Subaru Forester 2025", price: "140,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Mazda CX-5 2025", price: "90,250", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Honda CR-V 2025", price: "124,900", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Jeep Grand Cherokee 2025", price: "239,999", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Toyota Highlander 2025", price: "171,900", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Ford Explorer 2025", price: "185,500", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Chevrolet Tahoe 2025", price: "289,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Nissan Pathfinder 2025", price: "165,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Hyundai Palisade 2025", price: "189,900", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Kia Sorento 2025", price: "145,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Mitsubishi Outlander 2025", price: "125,500", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Volvo XC90 2025", price: "420,000", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Audi Q7 2025", price: "380,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Mercedes GLE 2025", price: "425,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Lexus GX 2025", price: "395,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ],
    COUPE: [
      {
        car1: { name: "BMW M4 2025", price: "285,000", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Audi RS5 2025", price: "295,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Mercedes AMG GT 2025", price: "450,000", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Porsche 911 2025", price: "520,000", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Ford Mustang 2025", price: "185,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Chevrolet Camaro 2025", price: "195,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Lexus LC 2025", price: "385,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Genesis G70 2025", price: "165,000", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ],
    HATCHBACK: [
      {
        car1: { name: "Volkswagen Golf 2025", price: "85,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Honda Civic Hatchback 2025", price: "95,000", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Mazda3 Hatchback 2025", price: "78,000", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Toyota Corolla Hatchback 2025", price: "82,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Hyundai i30 2025", price: "72,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Kia Forte5 2025", price: "75,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ],
    SEDAN: [
      {
        car1: { name: "Honda Accord 2025", price: "125,000", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Toyota Camry 2025", price: "135,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "BMW 3 Series 2025", price: "195,000", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Mercedes C-Class 2025", price: "205,000", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Audi A4 2025", price: "185,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Lexus ES 2025", price: "175,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ],
    CROSSOVER: [
      {
        car1: { name: "Toyota RAV4 2025", price: "145,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Honda CR-V 2025", price: "135,000", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Nissan X-Trail 2025", price: "125,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Mazda CX-5 2025", price: "130,000", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ]
  };
  
  // Car Comparison Section Data and Functionality
  const carComparisonData = {
    SUV: [
      {
        car1: { name: "Land Rover Range Rover Sport 2025", price: "475,610", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "BMW X5 2025", price: "450,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Volkswagen Tiguan 2025", price: "113,900", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Subaru Forester 2025", price: "140,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Mazda CX-5 2025", price: "90,250", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Honda CR-V 2025", price: "124,900", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Jeep Grand Cherokee 2025", price: "239,999", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Toyota Highlander 2025", price: "171,900", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Ford Explorer 2025", price: "185,500", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Chevrolet Tahoe 2025", price: "289,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Nissan Pathfinder 2025", price: "165,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Hyundai Palisade 2025", price: "189,900", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Kia Sorento 2025", price: "145,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Mitsubishi Outlander 2025", price: "125,500", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Volvo XC90 2025", price: "420,000", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Audi Q7 2025", price: "380,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Mercedes GLE 2025", price: "425,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Lexus GX 2025", price: "395,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ],
    COUPE: [
      {
        car1: { name: "BMW M4 2025", price: "285,000", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Audi RS5 2025", price: "295,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Mercedes AMG GT 2025", price: "450,000", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Porsche 911 2025", price: "520,000", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Ford Mustang 2025", price: "185,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Chevrolet Camaro 2025", price: "195,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Lexus LC 2025", price: "385,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Genesis G70 2025", price: "165,000", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ],
    HATCHBACK: [
      {
        car1: { name: "Volkswagen Golf 2025", price: "85,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Honda Civic Hatchback 2025", price: "95,000", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Mazda3 Hatchback 2025", price: "78,000", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Toyota Corolla Hatchback 2025", price: "82,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Hyundai i30 2025", price: "72,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Kia Forte5 2025", price: "75,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ],
    SEDAN: [
      {
        car1: { name: "Honda Accord 2025", price: "125,000", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Toyota Camry 2025", price: "135,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "BMW 3 Series 2025", price: "195,000", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Mercedes C-Class 2025", price: "205,000", image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Audi A4 2025", price: "185,000", image: "https://images.pexels.com/photos/1118444/pexels-photo-1118444.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Lexus ES 2025", price: "175,000", image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ],
    CROSSOVER: [
      {
        car1: { name: "Toyota RAV4 2025", price: "145,000", image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Honda CR-V 2025", price: "135,000", image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      },
      {
        car1: { name: "Nissan X-Trail 2025", price: "125,000", image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" },
        car2: { name: "Mazda CX-5 2025", price: "130,000", image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop" }
      }
    ]
  };
  
  // Car Comparison Section Variables
  let currentComparisonCategory = 'SUV';
  let currentComparisonPage = 0;
  const itemsPerPage = 4;
  
  // Initialize car comparison section
  function initCarComparison() {
      renderComparisonCards();
      updateComparisonPagination();
  }
  
  // Show category function
  function showCategory(category, element) {
      currentComparisonCategory = category;
      currentComparisonPage = 0;
      
      // Update active tab
      document.querySelectorAll('.comparisons-tab-btn').forEach(btn => {
          btn.classList.remove('active');
      });
      element.classList.add('active');
      
      renderComparisonCards();
      updateComparisonPagination();
  }
  
  // Render comparison cards
  function renderComparisonCards() {
      const track = document.getElementById('comparisonsCarouselTrack');
      const data = carData[currentComparisonCategory];
      
      if (!track || !data) return;
      
      track.innerHTML = '';
      
      data.forEach((comparison, index) => {
          const card = createComparisonCard(comparison);
          track.appendChild(card);
      });
      
      updateCarouselPosition();
  }
  
  // Create comparison card
  function createComparisonCard(comparison) {
      const card = document.createElement('div');
      card.className = 'comparisons-card';
      
      card.innerHTML = `
          <div class="comparisons-car-images">
              <img src="${comparison.car1.image}" alt="${comparison.car1.name}" class="comparisons-car-image" />
              <div class="comparisons-vs-badge">VS</div>
              <img src="${comparison.car2.image}" alt="${comparison.car2.name}" class="comparisons-car-image" />
          </div>
          <div class="comparisons-car-details">
              <div class="comparisons-car-info">
                  <div class="comparisons-car-name">${comparison.car1.name}</div>
                  <div class="comparisons-car-price">From AED ${comparison.car1.price}</div>
              </div>
              <div class="comparisons-car-info">
                  <div class="comparisons-car-name">${comparison.car2.name}</div>
                  <div class="comparisons-car-price">From AED ${comparison.car2.price}</div>
              </div>
          </div>
          <button class="comparisons-card-compare-btn" onclick="compareSpecificCars('${comparison.car1.name}', '${comparison.car2.name}')">Compare</button>
      `;
      
      return card;
  }
  
  // Update carousel position
  function updateCarouselPosition() {
      const track = document.getElementById('comparisonsCarouselTrack');
      if (!track) return;
      
      const cardWidth = 280 + 20; // card width + gap
      const offset = -currentComparisonPage * cardWidth * 4; // Show 4 cards per page
      track.style.transform = `translateX(${offset}px)`;
  }
  
  // Update pagination
  function updateComparisonPagination() {
      const pagination = document.getElementById('comparisonsPagination');
      const data = carData[currentComparisonCategory];
      
      if (!pagination || !data) return;
      
      const totalPages = Math.ceil(data.length / 4); // 4 cards per page
      
      pagination.innerHTML = '';
      
      for (let i = 0; i < totalPages; i++) {
          const dot = document.createElement('div');
          dot.className = `comparisons-pagination-dot ${i === currentComparisonPage ? 'active' : ''}`;
          dot.addEventListener('click', () => {
              currentComparisonPage = i;
              updateCarouselPosition();
              updateComparisonPagination();
              updateComparisonNavigationButtons();
          });
          pagination.appendChild(dot);
      }
      
      updateComparisonNavigationButtons();
  }
  
  // Update navigation buttons
  function updateComparisonNavigationButtons() {
      const data = carData[currentComparisonCategory];
      if (!data) return;
      
      const totalPages = Math.ceil(data.length / 4); // 4 cards per page
      
      const prevBtn = document.getElementById('comparisonsPrevBtn');
      const nextBtn = document.getElementById('comparisonsNextBtn');
      
      if (prevBtn) prevBtn.disabled = currentComparisonPage === 0;
      if (nextBtn) nextBtn.disabled = currentComparisonPage >= totalPages - 1;
  }
  
  // Previous page function
  function previousPage() {
      if (currentComparisonPage > 0) {
          currentComparisonPage--;
          updateCarouselPosition();
          updateComparisonPagination();
      }
  }
  
  // Next page function
  function nextPage() {
      const data = carData[currentComparisonCategory];
      if (!data) return;
      
      const totalPages = Math.ceil(data.length / 4); // 4 cards per page
      
      if (currentComparisonPage < totalPages - 1) {
          currentComparisonPage++;
          updateCarouselPosition();
          updateComparisonPagination();
      }
  }
  
  // Compare specific cars function
  function compareSpecificCars(car1, car2) {
      alert(`Comparing ${car1} vs ${car2}`);
  }
  
  // Initialize car comparison when page loads
  document.addEventListener('DOMContentLoaded', () => {
      // Add a small delay to ensure all elements are loaded
      setTimeout(() => {
          initCarComparison();
      }, 100);
  });
  
  class CarComparison {
    constructor() {
      this.currentCategory = 'SUV';
      this.currentPage = 0;
      this.itemsPerPage = 4;
      
      this.init();
    }
  
    init() {
      this.bindEvents();
      this.renderCards();
      this.updatePagination();
    }
  
    bindEvents() {
      // Tab buttons
      const tabButtons = document.querySelectorAll('.tab-btn');
      tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.switchCategory(e.target.dataset.category);
        });
      });
  
      // Navigation buttons
      document.getElementById('prevBtn').addEventListener('click', () => {
        this.previousPage();
      });
  
      document.getElementById('nextBtn').addEventListener('click', () => {
        this.nextPage();
      });
    }
  
    switchCategory(category) {
      this.currentCategory = category;
      this.currentPage = 0;
      
      // Update active tab
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      document.querySelector(`[data-category="${category}"]`).classList.add('active');
      
      this.renderCards();
      this.updatePagination();
    }
  
    renderCards() {
      const track = document.getElementById('carouselTrack');
      const data = carData[this.currentCategory];
      
      track.innerHTML = '';
      
      data.forEach((comparison, index) => {
        const card = this.createComparisonCard(comparison);
        track.appendChild(card);
      });
      
      this.updateCarouselPosition();
    }
  
    createComparisonCard(comparison) {
      const card = document.createElement('div');
      card.className = 'comparison-card';
      
      card.innerHTML = `
        <div class="car-images">
          <img src="${comparison.car1.image}" alt="${comparison.car1.name}" class="car-image" />
          <div class="vs-badge">VS</div>
          <img src="${comparison.car2.image}" alt="${comparison.car2.name}" class="car-image" />
        </div>
        <div class="car-details">
          <div class="car-info">
            <div class="car-name">${comparison.car1.name}</div>
            <div class="car-price">From AED ${comparison.car1.price}</div>
          </div>
          <div class="car-info">
            <div class="car-name">${comparison.car2.name}</div>
            <div class="car-price">From AED ${comparison.car2.price}</div>
          </div>
        </div>
        <button class="compare-btn" onclick="this.compareCards('${comparison.car1.name}', '${comparison.car2.name}')">Compare</button>
      `;
      
      return card;
    }
  
    updateCarouselPosition() {
      const track = document.getElementById('carouselTrack');
      const cardWidth = 280 + 20; // card width + gap
      const offset = -this.currentPage * cardWidth * this.itemsPerPage;
      track.style.transform = `translateX(${offset}px)`;
    }
  
    updatePagination() {
      const pagination = document.getElementById('pagination');
      const data = carData[this.currentCategory];
      const totalPages = Math.ceil(data.length / this.itemsPerPage);
      
      pagination.innerHTML = '';
      
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = `pagination-dot ${i === this.currentPage ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          this.currentPage = i;
          this.updateCarouselPosition();
          this.updatePagination();
          this.updateNavigationButtons();
        });
        pagination.appendChild(dot);
      }
      
      this.updateNavigationButtons();
    }
  
    updateNavigationButtons() {
      const data = carData[this.currentCategory];
      const totalPages = Math.ceil(data.length / this.itemsPerPage);
      
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      
      prevBtn.disabled = this.currentPage === 0;
      nextBtn.disabled = this.currentPage >= totalPages - 1;
    }
  
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.updateCarouselPosition();
        this.updatePagination();
      }
    }
  
    nextPage() {
      const data = carData[this.currentCategory];
      const totalPages = Math.ceil(data.length / this.itemsPerPage);
      
      if (this.currentPage < totalPages - 1) {
        this.currentPage++;
        this.updateCarouselPosition();
        this.updatePagination();
      }
    }
  
    compareCards(car1, car2) {
      alert(`Comparing ${car1} vs ${car2}`);
    }
  }
  
  // Initialize the car comparison when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    new CarComparison();
  });
  
  // Global function for compare buttons
  function compareCards(car1, car2) {
    alert(`Comparing ${car1} vs ${car2}`);
  }