'use strict';

import test from 'ava';
import classNames from '../';

test('keeps object keys with truthy values', (t) => {
	t.is(classNames({
		a: true,
		b: false,
		c: 0,
		d: null,
		e: undefined,
		f: 1
	}), 'a f');
});

test('joins arrays of class names and ignore falsy values', (t) => {
	t.is(classNames('a', 0, null, undefined, true, 1, 'b'), 'a 1 b');
});

test('supports heterogenous arguments', (t) => {
	t.is(classNames({ a: true }, 'b', 0), 'a b');
});

test('should be trimmed', (t) => {
	t.is(classNames('', 'b', {}, ''), 'b');
});

test('returns an empty string for an empty configuration', (t) => {
	t.is(classNames({}), '');
});

test('supports an array of class names', (t) => {
	t.is(classNames(['a', 'b']), 'a b');
});

test('joins array arguments with string arguments', (t) => {
	t.is(classNames(['a', 'b'], 'c'), 'a b c');
	t.is(classNames('c', ['a', 'b']), 'c a b');
});

test('handles multiple array arguments', (t) => {
	t.is(classNames(['a', 'b'], ['c', 'd']), 'a b c d');
});

test('handles arrays that include falsy and true values', (t) => {
	t.is(classNames(['a', 0, null, undefined, false, true, 'b']), 'a b');
});

test('handles arrays that include arrays', (t) => {
	t.is(classNames(['a', ['b', 'c']]), 'a b c');
});

test('handles arrays that include objects', (t) => {
	t.is(classNames(['a', { b: true, c: false }]), 'a b');
});

test('handles deep array recursion', (t) => {
	t.is(classNames(['a', ['b', ['c', { d: true }]]]), 'a b c d');
});

test('handles arrays that are empty', (t) => {
	t.is(classNames('a', []), 'a');
});

test('handles nested arrays that have empty nested arrays', (t) => {
	t.is(classNames('a', [[]]), 'a');
});

test('handles all types of truthy and falsy property values as expected', (t) => {
	t.is(classNames({
		// falsy:
		null: null,
		emptyString: "",
		noNumber: NaN,
		zero: 0,
		negativeZero: -0,
		false: false,
		undefined: undefined,

		// truthy (literally anything else):
		nonEmptyString: "foobar",
		whitespace: ' ',
		function: Object.prototype.toString,
		emptyObject: {},
		nonEmptyObject: { a: 1, b: 2 },
		emptyList: [],
		nonEmptyList: [1, 2, 3],
		greaterZero: 1
	}), 'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero');
});
