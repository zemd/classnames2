'use strict';

export default [{
  entry: './index.js',
  dest: './es6/common/index.js',
  format: 'cjs',
  external: [],
  interop: false,
}, {
  entry: './dedupe.js',
  dest: './es6/common/dedupe.js',
  format: 'cjs',
  external: [],
  interop: false,
}, {
	entry: './bind.js',
	dest: './es6/common/bind.js',
	format: 'cjs',
	external: [],
	interop: false,
}];
