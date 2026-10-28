const slides = [...document.querySelectorAll('.slide')];
const currentLabel = document.querySelector('#current');
const totalLabel = document.querySelector('#total');
const progress = document.querySelector('#progress');
const previous = document.querySelector('#prev');
const next = document.querySelector('#next');
let currentIndex = 0;

totalLabel.textContent = String(slides.length).padStart(2, '0');

function showSlide(index) {
  currentIndex = Math.max(0, Math.min(slides.length - 1, index));
  slides[currentIndex].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  updateControls();

  const demoQr = document.querySelector('#demo-qr');
  const demoUrl = window.location.origin;
  if (!['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) {
    if (typeof QRCode === 'undefined') {
      console.error('Could not generate the demo QR code: QRCode library did not load.');
    } else {
      new QRCode(document.querySelector('#demo-qr-code'), {
        text: demoUrl,
        width: 220,
        height: 220,
        colorDark: '#0b1420',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
      demoQr.hidden = false;
    }
  }
}

function updateControls() {
  currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
  progress.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  previous.disabled = currentIndex === 0;
  next.disabled = currentIndex === slides.length - 1;
}

previous.addEventListener('click', () => showSlide(currentIndex - 1));
next.addEventListener('click', () => showSlide(currentIndex + 1));
document.querySelectorAll('.go-next').forEach(button => button.addEventListener('click', () => showSlide(currentIndex + 1)));
document.querySelector('#restart').addEventListener('click', () => showSlide(0));

const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  currentIndex = slides.indexOf(visible.target);
  updateControls();
}, { threshold: [0.35, 0.6, 0.85] });
slides.forEach(slide => observer.observe(slide));

document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('a, button, input, textarea, select')) return;
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    showSlide(currentIndex + 1);
  } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    showSlide(currentIndex - 1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    showSlide(0);
  } else if (event.key === 'End') {
    event.preventDefault();
    showSlide(slides.length - 1);
  }
});

updateControls();
