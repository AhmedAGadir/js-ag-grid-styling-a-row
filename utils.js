import "@simonwep/pickr/dist/themes/classic.min.css";
import Pickr from "@simonwep/pickr";

export const createPicker = (el, swatches, defaultColor) => {
  const pickr = Pickr.create({
    el,
    theme: "classic",
    swatches,
    components: {
      interaction: {
        save: true
      }
    },
    default: defaultColor
  });

  return pickr;
};
