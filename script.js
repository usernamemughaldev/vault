// Initialize Lenis for Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP Setup
gsap.registerPlugin(ScrollTrigger);

// --- Hero Animation ---
const heroTimeline = gsap.timeline();

heroTimeline
    .to('.reveal-text', {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
    })
    .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=1');

// Gradient Orbs Floating
gsap.to('.gradient-orb', {
    y: -50,
    x: 30,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 1
});

// --- Marquee Animation ---
gsap.to('.marquee-track', {
    xPercent: -50,
    ease: 'none',
    duration: 20,
    repeat: -1
});

// --- Bundle Section Parallax ---
gsap.utils.toArray('.bundle-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: 1,
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1
    });
});

// --- Pricing Reveal ---
gsap.from('.purchase-btn', {
    scrollTrigger: {
        trigger: '.purchase-btn',
        start: 'top bottom',
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
});

// --- Custom Cursor / Button Magnetic Effect (Subtle) ---
const buttons = document.querySelectorAll('button, a');
buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});