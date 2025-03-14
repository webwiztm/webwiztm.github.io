document.addEventListener('DOMContentLoaded', () => {
    // Navigation highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Add animation class
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.classList.add('submitting');
            
            // Simulate form submission
            setTimeout(() => {
                console.log('Form submitted:', data);
                submitButton.classList.remove('submitting');
                contactForm.reset();
                alert('Thank you for your message! We will get back to you soon.');
            }, 1500);
        });
    }

    // Add animation classes to elements when they become visible
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const animationObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    // Observe elements that should be animated
    document.querySelectorAll('.service-card, .team-member, .project-card, .value-card').forEach(el => {
        animationObserver.observe(el);
    });

    // Add hover effects for interactive elements
    const addHoverEffect = (elements) => {
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'translateY(-5px)';
                el.style.transition = 'transform 0.3s ease';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translateY(0)';
            });
        });
    };

    // Apply hover effects to cards
    addHoverEffect(document.querySelectorAll('.service-card, .team-member, .project-card'));

    // Mobile menu toggle (if needed for responsive design)
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navContent = document.querySelector('.nav-content');
        
        if (window.innerWidth <= 768) {
            const menuButton = document.createElement('button');
            menuButton.classList.add('mobile-menu-toggle');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            
            menuButton.addEventListener('click', () => {
                navContent.classList.toggle('show');
                menuButton.innerHTML = navContent.classList.contains('show') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            if (!document.querySelector('.mobile-menu-toggle')) {
                nav.insertBefore(menuButton, navContent);
            }
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }
});
