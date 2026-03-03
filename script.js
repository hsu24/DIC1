// Update Clock
function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    if (!clockElement || !dateElement) return;

    const now = new Date();

    // Format Time: HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    // Format Date: Day, Month Date, Year
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursor) {
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
        }

        if (follower) {
            follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        }
    });

    // Cursor hover effect
    const links = document.querySelectorAll('a, .btn');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (follower) {
                follower.style.width = '60px';
                follower.style.height = '60px';
                follower.style.backgroundColor = 'rgba(26, 26, 26, 0.1)';
            }
        });
        link.addEventListener('mouseleave', () => {
            if (follower) {
                follower.style.width = '40px';
                follower.style.height = '40px';
                follower.style.backgroundColor = 'transparent';
            }
        });
    });
} else {
    if (cursor) cursor.style.display = 'none';
    if (follower) follower.style.display = 'none';
}

// Initialize
setInterval(updateClock, 1000);
updateClock();

// Mobile Menu Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Scroll Animations (Simple Reveal)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-text, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});
