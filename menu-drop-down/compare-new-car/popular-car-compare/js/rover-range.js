// FAQ Toggle Function
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't already active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Add Car functionality
function addCar() {
    console.log('Add car functionality to be implemented');
    // You can implement car selection modal or functionality here
}

// Checkbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const hideCommonFeatures = document.getElementById('hideCommonFeatures');
    const highlightDifferences = document.getElementById('highlightDifferences');
    
    if (hideCommonFeatures) {
        hideCommonFeatures.addEventListener('change', function() {
            console.log('Hide Common Features:', this.checked);
            // Implement hide common features functionality
        });
    }
    
    if (highlightDifferences) {
        highlightDifferences.addEventListener('change', function() {
            console.log('Highlight Differences:', this.checked);
            // Implement highlight differences functionality
        });
    }
    
    // Add click functionality to add car card
    const addCarCard = document.querySelector('.add-car-card');
    if (addCarCard) {
        addCarCard.addEventListener('click', addCar);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});