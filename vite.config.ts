import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "apps/game/**": "vp exec --filter game -- oxfmt",
    "apps/game/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,svelte,vue,astro}": "vp lint",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
