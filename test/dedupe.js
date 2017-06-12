'use strict';

import test from 'ava';
import dedupe from '../dedupe';

test('keeps object keys with truthy values', (t) => {
	t.is(dedupe({
		a: true,
		b: false,
		c: 0,
		d: null,
		e: undefined,
		f: 1
	}), 'a f');
});

test('should dedupe dedupe', (t) => {
	t.is(dedupe('foo', 'bar', 'foo', 'bar', { foo: true }), 'foo bar');
});

test('should make sure subsequent objects can remove/add classes', (t) => {
	t.is(dedupe('foo', { foo: false }, { foo: true, bar: true }), 'foo bar');
});

test('should make sure object with falsy value wipe out previous classes', (t) => {
	t.is(dedupe('foo foo', 0, null, undefined, true, 1, 'b', { 'foo': false }), '1 b');
	t.is(dedupe('foo', 'foobar', 'bar', { foo: false }), 'foobar bar');
	t.is(dedupe('foo', 'foo-bar', 'bar', { foo: false }), 'foo-bar bar');
	t.is(dedupe('foo', '-moz-foo-bar', 'bar', { foo: false }), '-moz-foo-bar bar');
});

test('joins arrays of class names and ignore falsy values', (t) => {
	t.is(dedupe('a', 0, null, undefined, true, 1, 'b'), '1 a b');
});

test('supports heterogenous arguments', (t) => {
	t.is(dedupe({ a: true }, 'b', 0), 'a b');
});

test('should be trimmed', (t) => {
	t.is(dedupe('', 'b', {}, ''), 'b');
});

test('returns an empty string for an empty configuration', (t) => {
	t.is(dedupe({}), '');
});

test('supports an array of class names', (t) => {
	t.is(dedupe(['a', 'b']), 'a b');
});

test('joins array arguments with string arguments', (t) => {
	t.is(dedupe(['a', 'b'], 'c'), 'a b c');
	t.is(dedupe('c', ['a', 'b']), 'c a b');
});

test('handles multiple array arguments', (t) => {
	t.is(dedupe(['a', 'b'], ['c', 'd']), 'a b c d');
});

test('handles arrays that include falsy and true values', (t) => {
	t.is(dedupe(['a', 0, null, undefined, false, true, 'b']), 'a b');
});

test('handles arrays that include arrays', (t) => {
	t.is(dedupe(['a', ['b', 'c']]), 'a b c');
});

test('handles arrays that include objects', (t) => {
	t.is(dedupe(['a', { b: true, c: false }]), 'a b');
});

test('handles deep array recursion', (t) => {
	t.is(dedupe(['a', ['b', ['c', { d: true }]]]), 'a b c d');
});
