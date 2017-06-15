'use strict';

const fixtures = require('./fixtures');
const local = require('../es6/common/index');
const dedupe = require('../es6/common/dedupe');
const localPackage = require('../package.json');

function log (message) {
	console.log(message);
}

try {
	const npm = require('classnames2');
	const npmDedupe = require('classnames2/es6/common/dedupe');
	const npmPackage = require('./node_modules/classnames2/package.json');
} catch (e) {
	log('There was an error loading the benchmark classnames package.\n' +
		'Please make sure you have run `npm install` in ./benchmarks\n');
	process.exit(0);
}

if (localPackage.version !== npmPackage.version) {
	log('Your local version (' + localPackage.version + ') does not match the installed version (' + npmPackage.version + ')\n\n' +
		'Please run `npm update` in ./benchmarks to ensure you are benchmarking\n' +
		'the latest version of this package.\n');
	process.exit(0);
}

const runChecks = require('./runChecks');
const runSuite = require('./runSuite');

fixtures.forEach(function (f) {
	runChecks(local, npm, dedupe, npmDedupe, f);
	runSuite(local, npm, dedupe, npmDedupe, f, log);
});
