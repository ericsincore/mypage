// movies.js - autoplay-only slideshow with prev/next, keyboard nav, and dots
document.addEventListener('DOMContentLoaded', () => {
  console.log('movies.js loaded');

  const container = document.querySelector('.slideshow-container');
  if (!container) {
    console.warn('Slideshow: .slideshow-container not found');
    return;
  }

  const slides = Array.from(container.querySelectorAll('.slide'));
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');
  const AUTOPLAY_INTERVAL = 5000;

  if (!slides.length) {
    console.warn('Slideshow: no slides found.');
    return;
  }

  // Normalize slides
  slides.forEach((s, i) => {
    s.setAttribute('role', 'group');
    s.setAttribute('aria-roledescription', 'slide');
    s.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
    s.classList.remove('active');
    // rely on CSS for positioning; inline fallback
    s.style.position = s.style.position || 'absolute';
    s.style.inset = s.style.inset || '0';
  });

  // Create dots container immediately after the slideshow container
  let dotsWrapper = document.querySelector('.slideshow-dots');
  if (!dotsWrapper) {
    dotsWrapper = document.createElement('div');
    dotsWrapper.className = 'slideshow-dots';
    container.parentNode.insertBefore(dotsWrapper, container.nextSibling);
  }
  dotsWrapper.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      goTo(i);
      resetAutoplay();
    });
    dotsWrapper.appendChild(dot);
  });

  let index = 0;
  let autoplay = null;

  function show(n) {
    slides.forEach((s, i) => {
      const active = i === n;
      s.classList.toggle('active', active);
      s.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    updateDots(n);
  }

  function updateDots(activeIndex) {
    const dots = Array.from(document.querySelectorAll('.slideshow-dots .dot'));
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
  }

  function next() { index = (index + 1) % slides.length; show(index); }
  function prev() { index = (index - 1 + slides.length) % slides.length; show(index); }
  function goTo(n) { index = ((n % slides.length) + slides.length) % slides.length; show(index); }

  function startAutoplay() {
    stopAutoplay();
    autoplay = setInterval(next, AUTOPLAY_INTERVAL);
  }
  function stopAutoplay() { if (autoplay) { clearInterval(autoplay); autoplay = null; } }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
  });

  // Initialize
  show(index);
  startAutoplay();
});