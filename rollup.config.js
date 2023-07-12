import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH; // if watch mode is on, set to false (run dev mode)

const config = ["background", "content", "popup", "devtools"].map((name) => ({
  input: `src/${name}.ts`,
  output: {
    sourcemap: !production,
    file: `dist/${name}.js`,
    format: "iife",
  },
  plugins: [
    copy({
      targets: [
        { src: "src/manifest.json", dest: "dist" },
        { src: "src/images", dest: "dist" },
        { src: "src/icons", dest: "dist" },
        { src: "src/html", dest: "dist" },
      ],
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: !production,
      inlineSources: !production,
    }),
  ],
}));

export default config;
