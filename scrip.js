// Menú móvil
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Contadores animados con Intersection Observer
const counters = document.querySelectorAll('.counter');

const animateNumber = (counter) => {
  const target = parseInt(counter.getAttribute('data-target'));
  let current = 0;
  const increment = target / 60;
  const updateCounter = () => {
    if (current < target) {
      current += increment;
      if (counter.getAttribute('data-target') === "150") {
        counter.innerText = Math.floor(current) + "M";
      } else {
        counter.innerText = Math.floor(current).toLocaleString();
      }
      requestAnimationFrame(updateCounter);
    } else {
      if (counter.getAttribute('data-target') === "150") {
        counter.innerText = "150M";
      } else {
        counter.innerText = target.toLocaleString();
      }
    }
  };
  updateCounter();
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumber(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// Formulario demo
const form = document.getElementById('leadForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('🎉 ¡Gracias por solicitar tu demo! En breve nuestro equipo se pondrá en contacto para activar tu prueba gratuita.');
    form.reset();
  });
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElem = document.querySelector(targetId);
    if (targetElem) {
      e.preventDefault();
      targetElem.scrollIntoView({ behavior: 'smooth' });
      if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
    }
  });
});

// Animación de entrada suave para elementos al hacer scroll (opcional)
const fadeElements = document.querySelectorAll('.feature-card, .phil-item, .testi-card, .inc-card, .plan');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});