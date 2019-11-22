import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
	input: "./src/index.ts",
	output: {
		dir: "./dist",
		banner: `#!/bin/sh\n':' //# comment; exec /usr/bin/env node "$0" "$@"`,
		format: "cjs"
	},
	plugins: [
		resolve(),
		commonjs({
			include: /node_modules/
		}),
		typescript({
			verbosity: 2
		})
	],
	external: [
		...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })
	],
	context: "window"
};
