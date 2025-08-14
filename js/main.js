// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .contact-item, .about-text, .about-image').forEach(el => {
    observer.observe(el);
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact Form Handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelector('select').value;
    const notes = this.querySelector('textarea').value;

    // Simple validation
    if (!name || !phone || !service) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    // Simulate form submission
    showNotification('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', 'success');
    
    // Reset form
    this.reset();
});

// Service Booking Buttons
document.querySelectorAll('.service-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const serviceCard = this.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        
        // Scroll to contact form
        const contactSection = document.querySelector('#contact');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Pre-fill the service in the contact form
        setTimeout(() => {
            const serviceSelect = document.querySelector('.contact-form select');
            const options = serviceSelect.options;
            
            for (let i = 0; i < options.length; i++) {
                if (options[i].textContent.includes(serviceName)) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Highlight the form
            const contactForm = document.querySelector('.contact-form');
            contactForm.style.border = '2px solid var(--primary-color)';
            contactForm.style.boxShadow = '0 0 20px rgba(20, 191, 190, 0.3)';
            
            setTimeout(() => {
                contactForm.style.border = 'none';
                contactForm.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }, 3000);
        }, 1000);
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Cairo', sans-serif;
    `;

    // Set colors based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#d4edda';
        notification.style.borderLeft = '4px solid #28a745';
        notification.style.color = '#155724';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f8d7da';
        notification.style.borderLeft = '4px solid #dc3545';
        notification.style.color = '#721c24';
    } else {
        notification.style.backgroundColor = '#cce7f3';
        notification.style.borderLeft = '4px solid #14bfbe';
        notification.style.color = '#0c5460';
    }

    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    // Style close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        margin-right: auto;
        padding: 0;
        font-size: 1.2rem;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Close button functionality
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Loading Animation
window.addEventListener('load', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Animate service cards with stagger effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Counter Animation for Numbers (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Social Links Hover Effect
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Search Functionality (for future enhancement)
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    const services = document.querySelectorAll('.service-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            services.forEach(service => {
                const serviceName = service.querySelector('h3').textContent.toLowerCase();
                const serviceDescription = service.querySelector('p').textContent.toLowerCase();
                
                if (serviceName.includes(searchTerm) || serviceDescription.includes(searchTerm)) {
                    service.style.display = 'block';
                } else {
                    service.style.display = 'none';
                }
            });
        });
    }
}

// Initialize search if search input exists
document.addEventListener('DOMContentLoaded', initSearch);

// Back to Top Button (for future enhancement)
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #14bfbe, #38393c);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Create back to top button
createBackToTopButton();

console.log('الشعور الهادئ - موقع المساج تم تحميله بنجاح!');