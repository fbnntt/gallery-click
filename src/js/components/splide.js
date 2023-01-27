import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export default function splide(opts = {}) {
  return {
    options: {
      splide: {},
      aFocus: false,
      watchArrowVisibility: false,
      ...opts
    },
    splide: null,
    index: 0,
    active: true,

    init() {
      const el = opts.el || this.$el;

      // initialise splide
      this.splide = new Splide(el, this.options.splide);

      // add listeners
      this.splide.on('updated', this.checkActive)
      this.splide.on('move', (index) => {
        this.index = index
      })
      this.splide.on('drag', () => {
        this.splide.root.classList.add('is-dragging')
      })
      this.splide.on('dragged', () => {
        this.splide.root.classList.remove('is-dragging')
      })

      // mount and update active
      let extensions = { AutoScroll };

      if(window.innerWidth < 768) {
        // extensions = { };
      }

      this.splide.mount(extensions)
      this.checkActive()

      // safari is stupid and sometimes layout breaks so this should hopefully trigger a re-layout that fixes it
      // have to store the offsetHeight somewhere to ensure layout and stop webpack removing it
      el.style.display='none'
      setTimeout(() => el.style.display='', 100)
    },

    checkActive() {
      if (!this.splide) return
      this.active = !this.splide.is(Splide.STATES.DESTROYED)
    },

    checkArrowVisibility(el) {
      const arrows = el.querySelector('.splide__arrows')
      if (!arrows) return false

      const hiddenSlides = el.querySelectorAll('.splide__slide:not(.splide__slide--clone):not(.is-visible)')
      // if there are any hidden slides
      if (hiddenSlides.length) {
        arrows.style.display = ''
      } else {
        arrows.style.display = 'none'
      }
    }
  }
}