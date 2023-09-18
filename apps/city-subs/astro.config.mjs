import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

export default defineConfig({
  outDir: "../../dist/apps/city-subs",
  integrations: [
    tailwind({
      config: "../city-subs/tailwind.config.js",
    }),
    preact(),
  ],
});
