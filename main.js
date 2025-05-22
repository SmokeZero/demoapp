// main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked (for single-page navigation or after navigating)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // --- Section Fade-in Animation on Scroll ---
    const sections = document.querySelectorAll('.section-spacing'); // Use the class for sections

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the animation styles
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }); // Trigger when 10% of section is visible

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Highlight Active Nav Link based on current page ---
    const currentPath = window.location.pathname.split('/').pop(); // Get the current HTML file name
    const navItems = document.querySelectorAll('.nav-links li a');

    navItems.forEach(item => {
        const linkPath = item.getAttribute('href').split('/').pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // --- Specific for Docs Page: Sidebar Active Link ---
    if (currentPath === 'docs.html') {
        const docsSidebarLinks = document.querySelectorAll('.docs-sidebar ul li a');
        const docsContentSections = document.querySelectorAll('.docs-content section');

        const docsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    docsSidebarLinks.forEach(link => link.classList.remove('active'));
                    const currentSectionId = entry.target.id;
                    const correspondingLink = document.querySelector(`.docs-sidebar a[href="#${currentSectionId}"]`);
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -50% 0px' }); // Adjust threshold as needed

        docsContentSections.forEach(section => {
            docsObserver.observe(section);
        });

        // Handle initial scroll to hash if present
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => { // Small delay to allow page to render
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }
});
