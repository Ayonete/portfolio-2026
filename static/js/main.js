// Dark Mode Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle?.querySelector('i');

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);

    // Update icon based on current theme
    if (icon) {
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const theme = htmlElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update icon
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }
}

// ========================================
// Certification Carousel
// ========================================
let certCarouselIndex = 0;
let certCarouselInterval = null;
let certCarouselPaused = false;

function initCertCarousel() {
    const carousel = document.getElementById('certCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.cert-track');
    const cards = carousel.querySelectorAll('.cert-card');
    const dotsContainer = document.getElementById('certDots');

    if (!track || cards.length === 0) return;

    // Create dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'cert-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToCertSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Reset to first slide
    certCarouselIndex = 0;
    updateCertCarousel();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        certCarouselPaused = true;
    });

    carousel.addEventListener('mouseleave', () => {
        certCarouselPaused = false;
    });
}

function updateCertCarousel() {
    const carousel = document.getElementById('certCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.cert-track');
    const dots = carousel.querySelectorAll('.cert-dot');

    if (!track) return;

    track.style.transform = `translateX(-${certCarouselIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === certCarouselIndex);
    });
}

function goToCertSlide(index) {
    const carousel = document.getElementById('certCarousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.cert-card');
    certCarouselIndex = index;
    if (certCarouselIndex >= cards.length) certCarouselIndex = 0;
    if (certCarouselIndex < 0) certCarouselIndex = cards.length - 1;
    updateCertCarousel();
}

function moveCertCarousel(direction) {
    const carousel = document.getElementById('certCarousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.cert-card');
    certCarouselIndex += direction;
    if (certCarouselIndex >= cards.length) certCarouselIndex = 0;
    if (certCarouselIndex < 0) certCarouselIndex = cards.length - 1;
    updateCertCarousel();
}

function startCertAutoAdvance() {
    stopCertAutoAdvance();
    certCarouselInterval = setInterval(() => {
        if (!certCarouselPaused) {
            moveCertCarousel(1);
        }
    }, 3000);
}

function stopCertAutoAdvance() {
    if (certCarouselInterval) {
        clearInterval(certCarouselInterval);
        certCarouselInterval = null;
    }
}

// ========================================
// Experience Carousel
// ========================================
let expCarouselPosition = 0;

function initExpCarousel() {
    const track = document.getElementById('expTrack');
    if (!track) return;

    // Reset position
    expCarouselPosition = 0;
    track.style.transform = 'translateX(0)';
}

function moveExpCarousel(direction) {
    const track = document.getElementById('expTrack');
    const wrapper = document.querySelector('.experience-track-wrapper');
    if (!track || !wrapper) return;

    const cards = track.querySelectorAll('.experience-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20; // card width + gap
    const wrapperWidth = wrapper.offsetWidth;
    const trackWidth = track.scrollWidth;
    const maxScroll = trackWidth - wrapperWidth;

    expCarouselPosition += direction * cardWidth;

    // Clamp to bounds
    if (expCarouselPosition < 0) expCarouselPosition = 0;
    if (expCarouselPosition > maxScroll) expCarouselPosition = maxScroll;

    track.style.transform = `translateX(-${expCarouselPosition}px)`;
}

// ========================================
// Resume Modal Functions
// ========================================
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.classList.add('show');
    document.body.classList.add('modal-open');

    // Initialize carousels after modal opens
    setTimeout(() => {
        initCertCarousel();
        startCertAutoAdvance();
        initExpCarousel();
        animateSkillBars();
    }, 100);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach((bar, index) => {
        // Reset to 0 first
        bar.style.width = '0';
        // Then animate to target after a staggered delay
        setTimeout(() => {
            const targetWidth = getComputedStyle(bar).getPropertyValue('--target-width');
            bar.style.width = targetWidth;
        }, 300 + (index * 150));
    });
}

function resetSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');

    // Stop carousel auto-advance
    stopCertAutoAdvance();

    // Reset carousel positions
    certCarouselIndex = 0;
    expCarouselPosition = 0;

    // Reset skill bars for next open
    resetSkillBars();
}

// Set up event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode toggle
    initThemeToggle();

    const modal = document.getElementById('resumeModal');
    const overlay = modal?.querySelector('.modal-overlay');

    if (overlay) {
        overlay.addEventListener('click', closeResumeModal);
    }

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeResumeModal();
        }
    });

    // Hover interaction for highlighted words with multiple graphics
    const highlightWords = document.querySelectorAll('.highlight-word');

    highlightWords.forEach(word => {
        word.addEventListener('mouseenter', function() {
            const graphicType = this.getAttribute('data-graphic');
            // Select all graphics for this word type (e.g., all design-graphic elements)
            const graphics = document.querySelectorAll(`.${graphicType}-graphic`);

            graphics.forEach(graphic => {
                graphic.classList.add('active');
            });
        });

        word.addEventListener('mouseleave', function() {
            const graphicType = this.getAttribute('data-graphic');
            const graphics = document.querySelectorAll(`.${graphicType}-graphic`);

            graphics.forEach(graphic => {
                graphic.classList.remove('active');
            });
        });
    });
});
