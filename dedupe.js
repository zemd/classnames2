/*!
 Copyright (c) 2017 Jed Watson, Dmitry Zelenetskiy
 Licensed under the MIT License (MIT), see
 http://jedwatson.github.io/classnames
 */

'use strict';

const hasOwn = {}.hasOwnProperty;

// don't inherit from Object so we can skip hasOwnProperty check later
// http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
function StorageObject() {
}

StorageObject.prototype = Object.create(null);

function _parseArray(resultSet, array) {
	const length = array.length;

	for (let i = 0; i < length; ++i) {
		_parse(resultSet, array[i]);
	}
}

function _parseNumber(resultSet, num) {
	resultSet[num] = true;
}

function _parseObject(resultSet, object) {
	for (let k in object) {
		if (hasOwn.call(object, k)) {
			// set value to false instead of deleting it to avoid changing object structure
			// https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
			resultSet[k] = !!object[k];
		}
	}
}

const SPACE = /\s+/;

function _parseString(resultSet, str) {
	const array = str.split(SPACE);
	const length = array.length;

	for (let i = 0; i < length; ++i) {
		resultSet[array[i]] = true;
	}
}

function _parse(resultSet, arg) {
	if (!arg) return;
	const argType = typeof arg;

	// 'foo bar'
	if (argType === 'string') {
		_parseString(resultSet, arg);

		// ['foo', 'bar', ...]
	} else if (Array.isArray(arg)) {
		_parseArray(resultSet, arg);

		// { 'foo': true, ... }
	} else if (argType === 'object') {
		_parseObject(resultSet, arg);

		// '130'
	} else if (argType === 'number') {
		_parseNumber(resultSet, arg);
	}
}

function classNames(...rest) {
	const classSet = new StorageObject();
	_parseArray(classSet, rest);

	const list = [];

	for (let k in classSet) {
		if (classSet[k]) {
			list.push(k)
		}
	}

	return list.join(' ');
}


export default classNames;
