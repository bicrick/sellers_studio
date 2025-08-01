// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Navigation Functionality
class MobileNavigation {
    constructor() {
        this.toggle = document.querySelector('.mobile-nav-toggle');
        this.dropdown = document.querySelector('.mobile-nav-dropdown');
        this.links = document.querySelectorAll('.mobile-nav-dropdown .nav-link');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.toggle || !this.dropdown) return;
        
        // Toggle button click
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.dropdown.contains(e.target) && 
                !this.toggle.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        // Add opening class for pulse animation
        this.toggle.classList.add('opening');
        
        // Remove opening class after animation (longer for more chill feel)
        setTimeout(() => {
            this.toggle.classList.remove('opening');
        }, 500);
        
        this.isOpen = true;
        this.toggle.classList.add('active');
        this.dropdown.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    closeMenu() {
        this.isOpen = false;
        this.toggle.classList.remove('active', 'opening');
        this.dropdown.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Hero Carousel Functionality
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 6000; // 6 seconds
        
        // Touch/Swipe properties
        this.startX = 0;
        this.startY = 0;
        this.distX = 0;
        this.distY = 0;
        this.threshold = 50; // minimum distance for swipe
        this.carousel = document.querySelector('.hero-carousel');
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Set up event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Set up indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                const slideIndex = parseInt(indicator.getAttribute('data-slide')) || index;
                this.goToSlide(slideIndex);
            });
        });
        
        // Add touch/swipe listeners
        this.setupTouchEvents();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause autoplay on hover
        if (this.carousel) {
            this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Handle scroll indicator click
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.services-preview');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    setupTouchEvents() {
        if (!this.carousel) return;
        
        // Touch start
        this.carousel.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.stopAutoPlay(); // Pause autoplay during touch
        }, { passive: true });
        
        // Touch move (optional: for visual feedback)
        this.carousel.addEventListener('touchmove', (e) => {
            if (!this.startX || !this.startY) return;
            
            this.distX = e.touches[0].clientX - this.startX;
            this.distY = e.touches[0].clientY - this.startY;
        }, { passive: true });
        
        // Touch end
        this.carousel.addEventListener('touchend', (e) => {
            if (!this.startX || !this.startY) return;
            
            // Calculate final distances
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            this.distX = endX - this.startX;
            this.distY = endY - this.startY;
            
            // Check if it's a horizontal swipe (not vertical scroll)
            if (Math.abs(this.distX) > Math.abs(this.distY)) {
                // Prevent vertical scrolling if it's a horizontal swipe
                if (Math.abs(this.distX) > this.threshold) {
                    e.preventDefault();
                    
                    if (this.distX > 0) {
                        // Swipe right - go to previous slide
                        this.prevSlide();
                    } else {
                        // Swipe left - go to next slide
                        this.nextSlide();
                    }
                }
            }
            
            // Reset values
            this.startX = 0;
            this.startY = 0;
            this.distX = 0;
            this.distY = 0;
            
            // Resume autoplay after a short delay
            setTimeout(() => this.startAutoPlay(), 1000);
        }, { passive: false });
    }
    
    goToSlide(slideIndex) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide]?.classList.remove('active');
        this.indicators[this.currentSlide]?.classList.remove('active');
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide]?.classList.add('active');
        this.indicators[this.currentSlide]?.classList.add('active');
        
        // Restart autoplay
        this.restartAutoPlay();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    handleKeydown(e) {
        if (e.key === 'ArrowLeft') {
            this.prevSlide();
        } else if (e.key === 'ArrowRight') {
            this.nextSlide();
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    new MobileNavigation();
    new HeroCarousel();
});

// Add fade-in animation for sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(.hero-carousel)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
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