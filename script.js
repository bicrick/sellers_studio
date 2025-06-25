// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#contact') {
                // Scroll to footer for contact
                document.querySelector('.footer').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (targetId === '#about') {
                // Scroll to meet designer section
                document.querySelector('.meet-designer').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (targetId === '#services') {
                // Scroll to services preview
                document.querySelector('.services-preview').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (targetId === '#portfolio') {
                // Scroll to featured projects
                document.querySelector('.featured-projects').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(253, 252, 250, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(253, 252, 250, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add fade-in animation for elements on scroll
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
    const animateElements = document.querySelectorAll('.service-card, .project-item, .testimonial-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Floating animation for butterflies
    const butterflies = document.querySelectorAll('.butterfly');
    butterflies.forEach((butterfly, index) => {
        butterfly.style.animation = `float ${3 + index}s ease-in-out infinite`;
    });
});

// CSS animation keyframes for floating effect
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style); 