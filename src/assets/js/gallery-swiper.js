const swiper = new Swiper('.gallery__swiper', {
  direction: 'horizontal',
  loop: false,
  spaceBetween: 10,
  slidesPerView: 1,

  navigation: {
    nextEl: '.gallery__swiper-next',
    prevEl: '.gallery__swiper-prev',
  }
});