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
    document.querySelectorAll('.btn-show-number, .btn-whatsapp').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Show phone number or WhatsApp functionality
            if (this.classList.contains('btn-show-number')) {
                alert('Phone number: +971 50 123 4567');
            } else if (this.classList.contains('btn-whatsapp')) {
                window.open('https://wa.me/971501234567', '_blank');
            }
        });
    });

    // Pagination functionality
    document.querySelectorAll('.pagination .page').forEach(page => {
        page.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pages
            document.querySelectorAll('.pagination .page').forEach(p => {
                p.classList.remove('active');
            });
            
            // Add active class to clicked page
            this.classList.add('active');
            
            // Scroll to top of results
            document.querySelector('.guide-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });

    // Clear all filters functionality
    document.querySelector('.clear-all').addEventListener('click', function() {
        // Reset all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset all selected options
        document.querySelectorAll('.selected').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Reset all input fields
        document.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => {
            input.value = '';
        });
        
        // Reset all selects
        document.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        });
        
        // Reset car make button
        const carMakeBtn = document.getElementById('carMakeBtn');
        carMakeBtn.innerHTML = '<i class="fas fa-search"></i> Select car make/brand';
    });

    // Search functionality
    document.querySelector('.search-btn').addEventListener('click', function() {
        // Get all filter values
        const filters = {
            priceMin: document.querySelector('.price-input[placeholder="0"]')?.value,
            priceMax: document.querySelector('.price-input[placeholder="To"]')?.value,
            selectedBrand: document.getElementById('carMakeBtn').textContent.trim(),
            selectedSeats: Array.from(document.querySelectorAll('.seat-option.selected')).map(el => el.textContent),
            selectedBodyTypes: Array.from(document.querySelectorAll('.body-type-option.selected')).map(el => el.querySelector('span').textContent),
            selectedTransmissions: Array.from(document.querySelectorAll('input[name="transmission"]:checked')).map(el => el.value),
            selectedCylinders: Array.from(document.querySelectorAll('.cylinder-option.selected')).map(el => el.textContent)
        };
        
        console.log('Search filters:', filters);
        
        // Add search animation
        this.style.transform = 'scale(0.95)';
        this.textContent = 'Searching...';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.textContent = 'Search';
        }, 1000);
    });

    // Load navbar if it exists
    if (typeof loadNavbar === 'function') {
        loadNavbar();
    }

    // Load footer if it exists
    if (typeof loadFooter === 'function') {
        loadFooter();
    }
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