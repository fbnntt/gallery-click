const setupObserver = (elements) => {
  const observer =
    window.revealObs ||
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            loadEl(el);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: window.innerWidth <= 736 ? "0px" : "-100px" }
    );

  elements.forEach((el) => observer.observe(el) );

  const unobserveAll = event => 
  {
    elements.forEach((el) => observer.unobserve(el) );
    document.body.removeEventListener('page:leave-transition-end', unobserveAll);
  }

  document.body.addEventListener('page:leave-transition-end', unobserveAll ) 
};


const loadEl = (el) => {
  el.classList.add("s--revealed");
  el.dispatchEvent(new CustomEvent("revealed"));

  if (el.dataset.reveal.length) {
    [...document.querySelectorAll(el.dataset.reveal)].forEach((t) => {
      t.dispatchEvent(new CustomEvent("revealed"));
    });
  }
};

const init = () => {
  // console.log('reveal init');
  const elements = [...document.querySelectorAll("[data-reveal]")];

  if ("IntersectionObserver" in window) {
    setupObserver(elements);
  } else {
    elements.forEach((el) => {
      loadEl(el);
    });
  }
};

document.body.addEventListener( 'page:afterEnter', init );

export default init;
