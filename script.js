// ========================================
// Mobile Navigation Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// Sticky Header with Background Change
// ========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// EmailJS Configuration
// ========================================
// TODO: Replace these with your EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';  // Your EmailJS public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';  // Your service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // Your template ID

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ========================================
// Form Submission Handler with EmailJS
// ========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get the submit button
        const submitBtn = this.querySelector('.schedule-btn');
        const originalBtnContent = submitBtn.innerHTML;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

        // Get form data
        const formData = new FormData(this);

        // Format appointment date for email
        const appointmentDate = new Date(formData.get('appointment_date'));
        const formattedDate = appointmentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Prepare email parameters
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            gender: formData.get('gender'),
            appointment_date: `${formattedDate} at ${formattedTime}`,
            message: formData.get('message') || 'No additional message',
            to_email: 'info@multisensa.com'  // Your email to receive notifications
        };

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            console.log('Email sent successfully:', response);

            // Success! Show success message
            showNotification(
                'Success!',
                'Your appointment request has been sent successfully. We will contact you shortly to confirm.',
                'success'
            );

            // Reset form
            this.reset();

        } catch (error) {
            console.error('Error sending email:', error);
            showNotification(
                'Error',
                'Failed to send appointment request. Please try again or contact us directly at 0314 7367769.',
                'error'
            );
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
}

// ========================================
// Notification System
// ========================================
function showNotification(title, message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="notification-text">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========================================
// Scroll Reveal Animation
// ========================================
function revealOnScroll() {
    const elements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .pricing-card, .process-step');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements with initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .pricing-card, .process-step');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Trigger initial check
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }

    updateCounter();
}

// Trigger counter animation when badges are in view
const badges = document.querySelectorAll('.badge-number, .about-badge .badge-number');
let countersAnimated = false;

function checkBadgesInView() {
    if (countersAnimated) return;

    badges.forEach(badge => {
        const rect = badge.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const targetText = badge.textContent;
            const target = parseInt(targetText.replace(/\D/g, ''));
            if (target) {
                animateCounter(badge, target);
                countersAnimated = true;
            }
        }
    });
}

window.addEventListener('scroll', checkBadgesInView);

// ========================================
// Close mobile menu when clicking outside
// ========================================
document.addEventListener('click', (e) => {
    if (navMenu && hamburger) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ========================================
// Prevent scroll when mobile menu is open
// ========================================
if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Lazy Load Images (Basic Implementation)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ========================================
// Add loading state to buttons on form submit
// ========================================
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Re-enable after 3 seconds (in production, do this after actual submission)
            setTimeout(() => {
                submitBtn.innerHTML = 'Book Appointment';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
});

console.log('Multisensa Physiotherapy Website Loaded Successfully!');
