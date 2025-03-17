// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6C63FF'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6C63FF',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animation for Cards
const scrollElements = document.querySelectorAll('.service-card, .team-member, .project-card, .feature');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initialize scroll animation check
handleScrollAnimation();

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Enhanced CTA Button Effects
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mousemove', (e) => {
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctaButton.style.setProperty('--x', `${x}px`);
        ctaButton.style.setProperty('--y', `${y}px`);
    });

    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.setProperty('--x', '50%');
        ctaButton.style.setProperty('--y', '50%');
    });
}

// Enhanced Form Submission with validation
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'در حال ارسال...';

    // Simulate form submission
    setTimeout(() => {
        alert('با تشکر از پیام شما! به زودی با شما تماس خواهیم گرفت.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'ارسال پیام';
        formInputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
    }, 1500);
});

// Intersection Observer for Fade-in Animation
const fadeElements = document.querySelectorAll('.feature, .service-card, .team-member, .project-card');

const fadeOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const fadeOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    element.classList.add('fade-out');
    fadeOnScroll.observe(element);
});

// Enhanced hover effects
const features = document.querySelectorAll('.feature');
features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'translateY(-10px)';
        const icon = feature.querySelector('i');
        icon.style.transform = 'scale(1.1)';
    });
    
    feature.addEventListener('mouseleave', () => {
        feature.style.transform = 'translateY(0)';
        const icon = feature.querySelector('i');
        icon.style.transform = 'scale(1)';
    });
});

// Smooth section transitions
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'scale(1.01)';
        section.style.transition = 'transform 0.3s ease';
    });
    
    section.addEventListener('mouseleave', () => {
        section.style.transform = 'scale(1)';
    });
});
