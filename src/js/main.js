import Alpine from 'alpinejs';
import reveal from "./components/reveal";

window.Alpine = Alpine;

const components = require.context("./components/", true, /\.js$/i);
components.keys().map((key) => {
  const name = key.split("/").pop().split(".")[0];
  Alpine.data(name, components(key).default);
});

Alpine.start()

window.addEventListener("DOMContentLoaded", () => {
  reveal({
    // defaultClass: "-reveal",
    observerOptions: {
      rootMargin: "0px 0px -25% 0px",
    },
  });
})

