document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
        card.classList.add('fade-out'); // Initial state
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    // Function to open modal with animation
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Trigger animation
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.add('show');
        }, 10);
    }

    // Function to close modal with animation
    function closeModal(modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.classList.remove('show');
        
        // Wait for animation to complete before hiding modal
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Set up close button functionality
    closeButtons.forEach(button => {
        button.onclick = function() {
            const modal = button.closest('.modal');
            closeModal(modal);
        };
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    };

    // Handle "What I Learned" button clicks
    document.querySelectorAll('.reflection h3').forEach(heading => {
        heading.onclick = function() {
            const sectionId = this.closest('section').id;
            const modalId = sectionId + 'Modal';
            openModal(modalId);
        };
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add floating effect to nav on scroll
    const nav = document.querySelector('.floating-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            nav.classList.add('nav-floating');
        } else {
            nav.classList.remove('nav-floating');
        }

        lastScrollY = window.scrollY;
    });

    // Add hover effect for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation to system cards
    document.querySelectorAll('.system-card').forEach(card => {
        card.classList.add('system-card-animate');
    });

    // Handle system card image loading
    document.querySelectorAll('.system-image img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('image-loaded');
        });
    });
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
    }

    .fade-in {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .nav-floating {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        animation: float 0.3s ease-out forwards;
    }

    .system-card-animate {
        animation: cardAppear 0.5s ease-out forwards;
    }

    .image-loaded {
        animation: imageReveal 0.5s ease-out forwards;
    }

    @keyframes float {
        from {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }

    @keyframes cardAppear {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes imageReveal {
        from {
            opacity: 0;
            transform: scale(1.1);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
