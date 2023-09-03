import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index",
  ],
  declaration: true,
  clean: true,
  sourcemap: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
});
