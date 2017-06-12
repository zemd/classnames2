'use strict';

import babel from 'rollup-plugin-babel';

export default [{
  entry: './index.js',
  dest: './es5/common/index.js',
  format: 'cjs',
  external: [],
  interop: false,
  plugins: [
    babel({
      presets: [
        ['es2015', { modules: false }]
      ]
    })
  ]
}, {
  entry: './dedupe.js',
  dest: './es5/common/dedupe.js',
  format: 'cjs',
  // external: [],
  interop: false,
  plugins: [
    babel({
      presets: [
        ['es2015', { modules: false }]
      ]
    })
  ]
}, {
	entry: './bind.js',
	dest: './es5/common/bind.js',
	format: 'cjs',
	// external: [],
	interop: false,
	plugins: [
		babel({
			presets: [
				['es2015', { modules: false }]
			]
		})
	]
}];
