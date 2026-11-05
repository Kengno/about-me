const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((el) => observer.observe(el));
} else revealItems.forEach((el) => el.classList.add('visible'));

const progress = document.getElementById('progress');
let scheduled = false;
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
updateProgress();

const words = ['make things.', 'stay curious.', 'try new stuff.', 'keep learning.'];
const wordElement = document.getElementById('rotating-word');
let wordIndex = 0;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    wordElement.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-8px)' }], { duration: 220, fill: 'forwards' }).onfinish = () => {
      wordIndex = (wordIndex + 1) % words.length;
      wordElement.textContent = words[wordIndex];
      wordElement.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, fill: 'forwards' });
    };
  }, 2900);
}


// Baby Shark player: reveal the official YouTube embed on demand.
const musicToggle = document.getElementById('music-toggle');
const musicPanel = document.getElementById('music-panel');
const musicClose = document.getElementById('music-close');
const musicIcon = document.getElementById('music-play-icon');
function setMusicPanel(open) {
  musicPanel.hidden = !open;
  musicToggle.setAttribute('aria-expanded', String(open));
  musicIcon.textContent = open ? '♫' : '▶';
}
musicToggle.addEventListener('click', () => setMusicPanel(musicPanel.hidden));
musicClose.addEventListener('click', () => setMusicPanel(false));
