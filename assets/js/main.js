/*
    Easy Digital 
    Site v.3.1
    Setembro 2026
*/

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
  skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close';
  }
  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills__open';
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetQuery = tab.dataset.target;
    if (!targetQuery) return;
    const target = document.querySelector(targetQuery);

    if (target) {
      tabContents.forEach(tabContent => {
        tabContent.classList.remove('qualification__active');
      });
      target.classList.add('qualification__active');

      tabs.forEach(t => {
        t.classList.remove('qualification__active');
      });
      tab.classList.add('qualification__active');
    }
  });
});

/*==================== PORTFOLIO SWIPER ====================*/
if (document.querySelector('.portfolio__container')) {
  let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const navLinkEl = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (navLinkEl) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinkEl.classList.add('active-link');
      } else {
        navLinkEl.classList.remove('active-link');
      }
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById('header');
  if (nav) {
    if (window.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
  }
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUpBtn = document.getElementById('scroll-up');
  if (scrollUpBtn) {
    if (window.scrollY >= 560) scrollUpBtn.classList.add('show-scroll');
    else scrollUpBtn.classList.remove('show-scroll');
  }
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => (themeButton && themeButton.classList.contains(iconTheme)) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  if (themeButton && selectedIcon) {
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
  }
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
}

/*==================== MASCARA DE CAMPOS / FORMULÁRIOS ====================*/
$(document).ready(function () {
  if ($('#user_phone').length) {
    $('#user_phone').mask('(00) 0000-0000');
  }
});

/*==================== VALIDAR E-ENVIAR E-MAIL ====================*/
const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const emailForm = document.querySelector('#contact-form');
if (emailForm) {
  const emailInput = document.querySelector('#user_email');
  const contactForm = document.getElementById('contact-form');
  const contactMessage = document.getElementById('contact-message');

  emailForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!emailInput) return;

    const email = emailInput.value;
    const isValid = validateEmail(email);

    if (isValid) {
      emailjs.sendForm('service_4l9jo6q', 'template_fia6p1r', '#contact-form', '5jrs-CXFsaJQYjBvT');

      if (contactMessage) {
        contactMessage.textContent = 'Mensagem enviada com sucesso ✅';
        contactMessage.style.color = "#006400";

        setTimeout(() => {
          contactMessage.textContent = '';
        }, 5000);
      }

      contactForm.reset();
    } else {
      if (contactMessage) {
        contactMessage.textContent = 'Formato de e-mail inválido ❌';
        contactMessage.style.color = "#cd5c5c";

        setTimeout(() => {
          contactMessage.textContent = '';
        }, 5000);
      }
    }
  });
}

/*==================== SCROLL REVEAL ====================*/
if (typeof ScrollReveal !== 'undefined') {
  ScrollReveal({
    distance: '60px',
    duration: 2000,
    delay: 200,
  });

  ScrollReveal().reveal('.home__data', { origin: 'left' });
  ScrollReveal().reveal('.home__img', { origin: 'right' });
  ScrollReveal().reveal('.home__scroll, .section__title, .section__subtitle, .about, .service-box, .suporte, .qualification__container, .skills__content, .form, .project, .local, .portfolio, .footer', { origin: 'top' });
}

/*==================== SCROLL IT ====================*/
$(function () {
  if ($.fn.scrollIt) {
    $.scrollIt();
  }
});