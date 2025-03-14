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
                // Trigger skill level animation when skills section becomes visible
                if (id === 'skills') {
                    animateSkillLevels();
                }
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

    // Animate skill levels
    const animateSkillLevels = () => {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.style.setProperty('--width', `${level}%`);
        });
    };

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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // If it's a skill section, animate the levels
                if (entry.target.id === 'skills') {
                    animateSkillLevels();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add animation classes to elements
    const addAnimationClasses = () => {
        // Project cards animation
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('fade-up');
        });

        // Timeline items animation
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('fade-in');
        });

        // Skill items animation
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in');
        });
    };

    // Initialize animations
    addAnimationClasses();

    // Show initial section based on hash or default to about
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'about';
    showSection(initialSection);

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 0.5s ease forwards;
        }

        .fade-in {
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }

        section {
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        section.active {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
