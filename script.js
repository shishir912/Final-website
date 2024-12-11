document.addEventListener('DOMContentLoaded', () => {
    // Initialize project content visibility
    const projectSections = document.querySelectorAll('.project-card');
    
    projectSections.forEach(section => {
        const toggleButton = section.querySelector('.toggle-button');
        const content = section.querySelector('.project-content');
        const reflectionButton = section.querySelector('.reflection-button');
        const reflectionContent = section.querySelector('.reflection-content');

        // Toggle project content
        if (toggleButton && content) {
            toggleButton.addEventListener('click', () => {
                const isVisible = content.classList.contains('visible');
                content.classList.toggle('visible');
                toggleButton.innerHTML = isVisible ? 
                    '<svg class="chevron-down">...</svg>' : 
                    '<svg class="x-mark">...</svg>';
            });
        }

        // Toggle reflection content
        if (reflectionButton && reflectionContent) {
            reflectionButton.addEventListener('click', () => {
                reflectionContent.classList.toggle('visible');
                const isVisible = reflectionContent.classList.contains('visible');
                reflectionButton.querySelector('.plus-icon').style.transform = 
                    isVisible ? 'rotate(45deg)' : 'rotate(0deg)';
            });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Initialize animation observers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all project cards for animation
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Handle Type system previews
    const typeCards = document.querySelectorAll('.type-card');
    typeCards.forEach(card => {
        const canvas = card.querySelector('.canvas-container');
        if (canvas) {
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                canvas.style.transform = 'scale(1.05)';
            });
            card.addEventListener('mouseleave', () => {
                canvas.style.transform = 'scale(1)';
            });
        }
    });
});
