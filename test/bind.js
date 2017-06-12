'use strict';

import test from 'ava';
import classNames from '../bind';

const cssModulesMock = {
	a: "#a",
	b: "#b",
	c: "#c",
	d: "#d",
	e: "#e",
	f: "#f"
};

const classNamesBound = classNames.bind(cssModulesMock);

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

test('keeps object keys with truthy values', (t) => {
	t.is(classNamesBound({
		a: true,
		b: false,
		c: 0,
		d: null,
		e: undefined,
		f: 1
	}), '#a #f');
});
test('keeps class names undefined in bound hash', (t) => {
	t.is(classNamesBound({
		a: true,
		b: false,
		c: 0,
		d: null,
		e: undefined,
		f: 1,
		x: true,
		y: null,
		z: 1
	}), '#a #f x z');
})
test('joins arrays of class names and ignore falsy values', (t) => {
	t.is(classNamesBound('a', 0, null, undefined, true, 1, 'b'), '#a 1 #b');
});

test('supports heterogenous arguments', (t) => {
	t.is(classNamesBound({ a: true }, 'b', 0), '#a #b');
});

test('should be trimmed', (t) => {
	t.is(classNamesBound('', 'b', {}, ''), '#b');
});

test('returns an empty string for an empty configuration', (t) => {
	t.is(classNamesBound({}), '');
});

test('supports an array of class names', (t) => {
	t.is(classNamesBound(['a', 'b']), '#a #b');
});

test('joins array arguments with string arguments', (t) => {
	t.is(classNamesBound(['a', 'b'], 'c'), '#a #b #c');
	t.is(classNamesBound('c', ['a', 'b']), '#c #a #b');
});

test('handles multiple array arguments', (t) => {
	t.is(classNamesBound(['a', 'b'], ['c', 'd']), '#a #b #c #d');
});

test('handles arrays that include falsy and true values', (t) => {
	t.is(classNamesBound(['a', 0, null, undefined, false, true, 'b']), '#a #b');
});

test('handles arrays that include arrays', (t) => {
	t.is(classNamesBound(['a', ['b', 'c']]), '#a #b #c');
});

test('handles arrays that include objects', (t) => {
	t.is(classNamesBound(['a', { b: true, c: false }]), '#a #b');
});

test('handles deep array recursion', (t) => {
	t.is(classNamesBound(['a', ['b', ['c', { d: true }]]]), '#a #b #c #d');
});

