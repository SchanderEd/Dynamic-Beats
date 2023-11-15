const whyChooseSlider = new Splide('.why-choose__splide', {
  type: 'loop',
  perPage: 3,
  padding: '13%',
  arrows: false,
  pagination: false,
  autoScroll: {
    speed: 2,
  },
  breakpoints: {
    968: {
      perPage: 2,
      padding: '5%'
    },
    489: {
      perPage: 1,
      padding: '12%'
    }
  },
});

whyChooseSlider.mount(window.splide.Extensions);