/*!
 Copyright (c) 2017 Jed Watson, Dmitry Zelenetskiy
 Licensed under the MIT License (MIT), see
 http://jedwatson.github.io/classnames
 */


const hasOwn = {}.hasOwnProperty;

function classNames() {
	const classes = [];

	for (let i = 0; i < arguments.length; i++) {
		const arg = arguments[i];
		if (!arg) continue;

		const argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(this && this[arg] || arg);
		} else if (Array.isArray(arg)) {
			classes.push(classNames.apply(this, arg));
		} else if (argType === 'object') {
			for (let key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes.push(this && this[key] || key);
				}
			}
		}
	}

	return classes.join(' ');
}

export default classNames;
