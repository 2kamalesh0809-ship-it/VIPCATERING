function initApp() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all event cards
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Determine current path for active links
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Update Active Nav State (Desktop & Mobile)
    const updateActiveLinks = (selector) => {
        const links = document.querySelectorAll(selector);
        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href) {
                const linkPath = href.split('#')[0] || 'index.html';
                if (linkPath === currentPath) {
                    link.classList.add('active');
                }
            }
        });
    };
    updateActiveLinks('.desktop-links a');
    updateActiveLinks('.bottom-nav a.nav-item');

    // Smooth scroll for hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20, // Small offset
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission & Modal Handling
    const enquiryForm = document.getElementById('catering-enquiry');
    const successModal = document.getElementById('successModal');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show the success modal
            if (successModal) successModal.style.display = 'flex';
            // Reset form
            enquiryForm.reset();
        });
    }

    // Modal close button delegation
    if (successModal) {
        const closeBtn = successModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                successModal.style.display = 'none';
            });
        }
    }

    // Menu Accordion Logic (Mobile)
    const accordionHeaders = document.querySelectorAll('.menu-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Only toggle on mobile
            if (window.innerWidth < 992) {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');

                // Close other open accordions
                document.querySelectorAll('.menu-accordion-item').forEach(i => i.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');
                }
            }
        });
    });

    // Hero animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Reset animation by re-adding the element
        heroContent.style.animation = 'none';
        heroContent.offsetHeight; // trigger reflow
        heroContent.style.animation = null;
    }
}

// SPA Router Logic
async function loadPage(url) {
    // 1. Start exit animation
    document.body.classList.add('page-transitioning');

    // Default wait for animation fade out
    await new Promise(r => setTimeout(r, 500));

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Page fetch failed');
        const htmlText = await response.text();

        // Parse new HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Remove scripts from the loaded document to prevent weird re-executions
        doc.querySelectorAll('script').forEach(s => s.remove());

        // Replace current body innerHTML with new body innerHTML
        document.body.innerHTML = doc.body.innerHTML;
        document.body.className = doc.body.className; // Inherit body classes

        // Scroll to top or to hash
        const hash = window.location.hash;
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                window.scrollTo(0, el.offsetTop - 20);
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }

        // Re-init JS logic on the new DOM
        initApp();

    } catch (err) {
        console.error(err);
        // Fallback to normal navigation
        window.location.href = url;
        return;
    }

    // 2. Start enter animation
    requestAnimationFrame(() => {
        document.body.classList.remove('page-transitioning');
    });
}

// Intercept Clicks for SPA Transition
document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');

    // Ignore invalid links, external links, anchor hash links, phone numbers, etc.
    if (!href ||
        href.startsWith('http') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('#')) {
        return;
    }

    // It is an internal HTML link
    e.preventDefault();

    const targetUrl = new URL(link.href);
    const targetPath = targetUrl.pathname.split('/').pop() || 'index.html';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // If navigating to the exact same page, just scroll to top or hash if provided
    if (targetPath === currentPath) {
        if (targetUrl.hash) {
            window.history.pushState(null, '', link.href);
            const el = document.querySelector(targetUrl.hash);
            if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }

    // Push state and load content
    window.history.pushState(null, '', link.href);
    loadPage(link.href);
});

// Handle Back/Forward browser buttons
window.addEventListener('popstate', () => {
    loadPage(window.location.href);
});

// Initialize on first load
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
