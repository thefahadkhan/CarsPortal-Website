// Dropdown functionality
function toggleBluetoothDropdown() {
    const dropdownContent = document.getElementById('btDropdownContent');
    const chevronIcon = document.getElementById('btChevronIcon');
    
    // Toggle the open class
    dropdownContent.classList.toggle('bt-open');
    
    // Toggle the chevron rotation
    chevronIcon.classList.toggle('bt-rotated');
}

// Add keyboard accessibility
document.addEventListener('DOMContentLoaded', function() {
    const dropdownHeader = document.querySelector('.bt-dropdown-header');
    
    // Add tabindex for keyboard navigation
    dropdownHeader.setAttribute('tabindex', '0');
    
    // Add keyboard event listener
    dropdownHeader.addEventListener('keydown', function(event) {
        // Toggle on Enter or Space key
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleBluetoothDropdown();
        }
    });
});

// Smooth scroll behavior for breadcrumb links
document.addEventListener('DOMContentLoaded', function() {
    const breadcrumbLinks = document.querySelectorAll('.bt-breadcrumb-link');
    
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add subtle click feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
});

// Add subtle hover effects
document.addEventListener('DOMContentLoaded', function() {
    const definitionSection = document.querySelector('.bt-definition-section');
    
    definitionSection.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    definitionSection.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});





// Header load (Top Header + Navbar)
function initializeDropdown() {
  // Add hover event listeners to new dropdown
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

    // Keep dropdown open when hovering over dropdown content
    dropdownContent.addEventListener("mouseenter", function () {
      clearTimeout(dropdownTimeout);
    });

    dropdownContent.addEventListener("mouseleave", function () {
      dropdownTimeout = setTimeout(() => {
        dropdownContent.classList.remove("show");
      }, 300);
    });

    // Add hover event listeners to tab links
    const tabLinks = document.querySelectorAll(".tab-link");
    console.log("Found tab links:", tabLinks.length);

    tabLinks.forEach((tabLink) => {
      tabLink.addEventListener("mouseenter", function () {
        const tabId = this.getAttribute("data-tab");
        if (tabId) {
          // Remove active class from all tab links
          const allTabLinks = document.querySelectorAll(".tab-link");
          allTabLinks.forEach((link) => link.classList.remove("active"));

          // Add active class to current tab link
          this.classList.add("active");

          // Hide all tab contents
          const allTabContents = document.querySelectorAll(".tab-content");
          allTabContents.forEach((content) =>
            content.classList.remove("active")
          );

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
  const interactiveItems = document.querySelectorAll(
    ".style-item, .brand-item"
  );

  interactiveItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}
