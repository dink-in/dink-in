// ==========================================
// DINK-IN PICKLEBALL CLUB - JAVASCRIPT
// ==========================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Validate
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                showNotification('Please fill out all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 1500);
        });
    }

    // Add scroll animation for elements
    observeElements();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        zIndex: '2000',
        animation: 'slideIn 0.4s ease-out',
        maxWidth: '400px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
    });
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#4CAF50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#FF6B35';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#2C3E50';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease-out forwards';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Observe elements for scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all event cards and membership cards
    const elementsToObserve = document.querySelectorAll('.event-card, .membership-card, .about-content');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(50px);
        }
    }

    .submit-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link highlighting
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling dynamically
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #FFD60A !important;
        font-weight: 700;
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyle);

// Event buttons - add click handlers
document.querySelectorAll('.event-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const eventName = this.closest('.event-details').querySelector('h3').textContent;
        showNotification(`You clicked on ${eventName}. Registration details coming soon!`, 'info');
    });
});

// Join buttons - add click handlers
document.querySelectorAll('.join-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const planName = this.closest('.membership-card').querySelector('h3').textContent;
        showNotification(`You selected the ${planName} plan. Redirecting to sign up...`, 'info');
        // In a real application, this would redirect to a sign-up page
        // window.location.href = '/signup?plan=' + planName;
    });
});

// Parallax effect for hero section (optional)
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < hero.clientHeight) {
            hero.style.backgroundPosition = `0% ${scrollPosition * 0.5}px`;
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    // Fade in body content
    document.body.style.opacity = '1';
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Social media tracking (optional)
function trackSocialClick(platform) {
    console.log('User clicked on ' + platform);
    // In a real application, you could send this to analytics
}

// Make social icons trackable
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const platform = this.classList.contains('facebook') ? 'Facebook' : 'Instagram';
        trackSocialClick(platform);
    });
});

// Responsive navbar collapse on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }
});

// Console message for fun
console.log('%c🏓 Welcome to Dink-In Pickleball Club! 🏓', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cWhere Every Rally Starts', 'color: #FFD60A; font-size: 16px; font-style: italic;');
