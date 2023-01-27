import Swiper, { Navigation, Pagination, EffectFade, Autoplay, Manipulation } from "swiper/core";

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, EffectFade, Autoplay, Manipulation]);

export default (ops = {}) => {
  return {
    current: 0,
    
    swiper: null,
    
    init() {
      const el = ops.target ? document.querySelector(ops.target) : this.$el;

      this.config = Object.assign(
        {
          slidesPerView: "auto",
          createElements: true
        },
        ops
      );

      [...el.children].forEach(child => child.classList.add('swiper-slide'));

      this.swiper = new Swiper(el, this.config);

      this.swiper.on('slideChange', () => {
        this.$nextTick(() => {
          this.current = this.swiper.realIndex;
        })
      });
    },

    appendSlides(slides){
      this.swiper.appendSlide(slides)
    },

    goTo(idx) {
      this.swiper.slideTo(idx);
    },
  };
};