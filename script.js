// Initialize AOS for scroll animations
AOS.init({
  duration: 800,
  once: true
});

// CUSTOM DYNAMIC TEXT ANIMATION
// Animation that types letter by letter, holds, then erases one letter from the end at a time
document.addEventListener('DOMContentLoaded', function() {
  const phrases = ["Web Developer", "UI/UX Designer", "Tech Enthusiast"];
  const textEl = document.querySelector('#typed-text .text');
  const cursorEl = document.querySelector('#typed-text .cursor');
  let currentPhraseIndex = 0;

  // Ensure the container is positioned relative for absolute cursor positioning
  const typedContainer = document.getElementById('typed-text');
  typedContainer.style.position = 'relative';

  // Update cursor position based on the current text width
  function updateCursor() {
    const width = textEl.getBoundingClientRect().width;
    cursorEl.style.left = width + 'px';
  }

  // Utility delay function
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Animate text: type, hold, then erase from end
  async function animateText() {
    while (true) {
      const phrase = phrases[currentPhraseIndex];
      let displayedText = "";
      
      // Typing phase
      for (let i = 0; i < phrase.length; i++) {
        displayedText += phrase[i];
        textEl.textContent = displayedText;
        updateCursor();
        await delay(150);
      }
      
      // Hold the full phrase
      await delay(2000);
      
      // Erase phase: remove one letter from the end at a time
      while (displayedText.length > 0) {
        displayedText = displayedText.slice(0, -1);
        textEl.textContent = displayedText;
        updateCursor();
        await delay(100);
      }
      
      // Move to the next phrase
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      await delay(500);
    }
  }

  animateText();
});

// Hero Photo Slider Logic with z-index and opacity management
document.addEventListener('DOMContentLoaded', function() {
  const sliderImages = document.querySelectorAll('.slider-image');
  let currentSlide = 0;
  const totalSlides = sliderImages.length;

  // Initialize slider: first image on top, others hidden
  sliderImages.forEach((img, index) => {
    img.style.position = 'absolute';
    img.style.opacity = index === 0 ? '1' : '0';
    img.style.zIndex = index === 0 ? '1' : '0';
  });

  // Slide transition every 2.5 seconds
  setInterval(() => {
    sliderImages[currentSlide].style.opacity = '0';
    sliderImages[currentSlide].style.zIndex = '0';

    currentSlide = (currentSlide + 1) % totalSlides;

    sliderImages[currentSlide].style.opacity = '1';
    sliderImages[currentSlide].style.zIndex = '1';
  }, 2500);
});

// Smooth Scrolling for internal anchors and navigation links
document.querySelectorAll('.nav-links a, .contact-btn, .back-btn').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Section Arrow Scroll Function: Scrolls to next section
function scrollToNext(element) {
  const currentSection = element.parentElement;
  let nextSection = currentSection.nextElementSibling;
  while (nextSection && !nextSection.classList.contains('section')) {
    nextSection = nextSection.nextElementSibling;
  }
  if (nextSection) {
    window.scrollTo({
      top: nextSection.offsetTop - 70,
      behavior: 'smooth'
    });
  }
}

// Fallback Section Animation on Scroll (if AOS fails)
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// Simulated Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent successfully!');
    this.reset();
  });
}
