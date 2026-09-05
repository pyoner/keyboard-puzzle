import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "apps/game/**": "vp run check-game",
  },
  run: {
    tasks: {
      "check-game": {
        command: ["vp exec --filter game -- oxfmt", "vp lint"],
        cwd: "apps/game",
      },
    },
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
