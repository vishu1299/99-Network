// Scroll-triggered animations for about section
document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element comes into view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate class when element comes into view
                entry.target.classList.add('animate');
                
                // Optional: Stop observing after animation triggers (one-time animation)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only apply animations on larger screens (not mobile)
    if (window.innerWidth > 768) {
        // Observe about section elements
        const aboutImageContainer = document.querySelector('.about-image-container');
        const aboutContentCol = document.querySelector('.about-content-col');

        if (aboutImageContainer) {
            observer.observe(aboutImageContainer);
        }

        if (aboutContentCol) {
            observer.observe(aboutContentCol);
        }
    } else {
        // On mobile, immediately show elements without animation
        const aboutImageContainer = document.querySelector('.about-image-container');
        const aboutContentCol = document.querySelector('.about-content-col');

        if (aboutImageContainer) {
            aboutImageContainer.style.opacity = '1';
            aboutImageContainer.style.transform = 'none';
        }

        if (aboutContentCol) {
            aboutContentCol.style.opacity = '1';
            aboutContentCol.style.transform = 'none';
        }
    }

    // Handle window resize to disable/enable animations
    window.addEventListener('resize', function() {
        const aboutImageContainer = document.querySelector('.about-image-container');
        const aboutContentCol = document.querySelector('.about-content-col');

        if (window.innerWidth <= 768) {
            // Mobile: disable animations
            if (aboutImageContainer) {
                aboutImageContainer.style.opacity = '1';
                aboutImageContainer.style.transform = 'none';
                aboutImageContainer.style.transition = 'none';
            }

            if (aboutContentCol) {
                aboutContentCol.style.opacity = '1';
                aboutContentCol.style.transform = 'none';
                aboutContentCol.style.transition = 'none';
            }
        } else {
            // Desktop: re-enable animations if not already animated
            if (aboutImageContainer && !aboutImageContainer.classList.contains('animate')) {
                aboutImageContainer.style.opacity = '';
                aboutImageContainer.style.transform = '';
                aboutImageContainer.style.transition = '';
            }

            if (aboutContentCol && !aboutContentCol.classList.contains('animate')) {
                aboutContentCol.style.opacity = '';
                aboutContentCol.style.transform = '';
                aboutContentCol.style.transition = '';
            }
        }
    });
});
