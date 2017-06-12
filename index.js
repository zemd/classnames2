/*!
 Copyright (c) 2017 Jed Watson, Dmitry Zelenetskiy
 Licensed under the MIT License (MIT), see
 http://jedwatson.github.io/classnames
 */
'use strict';

const hasOwn = {}.hasOwnProperty;

function classNames(...rest) {
	const classes = [];

	for (let i = 0; i < rest.length; i++) {
		const arg = rest[i];
		if (!arg) {
			continue;
		}

		const argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (Array.isArray(arg) && arg.length) {
			const inner = classNames.apply(null, arg);
			if (inner) {
				classes.push(inner);
			}
		} else if (argType === 'object') {
			for (let key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');
}

export default classNames;
