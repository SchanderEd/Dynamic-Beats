const openBtn = document.querySelector('.nav-open');
const closeBtn = document.querySelector('.nav-close');
const menu = document.querySelector('.header__nav');
const menuLinks = document.querySelectorAll('.header__nav-link');
const page = document.querySelector('.page');
const navList = document.querySelector('.header__nav-list');

if (window.screen.width <= 968) {
  navList.classList.remove('wow');
};

const openMenu = () => {
  menu.classList.add('header__nav--active');
  page.classList.add('page-opacity');
  openBtn.removeEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
};

const closeMenu = () => {
  menu.classList.remove('header__nav--active');

  page.classList.remove('page-opacity');
  openBtn.addEventListener('click', openMenu);
  closeBtn.removeEventListener('click', closeMenu);
};

menuLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

openBtn.addEventListener('click', openMenu);
page.addEventListener('click', closeMenu);