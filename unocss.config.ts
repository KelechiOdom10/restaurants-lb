// uno.config.ts
import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { presetExtra } from "unocss-preset-extra";

export default defineConfig({
  theme: {
    maxWidth: {
      xs: "480px",
      "8xl": "1440px",
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetExtra(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
