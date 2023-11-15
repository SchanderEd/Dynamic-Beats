const swiper = new Swiper('.services__swiper', {
  direction: 'horizontal',
  navigation: {
    nextEl: '.services__swiper-next',
    prevEl: '.services__swiper-prev',
  },
  breakpoints: {
    1920: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    320: {
      slidesPerView: 1,
    }
  }
});