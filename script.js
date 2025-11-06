// ============================================
// INITIALIZE AOS (Animate On Scroll)
// ============================================
AOS.init({
    once: true,
    offset: 10,
    duration: 800
});

// ============================================
// WELCOME SCREEN FUNCTIONALITY
// ============================================
const welcomeScreen = document.getElementById('welcomeScreen');
const mainPortfolio = document.getElementById('mainPortfolio');
const websiteText = document.getElementById('websiteText');

// Typewriter Effect for Website URL in Welcome Screen
const websiteURL = 'www.dk.id';
let urlIndex = 0;

function typeWebsiteURL() {
    if (urlIndex < websiteURL.length) {
        websiteText.textContent += websiteURL.charAt(urlIndex);
        urlIndex++;
        setTimeout(typeWebsiteURL, 260);
    }
}

// Start typewriter after delay
setTimeout(typeWebsiteURL, 1800);

// Hide welcome screen and show main portfolio after 4 seconds
setTimeout(() => {
    welcomeScreen.classList.add('fade-out');
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainPortfolio.classList.add('active');
        
        // Reinitialize AOS after showing main portfolio
        AOS.refresh();
    }, 1000);
}, 4000);

// ============================================
// PORTFOLIO HERO TYPING EFFECT
// ============================================
const words = ["DK", "艾尺"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typingText');

function typePortfolioText() {
    // Only start typing after welcome screen is hidden
    if (!mainPortfolio.classList.contains('active')) {
        setTimeout(typePortfolioText, 100);
        return;
    }

    const currentWord = words[wordIndex];
    
    if (!isDeleting && charIndex < currentWord.length) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typePortfolioText, 100);
    } else if (isDeleting && charIndex > 0) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typePortfolioText, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typePortfolioText, 2000);
    }
}

// Start portfolio typing animation
setTimeout(typePortfolioText, 5000);

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
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

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when portfolio becomes active
function observeElements() {
    document.querySelectorAll('.hero-content, .hero-avatar').forEach(el => {
        observer.observe(el);
    });
}

// Call observe after portfolio is shown
setTimeout(observeElements, 5000);

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close any modals (if you add them later)
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[data-modal]');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    // Parallax effect on hero avatar
    const avatar = document.querySelector('.avatar-container');
    if (avatar && scrollTop < window.innerHeight) {
        avatar.style.transform = `scale(1.4) translateY(${scrollTop * 0.1}px)`;
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images if they exist
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize AOS on resize
        AOS.refresh();
    }, 250);
});

// ============================================
// PAGE LOAD COMPLETE
// ============================================
window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Hide loading indicator if you have one
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ============================================
// PREVENT CONTEXT MENU (Optional - for production)
// ============================================
// Uncomment if you want to disable right-click
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ============================================
// PORTFOLIO TABS FUNCTIONALITY
// ============================================
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add('active');
            
            // Refresh AOS for new content
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Welcome to Dimas ID Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Powered by HTML, CSS, and JavaScript', 'color: #a855f7; font-size: 14px;');
console.log('%c💻 Check out the source code on GitHub!', 'color: #60a5fa; font-size: 14px;');

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ============================================
// EXPORT FUNCTIONS (if using modules)
// ============================================
// export { debounce, throttle, isInViewport, getRandomNumber, formatDate, copyToClipboard };
