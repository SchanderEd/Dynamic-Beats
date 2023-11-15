const swiper = new Swiper('.testimonials__swiper', {
  direction: 'horizontal',

  navigation: {
    nextEl: '.testimonials__swiper-next',
    prevEl: '.testimonials__swiper-prev',
  },

  breakpoints: {
    1920: {
      slidesPerView: 2,
      spaceBetween: 60,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    640: {
      slidesPerView: 1.3,
      spaceBetween: 24,
    }
  },
});