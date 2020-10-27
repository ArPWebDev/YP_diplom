export default function sliderSettings() {
  const Flickity = require('flickity');
  const elem = document.querySelector(".commits__slider");
  const flkty = new Flickity(elem, {
    cellAlign: "center",
    wrapAround: true,
    arrowShape: {
      x0: 20,
      x1: 50,
      y1: 30,
      x2: 55,
      y2: 25,
      x3: 30,
    },
    percentPosition: false,
  });
}
