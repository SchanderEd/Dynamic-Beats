const btns = document.querySelectorAll('.about-us__accr-btn');
const content = document.querySelectorAll('.about-us__content-wrapper');

btns.forEach((el) => {
  el.addEventListener('click', () => {
    let content = el.nextElementSibling;

    if (content.style.maxHeight) {
      el.classList.toggle('about-us__accr-btn--active');
      content.style.maxHeight = null
    } else {
      el.classList.toggle('about-us__accr-btn--active');
      content.style.maxHeight = content.scrollHeight + 'px';
    };
  });
});