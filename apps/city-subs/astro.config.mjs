import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

export default defineConfig({
  outDir: "../../dist/apps/city-subs",
  integrations: [
    UnoCSS({
      injectReset: true, // or a path to the reset file
    }),
  ],
});
