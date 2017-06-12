'use strict';

const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

export default [{
  entry: './index.js',
  dest: './es5/umd/index.js',
  format: 'umd',
  external: [],
  interop: false,
  moduleName: 'classnames',
  plugins: [
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
    }),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false }]
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ]
}, {
  entry: './dedupe.js',
  dest: './es5/umd/dedupe.js',
  format: 'umd',
  // external: [],
  interop: false,
  moduleName: 'classnames',
  plugins: [
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
    }),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false }]
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ]
}, {
	entry: './bind.js',
	dest: './es5/umd/bind.js',
	format: 'umd',
	// external: [],
	interop: false,
	moduleName: 'classnames',
	plugins: [
		nodeResolve({
			module: true,
			jsnext: true,
			main: true,
		}),
		commonjs(),
		babel({
			presets: [
				['es2015', { modules: false }]
			],
			plugins: [
				'external-helpers'
			]
		})
	]
}];
