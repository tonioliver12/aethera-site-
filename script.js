// Aethera Cheesecake - Interactive Script
// Handles animations, smooth scrolling, and form behavior

// --- Smooth Scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// --- Floating Halo Animation on Scroll ---
const halo = document.querySelector('.halo');
window.addEventListener('scroll', () => {
  if (!halo) return;
  const scrollPos = window.scrollY;
  halo.style.transform = `translateY(${scrollPos * 0.2}px)`;
  halo.style.opacity = 1 - scrollPos / 800;
});

// --- Form Submission ---
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('input[placeholder="Your name"]').value;
    alert(`Thank you, ${name || 'friend'}! We’ll get back to you soon.`);
    form.reset();
  });
}

// --- Favicon Halo Spin (canvas-based static version for browsers) ---
function createFavicon() {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Draw gradient halo
  const gradient = ctx.createRadialGradient(size/2, size/2, 10, size/2, size/2, 30);
  gradient.addColorStop(0, '#fff7e6');
  gradient.addColorStop(1, '#bfa26a');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size/2, size/2, 30, 0, 2 * Math.PI);
  ctx.fill();

  // Draw small cloud icon
  ctx.font = '32px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('☁️', size/2, size/2);

  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = canvas.toDataURL('image/png');
  document.head.appendChild(link);
}
createFavicon();

// --- Reveal Elements on Scroll ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .section-title').forEach(el => {
  observer.observe(el);
});