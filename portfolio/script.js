document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Show active section and update nav
    const showSection = (id) => {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === id) {
                section.classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            history.pushState(null, '', `#${sectionId}`);
        });
    });

    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Add scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .skill-item, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements for scroll animation
    const initializeAnimations = () => {
        const elements = document.querySelectorAll('.project-card, .skill-item, .timeline-item');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    };

    // Initialize animations and add scroll listener
    initializeAnimations();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Show initial section based on hash or default to home
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'home';
    showSection(initialSection);

    // Back button visibility logic
    const backButton = document.getElementById('backButton');
    if (backButton) {
        // Show back button only if user came from our main site
        if (document.referrer.includes('/index.html')) {
            backButton.style.display = 'inline-flex';
            
            // Add hover animation
            backButton.addEventListener('mouseenter', () => {
                backButton.style.transform = 'translateX(-5px)';
            });
            
            backButton.addEventListener('mouseleave', () => {
                backButton.style.transform = 'translateX(0)';
            });
        }
    }
});
