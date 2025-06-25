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
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Set up event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Set up indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause autoplay on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
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

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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

// Floating animation for butterflies
const butterflies = document.querySelectorAll('.butterfly');
butterflies.forEach((butterfly, index) => {
    butterfly.style.animation = `float ${3 + index}s ease-in-out infinite`;
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