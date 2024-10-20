/*
    Easy Digital 
    Site v.3
    Setembro 2024
*/

/*==================== MENU SHOW Y HIDDEN ====================*/

const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/

const skillsContent = document.getElementsByClassName('skills__content'),
  skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close';
  }
  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills_open';
  };
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/

const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    console.log('click disparado');
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active');
    });
    target.classList.add('qualification__active');

    tabs.forEach(tab => {
      tab.classList.remove('qualification__active');
    });
    tab.classList.add('qualification__active');
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/

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

  /* mousewheel: true,
  keyboard: true, */
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/

function scrollHeader() {
  const nav = document.getElementById('header');
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/

function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
};

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/*======================================= Mascara de campos =======================================*/
/*======================================= Formulários =======================================*/

$(document).ready(function () {
  $('#user_phone').mask('(00) 0000-0000');
});

/*======================================= Função Validar E-Mail =======================================*/
/*======================================= Regex Validar E-Mail =======================================*/

const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

/*======================================= /Validar e-mail =======================================*/
/*======================================= Validar e Enviar do e-mail =======================================*/

const emailInput = document.querySelector('#user_email');
const resultMessage = document.querySelector('#contact-message');
const emailForm = document.querySelector('#contact-form');
const contactForm = document.getElementById('contact-form'),
  contactMessage = document.getElementById('contact-message');

emailForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value;

  const isValid = validateEmail(email);

  if (isValid) {

    emailjs.sendForm('service_4l9jo6q', 'template_fia6p1r', '#contact-form', '5jrs-CXFsaJQYjBvT');

    //mostrar mensagem para usuário
    contactMessage.textContent = 'Mensagem enviada com sucesso ✅';
    contactMessage.style.color = "#006400";

    //remover mensagem após 5 segundos
    setTimeout(() => {
      contactMessage.textContent = '';
    }, 5000);

    //limpar formulário
    contactForm.reset();

  } else {

    contactMessage.textContent = 'Formato de e-mail invalido ❌';
    contactMessage.style.color = "#cd5c5c";

    setTimeout(() => {

      contactMessage.textContent = '';
    }, 5000);
  }
});

/*======================================= End / Validar e-mail =======================================*/
/*======================================= Scroll Reveal =======================================*/

ScrollReveal({
  distance: '60px',
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal('.home__data', { origin: 'left' });
ScrollReveal().reveal('.home__img', { origin: 'right' });
ScrollReveal().reveal('.home__scroll, .section__title, .section__subtitle, .about, .service-box, .suporte, .qualification__container, .skills__content, .form, .project, .local, .portfolio, .footer', { origin: 'top' });

/*======================================= Animação - Efeito digitação =======================================*/
/*======================================= Banner - Seja bem vindo =======================================*/

$(function () {

  $.scrollIt();

});
