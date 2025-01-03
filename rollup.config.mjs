import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from "@rollup/plugin-json";
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: "dist/index.cjs.js",
            format: "cjs",
            sourcemap: true,
        },
        {
          file: 'dist/index.esm.js',
          format: 'esm',
          sourcemap: true,
        },
    ],
    external: ["react", "react-dom"],
    plugins: [
        resolve(),
        commonjs(),
        json(),
        typescript({
            tsconfig: "./tsconfig.json"
        }),
        terser()
    ]
}