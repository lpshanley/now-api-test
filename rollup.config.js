import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

import copy from 'rollup-plugin-copy'
import del from 'del'

const production = !process.env.ROLLUP_WATCH;

const distDir = `public`
const staticDir = `static`
const functionsDir = `functions`

del.sync(distDir)

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `${distDir}/build/bundle.js`
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write(`${distDir}/build/bundle.css`);
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		copy({
			targets: [
				{ src: `${staticDir}/*`, dest: distDir },
				{ src: `${functionsDir}/*`, dest: `${distDir}/api` }
			]
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload(distDir),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};