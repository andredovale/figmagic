import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";

import pkg from "./package.json";

export default {
	input: "./src/index.ts",
	output: {
		dir: "./dist",
		banner: `#! /usr/bin/env node`,
		format: "cjs"
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript({
			verbosity: 2
		}),
		json()
	],
	external: ["fs", ...Object.keys({ ...pkg.dependencies })]
};
