
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _avh4$elm_fifo$Fifo$toList = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_p1._0,
		_elm_lang$core$List$reverse(_p1._1));
};
var _avh4$elm_fifo$Fifo$Fifo = F2(
	function (a, b) {
		return {ctor: 'Fifo', _0: a, _1: b};
	});
var _avh4$elm_fifo$Fifo$empty = A2(
	_avh4$elm_fifo$Fifo$Fifo,
	{ctor: '[]'},
	{ctor: '[]'});
var _avh4$elm_fifo$Fifo$insert = F2(
	function (a, _p2) {
		var _p3 = _p2;
		return A2(
			_avh4$elm_fifo$Fifo$Fifo,
			_p3._0,
			{ctor: '::', _0: a, _1: _p3._1});
	});
var _avh4$elm_fifo$Fifo$remove = function (fifo) {
	remove:
	while (true) {
		var _p4 = fifo;
		if (_p4._0.ctor === '[]') {
			if (_p4._1.ctor === '[]') {
				return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _avh4$elm_fifo$Fifo$empty};
			} else {
				var _v3 = A2(
					_avh4$elm_fifo$Fifo$Fifo,
					_elm_lang$core$List$reverse(_p4._1),
					{ctor: '[]'});
				fifo = _v3;
				continue remove;
			}
		} else {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Maybe$Just(_p4._0._0),
				_1: A2(_avh4$elm_fifo$Fifo$Fifo, _p4._0._1, _p4._1)
			};
		}
	}
};
var _avh4$elm_fifo$Fifo$fromList = function (list) {
	return A2(
		_avh4$elm_fifo$Fifo$Fifo,
		list,
		{ctor: '[]'});
};

var _ccapndave$elm_update_extra$Update_Extra$identity = function (model) {
	return A2(
		_elm_lang$core$Platform_Cmd_ops['!'],
		model,
		{ctor: '[]'});
};
var _ccapndave$elm_update_extra$Update_Extra$mapCmd = F2(
	function (tagger, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: A2(_elm_lang$core$Platform_Cmd$map, tagger, _p1._1)
		};
	});
var _ccapndave$elm_update_extra$Update_Extra$addCmd = F2(
	function (cmd_, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: _p3._0,
			_1: _elm_lang$core$Platform_Cmd$batch(
				{
					ctor: '::',
					_0: _p3._1,
					_1: {
						ctor: '::',
						_0: cmd_,
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _ccapndave$elm_update_extra$Update_Extra$updateModel = F2(
	function (f, _p4) {
		var _p5 = _p4;
		return {
			ctor: '_Tuple2',
			_0: f(_p5._0),
			_1: _p5._1
		};
	});
var _ccapndave$elm_update_extra$Update_Extra$filter = F2(
	function (pred, f) {
		return pred ? f : _elm_lang$core$Basics$identity;
	});
var _ccapndave$elm_update_extra$Update_Extra$andThen = F3(
	function (update, msg, _p6) {
		var _p7 = _p6;
		var _p8 = A2(update, msg, _p7._0);
		var model_ = _p8._0;
		var cmd_ = _p8._1;
		return {
			ctor: '_Tuple2',
			_0: model_,
			_1: _elm_lang$core$Platform_Cmd$batch(
				{
					ctor: '::',
					_0: _p7._1,
					_1: {
						ctor: '::',
						_0: cmd_,
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _ccapndave$elm_update_extra$Update_Extra$sequence = F3(
	function (update, msgs, init) {
		var foldUpdate = _ccapndave$elm_update_extra$Update_Extra$andThen(update);
		return A3(_elm_lang$core$List$foldl, foldUpdate, init, msgs);
	});

var _cuducos$elm_format_number$FormatNumber_Locales$Locale = F3(
	function (a, b, c) {
		return {decimals: a, thousandSeparator: b, decimalSeparator: c};
	});
var _cuducos$elm_format_number$FormatNumber_Locales$frenchLocale = A3(_cuducos$elm_format_number$FormatNumber_Locales$Locale, 3, ' ', ',');
var _cuducos$elm_format_number$FormatNumber_Locales$spanishLocale = A3(_cuducos$elm_format_number$FormatNumber_Locales$Locale, 3, '.', ',');
var _cuducos$elm_format_number$FormatNumber_Locales$usLocale = A3(_cuducos$elm_format_number$FormatNumber_Locales$Locale, 2, ',', '.');

var _myrho$elm_round$Round$funNum = F3(
	function (fun, s, fl) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			1 / 0,
			_elm_lang$core$Result$toMaybe(
				_elm_lang$core$String$toFloat(
					A2(fun, s, fl))));
	});
var _myrho$elm_round$Round$splitComma = function (str) {
	var _p0 = A2(_elm_lang$core$String$split, '.', str);
	if (_p0.ctor === '::') {
		if (_p0._1.ctor === '::') {
			return {ctor: '_Tuple2', _0: _p0._0, _1: _p0._1._0};
		} else {
			return {ctor: '_Tuple2', _0: _p0._0, _1: '0'};
		}
	} else {
		return {ctor: '_Tuple2', _0: '0', _1: '0'};
	}
};
var _myrho$elm_round$Round$toDecimal = function (fl) {
	var _p1 = A2(
		_elm_lang$core$String$split,
		'e',
		_elm_lang$core$Basics$toString(fl));
	if (_p1.ctor === '::') {
		if (_p1._1.ctor === '::') {
			var _p4 = _p1._1._0;
			var _p2 = function () {
				var hasSign = _elm_lang$core$Native_Utils.cmp(fl, 0) < 0;
				var _p3 = _myrho$elm_round$Round$splitComma(_p1._0);
				var b = _p3._0;
				var a = _p3._1;
				return {
					ctor: '_Tuple3',
					_0: hasSign ? '-' : '',
					_1: hasSign ? A2(_elm_lang$core$String$dropLeft, 1, b) : b,
					_2: a
				};
			}();
			var sign = _p2._0;
			var before = _p2._1;
			var after = _p2._2;
			var e = A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				_elm_lang$core$Result$toMaybe(
					_elm_lang$core$String$toInt(
						A2(_elm_lang$core$String$startsWith, '+', _p4) ? A2(_elm_lang$core$String$dropLeft, 1, _p4) : _p4)));
			var newBefore = (_elm_lang$core$Native_Utils.cmp(e, 0) > -1) ? before : ((_elm_lang$core$Native_Utils.cmp(
				_elm_lang$core$Basics$abs(e),
				_elm_lang$core$String$length(before)) < 0) ? A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$String$left,
					_elm_lang$core$String$length(before) - _elm_lang$core$Basics$abs(e),
					before),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'.',
					A2(
						_elm_lang$core$String$right,
						_elm_lang$core$Basics$abs(e),
						before))) : A2(
				_elm_lang$core$Basics_ops['++'],
				'0.',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$String$repeat,
						_elm_lang$core$Basics$abs(e) - _elm_lang$core$String$length(before),
						'0'),
					before)));
			var newAfter = (_elm_lang$core$Native_Utils.cmp(e, 0) < 1) ? after : ((_elm_lang$core$Native_Utils.cmp(
				e,
				_elm_lang$core$String$length(after)) < 0) ? A2(
				_elm_lang$core$Basics_ops['++'],
				A2(_elm_lang$core$String$left, e, after),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'.',
					A2(
						_elm_lang$core$String$right,
						_elm_lang$core$String$length(after) - e,
						after))) : A2(
				_elm_lang$core$Basics_ops['++'],
				after,
				A2(
					_elm_lang$core$String$repeat,
					e - _elm_lang$core$String$length(after),
					'0')));
			return A2(
				_elm_lang$core$Basics_ops['++'],
				sign,
				A2(_elm_lang$core$Basics_ops['++'], newBefore, newAfter));
		} else {
			return _p1._0;
		}
	} else {
		return '';
	}
};
var _myrho$elm_round$Round$truncate = function (n) {
	return (_elm_lang$core$Native_Utils.cmp(n, 0) < 0) ? _elm_lang$core$Basics$ceiling(n) : _elm_lang$core$Basics$floor(n);
};
var _myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if (_elm_lang$core$Native_Utils.eq(s, 0)) {
			return _elm_lang$core$Basics$toString(
				functor(fl));
		} else {
			if (_elm_lang$core$Native_Utils.cmp(s, 0) < 0) {
				return function (r) {
					return (!_elm_lang$core$Native_Utils.eq(r, '0')) ? A2(
						_elm_lang$core$Basics_ops['++'],
						r,
						A2(
							_elm_lang$core$String$repeat,
							_elm_lang$core$Basics$abs(s),
							'0')) : r;
				}(
					A3(
						_myrho$elm_round$Round$roundFun,
						functor,
						0,
						A2(
							F2(
								function (x, y) {
									return x / y;
								}),
							fl,
							A2(
								F2(
									function (x, y) {
										return Math.pow(x, y);
									}),
								10,
								_elm_lang$core$Basics$abs(
									_elm_lang$core$Basics$toFloat(s))))));
			} else {
				var dd = (_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? 2 : 1;
				var n = (_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? -1 : 1;
				var e = Math.pow(10, s);
				var _p5 = _myrho$elm_round$Round$splitComma(
					_myrho$elm_round$Round$toDecimal(fl));
				var before = _p5._0;
				var after = _p5._1;
				var a = A3(
					_elm_lang$core$String$padRight,
					s + 1,
					_elm_lang$core$Native_Utils.chr('0'),
					after);
				var b = A2(_elm_lang$core$String$left, s, a);
				var c = A2(_elm_lang$core$String$dropLeft, s, a);
				var f = functor(
					A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Basics$toFloat(e),
						_elm_lang$core$Result$toMaybe(
							_elm_lang$core$String$toFloat(
								A2(
									_elm_lang$core$Basics_ops['++'],
									(_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? '-' : '',
									A2(
										_elm_lang$core$Basics_ops['++'],
										'1',
										A2(
											_elm_lang$core$Basics_ops['++'],
											b,
											A2(_elm_lang$core$Basics_ops['++'], '.', c))))))));
				var g = A2(
					_elm_lang$core$String$dropLeft,
					dd,
					_elm_lang$core$Basics$toString(f));
				var h = _myrho$elm_round$Round$truncate(fl) + (_elm_lang$core$Native_Utils.eq(f - (e * n), e * n) ? ((_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? -1 : 1) : 0);
				var j = _elm_lang$core$Basics$toString(h);
				var i = (_elm_lang$core$Native_Utils.eq(j, '0') && ((!_elm_lang$core$Native_Utils.eq(f - (e * n), 0)) && ((_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) && (_elm_lang$core$Native_Utils.cmp(fl, -1) > 0)))) ? A2(_elm_lang$core$Basics_ops['++'], '-', j) : j;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					i,
					A2(_elm_lang$core$Basics_ops['++'], '.', g));
			}
		}
	});
var _myrho$elm_round$Round$round = _myrho$elm_round$Round$roundFun(_elm_lang$core$Basics$round);
var _myrho$elm_round$Round$roundNum = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$round);
var _myrho$elm_round$Round$ceiling = _myrho$elm_round$Round$roundFun(_elm_lang$core$Basics$ceiling);
var _myrho$elm_round$Round$ceilingNum = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$ceiling);
var _myrho$elm_round$Round$floor = _myrho$elm_round$Round$roundFun(_elm_lang$core$Basics$floor);
var _myrho$elm_round$Round$floorCom = F2(
	function (s, fl) {
		return (_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? A2(_myrho$elm_round$Round$ceiling, s, fl) : A2(_myrho$elm_round$Round$floor, s, fl);
	});
var _myrho$elm_round$Round$floorNumCom = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$floorCom);
var _myrho$elm_round$Round$ceilingCom = F2(
	function (s, fl) {
		return (_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? A2(_myrho$elm_round$Round$floor, s, fl) : A2(_myrho$elm_round$Round$ceiling, s, fl);
	});
var _myrho$elm_round$Round$ceilingNumCom = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$ceilingCom);
var _myrho$elm_round$Round$floorNum = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$floor);
var _myrho$elm_round$Round$roundCom = _myrho$elm_round$Round$roundFun(
	function (fl) {
		var dec = fl - _elm_lang$core$Basics$toFloat(
			_myrho$elm_round$Round$truncate(fl));
		return (_elm_lang$core$Native_Utils.cmp(dec, 0.5) > -1) ? _elm_lang$core$Basics$ceiling(fl) : ((_elm_lang$core$Native_Utils.cmp(dec, -0.5) < 1) ? _elm_lang$core$Basics$floor(fl) : _elm_lang$core$Basics$round(fl));
	});
var _myrho$elm_round$Round$roundNumCom = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$roundCom);

var _cuducos$elm_format_number$Helpers$stringfy = F2(
	function (locale, formatted) {
		var decimals = function () {
			var _p0 = formatted.decimals;
			if (_p0.ctor === 'Just') {
				return A2(_elm_lang$core$Basics_ops['++'], locale.decimalSeparator, _p0._0);
			} else {
				return '';
			}
		}();
		return _elm_lang$core$String$concat(
			{
				ctor: '::',
				_0: A2(_elm_lang$core$Maybe$withDefault, '', formatted.prefix),
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$String$join, locale.thousandSeparator, formatted.integers),
					_1: {
						ctor: '::',
						_0: decimals,
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _cuducos$elm_format_number$Helpers$splitThousands = function (integers) {
	var reversedSplitThousands = function (value) {
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$String$length(value),
			3) > 0) ? A2(
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			A2(_elm_lang$core$String$right, 3, value),
			reversedSplitThousands(
				A2(_elm_lang$core$String$dropRight, 3, value))) : {
			ctor: '::',
			_0: value,
			_1: {ctor: '[]'}
		};
	};
	return _elm_lang$core$List$reverse(
		reversedSplitThousands(integers));
};
var _cuducos$elm_format_number$Helpers$addPrefix = function (formatted) {
	var onlyZeros = A2(
		_elm_lang$core$String$all,
		function ($char) {
			return _elm_lang$core$Native_Utils.eq(
				$char,
				_elm_lang$core$Native_Utils.chr('0'));
		},
		_elm_lang$core$String$concat(
			A2(
				_elm_lang$core$List$append,
				formatted.integers,
				_elm_lang$core$List$singleton(
					A2(_elm_lang$core$Maybe$withDefault, '', formatted.decimals)))));
	var isPositive = _elm_lang$core$Native_Utils.cmp(formatted.original, 0) > -1;
	var prefix = (isPositive || onlyZeros) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just('−');
	return _elm_lang$core$Native_Utils.update(
		formatted,
		{prefix: prefix});
};
var _cuducos$elm_format_number$Helpers$FormattedNumber = F4(
	function (a, b, c, d) {
		return {original: a, integers: b, decimals: c, prefix: d};
	});
var _cuducos$elm_format_number$Helpers$parse = F2(
	function (decimalDigits, original) {
		var parts = A2(
			_elm_lang$core$String$split,
			'.',
			A2(_myrho$elm_round$Round$round, decimalDigits, original));
		var integers = _cuducos$elm_format_number$Helpers$splitThousands(
			A2(
				_elm_lang$core$String$filter,
				_elm_lang$core$Char$isDigit,
				A2(
					_elm_lang$core$Maybe$withDefault,
					'0',
					_elm_lang$core$List$head(parts))));
		var decimals = _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, 1, parts));
		return _cuducos$elm_format_number$Helpers$addPrefix(
			A4(_cuducos$elm_format_number$Helpers$FormattedNumber, original, integers, decimals, _elm_lang$core$Maybe$Nothing));
	});

var _cuducos$elm_format_number$FormatNumber$format = F2(
	function (locale, num) {
		return A2(
			_cuducos$elm_format_number$Helpers$stringfy,
			locale,
			A2(_cuducos$elm_format_number$Helpers$parse, locale.decimals, num));
	});

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _debois$elm_dom$DOM$className = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'className',
		_1: {ctor: '[]'}
	},
	_elm_lang$core$Json_Decode$string);
var _debois$elm_dom$DOM$scrollTop = A2(_elm_lang$core$Json_Decode$field, 'scrollTop', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$scrollLeft = A2(_elm_lang$core$Json_Decode$field, 'scrollLeft', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetTop = A2(_elm_lang$core$Json_Decode$field, 'offsetTop', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetLeft = A2(_elm_lang$core$Json_Decode$field, 'offsetLeft', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetHeight = A2(_elm_lang$core$Json_Decode$field, 'offsetHeight', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetWidth = A2(_elm_lang$core$Json_Decode$field, 'offsetWidth', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$childNodes = function (decoder) {
	var loop = F2(
		function (idx, xs) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				function (_p0) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Json_Decode$succeed(xs),
						A2(
							_elm_lang$core$Maybe$map,
							function (x) {
								return A2(
									loop,
									idx + 1,
									{ctor: '::', _0: x, _1: xs});
							},
							_p0));
				},
				_elm_lang$core$Json_Decode$maybe(
					A2(
						_elm_lang$core$Json_Decode$field,
						_elm_lang$core$Basics$toString(idx),
						decoder)));
		});
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$List$reverse,
		A2(
			_elm_lang$core$Json_Decode$field,
			'childNodes',
			A2(
				loop,
				0,
				{ctor: '[]'})));
};
var _debois$elm_dom$DOM$childNode = function (idx) {
	return _elm_lang$core$Json_Decode$at(
		{
			ctor: '::',
			_0: 'childNodes',
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Basics$toString(idx),
				_1: {ctor: '[]'}
			}
		});
};
var _debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2(_elm_lang$core$Json_Decode$field, 'parentElement', decoder);
};
var _debois$elm_dom$DOM$previousSibling = function (decoder) {
	return A2(_elm_lang$core$Json_Decode$field, 'previousSibling', decoder);
};
var _debois$elm_dom$DOM$nextSibling = function (decoder) {
	return A2(_elm_lang$core$Json_Decode$field, 'nextSibling', decoder);
};
var _debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return _elm_lang$core$Json_Decode$oneOf(
			{
				ctor: '::',
				_0: A2(
					_elm_lang$core$Json_Decode$field,
					'offsetParent',
					_elm_lang$core$Json_Decode$null(x)),
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$Json_Decode$field, 'offsetParent', decoder),
					_1: {ctor: '[]'}
				}
			});
	});
var _debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (_p1) {
				var _p2 = _p1;
				var _p4 = _p2._1;
				var _p3 = _p2._0;
				return A2(
					_debois$elm_dom$DOM$offsetParent,
					{ctor: '_Tuple2', _0: _p3, _1: _p4},
					A2(_debois$elm_dom$DOM$position, _p3, _p4));
			},
			A5(
				_elm_lang$core$Json_Decode$map4,
				F4(
					function (scrollLeft, scrollTop, offsetLeft, offsetTop) {
						return {ctor: '_Tuple2', _0: (x + offsetLeft) - scrollLeft, _1: (y + offsetTop) - scrollTop};
					}),
				_debois$elm_dom$DOM$scrollLeft,
				_debois$elm_dom$DOM$scrollTop,
				_debois$elm_dom$DOM$offsetLeft,
				_debois$elm_dom$DOM$offsetTop));
	});
var _debois$elm_dom$DOM$boundingClientRect = A4(
	_elm_lang$core$Json_Decode$map3,
	F3(
		function (_p5, width, height) {
			var _p6 = _p5;
			return {top: _p6._1, left: _p6._0, width: width, height: height};
		}),
	A2(_debois$elm_dom$DOM$position, 0, 0),
	_debois$elm_dom$DOM$offsetWidth,
	_debois$elm_dom$DOM$offsetHeight);
var _debois$elm_dom$DOM$target = function (decoder) {
	return A2(_elm_lang$core$Json_Decode$field, 'target', decoder);
};
var _debois$elm_dom$DOM$Rectangle = F4(
	function (a, b, c, d) {
		return {top: a, left: b, width: c, height: d};
	});

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _debois$elm_mdl$Material_Helpers$noAttr = A2(_elm_lang$html$Html_Attributes$attribute, 'data-elm-mdl-noop', '');
var _debois$elm_mdl$Material_Helpers$aria = F2(
	function (name, value) {
		return value ? A2(
			_elm_lang$html$Html_Attributes$attribute,
			A2(_elm_lang$core$Basics_ops['++'], 'aria-', name),
			'true') : _debois$elm_mdl$Material_Helpers$noAttr;
	});
var _debois$elm_mdl$Material_Helpers$delay = F2(
	function (t, x) {
		return A2(
			_elm_lang$core$Task$perform,
			_elm_lang$core$Basics$always(x),
			_elm_lang$core$Process$sleep(t));
	});
var _debois$elm_mdl$Material_Helpers$cssTransitionStep = function (x) {
	return A2(_debois$elm_mdl$Material_Helpers$delay, 50, x);
};
var _debois$elm_mdl$Material_Helpers$cmd = function (msg) {
	return A2(
		_elm_lang$core$Task$perform,
		_elm_lang$core$Basics$always(msg),
		_elm_lang$core$Task$succeed(msg));
};
var _debois$elm_mdl$Material_Helpers$lift = F6(
	function (get, set, fwd, update, action, model) {
		var _p0 = A2(
			update,
			action,
			get(model));
		var submodel_ = _p0._0;
		var e = _p0._1;
		return {
			ctor: '_Tuple2',
			_0: A2(set, model, submodel_),
			_1: A2(_elm_lang$core$Platform_Cmd$map, fwd, e)
		};
	});
var _debois$elm_mdl$Material_Helpers$lift_ = F5(
	function (get, set, update, action, model) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				set,
				model,
				A2(
					update,
					action,
					get(model))),
			_1: _elm_lang$core$Platform_Cmd$none
		};
	});
var _debois$elm_mdl$Material_Helpers$map2nd = F2(
	function (f, _p1) {
		var _p2 = _p1;
		return {
			ctor: '_Tuple2',
			_0: _p2._0,
			_1: f(_p2._1)
		};
	});
var _debois$elm_mdl$Material_Helpers$map1st = F2(
	function (f, _p3) {
		var _p4 = _p3;
		return {
			ctor: '_Tuple2',
			_0: f(_p4._0),
			_1: _p4._1
		};
	});
var _debois$elm_mdl$Material_Helpers$blurOn = function (evt) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		A2(_elm_lang$core$Basics_ops['++'], 'on', evt),
		'this.blur()');
};
var _debois$elm_mdl$Material_Helpers$effect = F2(
	function (e, x) {
		return {ctor: '_Tuple2', _0: x, _1: e};
	});
var _debois$elm_mdl$Material_Helpers$pure = _debois$elm_mdl$Material_Helpers$effect(_elm_lang$core$Platform_Cmd$none);
var _debois$elm_mdl$Material_Helpers$filter = F3(
	function (elem, attr, html) {
		return A2(
			elem,
			attr,
			A2(
				_elm_lang$core$List$filterMap,
				function (x) {
					return x;
				},
				html));
	});

var _debois$elm_mdl$Material_Component$subs = F5(
	function (ctor, get, subscriptions, lift, model) {
		return _elm_lang$core$Platform_Sub$batch(
			A3(
				_elm_lang$core$Dict$foldl,
				F3(
					function (idx, model, ss) {
						return {
							ctor: '::',
							_0: A2(
								_elm_lang$core$Platform_Sub$map,
								function (_p0) {
									return lift(
										A2(ctor, idx, _p0));
								},
								subscriptions(model)),
							_1: ss
						};
					}),
				{ctor: '[]'},
				get(model)));
	});
var _debois$elm_mdl$Material_Component$generalise = F4(
	function (update, lift, msg, model) {
		return A2(
			_debois$elm_mdl$Material_Helpers$map2nd,
			_elm_lang$core$Platform_Cmd$map(lift),
			A2(
				_debois$elm_mdl$Material_Helpers$map1st,
				_elm_lang$core$Maybe$Just,
				A2(update, msg, model)));
	});
var _debois$elm_mdl$Material_Component$react = F8(
	function (get, set, ctor, update, lift, msg, idx, store) {
		return A2(
			_debois$elm_mdl$Material_Helpers$map1st,
			_elm_lang$core$Maybe$map(
				A2(set, idx, store)),
			A3(
				update,
				function (_p1) {
					return lift(
						A2(ctor, idx, _p1));
				},
				msg,
				A2(get, idx, store)));
	});
var _debois$elm_mdl$Material_Component$react1 = F7(
	function (get, set, ctor, update, lift, msg, store) {
		return A2(
			_debois$elm_mdl$Material_Helpers$map1st,
			_elm_lang$core$Maybe$map(
				set(store)),
			A3(
				update,
				function (_p2) {
					return lift(
						ctor(_p2));
				},
				msg,
				get(store)));
	});
var _debois$elm_mdl$Material_Component$render = F6(
	function (get_model, view, ctor, lift, idx, store) {
		return A2(
			view,
			function (_p3) {
				return lift(
					A2(ctor, idx, _p3));
			},
			A2(get_model, idx, store));
	});
var _debois$elm_mdl$Material_Component$render1 = F5(
	function (get_model, view, ctor, lift, store) {
		return A2(
			view,
			function (_p4) {
				return lift(
					ctor(_p4));
			},
			get_model(store));
	});
var _debois$elm_mdl$Material_Component$indexed = F3(
	function (get_model, set_model, model0) {
		var set_ = F3(
			function (idx, store, model) {
				return A2(
					set_model,
					A3(
						_elm_lang$core$Dict$insert,
						idx,
						model,
						get_model(store)),
					store);
			});
		var get_ = F2(
			function (idx, store) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					model0,
					A2(
						_elm_lang$core$Dict$get,
						idx,
						get_model(store)));
			});
		return {ctor: '_Tuple2', _0: get_, _1: set_};
	});
var _debois$elm_mdl$Material_Component$Dispatch = function (a) {
	return {ctor: 'Dispatch', _0: a};
};
var _debois$elm_mdl$Material_Component$TabsMsg = F2(
	function (a, b) {
		return {ctor: 'TabsMsg', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Component$TooltipMsg = F2(
	function (a, b) {
		return {ctor: 'TooltipMsg', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Component$TogglesMsg = F2(
	function (a, b) {
		return {ctor: 'TogglesMsg', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Component$LayoutMsg = function (a) {
	return {ctor: 'LayoutMsg', _0: a};
};
var _debois$elm_mdl$Material_Component$MenuMsg = F2(
	function (a, b) {
		return {ctor: 'MenuMsg', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Component$TextfieldMsg = F2(
	function (a, b) {
		return {ctor: 'TextfieldMsg', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Component$ButtonMsg = F2(
	function (a, b) {
		return {ctor: 'ButtonMsg', _0: a, _1: b};
	});

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _debois$elm_mdl$Material_Dispatch$split = F4(
	function (k0, same, differ, xs) {
		split:
		while (true) {
			var _p0 = xs;
			if (_p0.ctor === '[]') {
				return {ctor: '_Tuple2', _0: same, _1: differ};
			} else {
				var _p1 = _p0._1;
				if (_elm_lang$core$Native_Utils.eq(_p0._0._0, k0)) {
					var _v1 = k0,
						_v2 = {ctor: '::', _0: _p0._0._1, _1: same},
						_v3 = differ,
						_v4 = _p1;
					k0 = _v1;
					same = _v2;
					differ = _v3;
					xs = _v4;
					continue split;
				} else {
					var _v5 = k0,
						_v6 = same,
						_v7 = {ctor: '::', _0: _p0._0, _1: differ},
						_v8 = _p1;
					k0 = _v5;
					same = _v6;
					differ = _v7;
					xs = _v8;
					continue split;
				}
			}
		}
	});
var _debois$elm_mdl$Material_Dispatch$group_ = F2(
	function (acc, items) {
		group_:
		while (true) {
			var _p2 = items;
			if (_p2.ctor === '[]') {
				return acc;
			} else {
				if (_p2._1.ctor === '[]') {
					return {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _p2._0._0,
							_1: {
								ctor: '::',
								_0: _p2._0._1,
								_1: {ctor: '[]'}
							}
						},
						_1: acc
					};
				} else {
					if ((_p2._1._0.ctor === '_Tuple2') && (_p2._1._1.ctor === '[]')) {
						var _p6 = _p2._1._0._1;
						var _p5 = _p2._0._1;
						var _p4 = _p2._1._0._0;
						var _p3 = _p2._0._0;
						return _elm_lang$core$Native_Utils.eq(_p3, _p4) ? {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _p3,
								_1: {
									ctor: '::',
									_0: _p6,
									_1: {
										ctor: '::',
										_0: _p5,
										_1: {ctor: '[]'}
									}
								}
							},
							_1: acc
						} : {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _p4,
								_1: {
									ctor: '::',
									_0: _p6,
									_1: {ctor: '[]'}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _p3,
									_1: {
										ctor: '::',
										_0: _p5,
										_1: {ctor: '[]'}
									}
								},
								_1: acc
							}
						};
					} else {
						var _p8 = _p2._0._0;
						var _p7 = A4(
							_debois$elm_mdl$Material_Dispatch$split,
							_p8,
							{
								ctor: '::',
								_0: _p2._0._1,
								_1: {ctor: '[]'}
							},
							{ctor: '[]'},
							_p2._1);
						var same = _p7._0;
						var different = _p7._1;
						var _v10 = {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _p8, _1: same},
							_1: acc
						},
							_v11 = different;
						acc = _v10;
						items = _v11;
						continue group_;
					}
				}
			}
		}
	});
var _debois$elm_mdl$Material_Dispatch$group = _debois$elm_mdl$Material_Dispatch$group_(
	{ctor: '[]'});
var _debois$elm_mdl$Material_Dispatch$onSingle = function (_p9) {
	var _p10 = _p9;
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		_p10._0,
		A2(_elm_lang$core$Maybe$withDefault, _elm_lang$html$Html_Events$defaultOptions, _p10._1._1),
		_p10._1._0);
};
var _debois$elm_mdl$Material_Dispatch$pickOptions = function (decoders) {
	pickOptions:
	while (true) {
		var _p11 = decoders;
		if (_p11.ctor === '::') {
			if ((_p11._0.ctor === '_Tuple2') && (_p11._0._1.ctor === 'Just')) {
				return _p11._0._1._0;
			} else {
				var _v14 = _p11._1;
				decoders = _v14;
				continue pickOptions;
			}
		} else {
			return _elm_lang$html$Html_Events$defaultOptions;
		}
	}
};
var _debois$elm_mdl$Material_Dispatch$flatten = function (decoders) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		function (value) {
			return A2(
				_elm_lang$core$List$filterMap,
				function (decoder) {
					return _elm_lang$core$Result$toMaybe(
						A2(_elm_lang$core$Json_Decode$decodeValue, decoder, value));
				},
				decoders);
		},
		_elm_lang$core$Json_Decode$value);
};
var _debois$elm_mdl$Material_Dispatch$onWithOptions = F4(
	function (event, lift, options, decoders) {
		return A3(
			_elm_lang$html$Html_Events$onWithOptions,
			event,
			options,
			A2(
				_elm_lang$core$Json_Decode$map,
				lift,
				_debois$elm_mdl$Material_Dispatch$flatten(decoders)));
	});
var _debois$elm_mdl$Material_Dispatch$on = F2(
	function (event, lift) {
		return A3(_debois$elm_mdl$Material_Dispatch$onWithOptions, event, lift, _elm_lang$html$Html_Events$defaultOptions);
	});
var _debois$elm_mdl$Material_Dispatch$onMany = F2(
	function (lift, decoders) {
		var _p12 = decoders;
		if ((_p12._1.ctor === '::') && (_p12._1._1.ctor === '[]')) {
			return _debois$elm_mdl$Material_Dispatch$onSingle(
				{ctor: '_Tuple2', _0: _p12._0, _1: _p12._1._0});
		} else {
			var _p13 = _p12._1;
			return A3(
				_elm_lang$html$Html_Events$onWithOptions,
				_p12._0,
				_debois$elm_mdl$Material_Dispatch$pickOptions(_p13),
				lift(
					_debois$elm_mdl$Material_Dispatch$flatten(
						A2(_elm_lang$core$List$map, _elm_lang$core$Tuple$first, _p13))));
		}
	});
var _debois$elm_mdl$Material_Dispatch$map2nd = F2(
	function (f, _p14) {
		var _p15 = _p14;
		return {
			ctor: '_Tuple2',
			_0: _p15._0,
			_1: f(_p15._1)
		};
	});
var _debois$elm_mdl$Material_Dispatch$update1 = F3(
	function (update, cmd, _p16) {
		var _p17 = _p16;
		return A2(
			_debois$elm_mdl$Material_Dispatch$map2nd,
			A2(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				_p17._1),
			A2(update, cmd, _p17._0));
	});
var _debois$elm_mdl$Material_Dispatch$update = F3(
	function (update, msg, model) {
		return A2(
			_debois$elm_mdl$Material_Dispatch$map2nd,
			_elm_lang$core$Platform_Cmd$batch,
			A3(
				_elm_lang$core$List$foldl,
				_debois$elm_mdl$Material_Dispatch$update1(update),
				{
					ctor: '_Tuple2',
					_0: model,
					_1: {ctor: '[]'}
				},
				msg));
	});
var _debois$elm_mdl$Material_Dispatch$cmd = function (msg) {
	return A2(
		_elm_lang$core$Task$perform,
		_elm_lang$core$Basics$always(msg),
		_elm_lang$core$Task$succeed(msg));
};
var _debois$elm_mdl$Material_Dispatch$forward = function (messages) {
	return _elm_lang$core$Platform_Cmd$batch(
		A2(_elm_lang$core$List$map, _debois$elm_mdl$Material_Dispatch$cmd, messages));
};
var _debois$elm_mdl$Material_Dispatch$toAttributes = function (_p18) {
	var _p19 = _p18;
	var _p21 = _p19._0;
	var _p20 = _p21.lift;
	if (_p20.ctor === 'Just') {
		return A2(
			_elm_lang$core$List$map,
			_debois$elm_mdl$Material_Dispatch$onMany(_p20._0),
			_debois$elm_mdl$Material_Dispatch$group(_p21.decoders));
	} else {
		return A2(_elm_lang$core$List$map, _debois$elm_mdl$Material_Dispatch$onSingle, _p21.decoders);
	}
};
var _debois$elm_mdl$Material_Dispatch$getDecoder = function (_p22) {
	var _p23 = _p22;
	return _p23._0.lift;
};
var _debois$elm_mdl$Material_Dispatch$Config = function (a) {
	return {ctor: 'Config', _0: a};
};
var _debois$elm_mdl$Material_Dispatch$defaultConfig = _debois$elm_mdl$Material_Dispatch$Config(
	{
		decoders: {ctor: '[]'},
		lift: _elm_lang$core$Maybe$Nothing
	});
var _debois$elm_mdl$Material_Dispatch$setDecoder = F2(
	function (f, _p24) {
		var _p25 = _p24;
		return _debois$elm_mdl$Material_Dispatch$Config(
			_elm_lang$core$Native_Utils.update(
				_p25._0,
				{
					lift: _elm_lang$core$Maybe$Just(f)
				}));
	});
var _debois$elm_mdl$Material_Dispatch$setMsg = function (_p26) {
	return _debois$elm_mdl$Material_Dispatch$setDecoder(
		_elm_lang$core$Json_Decode$map(_p26));
};
var _debois$elm_mdl$Material_Dispatch$add = F4(
	function (event, options, decoder, _p27) {
		var _p28 = _p27;
		var _p29 = _p28._0;
		return _debois$elm_mdl$Material_Dispatch$Config(
			_elm_lang$core$Native_Utils.update(
				_p29,
				{
					decoders: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: event,
							_1: {ctor: '_Tuple2', _0: decoder, _1: options}
						},
						_1: _p29.decoders
					}
				}));
	});
var _debois$elm_mdl$Material_Dispatch$clear = function (_p30) {
	var _p31 = _p30;
	return _debois$elm_mdl$Material_Dispatch$Config(
		_elm_lang$core$Native_Utils.update(
			_p31._0,
			{
				decoders: {ctor: '[]'}
			}));
};

var _debois$elm_mdl$Material_Options_Internal$addAttributes = F2(
	function (summary, attrs) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			summary.attrs,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$style(summary.css),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class(
							A2(_elm_lang$core$String$join, ' ', summary.classes)),
						_1: {ctor: '[]'}
					}
				},
				A2(
					_elm_lang$core$Basics_ops['++'],
					attrs,
					A2(
						_elm_lang$core$Basics_ops['++'],
						summary.internal,
						_debois$elm_mdl$Material_Dispatch$toAttributes(summary.dispatch)))));
	});
var _debois$elm_mdl$Material_Options_Internal$collect1_ = F2(
	function (options, acc) {
		var _p0 = options;
		switch (_p0.ctor) {
			case 'Class':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						classes: {ctor: '::', _0: _p0._0, _1: acc.classes}
					});
			case 'CSS':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						css: {ctor: '::', _0: _p0._0, _1: acc.css}
					});
			case 'Attribute':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						attrs: {ctor: '::', _0: _p0._0, _1: acc.attrs}
					});
			case 'Internal':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						internal: {ctor: '::', _0: _p0._0, _1: acc.internal}
					});
			case 'Listener':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						dispatch: A4(_debois$elm_mdl$Material_Dispatch$add, _p0._0, _p0._1, _p0._2, acc.dispatch)
					});
			case 'Many':
				return A3(_elm_lang$core$List$foldl, _debois$elm_mdl$Material_Options_Internal$collect1_, acc, _p0._0);
			case 'Lift':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						dispatch: A2(_debois$elm_mdl$Material_Dispatch$setDecoder, _p0._0, acc.dispatch)
					});
			case 'Set':
				return acc;
			default:
				return acc;
		}
	});
var _debois$elm_mdl$Material_Options_Internal$collect1 = F2(
	function (option, acc) {
		var _p1 = option;
		switch (_p1.ctor) {
			case 'Class':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						classes: {ctor: '::', _0: _p1._0, _1: acc.classes}
					});
			case 'CSS':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						css: {ctor: '::', _0: _p1._0, _1: acc.css}
					});
			case 'Attribute':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						attrs: {ctor: '::', _0: _p1._0, _1: acc.attrs}
					});
			case 'Internal':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						internal: {ctor: '::', _0: _p1._0, _1: acc.internal}
					});
			case 'Many':
				return A3(_elm_lang$core$List$foldl, _debois$elm_mdl$Material_Options_Internal$collect1, acc, _p1._0);
			case 'Set':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						config: _p1._0(acc.config)
					});
			case 'Listener':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						dispatch: A4(_debois$elm_mdl$Material_Dispatch$add, _p1._0, _p1._1, _p1._2, acc.dispatch)
					});
			case 'Lift':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						dispatch: A2(_debois$elm_mdl$Material_Dispatch$setDecoder, _p1._0, acc.dispatch)
					});
			default:
				return acc;
		}
	});
var _debois$elm_mdl$Material_Options_Internal$recollect = _elm_lang$core$List$foldl(_debois$elm_mdl$Material_Options_Internal$collect1);
var _debois$elm_mdl$Material_Options_Internal$apply = F4(
	function (summary, ctor, options, attrs) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options_Internal$addAttributes,
				A2(_debois$elm_mdl$Material_Options_Internal$recollect, summary, options),
				attrs));
	});
var _debois$elm_mdl$Material_Options_Internal$Summary = F6(
	function (a, b, c, d, e, f) {
		return {classes: a, css: b, attrs: c, internal: d, dispatch: e, config: f};
	});
var _debois$elm_mdl$Material_Options_Internal$collect = function (_p2) {
	return _debois$elm_mdl$Material_Options_Internal$recollect(
		A6(
			_debois$elm_mdl$Material_Options_Internal$Summary,
			{ctor: '[]'},
			{ctor: '[]'},
			{ctor: '[]'},
			{ctor: '[]'},
			_debois$elm_mdl$Material_Dispatch$defaultConfig,
			_p2));
};
var _debois$elm_mdl$Material_Options_Internal$collect_ = A2(
	_elm_lang$core$List$foldl,
	_debois$elm_mdl$Material_Options_Internal$collect1_,
	A6(
		_debois$elm_mdl$Material_Options_Internal$Summary,
		{ctor: '[]'},
		{ctor: '[]'},
		{ctor: '[]'},
		{ctor: '[]'},
		_debois$elm_mdl$Material_Dispatch$defaultConfig,
		{ctor: '_Tuple0'}));
var _debois$elm_mdl$Material_Options_Internal$None = {ctor: 'None'};
var _debois$elm_mdl$Material_Options_Internal$Lift = function (a) {
	return {ctor: 'Lift', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$dispatch = function (lift) {
	return _debois$elm_mdl$Material_Options_Internal$Lift(
		function (_p3) {
			return A2(
				_elm_lang$core$Json_Decode$map,
				lift,
				A2(_elm_lang$core$Json_Decode$map, _debois$elm_mdl$Material_Component$Dispatch, _p3));
		});
};
var _debois$elm_mdl$Material_Options_Internal$inject = F5(
	function (view, lift, a, b, c) {
		return A3(
			view,
			a,
			b,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options_Internal$dispatch(lift),
				_1: c
			});
	});
var _debois$elm_mdl$Material_Options_Internal$Listener = F3(
	function (a, b, c) {
		return {ctor: 'Listener', _0: a, _1: b, _2: c};
	});
var _debois$elm_mdl$Material_Options_Internal$on1 = F3(
	function (event, lift, m) {
		return A3(
			_debois$elm_mdl$Material_Options_Internal$Listener,
			event,
			_elm_lang$core$Maybe$Nothing,
			A2(
				_elm_lang$core$Json_Decode$map,
				lift,
				_elm_lang$core$Json_Decode$succeed(m)));
	});
var _debois$elm_mdl$Material_Options_Internal$Set = function (a) {
	return {ctor: 'Set', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$option = _debois$elm_mdl$Material_Options_Internal$Set;
var _debois$elm_mdl$Material_Options_Internal$Many = function (a) {
	return {ctor: 'Many', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$applyContainer = F3(
	function (summary, ctor, options) {
		return A4(
			_debois$elm_mdl$Material_Options_Internal$apply,
			_elm_lang$core$Native_Utils.update(
				summary,
				{
					dispatch: _debois$elm_mdl$Material_Dispatch$clear(summary.dispatch),
					attrs: {ctor: '[]'},
					internal: {ctor: '[]'},
					config: {ctor: '_Tuple0'}
				}),
			ctor,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options_Internal$Many(summary.config.container),
				_1: options
			},
			{ctor: '[]'});
	});
var _debois$elm_mdl$Material_Options_Internal$applyInput = F3(
	function (summary, ctor, options) {
		return A4(
			_debois$elm_mdl$Material_Options_Internal$apply,
			_elm_lang$core$Native_Utils.update(
				summary,
				{
					classes: {ctor: '[]'},
					css: {ctor: '[]'},
					config: {ctor: '_Tuple0'}
				}),
			ctor,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options_Internal$Many(summary.config.input),
				_1: options
			},
			{ctor: '[]'});
	});
var _debois$elm_mdl$Material_Options_Internal$input = function (_p4) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (style, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						input: {
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options_Internal$Many(style),
							_1: config.input
						}
					});
			})(_p4));
};
var _debois$elm_mdl$Material_Options_Internal$container = function (_p5) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (style, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						container: {
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options_Internal$Many(style),
							_1: config.container
						}
					});
			})(_p5));
};
var _debois$elm_mdl$Material_Options_Internal$Internal = function (a) {
	return {ctor: 'Internal', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$attribute = _debois$elm_mdl$Material_Options_Internal$Internal;
var _debois$elm_mdl$Material_Options_Internal$Attribute = function (a) {
	return {ctor: 'Attribute', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$CSS = function (a) {
	return {ctor: 'CSS', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Class = function (a) {
	return {ctor: 'Class', _0: a};
};

var _debois$elm_mdl$Material_Options$dispatch = function (_p0) {
	return _debois$elm_mdl$Material_Options_Internal$Lift(
		_elm_lang$core$Json_Decode$map(_p0));
};
var _debois$elm_mdl$Material_Options$onWithOptions = F2(
	function (evt, options) {
		return A2(
			_debois$elm_mdl$Material_Options_Internal$Listener,
			evt,
			_elm_lang$core$Maybe$Just(options));
	});
var _debois$elm_mdl$Material_Options$on = function (event) {
	return A2(_debois$elm_mdl$Material_Options_Internal$Listener, event, _elm_lang$core$Maybe$Nothing);
};
var _debois$elm_mdl$Material_Options$on1 = F2(
	function (event, m) {
		return A2(
			_debois$elm_mdl$Material_Options$on,
			event,
			_elm_lang$core$Json_Decode$succeed(m));
	});
var _debois$elm_mdl$Material_Options$onToggle = _debois$elm_mdl$Material_Options$on1('change');
var _debois$elm_mdl$Material_Options$onClick = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onDoubleClick = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onMouseDown = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onMouseUp = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onMouseEnter = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onMouseLeave = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onMouseOver = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onMouseOut = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onCheck = function (_p1) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'change',
		A3(_elm_lang$core$Basics$flip, _elm_lang$core$Json_Decode$map, _elm_lang$html$Html_Events$targetChecked, _p1));
};
var _debois$elm_mdl$Material_Options$onBlur = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onFocus = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Options$onInput = function (f) {
	return A2(
		_debois$elm_mdl$Material_Options$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, f, _elm_lang$html$Html_Events$targetValue));
};
var _debois$elm_mdl$Material_Options$container = _debois$elm_mdl$Material_Options_Internal$container;
var _debois$elm_mdl$Material_Options$input = _debois$elm_mdl$Material_Options_Internal$input;
var _debois$elm_mdl$Material_Options$id = function (_p2) {
	return _debois$elm_mdl$Material_Options_Internal$Attribute(
		_elm_lang$html$Html_Attributes$id(_p2));
};
var _debois$elm_mdl$Material_Options$attr = _debois$elm_mdl$Material_Options_Internal$Attribute;
var _debois$elm_mdl$Material_Options$attribute = _debois$elm_mdl$Material_Options_Internal$Attribute;
var _debois$elm_mdl$Material_Options$stylesheet = function (css) {
	return A3(
		_elm_lang$html$Html$node,
		'style',
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(css),
			_1: {ctor: '[]'}
		});
};
var _debois$elm_mdl$Material_Options$data = F2(
	function (key, val) {
		return _debois$elm_mdl$Material_Options_Internal$Attribute(
			A2(
				_elm_lang$html$Html_Attributes$attribute,
				A2(_elm_lang$core$Basics_ops['++'], 'data-', key),
				val));
	});
var _debois$elm_mdl$Material_Options$nop = _debois$elm_mdl$Material_Options_Internal$None;
var _debois$elm_mdl$Material_Options$when = F2(
	function (guard, prop) {
		return guard ? prop : _debois$elm_mdl$Material_Options$nop;
	});
var _debois$elm_mdl$Material_Options$maybe = function (prop) {
	return A2(_elm_lang$core$Maybe$withDefault, _debois$elm_mdl$Material_Options$nop, prop);
};
var _debois$elm_mdl$Material_Options$many = _debois$elm_mdl$Material_Options_Internal$Many;
var _debois$elm_mdl$Material_Options$css = F2(
	function (key, value) {
		return _debois$elm_mdl$Material_Options_Internal$CSS(
			{ctor: '_Tuple2', _0: key, _1: value});
	});
var _debois$elm_mdl$Material_Options$center = _debois$elm_mdl$Material_Options$many(
	{
		ctor: '::',
		_0: A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
		_1: {
			ctor: '::',
			_0: A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
			_1: {
				ctor: '::',
				_0: A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'center'),
				_1: {ctor: '[]'}
			}
		}
	});
var _debois$elm_mdl$Material_Options$scrim = function (opacity) {
	return A2(
		_debois$elm_mdl$Material_Options$css,
		'background',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(opacity),
				'))')));
};
var _debois$elm_mdl$Material_Options$cs = function (c) {
	return _debois$elm_mdl$Material_Options_Internal$Class(c);
};
var _debois$elm_mdl$Material_Options$disabled = function (v) {
	return _debois$elm_mdl$Material_Options_Internal$Attribute(
		_elm_lang$html$Html_Attributes$disabled(v));
};
var _debois$elm_mdl$Material_Options$styled_ = F3(
	function (ctor, props, attrs) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options_Internal$addAttributes,
				_debois$elm_mdl$Material_Options_Internal$collect_(props),
				attrs));
	});
var _debois$elm_mdl$Material_Options$img = F2(
	function (options, attrs) {
		return A4(
			_debois$elm_mdl$Material_Options$styled_,
			_elm_lang$html$Html$img,
			options,
			attrs,
			{ctor: '[]'});
	});
var _debois$elm_mdl$Material_Options$styled = F2(
	function (ctor, props) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options_Internal$addAttributes,
				_debois$elm_mdl$Material_Options_Internal$collect_(props),
				{ctor: '[]'}));
	});
var _debois$elm_mdl$Material_Options$div = _debois$elm_mdl$Material_Options$styled(_elm_lang$html$Html$div);
var _debois$elm_mdl$Material_Options$span = _debois$elm_mdl$Material_Options$styled(_elm_lang$html$Html$span);

var _debois$elm_mdl$Material_Ripple$styles = F2(
	function (m, frame) {
		var r = m.rect;
		var toPx = function (k) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(
					_elm_lang$core$Basics$round(k)),
				'px');
		};
		var offset = A2(
			_elm_lang$core$Basics_ops['++'],
			'translate(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				toPx(m.x),
				A2(
					_elm_lang$core$Basics_ops['++'],
					', ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						toPx(m.y),
						')'))));
		var rippleSize = toPx(
			(_elm_lang$core$Basics$sqrt((r.width * r.width) + (r.height * r.height)) * 2.0) + 2.0);
		var scale = _elm_lang$core$Native_Utils.eq(frame, 0) ? 'scale(0.0001, 0.0001)' : '';
		var transformString = A2(
			_elm_lang$core$Basics_ops['++'],
			'translate(-50%, -50%) ',
			A2(_elm_lang$core$Basics_ops['++'], offset, scale));
		return {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'width', _1: rippleSize},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'height', _1: rippleSize},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: '-webkit-transform', _1: transformString},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: '-ms-transform', _1: transformString},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'transform', _1: transformString},
							_1: {ctor: '[]'}
						}
					}
				}
			}
		};
	});
var _debois$elm_mdl$Material_Ripple$Metrics = F3(
	function (a, b, c) {
		return {rect: a, x: b, y: c};
	});
var _debois$elm_mdl$Material_Ripple$computeMetrics = function (g) {
	var rect = g.rect;
	var set = F2(
		function (x, y) {
			return _elm_lang$core$Maybe$Just(
				{ctor: '_Tuple2', _0: x - rect.left, _1: y - rect.top});
		});
	return A2(
		_elm_lang$core$Maybe$map,
		function (_p0) {
			var _p1 = _p0;
			return A3(_debois$elm_mdl$Material_Ripple$Metrics, rect, _p1._0, _p1._1);
		},
		function () {
			var _p2 = {ctor: '_Tuple4', _0: g.clientX, _1: g.clientY, _2: g.touchX, _3: g.touchY};
			_v1_3:
			do {
				if (_p2.ctor === '_Tuple4') {
					if ((_p2._0.ctor === 'Just') && (_p2._1.ctor === 'Just')) {
						if ((_p2._0._0 === 0.0) && (_p2._1._0 === 0.0)) {
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: rect.width / 2.0, _1: rect.height / 2.0});
						} else {
							return A2(set, _p2._0._0, _p2._1._0);
						}
					} else {
						if ((_p2._2.ctor === 'Just') && (_p2._3.ctor === 'Just')) {
							return A2(set, _p2._2._0, _p2._3._0);
						} else {
							break _v1_3;
						}
					}
				} else {
					break _v1_3;
				}
			} while(false);
			return _elm_lang$core$Maybe$Nothing;
		}());
};
var _debois$elm_mdl$Material_Ripple$Model = F3(
	function (a, b, c) {
		return {animation: a, metrics: b, ignoringMouseDown: c};
	});
var _debois$elm_mdl$Material_Ripple$DOMState = F6(
	function (a, b, c, d, e, f) {
		return {rect: a, clientX: b, clientY: c, touchX: d, touchY: e, type_: f};
	});
var _debois$elm_mdl$Material_Ripple$geometryDecoder = A7(
	_elm_lang$core$Json_Decode$map6,
	_debois$elm_mdl$Material_Ripple$DOMState,
	A2(_elm_lang$core$Json_Decode$field, 'currentTarget', _debois$elm_dom$DOM$boundingClientRect),
	_elm_lang$core$Json_Decode$maybe(
		A2(_elm_lang$core$Json_Decode$field, 'clientX', _elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(_elm_lang$core$Json_Decode$field, 'clientY', _elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$at,
			{
				ctor: '::',
				_0: 'touches',
				_1: {
					ctor: '::',
					_0: '0',
					_1: {
						ctor: '::',
						_0: 'clientX',
						_1: {ctor: '[]'}
					}
				}
			},
			_elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$at,
			{
				ctor: '::',
				_0: 'touches',
				_1: {
					ctor: '::',
					_0: '0',
					_1: {
						ctor: '::',
						_0: 'clientY',
						_1: {ctor: '[]'}
					}
				}
			},
			_elm_lang$core$Json_Decode$float)),
	A2(_elm_lang$core$Json_Decode$field, 'type', _elm_lang$core$Json_Decode$string));
var _debois$elm_mdl$Material_Ripple$Inert = {ctor: 'Inert'};
var _debois$elm_mdl$Material_Ripple$model = {animation: _debois$elm_mdl$Material_Ripple$Inert, metrics: _elm_lang$core$Maybe$Nothing, ignoringMouseDown: false};
var _debois$elm_mdl$Material_Ripple$Frame = function (a) {
	return {ctor: 'Frame', _0: a};
};
var _debois$elm_mdl$Material_Ripple$view_ = F2(
	function (attrs, model) {
		var styling = function () {
			var _p3 = {ctor: '_Tuple2', _0: model.metrics, _1: model.animation};
			if ((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) {
				if (_p3._1.ctor === 'Frame') {
					return A2(_debois$elm_mdl$Material_Ripple$styles, _p3._0._0, _p3._1._0);
				} else {
					return A2(_debois$elm_mdl$Material_Ripple$styles, _p3._0._0, 1);
				}
			} else {
				return {ctor: '[]'};
			}
		}();
		return A2(
			_elm_lang$html$Html$span,
			attrs,
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$span,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$classList(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'mdl-ripple', _1: true},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'is-animating',
										_1: !_elm_lang$core$Native_Utils.eq(
											model.animation,
											_debois$elm_mdl$Material_Ripple$Frame(0))
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'is-visible',
											_1: !_elm_lang$core$Native_Utils.eq(model.animation, _debois$elm_mdl$Material_Ripple$Inert)
										},
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$style(styling),
							_1: {ctor: '[]'}
						}
					},
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			});
	});
var _debois$elm_mdl$Material_Ripple$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Material_Ripple$update = F2(
	function (action, model) {
		var _p4 = action;
		switch (_p4.ctor) {
			case 'Down':
				var _p5 = _p4._0;
				return (_elm_lang$core$Native_Utils.eq(_p5.type_, 'mousedown') && model.ignoringMouseDown) ? _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{ignoringMouseDown: false})) : A2(
					_debois$elm_mdl$Material_Helpers$effect,
					_debois$elm_mdl$Material_Helpers$cssTransitionStep(_debois$elm_mdl$Material_Ripple$Tick),
					_elm_lang$core$Native_Utils.update(
						model,
						{
							animation: _debois$elm_mdl$Material_Ripple$Frame(0),
							metrics: _debois$elm_mdl$Material_Ripple$computeMetrics(_p5),
							ignoringMouseDown: _elm_lang$core$Native_Utils.eq(_p5.type_, 'touchstart') ? true : model.ignoringMouseDown
						}));
			case 'Up':
				return _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{animation: _debois$elm_mdl$Material_Ripple$Inert}));
			default:
				return _elm_lang$core$Native_Utils.eq(
					model.animation,
					_debois$elm_mdl$Material_Ripple$Frame(0)) ? _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{
							animation: _debois$elm_mdl$Material_Ripple$Frame(1)
						})) : _debois$elm_mdl$Material_Helpers$pure(model);
		}
	});
var _debois$elm_mdl$Material_Ripple$Up = {ctor: 'Up'};
var _debois$elm_mdl$Material_Ripple$up = F2(
	function (f, name) {
		return A2(
			_debois$elm_mdl$Material_Options$on,
			name,
			_elm_lang$core$Json_Decode$succeed(
				f(_debois$elm_mdl$Material_Ripple$Up)));
	});
var _debois$elm_mdl$Material_Ripple$upOn_ = F2(
	function (f, name) {
		return A2(
			_elm_lang$html$Html_Events$on,
			name,
			_elm_lang$core$Json_Decode$succeed(
				f(_debois$elm_mdl$Material_Ripple$Up)));
	});
var _debois$elm_mdl$Material_Ripple$upOn = _debois$elm_mdl$Material_Ripple$upOn_(_elm_lang$core$Basics$identity);
var _debois$elm_mdl$Material_Ripple$Down = function (a) {
	return {ctor: 'Down', _0: a};
};
var _debois$elm_mdl$Material_Ripple$downOn_ = F2(
	function (f, name) {
		return A2(
			_elm_lang$html$Html_Events$on,
			name,
			A2(
				_elm_lang$core$Json_Decode$map,
				function (_p6) {
					return f(
						_debois$elm_mdl$Material_Ripple$Down(_p6));
				},
				_debois$elm_mdl$Material_Ripple$geometryDecoder));
	});
var _debois$elm_mdl$Material_Ripple$downOn = _debois$elm_mdl$Material_Ripple$downOn_(_elm_lang$core$Basics$identity);
var _debois$elm_mdl$Material_Ripple$view = function (_p7) {
	return _debois$elm_mdl$Material_Ripple$view_(
		A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$List$append,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Ripple$upOn('mouseup'),
				_1: {
					ctor: '::',
					_0: _debois$elm_mdl$Material_Ripple$upOn('mouseleave'),
					_1: {
						ctor: '::',
						_0: _debois$elm_mdl$Material_Ripple$upOn('touchend'),
						_1: {
							ctor: '::',
							_0: _debois$elm_mdl$Material_Ripple$upOn('blur'),
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Ripple$downOn('mousedown'),
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Ripple$downOn('touchstart'),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			},
			_p7));
};
var _debois$elm_mdl$Material_Ripple$down = F2(
	function (f, name) {
		return A2(
			_debois$elm_mdl$Material_Options$on,
			name,
			A2(
				_elm_lang$core$Json_Decode$map,
				function (_p8) {
					return f(
						_debois$elm_mdl$Material_Ripple$Down(_p8));
				},
				_debois$elm_mdl$Material_Ripple$geometryDecoder));
	});

var _debois$elm_mdl$Material_Button$_p0 = A3(
	_debois$elm_mdl$Material_Component$indexed,
	function (_) {
		return _.button;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{button: x});
		}),
	_debois$elm_mdl$Material_Ripple$model);
var _debois$elm_mdl$Material_Button$get = _debois$elm_mdl$Material_Button$_p0._0;
var _debois$elm_mdl$Material_Button$set = _debois$elm_mdl$Material_Button$_p0._1;
var _debois$elm_mdl$Material_Button$icon = _debois$elm_mdl$Material_Options$cs('mdl-button--icon');
var _debois$elm_mdl$Material_Button$minifab = _debois$elm_mdl$Material_Options$cs('mdl-button--mini-fab');
var _debois$elm_mdl$Material_Button$fab = _debois$elm_mdl$Material_Options$cs('mdl-button--fab');
var _debois$elm_mdl$Material_Button$raised = _debois$elm_mdl$Material_Options$cs('mdl-button--raised');
var _debois$elm_mdl$Material_Button$flat = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Button$blurAndForward = function (event) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		A2(_elm_lang$core$Basics_ops['++'], 'on', event),
		'this.blur(); (function(self) { var e = document.createEvent(\'Event\'); e.initEvent(\'touchcancel\', true, true); self.lastChild.dispatchEvent(e); }(this));');
};
var _debois$elm_mdl$Material_Button$type_ = function (_p1) {
	return _debois$elm_mdl$Material_Options_Internal$attribute(
		_elm_lang$html$Html_Attributes$type_(_p1));
};
var _debois$elm_mdl$Material_Button$accent = _debois$elm_mdl$Material_Options$cs('mdl-button--accent');
var _debois$elm_mdl$Material_Button$primary = _debois$elm_mdl$Material_Options$cs('mdl-button--primary');
var _debois$elm_mdl$Material_Button$colored = _debois$elm_mdl$Material_Options$cs('mdl-button--colored');
var _debois$elm_mdl$Material_Button$plain = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Button$disabled = _debois$elm_mdl$Material_Options_Internal$attribute(
	_elm_lang$html$Html_Attributes$disabled(true));
var _debois$elm_mdl$Material_Button$ripple = _debois$elm_mdl$Material_Options_Internal$option(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Button$link = function (href) {
	return _debois$elm_mdl$Material_Options$many(
		{
			ctor: '::',
			_0: _debois$elm_mdl$Material_Options_Internal$option(
				function (options) {
					return _elm_lang$core$Native_Utils.update(
						options,
						{link: true});
				}),
			_1: {
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options_Internal$attribute(
					_elm_lang$html$Html_Attributes$href(href)),
				_1: {ctor: '[]'}
			}
		});
};
var _debois$elm_mdl$Material_Button$defaultConfig = {ripple: false, link: false};
var _debois$elm_mdl$Material_Button$view = F4(
	function (lift, model, config, html) {
		var listeners = _debois$elm_mdl$Material_Options$many(
			{
				ctor: '::',
				_0: A2(_debois$elm_mdl$Material_Ripple$down, lift, 'mousedown'),
				_1: {
					ctor: '::',
					_0: A2(_debois$elm_mdl$Material_Ripple$down, lift, 'touchstart'),
					_1: {
						ctor: '::',
						_0: A2(_debois$elm_mdl$Material_Ripple$up, lift, 'touchcancel'),
						_1: {
							ctor: '::',
							_0: A2(_debois$elm_mdl$Material_Ripple$up, lift, 'mouseup'),
							_1: {
								ctor: '::',
								_0: A2(_debois$elm_mdl$Material_Ripple$up, lift, 'blur'),
								_1: {
									ctor: '::',
									_0: A2(_debois$elm_mdl$Material_Ripple$up, lift, 'mouseleave'),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			});
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Button$defaultConfig, config);
		return A5(
			_debois$elm_mdl$Material_Options_Internal$apply,
			summary,
			summary.config.link ? _elm_lang$html$Html$a : _elm_lang$html$Html$button,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-button'),
				_1: {
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options$cs('mdl-js-button'),
					_1: {
						ctor: '::',
						_0: A2(
							_debois$elm_mdl$Material_Options$when,
							summary.config.ripple,
							_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect')),
						_1: {
							ctor: '::',
							_0: listeners,
							_1: {ctor: '[]'}
						}
					}
				}
			},
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Helpers$blurOn('mouseup'),
				_1: {
					ctor: '::',
					_0: _debois$elm_mdl$Material_Helpers$blurOn('mouseleave'),
					_1: {
						ctor: '::',
						_0: _debois$elm_mdl$Material_Helpers$blurOn('touchend'),
						_1: {ctor: '[]'}
					}
				}
			},
			summary.config.ripple ? _elm_lang$core$List$concat(
				{
					ctor: '::',
					_0: html,
					_1: {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$map,
								lift,
								A2(
									_debois$elm_mdl$Material_Ripple$view_,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('mdl-button__ripple-container'),
										_1: {ctor: '[]'}
									},
									model)),
							_1: {ctor: '[]'}
						},
						_1: {ctor: '[]'}
					}
				}) : html);
	});
var _debois$elm_mdl$Material_Button$render = A3(_debois$elm_mdl$Material_Component$render, _debois$elm_mdl$Material_Button$get, _debois$elm_mdl$Material_Button$view, _debois$elm_mdl$Material_Component$ButtonMsg);
var _debois$elm_mdl$Material_Button$update = function (action) {
	return _debois$elm_mdl$Material_Ripple$update(action);
};
var _debois$elm_mdl$Material_Button$react = A4(
	_debois$elm_mdl$Material_Component$react,
	_debois$elm_mdl$Material_Button$get,
	_debois$elm_mdl$Material_Button$set,
	_debois$elm_mdl$Material_Component$ButtonMsg,
	_debois$elm_mdl$Material_Component$generalise(_debois$elm_mdl$Material_Button$update));
var _debois$elm_mdl$Material_Button$defaultModel = _debois$elm_mdl$Material_Ripple$model;
var _debois$elm_mdl$Material_Button$Config = F2(
	function (a, b) {
		return {ripple: a, link: b};
	});

var _debois$elm_mdl$Material_Icon$view = F2(
	function (name, options) {
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$i,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('material-icons'),
				_1: options
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(name),
				_1: {ctor: '[]'}
			});
	});
var _debois$elm_mdl$Material_Icon$i = function (name) {
	return A2(
		_debois$elm_mdl$Material_Icon$view,
		name,
		{ctor: '[]'});
};
var _debois$elm_mdl$Material_Icon$size48 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '48px');
var _debois$elm_mdl$Material_Icon$size36 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '36px');
var _debois$elm_mdl$Material_Icon$size24 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '24px');
var _debois$elm_mdl$Material_Icon$size18 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '18px');
var _debois$elm_mdl$Material_Icon$defaultConfig = {};
var _debois$elm_mdl$Material_Icon$Config = {};

var _debois$elm_mdl$Material_Textfield$update = F3(
	function (_p0, action, model) {
		return A3(
			_elm_lang$core$Basics$flip,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$Platform_Cmd_ops['!'], x, y);
				}),
			{ctor: '[]'},
			function () {
				var _p1 = action;
				switch (_p1.ctor) {
					case 'Input':
						var dirty = !_elm_lang$core$Native_Utils.eq(_p1._0, '');
						return _elm_lang$core$Native_Utils.eq(dirty, model.isDirty) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
							_elm_lang$core$Native_Utils.update(
								model,
								{isDirty: dirty}));
					case 'Blur':
						return _elm_lang$core$Maybe$Just(
							_elm_lang$core$Native_Utils.update(
								model,
								{isFocused: false}));
					default:
						return _elm_lang$core$Maybe$Just(
							_elm_lang$core$Native_Utils.update(
								model,
								{isFocused: true}));
				}
			}());
	});
var _debois$elm_mdl$Material_Textfield$defaultModel = {isFocused: false, isDirty: false};
var _debois$elm_mdl$Material_Textfield$_p2 = A3(
	_debois$elm_mdl$Material_Component$indexed,
	function (_) {
		return _.textfield;
	},
	F2(
		function (x, c) {
			return _elm_lang$core$Native_Utils.update(
				c,
				{textfield: x});
		}),
	_debois$elm_mdl$Material_Textfield$defaultModel);
var _debois$elm_mdl$Material_Textfield$get = _debois$elm_mdl$Material_Textfield$_p2._0;
var _debois$elm_mdl$Material_Textfield$set = _debois$elm_mdl$Material_Textfield$_p2._1;
var _debois$elm_mdl$Material_Textfield$react = A4(_debois$elm_mdl$Material_Component$react, _debois$elm_mdl$Material_Textfield$get, _debois$elm_mdl$Material_Textfield$set, _debois$elm_mdl$Material_Component$TextfieldMsg, _debois$elm_mdl$Material_Textfield$update);
var _debois$elm_mdl$Material_Textfield$cols = function (k) {
	return _debois$elm_mdl$Material_Options_Internal$input(
		{
			ctor: '::',
			_0: _debois$elm_mdl$Material_Options$attribute(
				_elm_lang$html$Html_Attributes$cols(k)),
			_1: {ctor: '[]'}
		});
};
var _debois$elm_mdl$Material_Textfield$rows = function (k) {
	return _debois$elm_mdl$Material_Options_Internal$input(
		{
			ctor: '::',
			_0: _debois$elm_mdl$Material_Options$attribute(
				_elm_lang$html$Html_Attributes$rows(k)),
			_1: {ctor: '[]'}
		});
};
var _debois$elm_mdl$Material_Textfield$input = _debois$elm_mdl$Material_Options$input;
var _debois$elm_mdl$Material_Textfield$disabled = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{disabled: true});
	});
var _debois$elm_mdl$Material_Textfield$maxlength = function (k) {
	return _debois$elm_mdl$Material_Options$attribute(
		_elm_lang$html$Html_Attributes$maxlength(k));
};
var _debois$elm_mdl$Material_Textfield$autofocus = _debois$elm_mdl$Material_Options$attribute(
	_elm_lang$html$Html_Attributes$autofocus(true));
var _debois$elm_mdl$Material_Textfield$value = function (_p3) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (str, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						value: _elm_lang$core$Maybe$Just(str)
					});
			})(_p3));
};
var _debois$elm_mdl$Material_Textfield$error = function (_p4) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (str, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						error: _elm_lang$core$Maybe$Just(str)
					});
			})(_p4));
};
var _debois$elm_mdl$Material_Textfield$expandableIcon = function (id) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{expandableIcon: id});
		});
};
var _debois$elm_mdl$Material_Textfield$expandable = function (id) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					expandable: _elm_lang$core$Maybe$Just(id)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$floatingLabel = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{labelFloat: true});
	});
var _debois$elm_mdl$Material_Textfield$label = function (_p5) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (str, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						labelText: _elm_lang$core$Maybe$Just(str)
					});
			})(_p5));
};
var _debois$elm_mdl$Material_Textfield$Config = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {labelText: a, labelFloat: b, error: c, value: d, disabled: e, kind: f, expandable: g, expandableIcon: h, input: i, container: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _debois$elm_mdl$Material_Textfield$Model = F2(
	function (a, b) {
		return {isFocused: a, isDirty: b};
	});
var _debois$elm_mdl$Material_Textfield$Email = {ctor: 'Email'};
var _debois$elm_mdl$Material_Textfield$email = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Email});
	});
var _debois$elm_mdl$Material_Textfield$Password = {ctor: 'Password'};
var _debois$elm_mdl$Material_Textfield$password = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Password});
	});
var _debois$elm_mdl$Material_Textfield$Textarea = {ctor: 'Textarea'};
var _debois$elm_mdl$Material_Textfield$textarea = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Textarea});
	});
var _debois$elm_mdl$Material_Textfield$Text = {ctor: 'Text'};
var _debois$elm_mdl$Material_Textfield$defaultConfig = {
	labelText: _elm_lang$core$Maybe$Nothing,
	labelFloat: false,
	error: _elm_lang$core$Maybe$Nothing,
	value: _elm_lang$core$Maybe$Nothing,
	disabled: false,
	kind: _debois$elm_mdl$Material_Textfield$Text,
	expandable: _elm_lang$core$Maybe$Nothing,
	expandableIcon: 'search',
	input: {ctor: '[]'},
	container: {ctor: '[]'}
};
var _debois$elm_mdl$Material_Textfield$text_ = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Text});
	});
var _debois$elm_mdl$Material_Textfield$Input = function (a) {
	return {ctor: 'Input', _0: a};
};
var _debois$elm_mdl$Material_Textfield$Focus = {ctor: 'Focus'};
var _debois$elm_mdl$Material_Textfield$Blur = {ctor: 'Blur'};
var _debois$elm_mdl$Material_Textfield$view = F4(
	function (lift, model, options, _p6) {
		var _p7 = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Textfield$defaultConfig, options);
		var summary = _p7;
		var config = _p7.config;
		var labelFor = function () {
			var _p8 = config.expandable;
			if (_p8.ctor === 'Nothing') {
				return {ctor: '[]'};
			} else {
				return {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$for(_p8._0),
					_1: {ctor: '[]'}
				};
			}
		}();
		var expandableId = function () {
			var _p9 = config.expandable;
			if (_p9.ctor === 'Nothing') {
				return _debois$elm_mdl$Material_Options$nop;
			} else {
				return _debois$elm_mdl$Material_Options_Internal$attribute(
					_elm_lang$html$Html_Attributes$id(_p9._0));
			}
		}();
		var expHolder = function () {
			var _p10 = config.expandable;
			if (_p10.ctor === 'Nothing') {
				return _elm_lang$core$Basics$identity;
			} else {
				return function (x) {
					return {
						ctor: '::',
						_0: A4(
							_debois$elm_mdl$Material_Options$styled_,
							_elm_lang$html$Html$label,
							{
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options$cs('mdl-button'),
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$cs('mdl-js-button'),
									_1: {
										ctor: '::',
										_0: _debois$elm_mdl$Material_Options$cs('mdl-button--icon'),
										_1: {ctor: '[]'}
									}
								}
							},
							labelFor,
							{
								ctor: '::',
								_0: _debois$elm_mdl$Material_Icon$i(config.expandableIcon),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A3(
								_debois$elm_mdl$Material_Options$styled,
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$cs('mdl-textfield__expandable-holder'),
									_1: {ctor: '[]'}
								},
								x),
							_1: {ctor: '[]'}
						}
					};
				};
			}
		}();
		return A4(
			_debois$elm_mdl$Material_Options_Internal$applyContainer,
			summary,
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-textfield'),
				_1: {
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options$cs('mdl-js-textfield'),
					_1: {
						ctor: '::',
						_0: _debois$elm_mdl$Material_Options$cs('is-upgraded'),
						_1: {
							ctor: '::',
							_0: A3(_debois$elm_mdl$Material_Options_Internal$on1, 'focus', lift, _debois$elm_mdl$Material_Textfield$Focus),
							_1: {
								ctor: '::',
								_0: A3(_debois$elm_mdl$Material_Options_Internal$on1, 'blur', lift, _debois$elm_mdl$Material_Textfield$Blur),
								_1: {
									ctor: '::',
									_0: A2(
										_debois$elm_mdl$Material_Options$when,
										config.labelFloat,
										_debois$elm_mdl$Material_Options$cs('mdl-textfield--floating-label')),
									_1: {
										ctor: '::',
										_0: A2(
											_debois$elm_mdl$Material_Options$when,
											!_elm_lang$core$Native_Utils.eq(config.error, _elm_lang$core$Maybe$Nothing),
											_debois$elm_mdl$Material_Options$cs('is-invalid')),
										_1: {
											ctor: '::',
											_0: A2(
												_debois$elm_mdl$Material_Options$when,
												function () {
													var _p11 = config.value;
													if (_p11.ctor === 'Just') {
														if (_p11._0 === '') {
															return false;
														} else {
															return true;
														}
													} else {
														return model.isDirty;
													}
												}(),
												_debois$elm_mdl$Material_Options$cs('is-dirty')),
											_1: {
												ctor: '::',
												_0: A2(
													_debois$elm_mdl$Material_Options$when,
													model.isFocused && (!config.disabled),
													_debois$elm_mdl$Material_Options$cs('is-focused')),
												_1: {
													ctor: '::',
													_0: A2(
														_debois$elm_mdl$Material_Options$when,
														config.disabled,
														_debois$elm_mdl$Material_Options$cs('is-disabled')),
													_1: {
														ctor: '::',
														_0: A2(
															_debois$elm_mdl$Material_Options$when,
															!_elm_lang$core$Native_Utils.eq(config.expandable, _elm_lang$core$Maybe$Nothing),
															_debois$elm_mdl$Material_Options$cs('mdl-textfield--expandable')),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			expHolder(
				{
					ctor: '::',
					_0: A4(
						_debois$elm_mdl$Material_Options_Internal$applyInput,
						summary,
						_elm_lang$core$Native_Utils.eq(config.kind, _debois$elm_mdl$Material_Textfield$Textarea) ? _elm_lang$html$Html$textarea : _elm_lang$html$Html$input,
						{
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options$cs('mdl-textfield__input'),
							_1: {
								ctor: '::',
								_0: A2(_debois$elm_mdl$Material_Options$css, 'outline', 'none'),
								_1: {
									ctor: '::',
									_0: A3(_debois$elm_mdl$Material_Options_Internal$on1, 'focus', lift, _debois$elm_mdl$Material_Textfield$Focus),
									_1: {
										ctor: '::',
										_0: A3(_debois$elm_mdl$Material_Options_Internal$on1, 'blur', lift, _debois$elm_mdl$Material_Textfield$Blur),
										_1: {
											ctor: '::',
											_0: function () {
												var _p12 = config.kind;
												switch (_p12.ctor) {
													case 'Text':
														return _debois$elm_mdl$Material_Options_Internal$attribute(
															_elm_lang$html$Html_Attributes$type_('text'));
													case 'Password':
														return _debois$elm_mdl$Material_Options_Internal$attribute(
															_elm_lang$html$Html_Attributes$type_('password'));
													case 'Email':
														return _debois$elm_mdl$Material_Options_Internal$attribute(
															_elm_lang$html$Html_Attributes$type_('email'));
													default:
														return _debois$elm_mdl$Material_Options$nop;
												}
											}(),
											_1: {
												ctor: '::',
												_0: A2(
													_debois$elm_mdl$Material_Options$when,
													config.disabled,
													_debois$elm_mdl$Material_Options_Internal$attribute(
														_elm_lang$html$Html_Attributes$disabled(true))),
												_1: {
													ctor: '::',
													_0: expandableId,
													_1: {
														ctor: '::',
														_0: function () {
															var _p13 = config.value;
															if (_p13.ctor === 'Nothing') {
																return A2(
																	_debois$elm_mdl$Material_Options$on,
																	'input',
																	A2(
																		_elm_lang$core$Json_Decode$map,
																		function (_p14) {
																			return lift(
																				_debois$elm_mdl$Material_Textfield$Input(_p14));
																		},
																		_elm_lang$html$Html_Events$targetValue));
															} else {
																return _debois$elm_mdl$Material_Options_Internal$attribute(
																	_elm_lang$html$Html_Attributes$value(_p13._0));
															}
														}(),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$label,
							A2(
								_elm_lang$core$Basics_ops['++'],
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('mdl-textfield__label'),
									_1: {ctor: '[]'}
								},
								labelFor),
							function () {
								var _p15 = config.labelText;
								if (_p15.ctor === 'Just') {
									return {
										ctor: '::',
										_0: _elm_lang$html$Html$text(_p15._0),
										_1: {ctor: '[]'}
									};
								} else {
									return {ctor: '[]'};
								}
							}()),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$core$Maybe$withDefault,
								A2(
									_elm_lang$html$Html$div,
									{ctor: '[]'},
									{ctor: '[]'}),
								A2(
									_elm_lang$core$Maybe$map,
									function (e) {
										return A2(
											_elm_lang$html$Html$span,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('mdl-textfield__error'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text(e),
												_1: {ctor: '[]'}
											});
									},
									config.error)),
							_1: {ctor: '[]'}
						}
					}
				}));
	});
var _debois$elm_mdl$Material_Textfield$render = A3(_debois$elm_mdl$Material_Component$render, _debois$elm_mdl$Material_Textfield$get, _debois$elm_mdl$Material_Textfield$view, _debois$elm_mdl$Material_Component$TextfieldMsg);

var _elm_lang$dom$Native_Dom = function() {

var fakeNode = {
	addEventListener: function() {},
	removeEventListener: function() {}
};

var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(onDocument),
	onWindow: F3(onWindow),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$mouse$Mouse_ops = _elm_lang$mouse$Mouse_ops || {};
_elm_lang$mouse$Mouse_ops['&>'] = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return t2;
			},
			t1);
	});
var _elm_lang$mouse$Mouse$onSelfMsg = F3(
	function (router, _p1, state) {
		var _p2 = _p1;
		var _p3 = A2(_elm_lang$core$Dict$get, _p2.category, state);
		if (_p3.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (tagger) {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					tagger(_p2.position));
			};
			return A2(
				_elm_lang$mouse$Mouse_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p3._0.taggers)),
				_elm_lang$core$Task$succeed(state));
		}
	});
var _elm_lang$mouse$Mouse$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$mouse$Mouse$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p4 = maybeValues;
		if (_p4.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: value,
					_1: {ctor: '[]'}
				});
		} else {
			return _elm_lang$core$Maybe$Just(
				{ctor: '::', _0: value, _1: _p4._0});
		}
	});
var _elm_lang$mouse$Mouse$categorizeHelp = F2(
	function (subs, subDict) {
		categorizeHelp:
		while (true) {
			var _p5 = subs;
			if (_p5.ctor === '[]') {
				return subDict;
			} else {
				var _v4 = _p5._1,
					_v5 = A3(
					_elm_lang$core$Dict$update,
					_p5._0._0,
					_elm_lang$mouse$Mouse$categorizeHelpHelp(_p5._0._1),
					subDict);
				subs = _v4;
				subDict = _v5;
				continue categorizeHelp;
			}
		}
	});
var _elm_lang$mouse$Mouse$categorize = function (subs) {
	return A2(_elm_lang$mouse$Mouse$categorizeHelp, subs, _elm_lang$core$Dict$empty);
};
var _elm_lang$mouse$Mouse$subscription = _elm_lang$core$Native_Platform.leaf('Mouse');
var _elm_lang$mouse$Mouse$Position = F2(
	function (a, b) {
		return {x: a, y: b};
	});
var _elm_lang$mouse$Mouse$position = A3(
	_elm_lang$core$Json_Decode$map2,
	_elm_lang$mouse$Mouse$Position,
	A2(_elm_lang$core$Json_Decode$field, 'pageX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'pageY', _elm_lang$core$Json_Decode$int));
var _elm_lang$mouse$Mouse$Watcher = F2(
	function (a, b) {
		return {taggers: a, pid: b};
	});
var _elm_lang$mouse$Mouse$Msg = F2(
	function (a, b) {
		return {category: a, position: b};
	});
var _elm_lang$mouse$Mouse$onEffects = F3(
	function (router, newSubs, oldState) {
		var rightStep = F3(
			function (category, taggers, task) {
				var tracker = A3(
					_elm_lang$dom$Dom_LowLevel$onDocument,
					category,
					_elm_lang$mouse$Mouse$position,
					function (_p6) {
						return A2(
							_elm_lang$core$Platform$sendToSelf,
							router,
							A2(_elm_lang$mouse$Mouse$Msg, category, _p6));
					});
				return A2(
					_elm_lang$core$Task$andThen,
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$mouse$Mouse$Watcher, taggers, pid),
										state));
							},
							_elm_lang$core$Process$spawn(tracker));
					},
					task);
			});
		var bothStep = F4(
			function (category, _p7, taggers, task) {
				var _p8 = _p7;
				return A2(
					_elm_lang$core$Task$andThen,
					function (state) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$core$Dict$insert,
								category,
								A2(_elm_lang$mouse$Mouse$Watcher, taggers, _p8.pid),
								state));
					},
					task);
			});
		var leftStep = F3(
			function (category, _p9, task) {
				var _p10 = _p9;
				return A2(
					_elm_lang$mouse$Mouse_ops['&>'],
					_elm_lang$core$Process$kill(_p10.pid),
					task);
			});
		return A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			oldState,
			_elm_lang$mouse$Mouse$categorize(newSubs),
			_elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty));
	});
var _elm_lang$mouse$Mouse$MySub = F2(
	function (a, b) {
		return {ctor: 'MySub', _0: a, _1: b};
	});
var _elm_lang$mouse$Mouse$clicks = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'click', tagger));
};
var _elm_lang$mouse$Mouse$moves = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mousemove', tagger));
};
var _elm_lang$mouse$Mouse$downs = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mousedown', tagger));
};
var _elm_lang$mouse$Mouse$ups = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mouseup', tagger));
};
var _elm_lang$mouse$Mouse$subMap = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return A2(
			_elm_lang$mouse$Mouse$MySub,
			_p12._0,
			function (_p13) {
				return func(
					_p12._1(_p13));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Mouse'] = {pkg: 'elm-lang/mouse', init: _elm_lang$mouse$Mouse$init, onEffects: _elm_lang$mouse$Mouse$onEffects, onSelfMsg: _elm_lang$mouse$Mouse$onSelfMsg, tag: 'sub', subMap: _elm_lang$mouse$Mouse$subMap};

var _debois$elm_mdl$Material_Menu_Geometry$Geometry = F5(
	function (a, b, c, d, e) {
		return {button: a, menu: b, container: c, offsetTops: d, offsetHeights: e};
	});
var _debois$elm_mdl$Material_Menu_Geometry$Element = F4(
	function (a, b, c, d) {
		return {offsetTop: a, offsetLeft: b, offsetHeight: c, bounds: d};
	});
var _debois$elm_mdl$Material_Menu_Geometry$element = A5(_elm_lang$core$Json_Decode$map4, _debois$elm_mdl$Material_Menu_Geometry$Element, _debois$elm_dom$DOM$offsetTop, _debois$elm_dom$DOM$offsetLeft, _debois$elm_dom$DOM$offsetHeight, _debois$elm_dom$DOM$boundingClientRect);
var _debois$elm_mdl$Material_Menu_Geometry$decode = A6(
	_elm_lang$core$Json_Decode$map5,
	_debois$elm_mdl$Material_Menu_Geometry$Geometry,
	_debois$elm_dom$DOM$target(_debois$elm_mdl$Material_Menu_Geometry$element),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(_debois$elm_dom$DOM$childNode, 1, _debois$elm_mdl$Material_Menu_Geometry$element))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(_debois$elm_mdl$Material_Menu_Geometry$element)),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(
				_debois$elm_dom$DOM$childNode,
				1,
				_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetTop)))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(
				_debois$elm_dom$DOM$childNode,
				1,
				_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetHeight)))));

var _debois$elm_mdl$Material_Menu$toPx = function (_p0) {
	return A3(
		_elm_lang$core$Basics$flip,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			}),
		'px',
		_elm_lang$core$Basics$toString(_p0));
};
var _debois$elm_mdl$Material_Menu$rect = F4(
	function (x, y, w, h) {
		return function (coords) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'rect(',
				A2(_elm_lang$core$Basics_ops['++'], coords, ')'));
		}(
			A2(
				_elm_lang$core$String$join,
				' ',
				A2(
					_elm_lang$core$List$map,
					_debois$elm_mdl$Material_Menu$toPx,
					{
						ctor: '::',
						_0: x,
						_1: {
							ctor: '::',
							_0: y,
							_1: {
								ctor: '::',
								_0: w,
								_1: {
									ctor: '::',
									_0: h,
									_1: {ctor: '[]'}
								}
							}
						}
					})));
	});
var _debois$elm_mdl$Material_Menu$onKeyDown = function (action) {
	return A3(
		_debois$elm_mdl$Material_Options$onWithOptions,
		'keydown',
		{preventDefault: true, stopPropagation: false},
		A2(_elm_lang$core$Json_Decode$map, action, _elm_lang$html$Html_Events$keyCode));
};
var _debois$elm_mdl$Material_Menu$onClick = F2(
	function (decoder, action) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'click',
			A2(_elm_lang$core$Json_Decode$map, action, decoder));
	});
var _debois$elm_mdl$Material_Menu$withGeometry = F2(
	function (model, f) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			_debois$elm_mdl$Material_Options$nop,
			A2(_elm_lang$core$Maybe$map, f, model.geometry));
	});
var _debois$elm_mdl$Material_Menu$icon = function (_p1) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (name, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{icon: name});
			})(_p1));
};
var _debois$elm_mdl$Material_Menu$ripple = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Menu$onSelect = function (_p2) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (msg, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						onSelect: _elm_lang$core$Maybe$Just(msg)
					});
			})(_p2));
};
var _debois$elm_mdl$Material_Menu$disabled = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{enabled: false});
	});
var _debois$elm_mdl$Material_Menu$divider = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{divider: true});
	});
var _debois$elm_mdl$Material_Menu$defaultItemConfig = {enabled: true, divider: false, onSelect: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Menu$constant = {transitionDurationSeconds: 0.3, transitionDurationFraction: 0.8, closeTimeout: 150};
var _debois$elm_mdl$Material_Menu$transitionDuration = _debois$elm_mdl$Material_Menu$constant.transitionDurationSeconds * _debois$elm_mdl$Material_Menu$constant.transitionDurationFraction;
var _debois$elm_mdl$Material_Menu$Model = F4(
	function (a, b, c, d) {
		return {ripples: a, animationState: b, geometry: c, index: d};
	});
var _debois$elm_mdl$Material_Menu$Item = F2(
	function (a, b) {
		return {options: a, html: b};
	});
var _debois$elm_mdl$Material_Menu$item = _debois$elm_mdl$Material_Menu$Item;
var _debois$elm_mdl$Material_Menu$ItemConfig = F3(
	function (a, b, c) {
		return {enabled: a, divider: b, onSelect: c};
	});
var _debois$elm_mdl$Material_Menu$Config = F3(
	function (a, b, c) {
		return {alignment: a, ripple: b, icon: c};
	});
var _debois$elm_mdl$Material_Menu$Closing = {ctor: 'Closing'};
var _debois$elm_mdl$Material_Menu$Opened = {ctor: 'Opened'};
var _debois$elm_mdl$Material_Menu$clip = F3(
	function (model, config, geometry) {
		var height = geometry.menu.bounds.height;
		var width = geometry.menu.bounds.width;
		return A2(
			_debois$elm_mdl$Material_Options$css,
			'clip',
			function () {
				if (_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)) {
					return A4(_debois$elm_mdl$Material_Menu$rect, 0, width, height, 0);
				} else {
					var _p3 = config.alignment;
					switch (_p3.ctor) {
						case 'BottomRight':
							return A4(_debois$elm_mdl$Material_Menu$rect, 0, width, 0, width);
						case 'TopLeft':
							return A4(_debois$elm_mdl$Material_Menu$rect, height, 0, height, 0);
						case 'TopRight':
							return A4(_debois$elm_mdl$Material_Menu$rect, height, width, height, width);
						default:
							return '';
					}
				}
			}());
	});
var _debois$elm_mdl$Material_Menu$Opening = {ctor: 'Opening'};
var _debois$elm_mdl$Material_Menu$isActive = function (model) {
	return _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opening);
};
var _debois$elm_mdl$Material_Menu$Idle = {ctor: 'Idle'};
var _debois$elm_mdl$Material_Menu$defaultModel = {ripples: _elm_lang$core$Dict$empty, animationState: _debois$elm_mdl$Material_Menu$Idle, geometry: _elm_lang$core$Maybe$Nothing, index: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Menu$_p4 = A3(
	_debois$elm_mdl$Material_Component$indexed,
	function (_) {
		return _.menu;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{menu: x});
		}),
	_debois$elm_mdl$Material_Menu$defaultModel);
var _debois$elm_mdl$Material_Menu$get = _debois$elm_mdl$Material_Menu$_p4._0;
var _debois$elm_mdl$Material_Menu$set = _debois$elm_mdl$Material_Menu$_p4._1;
var _debois$elm_mdl$Material_Menu$Key = F2(
	function (a, b) {
		return {ctor: 'Key', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Material_Menu$subscriptions = function (model) {
	return _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) ? _elm_lang$mouse$Mouse$clicks(_debois$elm_mdl$Material_Menu$Click) : _elm_lang$core$Platform_Sub$none;
};
var _debois$elm_mdl$Material_Menu$subs = A3(
	_debois$elm_mdl$Material_Component$subs,
	_debois$elm_mdl$Material_Component$MenuMsg,
	function (_) {
		return _.menu;
	},
	_debois$elm_mdl$Material_Menu$subscriptions);
var _debois$elm_mdl$Material_Menu$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Material_Menu$Close = {ctor: 'Close'};
var _debois$elm_mdl$Material_Menu$Select = F2(
	function (a, b) {
		return {ctor: 'Select', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$update = F3(
	function (fwd, msg, model) {
		update:
		while (true) {
			var _p5 = msg;
			switch (_p5.ctor) {
				case 'Open':
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								animationState: function () {
									var _p6 = model.animationState;
									if (_p6.ctor === 'Opened') {
										return _debois$elm_mdl$Material_Menu$Opened;
									} else {
										return _debois$elm_mdl$Material_Menu$Opening;
									}
								}(),
								geometry: _elm_lang$core$Maybe$Just(_p5._0)
							}),
						_1: _debois$elm_mdl$Material_Helpers$cmd(
							fwd(_debois$elm_mdl$Material_Menu$Tick))
					};
				case 'Tick':
					return _debois$elm_mdl$Material_Helpers$pure(
						_elm_lang$core$Native_Utils.update(
							model,
							{animationState: _debois$elm_mdl$Material_Menu$Opened}));
				case 'Close':
					return _debois$elm_mdl$Material_Helpers$pure(
						_elm_lang$core$Native_Utils.update(
							model,
							{animationState: _debois$elm_mdl$Material_Menu$Idle, geometry: _elm_lang$core$Maybe$Nothing, index: _elm_lang$core$Maybe$Nothing}));
				case 'Select':
					var cmds = A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						{
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(
								A2(
									_debois$elm_mdl$Material_Helpers$delay,
									_debois$elm_mdl$Material_Menu$constant.closeTimeout,
									fwd(_debois$elm_mdl$Material_Menu$Close))),
							_1: {
								ctor: '::',
								_0: A2(_elm_lang$core$Maybe$map, _debois$elm_mdl$Material_Helpers$cmd, _p5._1),
								_1: {ctor: '[]'}
							}
						});
					var model_ = _elm_lang$core$Native_Utils.update(
						model,
						{animationState: _debois$elm_mdl$Material_Menu$Closing});
					return {
						ctor: '_Tuple2',
						_0: model_,
						_1: _elm_lang$core$Platform_Cmd$batch(cmds)
					};
				case 'Ripple':
					var _p9 = _p5._0;
					var _p7 = A2(
						_debois$elm_mdl$Material_Ripple$update,
						_p5._1,
						A2(
							_elm_lang$core$Maybe$withDefault,
							_debois$elm_mdl$Material_Ripple$model,
							A2(_elm_lang$core$Dict$get, _p9, model.ripples)));
					var model_ = _p7._0;
					var effects = _p7._1;
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								ripples: A3(_elm_lang$core$Dict$insert, _p9, model_, model.ripples)
							}),
						_1: A2(
							_elm_lang$core$Platform_Cmd$map,
							function (_p8) {
								return fwd(
									A2(_debois$elm_mdl$Material_Menu$Ripple, _p9, _p8));
							},
							effects)
					};
				case 'Click':
					if (_debois$elm_mdl$Material_Menu$isActive(model)) {
						var _p10 = model.geometry;
						if (_p10.ctor === 'Just') {
							var inside = F2(
								function (_p12, _p11) {
									var _p13 = _p12;
									var _p18 = _p13.y;
									var _p17 = _p13.x;
									var _p14 = _p11;
									var _p16 = _p14.top;
									var _p15 = _p14.left;
									return (_elm_lang$core$Native_Utils.cmp(
										_p15,
										_elm_lang$core$Basics$toFloat(_p17)) < 1) && ((_elm_lang$core$Native_Utils.cmp(
										_elm_lang$core$Basics$toFloat(_p17),
										_p15 + _p14.width) < 1) && ((_elm_lang$core$Native_Utils.cmp(
										_p16,
										_elm_lang$core$Basics$toFloat(_p18)) < 1) && (_elm_lang$core$Native_Utils.cmp(
										_elm_lang$core$Basics$toFloat(_p18),
										_p16 + _p14.height) < 1)));
								});
							if (A2(inside, _p5._0, _p10._0.menu.bounds)) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{ctor: '[]'});
							} else {
								var _v6 = fwd,
									_v7 = _debois$elm_mdl$Material_Menu$Close,
									_v8 = model;
								fwd = _v6;
								msg = _v7;
								model = _v8;
								continue update;
							}
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'});
						}
					} else {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'});
					}
				default:
					var _p27 = _p5._0;
					var _p19 = _p5._1;
					switch (_p19) {
						case 13:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var _p20 = model.index;
								if (_p20.ctor === 'Just') {
									var _p22 = _p20._0;
									var cmd = A2(
										_elm_lang$core$Maybe$andThen,
										function (_p21) {
											return function (_) {
												return _.onSelect;
											}(
												function (_) {
													return _.config;
												}(_p21));
										},
										_elm_lang$core$List$head(
											A2(_elm_lang$core$List$drop, _p22, _p27)));
									var _v11 = fwd,
										_v12 = A2(_debois$elm_mdl$Material_Menu$Select, _p22 + 1, cmd),
										_v13 = model;
									fwd = _v11;
									msg = _v12;
									model = _v13;
									continue update;
								} else {
									var _v14 = fwd,
										_v15 = _debois$elm_mdl$Material_Menu$Close,
										_v16 = model;
									fwd = _v14;
									msg = _v15;
									model = _v16;
									continue update;
								}
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{ctor: '[]'});
							}
						case 27:
							var _v17 = fwd,
								_v18 = _debois$elm_mdl$Material_Menu$Close,
								_v19 = model;
							fwd = _v17;
							msg = _v18;
							model = _v19;
							continue update;
						case 32:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var _v20 = fwd,
									_v21 = A2(_debois$elm_mdl$Material_Menu$Key, _p27, 13),
									_v22 = model;
								fwd = _v20;
								msg = _v21;
								model = _v22;
								continue update;
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{ctor: '[]'});
							}
						case 40:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var items = A2(
									_elm_lang$core$List$indexedMap,
									F2(
										function (v0, v1) {
											return {ctor: '_Tuple2', _0: v0, _1: v1};
										}),
									_p27);
								return A3(
									_elm_lang$core$Basics$flip,
									F2(
										function (x, y) {
											return A2(_elm_lang$core$Platform_Cmd_ops['!'], x, y);
										}),
									{ctor: '[]'},
									A2(
										_elm_lang$core$Maybe$withDefault,
										model,
										A2(
											_elm_lang$core$Maybe$map,
											function (_p23) {
												return function (index_) {
													return _elm_lang$core$Native_Utils.update(
														model,
														{
															index: _elm_lang$core$Maybe$Just(index_)
														});
												}(
													_elm_lang$core$Tuple$first(_p23));
											},
											_elm_lang$core$List$head(
												A2(
													_elm_lang$core$List$filter,
													function (_p24) {
														return function (_) {
															return _.enabled;
														}(
															function (_) {
																return _.config;
															}(
																_elm_lang$core$Tuple$second(_p24)));
													},
													A2(
														_elm_lang$core$List$drop,
														1 + A2(_elm_lang$core$Maybe$withDefault, -1, model.index),
														A2(_elm_lang$core$Basics_ops['++'], items, items)))))));
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{ctor: '[]'});
							}
						case 38:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var items = A2(
									_elm_lang$core$List$indexedMap,
									F2(
										function (v0, v1) {
											return {ctor: '_Tuple2', _0: v0, _1: v1};
										}),
									_p27);
								return _debois$elm_mdl$Material_Helpers$pure(
									A2(
										_elm_lang$core$Maybe$withDefault,
										model,
										A2(
											_elm_lang$core$Maybe$map,
											function (_p25) {
												return function (index_) {
													return _elm_lang$core$Native_Utils.update(
														model,
														{
															index: _elm_lang$core$Maybe$Just(index_)
														});
												}(
													_elm_lang$core$Tuple$first(_p25));
											},
											_elm_lang$core$List$head(
												A2(
													_elm_lang$core$List$filter,
													function (_p26) {
														return function (_) {
															return _.enabled;
														}(
															function (_) {
																return _.config;
															}(
																_elm_lang$core$Tuple$second(_p26)));
													},
													A2(
														_elm_lang$core$List$drop,
														_elm_lang$core$List$length(_p27) - A2(_elm_lang$core$Maybe$withDefault, 0, model.index),
														_elm_lang$core$List$reverse(
															A2(_elm_lang$core$Basics_ops['++'], items, items))))))));
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{ctor: '[]'});
							}
						default:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'});
					}
			}
		}
	});
var _debois$elm_mdl$Material_Menu$react = F4(
	function (lift, msg, idx, store) {
		return A2(
			_debois$elm_mdl$Material_Helpers$map1st,
			function (_p28) {
				return _elm_lang$core$Maybe$Just(
					A3(_debois$elm_mdl$Material_Menu$set, idx, store, _p28));
			},
			A3(
				_debois$elm_mdl$Material_Menu$update,
				lift,
				msg,
				A2(_debois$elm_mdl$Material_Menu$get, idx, store)));
	});
var _debois$elm_mdl$Material_Menu$Open = function (a) {
	return {ctor: 'Open', _0: a};
};
var _debois$elm_mdl$Material_Menu$TopRight = {ctor: 'TopRight'};
var _debois$elm_mdl$Material_Menu$topRight = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$TopRight});
	});
var _debois$elm_mdl$Material_Menu$TopLeft = {ctor: 'TopLeft'};
var _debois$elm_mdl$Material_Menu$topLeft = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$TopLeft});
	});
var _debois$elm_mdl$Material_Menu$delay = F4(
	function (alignment, height, offsetTop, offsetHeight) {
		var t = (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) ? ((((height - offsetTop) - offsetHeight) / height) * _debois$elm_mdl$Material_Menu$transitionDuration) : ((offsetTop / height) * _debois$elm_mdl$Material_Menu$transitionDuration);
		return A2(
			_debois$elm_mdl$Material_Options$css,
			'transition-delay',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(t),
				's'));
	});
var _debois$elm_mdl$Material_Menu$view1 = F8(
	function (lift, config, model, offsetTop, offsetHeight, index, summary, item) {
		var canSelect = summary.config.enabled && (!_elm_lang$core$Native_Utils.eq(summary.config.onSelect, _elm_lang$core$Maybe$Nothing));
		var hasRipple = config.ripple && canSelect;
		var ripple = function (_p29) {
			return lift(
				A2(_debois$elm_mdl$Material_Menu$Ripple, index, _p29));
		};
		return A5(
			_debois$elm_mdl$Material_Options_Internal$apply,
			summary,
			_elm_lang$html$Html$li,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-menu__item'),
				_1: {
					ctor: '::',
					_0: A2(
						_debois$elm_mdl$Material_Options$when,
						config.ripple,
						_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect')),
					_1: {
						ctor: '::',
						_0: A2(
							_debois$elm_mdl$Material_Options$when,
							summary.config.divider,
							_debois$elm_mdl$Material_Options$cs('mdl-menu__item--full-bleed-divider')),
						_1: {
							ctor: '::',
							_0: A2(
								_debois$elm_mdl$Material_Options$when,
								_elm_lang$core$Native_Utils.eq(
									model.index,
									_elm_lang$core$Maybe$Just(index)),
								A2(_debois$elm_mdl$Material_Options$css, 'background-color', 'rgb(238,238,238)')),
							_1: {
								ctor: '::',
								_0: function () {
									var _p30 = {
										ctor: '_Tuple2',
										_0: model.geometry,
										_1: _debois$elm_mdl$Material_Menu$isActive(model)
									};
									if (((_p30.ctor === '_Tuple2') && (_p30._0.ctor === 'Just')) && (_p30._1 === true)) {
										return A4(_debois$elm_mdl$Material_Menu$delay, config.alignment, _p30._0._0.menu.bounds.height, offsetTop, offsetHeight);
									} else {
										return _debois$elm_mdl$Material_Options$nop;
									}
								}(),
								_1: {
									ctor: '::',
									_0: A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
									_1: {
										ctor: '::',
										_0: A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
										_1: {
											ctor: '::',
											_0: A2(
												_debois$elm_mdl$Material_Options$when,
												canSelect,
												_debois$elm_mdl$Material_Options$onClick(
													lift(
														A2(_debois$elm_mdl$Material_Menu$Select, index, summary.config.onSelect)))),
											_1: {
												ctor: '::',
												_0: A2(
													_debois$elm_mdl$Material_Options$when,
													!summary.config.enabled,
													_debois$elm_mdl$Material_Options_Internal$attribute(
														A2(_elm_lang$html$Html_Attributes$attribute, 'disabled', 'disabled'))),
												_1: {
													ctor: '::',
													_0: _debois$elm_mdl$Material_Options_Internal$attribute(
														A2(
															_elm_lang$html$Html_Attributes$property,
															'tabindex',
															_elm_lang$core$Json_Encode$string('-1'))),
													_1: {
														ctor: '::',
														_0: hasRipple ? _debois$elm_mdl$Material_Options$many(
															{
																ctor: '::',
																_0: _debois$elm_mdl$Material_Options_Internal$attribute(
																	A2(_debois$elm_mdl$Material_Ripple$downOn_, ripple, 'mousedown')),
																_1: {
																	ctor: '::',
																	_0: _debois$elm_mdl$Material_Options_Internal$attribute(
																		A2(_debois$elm_mdl$Material_Ripple$downOn_, ripple, 'touchstart')),
																	_1: {
																		ctor: '::',
																		_0: _debois$elm_mdl$Material_Options_Internal$attribute(
																			A2(_debois$elm_mdl$Material_Ripple$upOn_, ripple, 'mouseup')),
																		_1: {
																			ctor: '::',
																			_0: _debois$elm_mdl$Material_Options_Internal$attribute(
																				A2(_debois$elm_mdl$Material_Ripple$upOn_, ripple, 'mouseleave')),
																			_1: {
																				ctor: '::',
																				_0: _debois$elm_mdl$Material_Options_Internal$attribute(
																					A2(_debois$elm_mdl$Material_Ripple$upOn_, ripple, 'touchend')),
																				_1: {
																					ctor: '::',
																					_0: _debois$elm_mdl$Material_Options_Internal$attribute(
																						A2(_debois$elm_mdl$Material_Ripple$upOn_, ripple, 'blur')),
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}
																}
															}) : _debois$elm_mdl$Material_Options$nop,
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			{ctor: '[]'},
			hasRipple ? A2(
				F2(
					function (x, y) {
						return A2(_elm_lang$core$Basics_ops['++'], x, y);
					}),
				item.html,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$map,
						ripple,
						A2(
							_debois$elm_mdl$Material_Ripple$view_,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('mdl-menu__item-ripple-container'),
								_1: {ctor: '[]'}
							},
							A2(
								_elm_lang$core$Maybe$withDefault,
								_debois$elm_mdl$Material_Ripple$model,
								A2(_elm_lang$core$Dict$get, index, model.ripples)))),
					_1: {ctor: '[]'}
				}) : item.html);
	});
var _debois$elm_mdl$Material_Menu$BottomRight = {ctor: 'BottomRight'};
var _debois$elm_mdl$Material_Menu$bottomRight = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$BottomRight});
	});
var _debois$elm_mdl$Material_Menu$BottomLeft = {ctor: 'BottomLeft'};
var _debois$elm_mdl$Material_Menu$defaultConfig = {alignment: _debois$elm_mdl$Material_Menu$BottomLeft, ripple: false, icon: 'more_vert'};
var _debois$elm_mdl$Material_Menu$bottomLeft = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$BottomLeft});
	});
var _debois$elm_mdl$Material_Menu$containerGeometry = F2(
	function (alignment, geometry) {
		return _debois$elm_mdl$Material_Options$many(
			{
				ctor: '::',
				_0: A2(
					_debois$elm_mdl$Material_Options$css,
					'width',
					_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.width)),
				_1: {
					ctor: '::',
					_0: A2(
						_debois$elm_mdl$Material_Options$css,
						'height',
						_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.height)),
					_1: {
						ctor: '::',
						_0: (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomRight) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomLeft)) ? A2(
							_debois$elm_mdl$Material_Options$css,
							'top',
							_debois$elm_mdl$Material_Menu$toPx(geometry.button.offsetTop + geometry.button.offsetHeight)) : _debois$elm_mdl$Material_Options$nop,
						_1: {
							ctor: '::',
							_0: function () {
								if (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomRight) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) {
									var right = function (e) {
										return e.bounds.left + e.bounds.width;
									};
									return A2(
										_debois$elm_mdl$Material_Options$css,
										'right',
										_debois$elm_mdl$Material_Menu$toPx(
											right(geometry.container) - right(geometry.menu)));
								} else {
									return _debois$elm_mdl$Material_Options$nop;
								}
							}(),
							_1: {
								ctor: '::',
								_0: function () {
									if (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) {
										var bottom = geometry.container.bounds.top + geometry.container.bounds.height;
										return A2(
											_debois$elm_mdl$Material_Options$css,
											'bottom',
											_debois$elm_mdl$Material_Menu$toPx(bottom - geometry.button.bounds.top));
									} else {
										return _debois$elm_mdl$Material_Options$nop;
									}
								}(),
								_1: {
									ctor: '::',
									_0: (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomLeft)) ? A2(
										_debois$elm_mdl$Material_Options$css,
										'left',
										_debois$elm_mdl$Material_Menu$toPx(geometry.menu.offsetLeft)) : _debois$elm_mdl$Material_Options$nop,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			});
	});
var _debois$elm_mdl$Material_Menu$view = F4(
	function (lift, model, properties, items) {
		var itemSummaries = A2(
			_elm_lang$core$List$map,
			function (_p31) {
				return A2(
					_debois$elm_mdl$Material_Options_Internal$collect,
					_debois$elm_mdl$Material_Menu$defaultItemConfig,
					function (_) {
						return _.options;
					}(_p31));
			},
			items);
		var numItems = _elm_lang$core$List$length(items);
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Menu$defaultConfig, properties);
		var config = summary.config;
		var alignment = function () {
			var _p32 = config.alignment;
			switch (_p32.ctor) {
				case 'BottomLeft':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-left');
				case 'BottomRight':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-right');
				case 'TopLeft':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-left');
				default:
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-right');
			}
		}();
		return A5(
			_debois$elm_mdl$Material_Options_Internal$apply,
			summary,
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
				_1: properties
			},
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$map,
					lift,
					A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$button,
						{
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options$cs('mdl-button'),
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options$cs('mdl-js-button'),
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$cs('mdl-button--icon'),
									_1: {
										ctor: '::',
										_0: A2(
											_debois$elm_mdl$Material_Options$when,
											_debois$elm_mdl$Material_Menu$isActive(model),
											_debois$elm_mdl$Material_Menu$onKeyDown(
												_debois$elm_mdl$Material_Menu$Key(itemSummaries))),
										_1: {
											ctor: '::',
											_0: A2(
												_debois$elm_mdl$Material_Options$when,
												!_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened),
												A2(
													_debois$elm_mdl$Material_Options$on,
													'click',
													A2(_elm_lang$core$Json_Decode$map, _debois$elm_mdl$Material_Menu$Open, _debois$elm_mdl$Material_Menu_Geometry$decode))),
											_1: {
												ctor: '::',
												_0: A2(
													_debois$elm_mdl$Material_Options$when,
													_debois$elm_mdl$Material_Menu$isActive(model),
													_debois$elm_mdl$Material_Options$onClick(_debois$elm_mdl$Material_Menu$Close)),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						},
						{
							ctor: '::',
							_0: A2(
								_debois$elm_mdl$Material_Icon$view,
								config.icon,
								{
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$cs('material-icons'),
									_1: {
										ctor: '::',
										_0: A2(_debois$elm_mdl$Material_Options$css, 'pointer-events', 'none'),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						})),
				_1: {
					ctor: '::',
					_0: A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options$cs('mdl-menu__container'),
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options$cs('is-upgraded'),
								_1: {
									ctor: '::',
									_0: A2(
										_debois$elm_mdl$Material_Options$when,
										_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing),
										_debois$elm_mdl$Material_Options$cs('is-visible')),
									_1: {
										ctor: '::',
										_0: A2(
											_debois$elm_mdl$Material_Menu$withGeometry,
											model,
											_debois$elm_mdl$Material_Menu$containerGeometry(config.alignment)),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						{
							ctor: '::',
							_0: A3(
								_debois$elm_mdl$Material_Options$styled,
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$cs('mdl-menu__outline'),
									_1: {
										ctor: '::',
										_0: alignment,
										_1: {
											ctor: '::',
											_0: A2(
												_debois$elm_mdl$Material_Menu$withGeometry,
												model,
												function (geometry) {
													return _debois$elm_mdl$Material_Options$many(
														{
															ctor: '::',
															_0: A2(
																_debois$elm_mdl$Material_Options$css,
																'width',
																_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.width)),
															_1: {
																ctor: '::',
																_0: A2(
																	_debois$elm_mdl$Material_Options$css,
																	'height',
																	_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.height)),
																_1: {ctor: '[]'}
															}
														});
												}),
											_1: {ctor: '[]'}
										}
									}
								},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: A3(
									_debois$elm_mdl$Material_Options$styled,
									_elm_lang$html$Html$ul,
									{
										ctor: '::',
										_0: _debois$elm_mdl$Material_Options$cs('mdl-menu'),
										_1: {
											ctor: '::',
											_0: _debois$elm_mdl$Material_Options$cs('mdl-js-menu'),
											_1: {
												ctor: '::',
												_0: A2(
													_debois$elm_mdl$Material_Options$when,
													_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opening) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing),
													_debois$elm_mdl$Material_Options$cs('is-animating')),
												_1: {
													ctor: '::',
													_0: A2(
														_debois$elm_mdl$Material_Menu$withGeometry,
														model,
														A2(_debois$elm_mdl$Material_Menu$clip, model, config)),
													_1: {
														ctor: '::',
														_0: alignment,
														_1: {ctor: '[]'}
													}
												}
											}
										}
									},
									function () {
										var _p33 = model.geometry;
										if (_p33.ctor === 'Just') {
											var _p34 = _p33._0;
											return A6(
												_elm_lang$core$List$map5,
												A3(_debois$elm_mdl$Material_Menu$view1, lift, config, model),
												_p34.offsetTops,
												_p34.offsetHeights,
												A2(_elm_lang$core$List$range, 0, numItems - 1),
												itemSummaries,
												items);
										} else {
											return A4(
												_elm_lang$core$List$map3,
												A5(_debois$elm_mdl$Material_Menu$view1, lift, config, model, 0, 0),
												A2(_elm_lang$core$List$range, 0, numItems - 1),
												itemSummaries,
												items);
										}
									}()),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _debois$elm_mdl$Material_Menu$render = A3(_debois$elm_mdl$Material_Component$render, _debois$elm_mdl$Material_Menu$get, _debois$elm_mdl$Material_Menu$view, _debois$elm_mdl$Material_Component$MenuMsg);

var _debois$elm_mdl$Material_Snackbar$enqueue = F2(
	function (contents, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				queue: A2(
					_elm_lang$core$List$append,
					model.queue,
					{
						ctor: '::',
						_0: contents,
						_1: {ctor: '[]'}
					})
			});
	});
var _debois$elm_mdl$Material_Snackbar$snackbar = F3(
	function (payload, message, label) {
		return {
			message: message,
			action: _elm_lang$core$Maybe$Just(label),
			payload: payload,
			timeout: 2750,
			fade: 250
		};
	});
var _debois$elm_mdl$Material_Snackbar$toast = F2(
	function (payload, message) {
		return {message: message, action: _elm_lang$core$Maybe$Nothing, payload: payload, timeout: 2750, fade: 250};
	});
var _debois$elm_mdl$Material_Snackbar$Contents = F5(
	function (a, b, c, d, e) {
		return {message: a, action: b, payload: c, timeout: d, fade: e};
	});
var _debois$elm_mdl$Material_Snackbar$Model = F3(
	function (a, b, c) {
		return {queue: a, state: b, seq: c};
	});
var _debois$elm_mdl$Material_Snackbar$Fading = function (a) {
	return {ctor: 'Fading', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Active = function (a) {
	return {ctor: 'Active', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Inert = {ctor: 'Inert'};
var _debois$elm_mdl$Material_Snackbar$model = {
	queue: {ctor: '[]'},
	state: _debois$elm_mdl$Material_Snackbar$Inert,
	seq: -1
};
var _debois$elm_mdl$Material_Snackbar$Clicked = {ctor: 'Clicked'};
var _debois$elm_mdl$Material_Snackbar$Timeout = {ctor: 'Timeout'};
var _debois$elm_mdl$Material_Snackbar$Move = F2(
	function (a, b) {
		return {ctor: 'Move', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Snackbar$next = function (model) {
	return _elm_lang$core$Platform_Cmd$map(
		_debois$elm_mdl$Material_Snackbar$Move(model.seq));
};
var _debois$elm_mdl$Material_Snackbar$view = function (model) {
	var isActive = function () {
		var _p0 = model.state;
		switch (_p0.ctor) {
			case 'Inert':
				return false;
			case 'Active':
				return true;
			default:
				return false;
		}
	}();
	var contents = function () {
		var _p1 = model.state;
		switch (_p1.ctor) {
			case 'Inert':
				return _elm_lang$core$Maybe$Nothing;
			case 'Active':
				return _elm_lang$core$Maybe$Just(_p1._0);
			default:
				return _elm_lang$core$Maybe$Just(_p1._0);
		}
	}();
	var action = A2(
		_elm_lang$core$Maybe$andThen,
		function (_) {
			return _.action;
		},
		contents);
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$classList(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'mdl-js-snackbar', _1: true},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'mdl-snackbar', _1: true},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'mdl-snackbar--active', _1: isActive},
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(_debois$elm_mdl$Material_Helpers$aria, 'hidden', !isActive),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('mdl-snackbar__text'),
					_1: {ctor: '[]'}
				},
				A2(
					_elm_lang$core$Maybe$withDefault,
					{ctor: '[]'},
					A2(
						_elm_lang$core$Maybe$map,
						function (c) {
							return {
								ctor: '::',
								_0: _elm_lang$html$Html$text(c.message),
								_1: {ctor: '[]'}
							};
						},
						contents))),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('mdl-snackbar__action'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$type_('button'),
							_1: {
								ctor: '::',
								_0: A2(
									_debois$elm_mdl$Material_Helpers$aria,
									'hidden',
									A2(
										_elm_lang$core$Maybe$withDefault,
										true,
										A2(
											_elm_lang$core$Maybe$map,
											_elm_lang$core$Basics$always(!isActive),
											action))),
								_1: A2(
									_elm_lang$core$Maybe$withDefault,
									{ctor: '[]'},
									A2(
										_elm_lang$core$Maybe$map,
										_elm_lang$core$Basics$always(
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(
													A2(_debois$elm_mdl$Material_Snackbar$Move, model.seq, _debois$elm_mdl$Material_Snackbar$Clicked)),
												_1: {ctor: '[]'}
											}),
										action))
							}
						}
					},
					A2(
						_elm_lang$core$Maybe$withDefault,
						{ctor: '[]'},
						A2(
							_elm_lang$core$Maybe$map,
							function (action) {
								return {
									ctor: '::',
									_0: _elm_lang$html$Html$text(action),
									_1: {ctor: '[]'}
								};
							},
							action))),
				_1: {ctor: '[]'}
			}
		});
};
var _debois$elm_mdl$Material_Snackbar$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$End = function (a) {
	return {ctor: 'End', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Begin = function (a) {
	return {ctor: 'Begin', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$tryDequeue = function (model) {
	var _p2 = {ctor: '_Tuple2', _0: model.state, _1: model.queue};
	if (((_p2.ctor === '_Tuple2') && (_p2._0.ctor === 'Inert')) && (_p2._1.ctor === '::')) {
		var _p3 = _p2._1._0;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{
					state: _debois$elm_mdl$Material_Snackbar$Active(_p3),
					queue: _p2._1._1,
					seq: model.seq + 1
				}),
			_1: _elm_lang$core$Platform_Cmd$batch(
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Platform_Cmd$map,
						_debois$elm_mdl$Material_Snackbar$Move(model.seq + 1),
						A2(_debois$elm_mdl$Material_Helpers$delay, _p3.timeout, _debois$elm_mdl$Material_Snackbar$Timeout)),
					_1: {
						ctor: '::',
						_0: _debois$elm_mdl$Material_Helpers$cmd(
							_debois$elm_mdl$Material_Snackbar$Begin(_p3.payload)),
						_1: {ctor: '[]'}
					}
				})
		};
	} else {
		return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
	}
};
var _debois$elm_mdl$Material_Snackbar$move = F2(
	function (transition, model) {
		var _p4 = {ctor: '_Tuple2', _0: model.state, _1: transition};
		_v3_4:
		do {
			if (_p4.ctor === '_Tuple2') {
				if (_p4._1.ctor === 'Clicked') {
					if (_p4._0.ctor === 'Active') {
						var _p5 = _p4._0._0;
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{
									state: _debois$elm_mdl$Material_Snackbar$Fading(_p5)
								}),
							_1: _elm_lang$core$Platform_Cmd$batch(
								{
									ctor: '::',
									_0: A2(
										_debois$elm_mdl$Material_Snackbar$next,
										model,
										A2(_debois$elm_mdl$Material_Helpers$delay, _p5.fade, _debois$elm_mdl$Material_Snackbar$Timeout)),
									_1: {
										ctor: '::',
										_0: _debois$elm_mdl$Material_Helpers$cmd(
											_debois$elm_mdl$Material_Snackbar$Click(_p5.payload)),
										_1: {ctor: '[]'}
									}
								})
						};
					} else {
						break _v3_4;
					}
				} else {
					switch (_p4._0.ctor) {
						case 'Inert':
							return _debois$elm_mdl$Material_Snackbar$tryDequeue(model);
						case 'Active':
							var _p6 = _p4._0._0;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{
										state: _debois$elm_mdl$Material_Snackbar$Fading(_p6)
									}),
								_1: _elm_lang$core$Platform_Cmd$batch(
									{
										ctor: '::',
										_0: A2(
											_debois$elm_mdl$Material_Snackbar$next,
											model,
											A2(_debois$elm_mdl$Material_Helpers$delay, _p6.fade, _debois$elm_mdl$Material_Snackbar$Timeout)),
										_1: {ctor: '[]'}
									})
							};
						default:
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{state: _debois$elm_mdl$Material_Snackbar$Inert}),
								_1: _elm_lang$core$Platform_Cmd$batch(
									{
										ctor: '::',
										_0: A2(
											_debois$elm_mdl$Material_Snackbar$next,
											model,
											_debois$elm_mdl$Material_Helpers$cmd(_debois$elm_mdl$Material_Snackbar$Timeout)),
										_1: {
											ctor: '::',
											_0: _debois$elm_mdl$Material_Helpers$cmd(
												_debois$elm_mdl$Material_Snackbar$End(_p4._0._0.payload)),
											_1: {ctor: '[]'}
										}
									})
							};
					}
				}
			} else {
				break _v3_4;
			}
		} while(false);
		return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
	});
var _debois$elm_mdl$Material_Snackbar$update = F2(
	function (action, model) {
		var _p7 = action;
		if (_p7.ctor === 'Move') {
			return _elm_lang$core$Native_Utils.eq(_p7._0, model.seq) ? A2(_debois$elm_mdl$Material_Snackbar$move, _p7._1, model) : {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		} else {
			return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _debois$elm_mdl$Material_Snackbar$add = F2(
	function (contents, model) {
		return _debois$elm_mdl$Material_Snackbar$tryDequeue(
			A2(_debois$elm_mdl$Material_Snackbar$enqueue, contents, model));
	});

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

var _elm_lang$window$Native_Window = function()
{

var size = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)	{
	callback(_elm_lang$core$Native_Scheduler.succeed({
		width: window.innerWidth,
		height: window.innerHeight
	}));
});

return {
	size: size
};

}();
var _elm_lang$window$Window_ops = _elm_lang$window$Window_ops || {};
_elm_lang$window$Window_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return task2;
			},
			task1);
	});
var _elm_lang$window$Window$onSelfMsg = F3(
	function (router, dimensions, state) {
		var _p1 = state;
		if (_p1.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (_p2) {
				var _p3 = _p2;
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p3._0(dimensions));
			};
			return A2(
				_elm_lang$window$Window_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p1._0.subs)),
				_elm_lang$core$Task$succeed(state));
		}
	});
var _elm_lang$window$Window$init = _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
var _elm_lang$window$Window$size = _elm_lang$window$Native_Window.size;
var _elm_lang$window$Window$width = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.width;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$height = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.height;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$onEffects = F3(
	function (router, newSubs, oldState) {
		var _p4 = {ctor: '_Tuple2', _0: oldState, _1: newSubs};
		if (_p4._0.ctor === 'Nothing') {
			if (_p4._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					function (pid) {
						return _elm_lang$core$Task$succeed(
							_elm_lang$core$Maybe$Just(
								{subs: newSubs, pid: pid}));
					},
					_elm_lang$core$Process$spawn(
						A3(
							_elm_lang$dom$Dom_LowLevel$onWindow,
							'resize',
							_elm_lang$core$Json_Decode$succeed(
								{ctor: '_Tuple0'}),
							function (_p5) {
								return A2(
									_elm_lang$core$Task$andThen,
									_elm_lang$core$Platform$sendToSelf(router),
									_elm_lang$window$Window$size);
							})));
			}
		} else {
			if (_p4._1.ctor === '[]') {
				return A2(
					_elm_lang$window$Window_ops['&>'],
					_elm_lang$core$Process$kill(_p4._0._0.pid),
					_elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing));
			} else {
				return _elm_lang$core$Task$succeed(
					_elm_lang$core$Maybe$Just(
						{subs: newSubs, pid: _p4._0._0.pid}));
			}
		}
	});
var _elm_lang$window$Window$subscription = _elm_lang$core$Native_Platform.leaf('Window');
var _elm_lang$window$Window$Size = F2(
	function (a, b) {
		return {width: a, height: b};
	});
var _elm_lang$window$Window$MySub = function (a) {
	return {ctor: 'MySub', _0: a};
};
var _elm_lang$window$Window$resizes = function (tagger) {
	return _elm_lang$window$Window$subscription(
		_elm_lang$window$Window$MySub(tagger));
};
var _elm_lang$window$Window$subMap = F2(
	function (func, _p6) {
		var _p7 = _p6;
		return _elm_lang$window$Window$MySub(
			function (_p8) {
				return func(
					_p7._0(_p8));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Window'] = {pkg: 'elm-lang/window', init: _elm_lang$window$Window$init, onEffects: _elm_lang$window$Window$onEffects, onSelfMsg: _elm_lang$window$Window$onSelfMsg, tag: 'sub', subMap: _elm_lang$window$Window$subMap};

var _debois$elm_mdl$Material_Layout$_p0 = {
	ctor: '_Tuple2',
	_0: function (_) {
		return _.layout;
	},
	_1: F2(
		function (x, s) {
			return _elm_lang$core$Native_Utils.update(
				s,
				{layout: x});
		})
};
var _debois$elm_mdl$Material_Layout$get = _debois$elm_mdl$Material_Layout$_p0._0;
var _debois$elm_mdl$Material_Layout$set = _debois$elm_mdl$Material_Layout$_p0._1;
var _debois$elm_mdl$Material_Layout$drawerView = F3(
	function (lift, isVisible, elems) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'mdl-layout__drawer', _1: true},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'is-visible', _1: isVisible},
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html_Attributes$attribute,
						'aria-hidden',
						isVisible ? 'false' : 'true'),
					_1: {ctor: '[]'}
				}
			},
			elems);
	});
var _debois$elm_mdl$Material_Layout$onKeypressFilterSpaceAndEnter = A2(_elm_lang$html$Html_Attributes$attribute, 'onkeypress', '\n  (function (evt) {\n     if (evt && evt.type === \"keydown\" && (evt.keyCode === 32 || evt.keyCode === 13)) {\n       evt.preventDefault();\n     }\n   })(window.event);\n  ');
var _debois$elm_mdl$Material_Layout$toList = function (x) {
	var _p1 = x;
	if (_p1.ctor === 'Nothing') {
		return {ctor: '[]'};
	} else {
		return {
			ctor: '::',
			_0: _p1._0,
			_1: {ctor: '[]'}
		};
	}
};
var _debois$elm_mdl$Material_Layout$isWaterfall = function (mode) {
	var _p2 = mode;
	if (_p2.ctor === 'Waterfall') {
		return true;
	} else {
		return false;
	}
};
var _debois$elm_mdl$Material_Layout$row = function (styles) {
	return _debois$elm_mdl$Material_Options$div(
		{
			ctor: '::',
			_0: _debois$elm_mdl$Material_Options$cs('mdl-layout__header-row'),
			_1: styles
		});
};
var _debois$elm_mdl$Material_Layout$link = F2(
	function (styles, contents) {
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$a,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-navigation__link'),
				_1: {
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options_Internal$attribute(
						A2(_elm_lang$html$Html_Attributes$attribute, 'tabindex', '1')),
					_1: styles
				}
			},
			contents);
	});
var _debois$elm_mdl$Material_Layout$href = function (url) {
	return _debois$elm_mdl$Material_Options$attribute(
		_elm_lang$html$Html_Attributes$href(url));
};
var _debois$elm_mdl$Material_Layout$navigation = F2(
	function (styles, contents) {
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$nav,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-navigation'),
				_1: styles
			},
			contents);
	});
var _debois$elm_mdl$Material_Layout$title = function (styles) {
	return _debois$elm_mdl$Material_Options$span(
		{
			ctor: '::',
			_0: _debois$elm_mdl$Material_Options$cs('mdl-layout__title'),
			_1: styles
		});
};
var _debois$elm_mdl$Material_Layout$spacer = A2(
	_elm_lang$html$Html$div,
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$class('mdl-layout-spacer'),
		_1: {ctor: '[]'}
	},
	{ctor: '[]'});
var _debois$elm_mdl$Material_Layout$onSelectTab = function (_p3) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (f, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						onSelectTab: _elm_lang$core$Maybe$Just(
							function (_p4) {
								return _elm_lang$html$Html_Events$onClick(
									f(_p4));
							})
					});
			})(_p3));
};
var _debois$elm_mdl$Material_Layout$moreTabs = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{moreTabs: true});
	});
var _debois$elm_mdl$Material_Layout$selectedTab = function (_p5) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (k, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{selectedTab: k});
			})(_p5));
};
var _debois$elm_mdl$Material_Layout$transparentHeader = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{transparentHeader: true});
	});
var _debois$elm_mdl$Material_Layout$rippleTabs = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{rippleTabs: true});
	});
var _debois$elm_mdl$Material_Layout$fixedTabs = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedTabs: true});
	});
var _debois$elm_mdl$Material_Layout$fixedDrawer = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedDrawer: true});
	});
var _debois$elm_mdl$Material_Layout$fixedHeader = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedHeader: true});
	});
var _debois$elm_mdl$Material_Layout$mainId = 'elm-mdl-layout-main';
var _debois$elm_mdl$Material_Layout$setTabsWidth_ = F2(
	function (width, model) {
		var x = model.tabScrollState;
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				tabScrollState: _elm_lang$core$Native_Utils.update(
					x,
					{
						width: _elm_lang$core$Maybe$Just(width)
					})
			});
	});
var _debois$elm_mdl$Material_Layout$setTabsWidth = F2(
	function (w, container) {
		return _elm_lang$core$Native_Utils.update(
			container,
			{
				layout: A2(_debois$elm_mdl$Material_Layout$setTabsWidth_, w, container.layout)
			});
	});
var _debois$elm_mdl$Material_Layout$defaultTabScrollState = {canScrollRight: true, canScrollLeft: false, width: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Layout$defaultModel = {ripples: _elm_lang$core$Dict$empty, isSmallScreen: false, isCompact: false, isAnimating: false, isScrolled: false, isDrawerOpen: false, tabScrollState: _debois$elm_mdl$Material_Layout$defaultTabScrollState};
var _debois$elm_mdl$Material_Layout$TabScrollState = F3(
	function (a, b, c) {
		return {canScrollLeft: a, canScrollRight: b, width: c};
	});
var _debois$elm_mdl$Material_Layout$Model = F7(
	function (a, b, c, d, e, f, g) {
		return {ripples: a, isSmallScreen: b, isCompact: c, isAnimating: d, isScrolled: e, isDrawerOpen: f, tabScrollState: g};
	});
var _debois$elm_mdl$Material_Layout$Config = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {fixedHeader: a, fixedDrawer: b, fixedTabs: c, rippleTabs: d, mode: e, selectedTab: f, onSelectTab: g, transparentHeader: h, moreTabs: i};
	});
var _debois$elm_mdl$Material_Layout$Contents = F4(
	function (a, b, c, d) {
		return {header: a, drawer: b, tabs: c, main: d};
	});
var _debois$elm_mdl$Material_Layout$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Layout$NOP = {ctor: 'NOP'};
var _debois$elm_mdl$Material_Layout$TransitionEnd = {ctor: 'TransitionEnd'};
var _debois$elm_mdl$Material_Layout$TransitionHeader = function (a) {
	return {ctor: 'TransitionHeader', _0: a};
};
var _debois$elm_mdl$Material_Layout$update_ = F3(
	function (f, action, model) {
		update_:
		while (true) {
			var _p6 = action;
			switch (_p6.ctor) {
				case 'NOP':
					return _elm_lang$core$Maybe$Nothing;
				case 'Resize':
					var _p7 = _p6._0;
					var tabScrollState = A2(
						_elm_lang$core$Maybe$withDefault,
						model.tabScrollState,
						A2(
							_elm_lang$core$Maybe$map,
							function (tabsWidth) {
								var tabScrollState = model.tabScrollState;
								return _elm_lang$core$Native_Utils.update(
									tabScrollState,
									{
										canScrollRight: _elm_lang$core$Native_Utils.cmp(tabsWidth + (2 * 56), _p7) > 0
									});
							},
							model.tabScrollState.width));
					var isSmall = _elm_lang$core$Native_Utils.cmp(1024, _p7) > -1;
					return (_elm_lang$core$Native_Utils.eq(isSmall, model.isSmallScreen) && _elm_lang$core$Native_Utils.eq(tabScrollState.canScrollRight, model.tabScrollState.canScrollRight)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{isSmallScreen: isSmall, isDrawerOpen: (!isSmall) && model.isDrawerOpen, tabScrollState: tabScrollState})));
				case 'ToggleDrawer':
					return _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{isDrawerOpen: !model.isDrawerOpen})));
				case 'Ripple':
					var _p9 = _p6._0;
					return _elm_lang$core$Maybe$Just(
						A2(
							_debois$elm_mdl$Material_Helpers$map2nd,
							_elm_lang$core$Platform_Cmd$map(
								function (_p8) {
									return f(
										A2(_debois$elm_mdl$Material_Layout$Ripple, _p9, _p8));
								}),
							A2(
								_debois$elm_mdl$Material_Helpers$map1st,
								function (ripple_) {
									return _elm_lang$core$Native_Utils.update(
										model,
										{
											ripples: A3(_elm_lang$core$Dict$insert, _p9, ripple_, model.ripples)
										});
								},
								A2(
									_debois$elm_mdl$Material_Ripple$update,
									_p6._1,
									A2(
										_elm_lang$core$Maybe$withDefault,
										_debois$elm_mdl$Material_Ripple$model,
										A2(_elm_lang$core$Dict$get, _p9, model.ripples))))));
				case 'ScrollTab':
					var _p10 = _p6._0;
					return (!_elm_lang$core$Native_Utils.eq(model.tabScrollState, _p10)) ? _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{tabScrollState: _p10}))) : _elm_lang$core$Maybe$Nothing;
				case 'ScrollPane':
					var isScrolled = _elm_lang$core$Native_Utils.cmp(0.0, _p6._1) < 0;
					if (!_elm_lang$core$Native_Utils.eq(isScrolled, model.isScrolled)) {
						var _v3 = f,
							_v4 = _debois$elm_mdl$Material_Layout$TransitionHeader(
							{toCompact: isScrolled, fixedHeader: _p6._0}),
							_v5 = _elm_lang$core$Native_Utils.update(
							model,
							{isScrolled: isScrolled});
						f = _v3;
						action = _v4;
						model = _v5;
						continue update_;
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				case 'TransitionHeader':
					return (!model.isAnimating) ? _elm_lang$core$Maybe$Just(
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{isCompact: _p6._0.toCompact, isAnimating: (!model.isSmallScreen) || _p6._0.fixedHeader}),
							_1: _elm_lang$core$Platform_Cmd$none
						}) : _elm_lang$core$Maybe$Nothing;
				default:
					return _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{isAnimating: false})));
			}
		}
	});
var _debois$elm_mdl$Material_Layout$update = F2(
	function (msg, model) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none},
			A3(_debois$elm_mdl$Material_Layout$update_, _elm_lang$core$Basics$identity, msg, model));
	});
var _debois$elm_mdl$Material_Layout$react = F3(
	function (lift, msg, store) {
		var _p11 = A3(
			_debois$elm_mdl$Material_Layout$update_,
			lift,
			msg,
			_debois$elm_mdl$Material_Layout$get(store));
		if ((_p11.ctor === 'Just') && (_p11._0.ctor === '_Tuple2')) {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Maybe$Just(
					A2(_debois$elm_mdl$Material_Layout$set, _p11._0._0, store)),
				_1: _p11._0._1
			};
		} else {
			return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _debois$elm_mdl$Material_Layout$ScrollPane = F2(
	function (a, b) {
		return {ctor: 'ScrollPane', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Layout$ScrollTab = function (a) {
	return {ctor: 'ScrollTab', _0: a};
};
var _debois$elm_mdl$Material_Layout$Resize = function (a) {
	return {ctor: 'Resize', _0: a};
};
var _debois$elm_mdl$Material_Layout$init = function () {
	var measureScreenSize = A2(_elm_lang$core$Task$perform, _debois$elm_mdl$Material_Layout$Resize, _elm_lang$window$Window$width);
	return {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Layout$defaultModel, _1: measureScreenSize};
}();
var _debois$elm_mdl$Material_Layout$sub0 = function (lift) {
	return A2(
		_elm_lang$core$Platform_Cmd$map,
		function (_p12) {
			return lift(
				_debois$elm_mdl$Material_Component$LayoutMsg(_p12));
		},
		_elm_lang$core$Tuple$second(_debois$elm_mdl$Material_Layout$init));
};
var _debois$elm_mdl$Material_Layout$subscriptions = function (model) {
	return _elm_lang$window$Window$resizes(
		function (_p13) {
			return _debois$elm_mdl$Material_Layout$Resize(
				function (_) {
					return _.width;
				}(_p13));
		});
};
var _debois$elm_mdl$Material_Layout$subs = function (lift) {
	return function (_p14) {
		return A2(
			_elm_lang$core$Platform_Sub$map,
			function (_p15) {
				return lift(
					_debois$elm_mdl$Material_Component$LayoutMsg(_p15));
			},
			_debois$elm_mdl$Material_Layout$subscriptions(
				_debois$elm_mdl$Material_Layout$get(_p14)));
	};
};
var _debois$elm_mdl$Material_Layout$ToggleDrawer = {ctor: 'ToggleDrawer'};
var _debois$elm_mdl$Material_Layout$drawerButton = F2(
	function (lift, isVisible) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$classList(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'mdl-layout__drawer-button', _1: true},
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html_Attributes$attribute,
								'aria-expanded',
								isVisible ? 'true' : 'false'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$tabindex(1),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onClick(
										lift(_debois$elm_mdl$Material_Layout$ToggleDrawer)),
									_1: {
										ctor: '::',
										_0: A3(
											_elm_lang$html$Html_Events$onWithOptions,
											'keydown',
											{stopPropagation: false, preventDefault: false},
											A2(
												_elm_lang$core$Json_Decode$map,
												function (_p16) {
													return lift(
														function (key) {
															var _p17 = key;
															switch (_p17) {
																case 32:
																	return _debois$elm_mdl$Material_Layout$ToggleDrawer;
																case 13:
																	return _debois$elm_mdl$Material_Layout$ToggleDrawer;
																default:
																	return _debois$elm_mdl$Material_Layout$NOP;
															}
														}(_p16));
												},
												_elm_lang$html$Html_Events$keyCode)),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					{
						ctor: '::',
						_0: _debois$elm_mdl$Material_Icon$i('menu'),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	});
var _debois$elm_mdl$Material_Layout$obfuscator = F2(
	function (lift, isVisible) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'mdl-layout__obfuscator', _1: true},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'is-visible', _1: isVisible},
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Events$onClick(
						lift(_debois$elm_mdl$Material_Layout$ToggleDrawer)),
					_1: {ctor: '[]'}
				}
			},
			{ctor: '[]'});
	});
var _debois$elm_mdl$Material_Layout$toggleDrawer = function (lift) {
	return function (_p18) {
		return lift(
			_debois$elm_mdl$Material_Component$LayoutMsg(_p18));
	}(_debois$elm_mdl$Material_Layout$ToggleDrawer);
};
var _debois$elm_mdl$Material_Layout$Waterfall = function (a) {
	return {ctor: 'Waterfall', _0: a};
};
var _debois$elm_mdl$Material_Layout$waterfall = function (_p19) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (b, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						mode: _debois$elm_mdl$Material_Layout$Waterfall(b)
					});
			})(_p19));
};
var _debois$elm_mdl$Material_Layout$Scrolling = {ctor: 'Scrolling'};
var _debois$elm_mdl$Material_Layout$scrolling = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{mode: _debois$elm_mdl$Material_Layout$Scrolling});
	});
var _debois$elm_mdl$Material_Layout$Seamed = {ctor: 'Seamed'};
var _debois$elm_mdl$Material_Layout$seamed = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{mode: _debois$elm_mdl$Material_Layout$Seamed});
	});
var _debois$elm_mdl$Material_Layout$Standard = {ctor: 'Standard'};
var _debois$elm_mdl$Material_Layout$defaultConfig = {fixedHeader: false, fixedDrawer: false, fixedTabs: false, rippleTabs: true, mode: _debois$elm_mdl$Material_Layout$Standard, onSelectTab: _elm_lang$core$Maybe$Nothing, selectedTab: -1, moreTabs: false, transparentHeader: false};
var _debois$elm_mdl$Material_Layout$headerView = F4(
	function (lift, config, model, _p20) {
		var _p21 = _p20;
		var mode = function () {
			var _p22 = config.mode;
			switch (_p22.ctor) {
				case 'Standard':
					return _debois$elm_mdl$Material_Options$nop;
				case 'Scrolling':
					return _debois$elm_mdl$Material_Options$cs('mdl-layout__header--scroll');
				case 'Seamed':
					return _debois$elm_mdl$Material_Options$cs('mdl-layout__header--seamed');
				default:
					if (_p22._0 === true) {
						return _debois$elm_mdl$Material_Options$cs('mdl-layout__header--waterfall mdl-layout__header--waterfall-hide-top');
					} else {
						return _debois$elm_mdl$Material_Options$cs('mdl-layout__header--waterfall');
					}
			}
		}();
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$header,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-layout__header'),
				_1: {
					ctor: '::',
					_0: A2(
						_debois$elm_mdl$Material_Options$when,
						_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Standard) || (_debois$elm_mdl$Material_Layout$isWaterfall(config.mode) && model.isCompact),
						_debois$elm_mdl$Material_Options$cs('is-casting-shadow')),
					_1: {
						ctor: '::',
						_0: A2(
							_debois$elm_mdl$Material_Options$when,
							model.isAnimating,
							_debois$elm_mdl$Material_Options$cs('is-animating')),
						_1: {
							ctor: '::',
							_0: A2(
								_debois$elm_mdl$Material_Options$when,
								model.isCompact,
								_debois$elm_mdl$Material_Options$cs('is-compact')),
							_1: {
								ctor: '::',
								_0: mode,
								_1: {
									ctor: '::',
									_0: A2(
										_debois$elm_mdl$Material_Options$when,
										config.transparentHeader,
										_debois$elm_mdl$Material_Options$cs('mdl-layout__header--transparent')),
									_1: {
										ctor: '::',
										_0: _debois$elm_mdl$Material_Options$onClick(
											lift(
												_debois$elm_mdl$Material_Layout$TransitionHeader(
													{toCompact: false, fixedHeader: config.fixedHeader}))),
										_1: {
											ctor: '::',
											_0: A2(
												_debois$elm_mdl$Material_Options$on,
												'transitionend',
												_elm_lang$core$Json_Decode$succeed(
													lift(_debois$elm_mdl$Material_Layout$TransitionEnd))),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			},
			A2(
				_elm_lang$core$List$concatMap,
				function (x) {
					return x;
				},
				{
					ctor: '::',
					_0: _debois$elm_mdl$Material_Layout$toList(_p21._0),
					_1: {
						ctor: '::',
						_0: _p21._1,
						_1: {
							ctor: '::',
							_0: _debois$elm_mdl$Material_Layout$toList(_p21._2),
							_1: {ctor: '[]'}
						}
					}
				}));
	});
var _debois$elm_mdl$Material_Layout$Right = {ctor: 'Right'};
var _debois$elm_mdl$Material_Layout$Left = {ctor: 'Left'};
var _debois$elm_mdl$Material_Layout$tabsView = F4(
	function (lift, config, model, _p23) {
		var _p24 = _p23;
		var _p27 = _p24._1;
		var chevron = F2(
			function (direction, offset) {
				var dir = function () {
					var _p25 = direction;
					if (_p25.ctor === 'Left') {
						return 'left';
					} else {
						return 'right';
					}
				}();
				return A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar-button'),
						_1: {
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options$cs(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'mdl-layout__tab-bar-',
									A2(_elm_lang$core$Basics_ops['++'], dir, '-button'))),
							_1: {
								ctor: '::',
								_0: A2(
									_debois$elm_mdl$Material_Options$when,
									(_elm_lang$core$Native_Utils.eq(direction, _debois$elm_mdl$Material_Layout$Left) && model.tabScrollState.canScrollLeft) || (_elm_lang$core$Native_Utils.eq(direction, _debois$elm_mdl$Material_Layout$Right) && model.tabScrollState.canScrollRight),
									_debois$elm_mdl$Material_Options$cs('is-active')),
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$many(_p27),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					{
						ctor: '::',
						_0: A2(
							_debois$elm_mdl$Material_Icon$view,
							A2(_elm_lang$core$Basics_ops['++'], 'chevron_', dir),
							{
								ctor: '::',
								_0: _debois$elm_mdl$Material_Icon$size24,
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options_Internal$attribute(
										A2(
											_elm_lang$html$Html_Attributes$attribute,
											'onclick',
											A2(
												_elm_lang$core$Basics_ops['++'],
												'document.getElementsByClassName(\'mdl-layout__tab-bar\')[0].scrollLeft += ',
												_elm_lang$core$Basics$toString(offset)))),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					});
			});
		return A2(
			_debois$elm_mdl$Material_Options$div,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar-container'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(chevron, _debois$elm_mdl$Material_Layout$Left, -100),
				_1: {
					ctor: '::',
					_0: A2(
						_debois$elm_mdl$Material_Options$div,
						{
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar'),
							_1: {
								ctor: '::',
								_0: A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
								_1: {
									ctor: '::',
									_0: A2(_debois$elm_mdl$Material_Options$css, 'scroll-behavior', 'smooth'),
									_1: {
										ctor: '::',
										_0: config.rippleTabs ? _debois$elm_mdl$Material_Options$many(
											{
												ctor: '::',
												_0: _debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
												_1: {
													ctor: '::',
													_0: _debois$elm_mdl$Material_Options$cs('mds-js-ripple-effect--ignore-events'),
													_1: {ctor: '[]'}
												}
											}) : _debois$elm_mdl$Material_Options$nop,
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Standard) ? _debois$elm_mdl$Material_Options$cs('is-casting-shadow') : _debois$elm_mdl$Material_Options$nop,
											_1: {
												ctor: '::',
												_0: _debois$elm_mdl$Material_Options$many(_p27),
												_1: {
													ctor: '::',
													_0: _debois$elm_mdl$Material_Options_Internal$attribute(
														A2(
															_elm_lang$html$Html_Events$on,
															'scroll',
															_debois$elm_dom$DOM$target(
																A4(
																	_elm_lang$core$Json_Decode$map3,
																	F3(
																		function (scrollWidth, clientWidth, scrollLeft) {
																			return lift(
																				_debois$elm_mdl$Material_Layout$ScrollTab(
																					{
																						canScrollLeft: _elm_lang$core$Native_Utils.cmp(scrollLeft, 0) > 0,
																						canScrollRight: _elm_lang$core$Native_Utils.cmp(scrollWidth - clientWidth, scrollLeft + 1) > 0,
																						width: _elm_lang$core$Maybe$Just(scrollWidth)
																					}));
																		}),
																	A2(_elm_lang$core$Json_Decode$field, 'scrollWidth', _elm_lang$core$Json_Decode$float),
																	A2(_elm_lang$core$Json_Decode$field, 'clientWidth', _elm_lang$core$Json_Decode$float),
																	A2(_elm_lang$core$Json_Decode$field, 'scrollLeft', _elm_lang$core$Json_Decode$float))))),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						},
						A2(
							_elm_lang$core$List$indexedMap,
							F2(
								function (tabIndex, tab) {
									return A3(
										_debois$elm_mdl$Material_Helpers$filter,
										_elm_lang$html$Html$a,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$classList(
												{
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'mdl-layout__tab', _1: true},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'is-active',
															_1: _elm_lang$core$Native_Utils.eq(tabIndex, config.selectedTab)
														},
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$core$Maybe$withDefault,
													_debois$elm_mdl$Material_Helpers$noAttr,
													A2(
														_elm_lang$core$Maybe$map,
														F2(
															function (x, y) {
																return y(x);
															})(tabIndex),
														config.onSelectTab)),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: _elm_lang$core$Maybe$Just(tab),
											_1: {
												ctor: '::',
												_0: config.rippleTabs ? _elm_lang$core$Maybe$Just(
													A2(
														_elm_lang$html$Html$map,
														function (_p26) {
															return lift(
																A2(_debois$elm_mdl$Material_Layout$Ripple, tabIndex, _p26));
														},
														A2(
															_debois$elm_mdl$Material_Ripple$view,
															{
																ctor: '::',
																_0: _elm_lang$html$Html_Attributes$class('mdl-layout__tab-ripple-container'),
																_1: {ctor: '[]'}
															},
															A2(
																_elm_lang$core$Maybe$withDefault,
																_debois$elm_mdl$Material_Ripple$model,
																A2(_elm_lang$core$Dict$get, tabIndex, model.ripples))))) : _elm_lang$core$Maybe$Nothing,
												_1: {ctor: '[]'}
											}
										});
								}),
							_p24._0)),
					_1: {
						ctor: '::',
						_0: A2(chevron, _debois$elm_mdl$Material_Layout$Right, 100),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _debois$elm_mdl$Material_Layout$view = F4(
	function (lift, model, options, _p28) {
		var _p29 = _p28;
		var _p37 = _p29.tabs;
		var _p36 = _p29.header;
		var _p35 = _p29.drawer;
		var hasDrawer = !_elm_lang$core$Native_Utils.eq(
			_p35,
			{ctor: '[]'});
		var hasTabs = !_elm_lang$core$List$isEmpty(
			_elm_lang$core$Tuple$first(_p37));
		var hasHeader = hasTabs || (!_elm_lang$core$List$isEmpty(_p36));
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Layout$defaultConfig, options);
		var config = summary.config;
		var drawerIsFixed = config.fixedDrawer && (!model.isSmallScreen);
		var drawerIsVisible = model.isDrawerOpen && (!drawerIsFixed);
		var _p30 = function () {
			var _p31 = {ctor: '_Tuple3', _0: _p35, _1: _p36, _2: config.fixedHeader};
			if ((_p31.ctor === '_Tuple3') && (_p31._0.ctor === '::')) {
				if ((_p31._1.ctor === '::') && (_p31._2 === true)) {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Nothing,
						_1: _elm_lang$core$Maybe$Just(
							A2(_debois$elm_mdl$Material_Layout$drawerButton, lift, drawerIsVisible))
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Just(
							A2(_debois$elm_mdl$Material_Layout$drawerButton, lift, drawerIsVisible)),
						_1: _elm_lang$core$Maybe$Nothing
					};
				}
			} else {
				return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing};
			}
		}();
		var contentDrawerButton = _p30._0;
		var headerDrawerButton = _p30._1;
		var tabsElems = (!hasTabs) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A4(_debois$elm_mdl$Material_Layout$tabsView, lift, config, model, _p37));
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'mdl-layout__container', _1: true},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'has-scrolling-header',
								_1: _elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling)
							},
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A3(
					_debois$elm_mdl$Material_Helpers$filter,
					_elm_lang$html$Html_Keyed$node('div'),
					A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						{
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$classList(
									{
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'mdl-layout ', _1: true},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'is-upgraded', _1: true},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'is-small-screen', _1: model.isSmallScreen},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'has-drawer', _1: hasDrawer},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'has-tabs', _1: hasTabs},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'mdl-js-layout', _1: true},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'mdl-layout--fixed-drawer', _1: config.fixedDrawer && hasDrawer},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 'mdl-layout--fixed-header', _1: config.fixedHeader && hasHeader},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 'mdl-layout--fixed-tabs', _1: config.fixedTabs && hasTabs},
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									})),
							_1: {
								ctor: '::',
								_0: drawerIsVisible ? _elm_lang$core$Maybe$Just(
									A2(
										_elm_lang$html$Html_Events$on,
										'keydown',
										A2(
											_elm_lang$core$Json_Decode$map,
											function (_p32) {
												return lift(
													function (key) {
														return _elm_lang$core$Native_Utils.eq(key, 27) ? _debois$elm_mdl$Material_Layout$ToggleDrawer : _debois$elm_mdl$Material_Layout$NOP;
													}(_p32));
											},
											_elm_lang$html$Html_Events$keyCode))) : _elm_lang$core$Maybe$Nothing,
								_1: {ctor: '[]'}
							}
						}),
					{
						ctor: '::',
						_0: hasHeader ? _elm_lang$core$Maybe$Just(
							A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'elm-mdl-header',
								A4(
									_debois$elm_mdl$Material_Layout$headerView,
									lift,
									config,
									model,
									{ctor: '_Tuple3', _0: headerDrawerButton, _1: _p36, _2: tabsElems}))) : _elm_lang$core$Maybe$Nothing,
						_1: {
							ctor: '::',
							_0: (!hasDrawer) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
								{
									ctor: '_Tuple2',
									_0: 'elm-mdl-drawer',
									_1: A3(_debois$elm_mdl$Material_Layout$drawerView, lift, drawerIsVisible, _p35)
								}),
							_1: {
								ctor: '::',
								_0: (!hasDrawer) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
									{
										ctor: '_Tuple2',
										_0: 'elm-mdl-obfuscator',
										_1: A2(_debois$elm_mdl$Material_Layout$obfuscator, lift, drawerIsVisible)
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$core$Maybe$map,
										F2(
											function (v0, v1) {
												return {ctor: '_Tuple2', _0: v0, _1: v1};
											})('elm-drawer-button'),
										contentDrawerButton),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Maybe$Just(
											A2(
												F2(
													function (v0, v1) {
														return {ctor: '_Tuple2', _0: v0, _1: v1};
													}),
												_elm_lang$core$Basics$toString(config.selectedTab),
												A3(
													_debois$elm_mdl$Material_Options$styled,
													_elm_lang$html$Html$main_,
													{
														ctor: '::',
														_0: _debois$elm_mdl$Material_Options$id(_debois$elm_mdl$Material_Layout$mainId),
														_1: {
															ctor: '::',
															_0: _debois$elm_mdl$Material_Options$cs('mdl-layout__content'),
															_1: {
																ctor: '::',
																_0: A2(
																	_debois$elm_mdl$Material_Options$when,
																	_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader,
																	A2(_debois$elm_mdl$Material_Options$css, 'overflow-y', 'visible')),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_debois$elm_mdl$Material_Options$when,
																		_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader,
																		A2(_debois$elm_mdl$Material_Options$css, 'overflow-x', 'visible')),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_debois$elm_mdl$Material_Options$when,
																			_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader,
																			A2(_debois$elm_mdl$Material_Options$css, 'overflow', 'visible')),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_debois$elm_mdl$Material_Options$when,
																				_debois$elm_mdl$Material_Layout$isWaterfall(config.mode),
																				function (_p33) {
																					return _debois$elm_mdl$Material_Options_Internal$attribute(
																						A2(_elm_lang$html$Html_Events$on, 'scroll', _p33));
																				}(
																					A2(
																						_elm_lang$core$Json_Decode$map,
																						function (_p34) {
																							return lift(
																								A2(_debois$elm_mdl$Material_Layout$ScrollPane, config.fixedHeader, _p34));
																						},
																						_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$scrollTop)))),
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													},
													_p29.main))),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			});
	});
var _debois$elm_mdl$Material_Layout$render = A3(_debois$elm_mdl$Material_Component$render1, _debois$elm_mdl$Material_Layout$get, _debois$elm_mdl$Material_Layout$view, _debois$elm_mdl$Material_Component$LayoutMsg);

var _debois$elm_mdl$Material_Toggles$group = function (_p0) {
	return _debois$elm_mdl$Material_Options$attribute(
		_elm_lang$html$Html_Attributes$name(_p0));
};
var _debois$elm_mdl$Material_Toggles$value = function (_p1) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (b, options) {
				return _elm_lang$core$Native_Utils.update(
					options,
					{value: b});
			})(_p1));
};
var _debois$elm_mdl$Material_Toggles$disabled = _debois$elm_mdl$Material_Options_Internal$attribute(
	_elm_lang$html$Html_Attributes$disabled(true));
var _debois$elm_mdl$Material_Toggles$ripple = _debois$elm_mdl$Material_Options_Internal$option(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Toggles$defaultConfig = {
	value: false,
	ripple: false,
	input: {ctor: '[]'},
	container: {ctor: '[]'}
};
var _debois$elm_mdl$Material_Toggles$defaultModel = {ripple: _debois$elm_mdl$Material_Ripple$model, isFocused: false};
var _debois$elm_mdl$Material_Toggles$_p2 = A3(
	_debois$elm_mdl$Material_Component$indexed,
	function (_) {
		return _.toggles;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{toggles: x});
		}),
	_debois$elm_mdl$Material_Toggles$defaultModel);
var _debois$elm_mdl$Material_Toggles$get = _debois$elm_mdl$Material_Toggles$_p2._0;
var _debois$elm_mdl$Material_Toggles$set = _debois$elm_mdl$Material_Toggles$_p2._1;
var _debois$elm_mdl$Material_Toggles$Model = F2(
	function (a, b) {
		return {ripple: a, isFocused: b};
	});
var _debois$elm_mdl$Material_Toggles$Config = F4(
	function (a, b, c, d) {
		return {value: a, ripple: b, input: c, container: d};
	});
var _debois$elm_mdl$Material_Toggles$SetFocus = function (a) {
	return {ctor: 'SetFocus', _0: a};
};
var _debois$elm_mdl$Material_Toggles$Ripple = function (a) {
	return {ctor: 'Ripple', _0: a};
};
var _debois$elm_mdl$Material_Toggles$update = F2(
	function (action, model) {
		var _p3 = action;
		if (_p3.ctor === 'Ripple') {
			return A2(
				_debois$elm_mdl$Material_Helpers$map2nd,
				_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Material_Toggles$Ripple),
				A2(
					_debois$elm_mdl$Material_Helpers$map1st,
					function (r) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{ripple: r});
					},
					A2(_debois$elm_mdl$Material_Ripple$update, _p3._0, model.ripple)));
		} else {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isFocused: _p3._0}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		}
	});
var _debois$elm_mdl$Material_Toggles$react = A4(
	_debois$elm_mdl$Material_Component$react,
	_debois$elm_mdl$Material_Toggles$get,
	_debois$elm_mdl$Material_Toggles$set,
	_debois$elm_mdl$Material_Component$TogglesMsg,
	_debois$elm_mdl$Material_Component$generalise(_debois$elm_mdl$Material_Toggles$update));
var _debois$elm_mdl$Material_Toggles$top = F5(
	function (lift, kind, model, summary, elems) {
		var cfg = summary.config;
		return A4(
			_debois$elm_mdl$Material_Options_Internal$applyContainer,
			summary,
			_elm_lang$html$Html$label,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs(
					A2(_elm_lang$core$Basics_ops['++'], 'mdl-', kind)),
				_1: {
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options$cs(
						A2(_elm_lang$core$Basics_ops['++'], 'mdl-js-', kind)),
					_1: {
						ctor: '::',
						_0: A2(
							_debois$elm_mdl$Material_Options$when,
							cfg.ripple,
							_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect')),
						_1: {
							ctor: '::',
							_0: A2(
								_debois$elm_mdl$Material_Options$when,
								cfg.ripple,
								_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect--ignore-events')),
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options$cs('is-upgraded'),
								_1: {
									ctor: '::',
									_0: A2(
										_debois$elm_mdl$Material_Options$when,
										cfg.value,
										_debois$elm_mdl$Material_Options$cs('is-checked')),
									_1: {
										ctor: '::',
										_0: A2(
											_debois$elm_mdl$Material_Options$when,
											model.isFocused,
											_debois$elm_mdl$Material_Options$cs('is-focused')),
										_1: {
											ctor: '::',
											_0: A3(
												_debois$elm_mdl$Material_Options_Internal$on1,
												'focus',
												lift,
												_debois$elm_mdl$Material_Toggles$SetFocus(true)),
											_1: {
												ctor: '::',
												_0: A3(
													_debois$elm_mdl$Material_Options_Internal$on1,
													'blur',
													lift,
													_debois$elm_mdl$Material_Toggles$SetFocus(false)),
												_1: {
													ctor: '::',
													_0: _debois$elm_mdl$Material_Options_Internal$attribute(
														_debois$elm_mdl$Material_Helpers$blurOn('mouseup')),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			_elm_lang$core$List$concat(
				{
					ctor: '::',
					_0: elems,
					_1: {
						ctor: '::',
						_0: cfg.ripple ? {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$map,
								function (_p4) {
									return lift(
										_debois$elm_mdl$Material_Toggles$Ripple(_p4));
								},
								A2(
									_debois$elm_mdl$Material_Ripple$view,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center'),
										_1: {ctor: '[]'}
									},
									model.ripple)),
							_1: {ctor: '[]'}
						} : {ctor: '[]'},
						_1: {ctor: '[]'}
					}
				}));
	});
var _debois$elm_mdl$Material_Toggles$viewCheckbox = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'checkbox',
			model,
			summary,
			{
				ctor: '::',
				_0: A4(
					_debois$elm_mdl$Material_Options_Internal$applyInput,
					summary,
					_elm_lang$html$Html$input,
					{
						ctor: '::',
						_0: _debois$elm_mdl$Material_Options$cs('mdl-checkbox__input'),
						_1: {
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options_Internal$attribute(
								_elm_lang$html$Html_Attributes$type_('checkbox')),
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options_Internal$attribute(
									_elm_lang$html$Html_Attributes$checked(summary.config.value)),
								_1: {ctor: '[]'}
							}
						}
					},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$span,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('mdl-checkbox__label'),
							_1: {ctor: '[]'}
						},
						elems),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$span,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('mdl-checkbox__focus-helper'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$span,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('mdl-checkbox__box-outline'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$span,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('mdl-checkbox__tick-outline'),
											_1: {ctor: '[]'}
										},
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _debois$elm_mdl$Material_Toggles$checkbox = A3(_debois$elm_mdl$Material_Component$render, _debois$elm_mdl$Material_Toggles$get, _debois$elm_mdl$Material_Toggles$viewCheckbox, _debois$elm_mdl$Material_Component$TogglesMsg);
var _debois$elm_mdl$Material_Toggles$viewSwitch = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'switch',
			model,
			summary,
			{
				ctor: '::',
				_0: A4(
					_debois$elm_mdl$Material_Options_Internal$applyInput,
					summary,
					_elm_lang$html$Html$input,
					{
						ctor: '::',
						_0: _debois$elm_mdl$Material_Options$cs('mdl-switch__input'),
						_1: {
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options_Internal$attribute(
								_elm_lang$html$Html_Attributes$type_('checkbox')),
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options_Internal$attribute(
									_elm_lang$html$Html_Attributes$checked(summary.config.value)),
								_1: {ctor: '[]'}
							}
						}
					},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$span,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('mdl-switch__label'),
							_1: {ctor: '[]'}
						},
						elems),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('mdl-switch__track'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('mdl-switch__thumb'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$span,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('mdl-switch__focus-helper'),
											_1: {ctor: '[]'}
										},
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _debois$elm_mdl$Material_Toggles$switch = A3(_debois$elm_mdl$Material_Component$render, _debois$elm_mdl$Material_Toggles$get, _debois$elm_mdl$Material_Toggles$viewSwitch, _debois$elm_mdl$Material_Component$TogglesMsg);
var _debois$elm_mdl$Material_Toggles$viewRadio = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'radio',
			model,
			summary,
			{
				ctor: '::',
				_0: A4(
					_debois$elm_mdl$Material_Options_Internal$applyInput,
					summary,
					_elm_lang$html$Html$input,
					{
						ctor: '::',
						_0: _debois$elm_mdl$Material_Options$cs('mdl-radio__button'),
						_1: {
							ctor: '::',
							_0: _debois$elm_mdl$Material_Options$attribute(
								_elm_lang$html$Html_Attributes$type_('radio')),
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options$attribute(
									_elm_lang$html$Html_Attributes$checked(summary.config.value)),
								_1: {ctor: '[]'}
							}
						}
					},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$span,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('mdl-radio__label'),
							_1: {ctor: '[]'}
						},
						elems),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$span,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('mdl-radio__outer-circle'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$span,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('mdl-radio__inner-circle'),
									_1: {ctor: '[]'}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _debois$elm_mdl$Material_Toggles$radio = A3(_debois$elm_mdl$Material_Component$render, _debois$elm_mdl$Material_Toggles$get, _debois$elm_mdl$Material_Toggles$viewRadio, _debois$elm_mdl$Material_Component$TogglesMsg);

var _debois$elm_mdl$Material_Tooltip$element = function (elem) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{elem: elem});
		});
};
var _debois$elm_mdl$Material_Tooltip$isTooltipClass = function (path) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function ($class) {
			return A2(_elm_lang$core$String$contains, 'mdl-tooltip', $class) ? _elm_lang$core$Json_Decode$succeed(true) : _elm_lang$core$Json_Decode$succeed(false);
		},
		A2(_elm_lang$core$Json_Decode$at, path, _debois$elm_dom$DOM$className));
};
var _debois$elm_mdl$Material_Tooltip$sibling = function (d) {
	var valid = function (path) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (res) {
				return res ? A2(_elm_lang$core$Json_Decode$at, path, d) : _elm_lang$core$Json_Decode$fail('');
			},
			_debois$elm_mdl$Material_Tooltip$isTooltipClass(path));
	};
	var createPath = function (depth) {
		var parents = A2(_elm_lang$core$List$repeat, depth, 'parentElement');
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: 'target',
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				parents,
				{
					ctor: '::',
					_0: 'nextSibling',
					_1: {ctor: '[]'}
				}));
	};
	var paths = A2(
		_elm_lang$core$List$map,
		createPath,
		A2(_elm_lang$core$List$range, 0, 4));
	return _elm_lang$core$Json_Decode$oneOf(
		A2(_elm_lang$core$List$map, valid, paths));
};
var _debois$elm_mdl$Material_Tooltip$update = F2(
	function (action, model) {
		var _p0 = action;
		if (_p0.ctor === 'Enter') {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isActive: true, domState: _p0._0}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isActive: false}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		}
	});
var _debois$elm_mdl$Material_Tooltip$calculatePos = F2(
	function (pos, domState) {
		var getValuesFor = F2(
			function (l, r) {
				return (_elm_lang$core$Native_Utils.cmp(l + r, 0) < 0) ? {ctor: '_Tuple2', _0: 0, _1: 0} : {ctor: '_Tuple2', _0: l, _1: r};
			});
		var offsetHeight = domState.offsetHeight;
		var marginTop = -1 * (offsetHeight / 2);
		var offsetWidth = domState.offsetWidth;
		var marginLeft = -1 * (offsetWidth / 2);
		var props = domState.rect;
		var left = props.left + (props.width / 2);
		var _p1 = A2(getValuesFor, left, marginLeft);
		var newLeft = _p1._0;
		var newMarginLeft = _p1._1;
		var top = props.top + (props.height / 2);
		var _p2 = A2(getValuesFor, top, marginTop);
		var newTop = _p2._0;
		var newMarginTop = _p2._1;
		var out = function () {
			var _p3 = pos;
			switch (_p3.ctor) {
				case 'Left':
					return {left: (props.left - offsetWidth) - 10, top: newTop, marginTop: newMarginTop, marginLeft: 0};
				case 'Right':
					return {left: (props.left + props.width) + 10, top: newTop, marginTop: newMarginTop, marginLeft: 0};
				case 'Top':
					return {left: newLeft, top: (props.top - offsetHeight) - 10, marginTop: 0, marginLeft: newMarginLeft};
				default:
					return {left: newLeft, top: (props.top + props.height) + 10, marginTop: 0, marginLeft: newMarginLeft};
			}
		}();
		return out;
	});
var _debois$elm_mdl$Material_Tooltip$defaultDOMState = {
	rect: {left: 0, top: 0, width: 0, height: 0},
	offsetWidth: 0,
	offsetHeight: 0
};
var _debois$elm_mdl$Material_Tooltip$defaultPos = {left: 0, top: 0, marginLeft: 0, marginTop: 0};
var _debois$elm_mdl$Material_Tooltip$defaultModel = {isActive: false, domState: _debois$elm_mdl$Material_Tooltip$defaultDOMState};
var _debois$elm_mdl$Material_Tooltip$_p4 = A3(
	_debois$elm_mdl$Material_Component$indexed,
	function (_) {
		return _.tooltip;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{tooltip: x});
		}),
	_debois$elm_mdl$Material_Tooltip$defaultModel);
var _debois$elm_mdl$Material_Tooltip$get = _debois$elm_mdl$Material_Tooltip$_p4._0;
var _debois$elm_mdl$Material_Tooltip$set = _debois$elm_mdl$Material_Tooltip$_p4._1;
var _debois$elm_mdl$Material_Tooltip$react = A4(
	_debois$elm_mdl$Material_Component$react,
	_debois$elm_mdl$Material_Tooltip$get,
	_debois$elm_mdl$Material_Tooltip$set,
	_debois$elm_mdl$Material_Component$TooltipMsg,
	_debois$elm_mdl$Material_Component$generalise(_debois$elm_mdl$Material_Tooltip$update));
var _debois$elm_mdl$Material_Tooltip$Model = F2(
	function (a, b) {
		return {isActive: a, domState: b};
	});
var _debois$elm_mdl$Material_Tooltip$Pos = F4(
	function (a, b, c, d) {
		return {left: a, top: b, marginLeft: c, marginTop: d};
	});
var _debois$elm_mdl$Material_Tooltip$DOMState = F3(
	function (a, b, c) {
		return {rect: a, offsetWidth: b, offsetHeight: c};
	});
var _debois$elm_mdl$Material_Tooltip$stateDecoder = A4(
	_elm_lang$core$Json_Decode$map3,
	_debois$elm_mdl$Material_Tooltip$DOMState,
	_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$boundingClientRect),
	_debois$elm_mdl$Material_Tooltip$sibling(_debois$elm_dom$DOM$offsetWidth),
	_debois$elm_mdl$Material_Tooltip$sibling(_debois$elm_dom$DOM$offsetHeight));
var _debois$elm_mdl$Material_Tooltip$Config = F3(
	function (a, b, c) {
		return {size: a, position: b, elem: c};
	});
var _debois$elm_mdl$Material_Tooltip$Leave = {ctor: 'Leave'};
var _debois$elm_mdl$Material_Tooltip$onMouseLeave = F2(
	function (lift, idx) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseleave',
			_elm_lang$core$Json_Decode$succeed(
				lift(
					A2(_debois$elm_mdl$Material_Component$TooltipMsg, idx, _debois$elm_mdl$Material_Tooltip$Leave))));
	});
var _debois$elm_mdl$Material_Tooltip$onLeave = function (lift) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		A2(
			_elm_lang$core$Json_Decode$map,
			lift,
			_elm_lang$core$Json_Decode$succeed(_debois$elm_mdl$Material_Tooltip$Leave)));
};
var _debois$elm_mdl$Material_Tooltip$Enter = function (a) {
	return {ctor: 'Enter', _0: a};
};
var _debois$elm_mdl$Material_Tooltip$onMouseEnter = F2(
	function (lift, idx) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseenter',
			A2(
				_elm_lang$core$Json_Decode$map,
				function (_p5) {
					return lift(
						A2(
							_debois$elm_mdl$Material_Component$TooltipMsg,
							idx,
							_debois$elm_mdl$Material_Tooltip$Enter(_p5)));
				},
				_debois$elm_mdl$Material_Tooltip$stateDecoder));
	});
var _debois$elm_mdl$Material_Tooltip$attach = F2(
	function (lift, index) {
		return _debois$elm_mdl$Material_Options$many(
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options_Internal$attribute(
					A2(_debois$elm_mdl$Material_Tooltip$onMouseEnter, lift, index)),
				_1: {
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options_Internal$attribute(
						A2(_debois$elm_mdl$Material_Tooltip$onMouseLeave, lift, index)),
					_1: {ctor: '[]'}
				}
			});
	});
var _debois$elm_mdl$Material_Tooltip$onEnter = function (lift) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		A2(
			_elm_lang$core$Json_Decode$map,
			lift,
			A2(_elm_lang$core$Json_Decode$map, _debois$elm_mdl$Material_Tooltip$Enter, _debois$elm_mdl$Material_Tooltip$stateDecoder)));
};
var _debois$elm_mdl$Material_Tooltip$Large = {ctor: 'Large'};
var _debois$elm_mdl$Material_Tooltip$large = _debois$elm_mdl$Material_Options_Internal$option(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{size: _debois$elm_mdl$Material_Tooltip$Large});
	});
var _debois$elm_mdl$Material_Tooltip$Default = {ctor: 'Default'};
var _debois$elm_mdl$Material_Tooltip$Bottom = {ctor: 'Bottom'};
var _debois$elm_mdl$Material_Tooltip$defaultConfig = {size: _debois$elm_mdl$Material_Tooltip$Default, position: _debois$elm_mdl$Material_Tooltip$Bottom, elem: _elm_lang$html$Html$div};
var _debois$elm_mdl$Material_Tooltip$view = F4(
	function (lift, model, options, content) {
		var px = function (f) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(f),
				'px');
		};
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Tooltip$defaultConfig, options);
		var config = summary.config;
		var pos = model.isActive ? A2(_debois$elm_mdl$Material_Tooltip$calculatePos, config.position, model.domState) : _debois$elm_mdl$Material_Tooltip$defaultPos;
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			config.elem,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-tooltip'),
				_1: {
					ctor: '::',
					_0: A2(
						_debois$elm_mdl$Material_Options$when,
						model.isActive,
						_debois$elm_mdl$Material_Options$cs('is-active')),
					_1: {
						ctor: '::',
						_0: A2(
							_debois$elm_mdl$Material_Options$when,
							_elm_lang$core$Native_Utils.eq(config.size, _debois$elm_mdl$Material_Tooltip$Large),
							_debois$elm_mdl$Material_Options$cs('mdl-tooltip--large')),
						_1: {
							ctor: '::',
							_0: A2(
								_debois$elm_mdl$Material_Options$when,
								model.isActive,
								A2(
									_debois$elm_mdl$Material_Options$css,
									'left',
									px(pos.left))),
							_1: {
								ctor: '::',
								_0: A2(
									_debois$elm_mdl$Material_Options$when,
									model.isActive,
									A2(
										_debois$elm_mdl$Material_Options$css,
										'margin-left',
										px(pos.marginLeft))),
								_1: {
									ctor: '::',
									_0: A2(
										_debois$elm_mdl$Material_Options$when,
										model.isActive,
										A2(
											_debois$elm_mdl$Material_Options$css,
											'top',
											px(pos.top))),
									_1: {
										ctor: '::',
										_0: A2(
											_debois$elm_mdl$Material_Options$when,
											model.isActive,
											A2(
												_debois$elm_mdl$Material_Options$css,
												'margin-top',
												px(pos.marginTop))),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			},
			content);
	});
var _debois$elm_mdl$Material_Tooltip$render = A3(_debois$elm_mdl$Material_Component$render, _debois$elm_mdl$Material_Tooltip$get, _debois$elm_mdl$Material_Tooltip$view, _debois$elm_mdl$Material_Component$TooltipMsg);
var _debois$elm_mdl$Material_Tooltip$bottom = _debois$elm_mdl$Material_Options_Internal$option(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Bottom});
	});
var _debois$elm_mdl$Material_Tooltip$Top = {ctor: 'Top'};
var _debois$elm_mdl$Material_Tooltip$top = _debois$elm_mdl$Material_Options_Internal$option(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Top});
	});
var _debois$elm_mdl$Material_Tooltip$Right = {ctor: 'Right'};
var _debois$elm_mdl$Material_Tooltip$right = _debois$elm_mdl$Material_Options_Internal$option(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Right});
	});
var _debois$elm_mdl$Material_Tooltip$Left = {ctor: 'Left'};
var _debois$elm_mdl$Material_Tooltip$left = _debois$elm_mdl$Material_Options_Internal$option(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Left});
	});

var _debois$elm_mdl$Material_Tabs$activeTab = function (_p0) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (k, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{activeTab: k});
			})(_p0));
};
var _debois$elm_mdl$Material_Tabs$onSelectTab = function (_p1) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (k, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						onSelectTab: _elm_lang$core$Maybe$Just(k)
					});
			})(_p1));
};
var _debois$elm_mdl$Material_Tabs$ripple = _debois$elm_mdl$Material_Options_Internal$option(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Tabs$defaultConfig = {ripple: false, onSelectTab: _elm_lang$core$Maybe$Nothing, activeTab: 0};
var _debois$elm_mdl$Material_Tabs$defaultModel = {ripples: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Material_Tabs$_p2 = A3(
	_debois$elm_mdl$Material_Component$indexed,
	function (_) {
		return _.tabs;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{tabs: x});
		}),
	_debois$elm_mdl$Material_Tabs$defaultModel);
var _debois$elm_mdl$Material_Tabs$get = _debois$elm_mdl$Material_Tabs$_p2._0;
var _debois$elm_mdl$Material_Tabs$set = _debois$elm_mdl$Material_Tabs$_p2._1;
var _debois$elm_mdl$Material_Tabs$Model = function (a) {
	return {ripples: a};
};
var _debois$elm_mdl$Material_Tabs$Config = F3(
	function (a, b, c) {
		return {ripple: a, onSelectTab: b, activeTab: c};
	});
var _debois$elm_mdl$Material_Tabs$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Tabs$update = F2(
	function (action, model) {
		var _p3 = action;
		var _p5 = _p3._0;
		var _p4 = A2(
			_debois$elm_mdl$Material_Ripple$update,
			_p3._1,
			A2(
				_elm_lang$core$Maybe$withDefault,
				_debois$elm_mdl$Material_Ripple$model,
				A2(_elm_lang$core$Dict$get, _p5, model.ripples)));
		var ripple_ = _p4._0;
		var cmd = _p4._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{
					ripples: A3(_elm_lang$core$Dict$insert, _p5, ripple_, model.ripples)
				}),
			_1: A2(
				_elm_lang$core$Platform_Cmd$map,
				_debois$elm_mdl$Material_Tabs$Ripple(_p5),
				cmd)
		};
	});
var _debois$elm_mdl$Material_Tabs$react = A4(
	_debois$elm_mdl$Material_Component$react,
	_debois$elm_mdl$Material_Tabs$get,
	_debois$elm_mdl$Material_Tabs$set,
	_debois$elm_mdl$Material_Component$TabsMsg,
	_debois$elm_mdl$Material_Component$generalise(_debois$elm_mdl$Material_Tabs$update));
var _debois$elm_mdl$Material_Tabs$view = F5(
	function (lift, model, options, tabs, tabContent) {
		var wrapContent = A2(
			_elm_lang$html$Html_Keyed$node,
			'div',
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'mdl-tab__panel', _1: true},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'is-active', _1: true},
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			});
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Tabs$defaultConfig, options);
		var config = summary.config;
		var unwrapLabel = F2(
			function (tabIdx, _p6) {
				var _p7 = _p6;
				var _p9 = _p7._0._1;
				return A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$a,
					{
						ctor: '::',
						_0: _debois$elm_mdl$Material_Options$cs('mdl-tabs__tab'),
						_1: {
							ctor: '::',
							_0: A2(
								_debois$elm_mdl$Material_Options$when,
								_elm_lang$core$Native_Utils.eq(tabIdx, config.activeTab),
								_debois$elm_mdl$Material_Options$cs('is-active')),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$core$Maybe$withDefault,
									_debois$elm_mdl$Material_Options$nop,
									A2(
										_elm_lang$core$Maybe$map,
										function (t) {
											return _debois$elm_mdl$Material_Options$onClick(
												t(tabIdx));
										},
										config.onSelectTab)),
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$many(_p7._0._0),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					config.ripple ? _elm_lang$core$List$concat(
						{
							ctor: '::',
							_0: _p9,
							_1: {
								ctor: '::',
								_0: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$map,
										function (_p8) {
											return lift(
												A2(_debois$elm_mdl$Material_Tabs$Ripple, tabIdx, _p8));
										},
										A2(
											_debois$elm_mdl$Material_Ripple$view,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$classList(
													{
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'mdl-tabs__ripple-container', _1: true},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'mdl-tabs__ripple-js-effect', _1: true},
															_1: {ctor: '[]'}
														}
													}),
												_1: {ctor: '[]'}
											},
											A2(
												_elm_lang$core$Maybe$withDefault,
												_debois$elm_mdl$Material_Ripple$model,
												A2(_elm_lang$core$Dict$get, tabIdx, model.ripples)))),
									_1: {ctor: '[]'}
								},
								_1: {ctor: '[]'}
							}
						}) : _p9);
			});
		var links = A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-tabs__tab-bar'),
				_1: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$indexedMap, unwrapLabel, tabs));
		return A5(
			_debois$elm_mdl$Material_Options_Internal$apply,
			summary,
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$cs('mdl-tabs'),
				_1: {
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options$cs('mdl-js-tabs'),
					_1: {
						ctor: '::',
						_0: _debois$elm_mdl$Material_Options$cs('is-upgraded'),
						_1: {
							ctor: '::',
							_0: A2(
								_debois$elm_mdl$Material_Options$when,
								config.ripple,
								_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect')),
							_1: {
								ctor: '::',
								_0: A2(
									_debois$elm_mdl$Material_Options$when,
									config.ripple,
									_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect--ignore-events')),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			},
			{ctor: '[]'},
			{
				ctor: '::',
				_0: links,
				_1: {
					ctor: '::',
					_0: wrapContent(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Basics$toString(config.activeTab),
								_1: A2(
									_elm_lang$html$Html$div,
									{ctor: '[]'},
									tabContent)
							},
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _debois$elm_mdl$Material_Tabs$render = A3(_debois$elm_mdl$Material_Component$render, _debois$elm_mdl$Material_Tabs$get, _debois$elm_mdl$Material_Tabs$view, _debois$elm_mdl$Material_Component$TabsMsg);
var _debois$elm_mdl$Material_Tabs$Label = function (a) {
	return {ctor: 'Label', _0: a};
};
var _debois$elm_mdl$Material_Tabs$label = F2(
	function (p, c) {
		return _debois$elm_mdl$Material_Tabs$Label(
			{ctor: '_Tuple2', _0: p, _1: c});
	});
var _debois$elm_mdl$Material_Tabs$textLabel = F2(
	function (p, c) {
		return A2(
			_debois$elm_mdl$Material_Tabs$label,
			p,
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(c),
				_1: {ctor: '[]'}
			});
	});

var _debois$elm_mdl$Material$init = function (lift) {
	return _debois$elm_mdl$Material_Layout$sub0(lift);
};
var _debois$elm_mdl$Material$subscriptions = F2(
	function (lift, model) {
		return _elm_lang$core$Platform_Sub$batch(
			{
				ctor: '::',
				_0: A2(_debois$elm_mdl$Material_Layout$subs, lift, model.mdl),
				_1: {
					ctor: '::',
					_0: A2(_debois$elm_mdl$Material_Menu$subs, lift, model.mdl),
					_1: {ctor: '[]'}
				}
			});
	});
var _debois$elm_mdl$Material$update_ = F3(
	function (lift, msg, store) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'ButtonMsg':
				return A4(_debois$elm_mdl$Material_Button$react, lift, _p0._1, _p0._0, store);
			case 'TextfieldMsg':
				return A4(_debois$elm_mdl$Material_Textfield$react, lift, _p0._1, _p0._0, store);
			case 'MenuMsg':
				var _p2 = _p0._0;
				return A4(
					_debois$elm_mdl$Material_Menu$react,
					function (_p1) {
						return lift(
							A2(_debois$elm_mdl$Material_Component$MenuMsg, _p2, _p1));
					},
					_p0._1,
					_p2,
					store);
			case 'LayoutMsg':
				return A3(
					_debois$elm_mdl$Material_Layout$react,
					function (_p3) {
						return lift(
							_debois$elm_mdl$Material_Component$LayoutMsg(_p3));
					},
					_p0._0,
					store);
			case 'TogglesMsg':
				return A4(_debois$elm_mdl$Material_Toggles$react, lift, _p0._1, _p0._0, store);
			case 'TooltipMsg':
				return A4(_debois$elm_mdl$Material_Tooltip$react, lift, _p0._1, _p0._0, store);
			case 'TabsMsg':
				return A4(_debois$elm_mdl$Material_Tabs$react, lift, _p0._1, _p0._0, store);
			default:
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Maybe$Nothing,
					_1: _debois$elm_mdl$Material_Dispatch$forward(_p0._0)
				};
		}
	});
var _debois$elm_mdl$Material$update = F3(
	function (lift, msg, container) {
		return A2(
			_debois$elm_mdl$Material_Helpers$map1st,
			_elm_lang$core$Maybe$withDefault(container),
			A2(
				_debois$elm_mdl$Material_Helpers$map1st,
				_elm_lang$core$Maybe$map(
					function (mdl) {
						return _elm_lang$core$Native_Utils.update(
							container,
							{mdl: mdl});
					}),
				A3(
					_debois$elm_mdl$Material$update_,
					lift,
					msg,
					function (_) {
						return _.mdl;
					}(container))));
	});
var _debois$elm_mdl$Material$model = {button: _elm_lang$core$Dict$empty, textfield: _elm_lang$core$Dict$empty, menu: _elm_lang$core$Dict$empty, snackbar: _elm_lang$core$Maybe$Nothing, layout: _debois$elm_mdl$Material_Layout$defaultModel, toggles: _elm_lang$core$Dict$empty, tooltip: _elm_lang$core$Dict$empty, tabs: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Material$Model = F8(
	function (a, b, c, d, e, f, g, h) {
		return {button: a, textfield: b, menu: c, snackbar: d, layout: e, toggles: f, tooltip: g, tabs: h};
	});

var _debois$elm_mdl$Material_Chip$hasValue = function (m) {
	var _p0 = m;
	if (_p0.ctor === 'Just') {
		return true;
	} else {
		return false;
	}
};
var _debois$elm_mdl$Material_Chip$renderItem = function (item) {
	var _p1 = item;
	switch (_p1.ctor) {
		case 'Contact':
			return A3(
				_debois$elm_mdl$Material_Options$styled,
				_p1._0,
				{
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options$cs('mdl-chip__contact'),
					_1: _p1._1
				},
				_p1._2);
		case 'Text':
			return A3(
				_debois$elm_mdl$Material_Options$styled,
				_elm_lang$html$Html$span,
				{
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options$cs('mdl-chip__text'),
					_1: _p1._0
				},
				_p1._1);
		default:
			return A3(
				_debois$elm_mdl$Material_Options$styled,
				_p1._0,
				{
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options$cs('mdl-chip__action'),
					_1: _p1._1
				},
				_p1._2);
	}
};
var _debois$elm_mdl$Material_Chip$priority = function (item) {
	var _p2 = item;
	switch (_p2.ctor) {
		case 'Contact':
			return 0;
		case 'Text':
			return 1;
		default:
			return 2;
	}
};
var _debois$elm_mdl$Material_Chip$deleteClick = function (msg) {
	return A3(
		_debois$elm_mdl$Material_Options$onWithOptions,
		'click',
		{stopPropagation: true, preventDefault: true},
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Chip$deleteLink = function (_p3) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (link, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						deleteLink: _elm_lang$core$Maybe$Just(
							_elm_lang$html$Html_Attributes$href(link))
					});
			})(_p3));
};
var _debois$elm_mdl$Material_Chip$deleteIcon = function (_p4) {
	return _debois$elm_mdl$Material_Options_Internal$option(
		F2(
			function (icon, config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						deleteIcon: _elm_lang$core$Maybe$Just(icon)
					});
			})(_p4));
};
var _debois$elm_mdl$Material_Chip$defaultConfig = {deleteIcon: _elm_lang$core$Maybe$Nothing, deleteLink: _elm_lang$core$Maybe$Nothing, deleteClick: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Chip$Config = F3(
	function (a, b, c) {
		return {deleteIcon: a, deleteLink: b, deleteClick: c};
	});
var _debois$elm_mdl$Material_Chip$Action = F3(
	function (a, b, c) {
		return {ctor: 'Action', _0: a, _1: b, _2: c};
	});
var _debois$elm_mdl$Material_Chip$action = _debois$elm_mdl$Material_Chip$Action;
var _debois$elm_mdl$Material_Chip$getActionElement = function (config) {
	var click = function () {
		var _p5 = config.deleteClick;
		if (_p5.ctor === 'Just') {
			return _debois$elm_mdl$Material_Options_Internal$attribute(_p5._0);
		} else {
			return _debois$elm_mdl$Material_Options$nop;
		}
	}();
	var link = function () {
		var _p6 = config.deleteLink;
		if (_p6.ctor === 'Just') {
			return _debois$elm_mdl$Material_Options_Internal$attribute(_p6._0);
		} else {
			return _debois$elm_mdl$Material_Options$nop;
		}
	}();
	var hasClick = _debois$elm_mdl$Material_Chip$hasValue(config.deleteClick);
	var hasLink = _debois$elm_mdl$Material_Chip$hasValue(config.deleteLink);
	var actionElement = hasLink ? _elm_lang$html$Html$a : _elm_lang$html$Html$span;
	var hasIcon = _debois$elm_mdl$Material_Chip$hasValue(config.deleteIcon);
	var icon = hasIcon ? A2(_elm_lang$core$Maybe$withDefault, '', config.deleteIcon) : ((hasLink || hasClick) ? A2(_elm_lang$core$Maybe$withDefault, 'cancel', config.deleteIcon) : '');
	var isDeletable = hasIcon || (hasLink || hasClick);
	return isDeletable ? _elm_lang$core$Maybe$Just(
		A3(
			_debois$elm_mdl$Material_Chip$action,
			actionElement,
			{
				ctor: '::',
				_0: link,
				_1: {
					ctor: '::',
					_0: click,
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_debois$elm_mdl$Material_Icon$view,
					icon,
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			})) : _elm_lang$core$Maybe$Nothing;
};
var _debois$elm_mdl$Material_Chip$chip = F3(
	function (element, props, items) {
		var isContact = A2(
			_elm_lang$core$List$any,
			function (x) {
				return _elm_lang$core$Native_Utils.eq(
					_debois$elm_mdl$Material_Chip$priority(x),
					0);
			},
			items);
		var summary = A2(_debois$elm_mdl$Material_Options_Internal$collect, _debois$elm_mdl$Material_Chip$defaultConfig, props);
		var config = summary.config;
		var action = _debois$elm_mdl$Material_Chip$getActionElement(config);
		var isDeletable = _debois$elm_mdl$Material_Chip$hasValue(action);
		var withIcon = A2(
			_elm_lang$core$Basics_ops['++'],
			function () {
				var _p7 = action;
				if (_p7.ctor === 'Just') {
					return {
						ctor: '::',
						_0: _p7._0,
						_1: {ctor: '[]'}
					};
				} else {
					return {ctor: '[]'};
				}
			}(),
			items);
		var content = A2(
			_elm_lang$core$List$map,
			_debois$elm_mdl$Material_Chip$renderItem,
			A2(_elm_lang$core$List$sortBy, _debois$elm_mdl$Material_Chip$priority, withIcon));
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			element,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: _debois$elm_mdl$Material_Options$cs('mdl-chip'),
					_1: {
						ctor: '::',
						_0: A2(
							_debois$elm_mdl$Material_Options$when,
							isContact,
							_debois$elm_mdl$Material_Options$cs('mdl-chip--contact')),
						_1: {
							ctor: '::',
							_0: A2(
								_debois$elm_mdl$Material_Options$when,
								isDeletable,
								_debois$elm_mdl$Material_Options$cs('mdl-chip--deletable')),
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options_Internal$attribute(
									_debois$elm_mdl$Material_Helpers$blurOn('mouseup')),
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options_Internal$attribute(
										_debois$elm_mdl$Material_Helpers$blurOn('mouseleave')),
									_1: {
										ctor: '::',
										_0: _debois$elm_mdl$Material_Options_Internal$attribute(
											_debois$elm_mdl$Material_Helpers$blurOn('touchend')),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				},
				props),
			content);
	});
var _debois$elm_mdl$Material_Chip$button = function (props) {
	return A2(
		_debois$elm_mdl$Material_Chip$chip,
		_elm_lang$html$Html$button,
		{
			ctor: '::',
			_0: _debois$elm_mdl$Material_Options_Internal$attribute(
				_elm_lang$html$Html_Attributes$type_('button')),
			_1: props
		});
};
var _debois$elm_mdl$Material_Chip$span = _debois$elm_mdl$Material_Chip$chip(_elm_lang$html$Html$span);
var _debois$elm_mdl$Material_Chip$Text = F2(
	function (a, b) {
		return {ctor: 'Text', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Chip$content = _debois$elm_mdl$Material_Chip$Text;
var _debois$elm_mdl$Material_Chip$text = F2(
	function (props, txt) {
		return A2(
			_debois$elm_mdl$Material_Chip$Text,
			props,
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(txt),
				_1: {ctor: '[]'}
			});
	});
var _debois$elm_mdl$Material_Chip$Contact = F3(
	function (a, b, c) {
		return {ctor: 'Contact', _0: a, _1: b, _2: c};
	});
var _debois$elm_mdl$Material_Chip$contact = _debois$elm_mdl$Material_Chip$Contact;

var _debois$elm_mdl$Material_Elevation$transition = function (duration) {
	return A2(
		_debois$elm_mdl$Material_Options$css,
		'transition',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'box-shadow ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(duration),
				'ms ease-in-out 0s')));
};
var _debois$elm_mdl$Material_Elevation$e0 = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Elevation$shadow = function (z) {
	return _debois$elm_mdl$Material_Options$cs(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'mdl-shadow--',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(z),
				'dp')));
};
var _debois$elm_mdl$Material_Elevation$e2 = _debois$elm_mdl$Material_Elevation$shadow(2);
var _debois$elm_mdl$Material_Elevation$e3 = _debois$elm_mdl$Material_Elevation$shadow(3);
var _debois$elm_mdl$Material_Elevation$e4 = _debois$elm_mdl$Material_Elevation$shadow(4);
var _debois$elm_mdl$Material_Elevation$e6 = _debois$elm_mdl$Material_Elevation$shadow(6);
var _debois$elm_mdl$Material_Elevation$e8 = _debois$elm_mdl$Material_Elevation$shadow(8);
var _debois$elm_mdl$Material_Elevation$e16 = _debois$elm_mdl$Material_Elevation$shadow(16);
var _debois$elm_mdl$Material_Elevation$e24 = _debois$elm_mdl$Material_Elevation$shadow(24);
var _debois$elm_mdl$Material_Elevation$elevations = _elm_lang$core$Array$fromList(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e0, _1: 0},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e2, _1: 2},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e3, _1: 3},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e4, _1: 4},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e6, _1: 6},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e8, _1: 8},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e16, _1: 16},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e24, _1: 24},
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	});

var _elm_community$graph$Graph_Tree$pushMany = F2(
	function (vals, queue) {
		return A3(_elm_lang$core$List$foldl, _avh4$elm_fifo$Fifo$insert, queue, vals);
	});
var _elm_community$graph$Graph_Tree$listForTraversal = F2(
	function (traversal, tree) {
		var acc = _elm_lang$core$Basics$identity;
		var f = F3(
			function (label, children, rest) {
				return function (_p0) {
					return rest(
						A2(
							F2(
								function (x, y) {
									return {ctor: '::', _0: x, _1: y};
								}),
							label,
							_p0));
				};
			});
		return A4(
			traversal,
			f,
			acc,
			tree,
			{ctor: '[]'});
	});
var _elm_community$graph$Graph_Tree$size = function (tree) {
	var _p1 = tree;
	return _p1._0;
};
var _elm_community$graph$Graph_Tree$root = function (tree) {
	var _p2 = tree;
	return _p2._1;
};
var _elm_community$graph$Graph_Tree$height = function (tree) {
	var go = F2(
		function (h, t) {
			var _p3 = _elm_community$graph$Graph_Tree$root(t);
			if (_p3.ctor === 'Just') {
				return A3(
					_elm_lang$core$List$foldl,
					function (_p4) {
						return _elm_lang$core$Basics$max(
							A2(go, h + 1, _p4));
					},
					h + 1,
					_p3._0._1);
			} else {
				return h;
			}
		});
	return A2(go, 0, tree);
};
var _elm_community$graph$Graph_Tree$levelOrder = F3(
	function (visit, acc, tree) {
		var go = F2(
			function (acc, toVisit) {
				go:
				while (true) {
					var _p5 = _avh4$elm_fifo$Fifo$remove(toVisit);
					if (_p5._0.ctor === 'Nothing') {
						return acc;
					} else {
						var _p8 = _p5._1;
						var _p6 = _elm_community$graph$Graph_Tree$root(_p5._0._0);
						if (_p6.ctor === 'Nothing') {
							var _v5 = acc,
								_v6 = _p8;
							acc = _v5;
							toVisit = _v6;
							continue go;
						} else {
							var _p7 = _p6._0._1;
							var _v7 = A3(visit, _p6._0._0, _p7, acc),
								_v8 = A2(_elm_community$graph$Graph_Tree$pushMany, _p7, _p8);
							acc = _v7;
							toVisit = _v8;
							continue go;
						}
					}
				}
			});
		return A2(
			go,
			acc,
			A2(_avh4$elm_fifo$Fifo$insert, tree, _avh4$elm_fifo$Fifo$empty));
	});
var _elm_community$graph$Graph_Tree$levelOrderList = _elm_community$graph$Graph_Tree$listForTraversal(_elm_community$graph$Graph_Tree$levelOrder);
var _elm_community$graph$Graph_Tree$postOrder = F3(
	function (visit, acc, tree) {
		var folder = _elm_lang$core$Basics$flip(
			_elm_community$graph$Graph_Tree$postOrder(visit));
		var _p9 = _elm_community$graph$Graph_Tree$root(tree);
		if (_p9.ctor === 'Nothing') {
			return acc;
		} else {
			var _p10 = _p9._0._1;
			return A3(
				visit,
				_p9._0._0,
				_p10,
				A3(_elm_lang$core$List$foldl, folder, acc, _p10));
		}
	});
var _elm_community$graph$Graph_Tree$postOrderList = _elm_community$graph$Graph_Tree$listForTraversal(_elm_community$graph$Graph_Tree$postOrder);
var _elm_community$graph$Graph_Tree$preOrder = F3(
	function (visit, acc, tree) {
		var folder = _elm_lang$core$Basics$flip(
			_elm_community$graph$Graph_Tree$preOrder(visit));
		var _p11 = _elm_community$graph$Graph_Tree$root(tree);
		if (_p11.ctor === 'Nothing') {
			return acc;
		} else {
			var _p12 = _p11._0._1;
			return A3(
				_elm_lang$core$List$foldl,
				folder,
				A3(visit, _p11._0._0, _p12, acc),
				_p12);
		}
	});
var _elm_community$graph$Graph_Tree$preOrderList = _elm_community$graph$Graph_Tree$listForTraversal(_elm_community$graph$Graph_Tree$preOrder);
var _elm_community$graph$Graph_Tree$MkTree = F2(
	function (a, b) {
		return {ctor: 'MkTree', _0: a, _1: b};
	});
var _elm_community$graph$Graph_Tree$empty = A2(_elm_community$graph$Graph_Tree$MkTree, 0, _elm_lang$core$Maybe$Nothing);
var _elm_community$graph$Graph_Tree$isEmpty = function (tree) {
	return _elm_lang$core$Native_Utils.eq(tree, _elm_community$graph$Graph_Tree$empty);
};
var _elm_community$graph$Graph_Tree$inner = F2(
	function (label, children) {
		var nonEmptyChildren = A2(
			_elm_lang$core$List$filter,
			function (_p13) {
				return !_elm_community$graph$Graph_Tree$isEmpty(_p13);
			},
			children);
		var totalSize = A3(
			_elm_lang$core$List$foldl,
			function (_p14) {
				return F2(
					function (x, y) {
						return x + y;
					})(
					_elm_community$graph$Graph_Tree$size(_p14));
			},
			1,
			nonEmptyChildren);
		return A2(
			_elm_community$graph$Graph_Tree$MkTree,
			totalSize,
			_elm_lang$core$Maybe$Just(
				{ctor: '_Tuple2', _0: label, _1: nonEmptyChildren}));
	});
var _elm_community$graph$Graph_Tree$leaf = function (val) {
	return A2(
		_elm_community$graph$Graph_Tree$inner,
		val,
		{ctor: '[]'});
};
var _elm_community$graph$Graph_Tree$unfoldTree = F2(
	function (next, seed) {
		var _p15 = next(seed);
		var label = _p15._0;
		var seeds = _p15._1;
		return A2(
			_elm_community$graph$Graph_Tree$inner,
			label,
			A2(
				_elm_lang$core$List$map,
				_elm_community$graph$Graph_Tree$unfoldTree(next),
				seeds));
	});
var _elm_community$graph$Graph_Tree$unfoldForest = F2(
	function (next, seeds) {
		return A2(
			_elm_lang$core$List$map,
			_elm_community$graph$Graph_Tree$unfoldTree(next),
			seeds);
	});

var _elm_lang$core$Native_Bitwise = function() {

return {
	and: F2(function and(a, b) { return a & b; }),
	or: F2(function or(a, b) { return a | b; }),
	xor: F2(function xor(a, b) { return a ^ b; }),
	complement: function complement(a) { return ~a; },
	shiftLeftBy: F2(function(offset, a) { return a << offset; }),
	shiftRightBy: F2(function(offset, a) { return a >> offset; }),
	shiftRightZfBy: F2(function(offset, a) { return a >>> offset; })
};

}();

var _elm_lang$core$Bitwise$shiftRightZfBy = _elm_lang$core$Native_Bitwise.shiftRightZfBy;
var _elm_lang$core$Bitwise$shiftRightBy = _elm_lang$core$Native_Bitwise.shiftRightBy;
var _elm_lang$core$Bitwise$shiftLeftBy = _elm_lang$core$Native_Bitwise.shiftLeftBy;
var _elm_lang$core$Bitwise$complement = _elm_lang$core$Native_Bitwise.complement;
var _elm_lang$core$Bitwise$xor = _elm_lang$core$Native_Bitwise.xor;
var _elm_lang$core$Bitwise$or = _elm_lang$core$Native_Bitwise.or;
var _elm_lang$core$Bitwise$and = _elm_lang$core$Native_Bitwise.and;

var _elm_community$intdict$IntDict$combineBits = F3(
	function (a, b, mask) {
		return (a & (~mask)) | (b & mask);
	});
var _elm_community$intdict$IntDict$foldr = F3(
	function (f, acc, dict) {
		foldr:
		while (true) {
			var _p0 = dict;
			switch (_p0.ctor) {
				case 'Empty':
					return acc;
				case 'Leaf':
					var _p1 = _p0._0;
					return A3(f, _p1.key, _p1.value, acc);
				default:
					var _p2 = _p0._0;
					var _v1 = f,
						_v2 = A3(_elm_community$intdict$IntDict$foldr, f, acc, _p2.right),
						_v3 = _p2.left;
					f = _v1;
					acc = _v2;
					dict = _v3;
					continue foldr;
			}
		}
	});
var _elm_community$intdict$IntDict$keys = function (dict) {
	return A3(
		_elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_community$intdict$IntDict$values = function (dict) {
	return A3(
		_elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_community$intdict$IntDict$toList = function (dict) {
	return A3(
		_elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_community$intdict$IntDict$toString = function (dict) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'IntDict.fromList ',
		_elm_lang$core$Basics$toString(
			_elm_community$intdict$IntDict$toList(dict)));
};
var _elm_community$intdict$IntDict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p3 = dict;
			switch (_p3.ctor) {
				case 'Empty':
					return acc;
				case 'Leaf':
					var _p4 = _p3._0;
					return A3(f, _p4.key, _p4.value, acc);
				default:
					var _p5 = _p3._0;
					var _v5 = f,
						_v6 = A3(_elm_community$intdict$IntDict$foldl, f, acc, _p5.left),
						_v7 = _p5.right;
					f = _v5;
					acc = _v6;
					dict = _v7;
					continue foldl;
			}
		}
	});
var _elm_community$intdict$IntDict$findMax = function (dict) {
	findMax:
	while (true) {
		var _p6 = dict;
		switch (_p6.ctor) {
			case 'Empty':
				return _elm_lang$core$Maybe$Nothing;
			case 'Leaf':
				var _p7 = _p6._0;
				return _elm_lang$core$Maybe$Just(
					{ctor: '_Tuple2', _0: _p7.key, _1: _p7.value});
			default:
				var _v9 = _p6._0.right;
				dict = _v9;
				continue findMax;
		}
	}
};
var _elm_community$intdict$IntDict$findMin = function (dict) {
	findMin:
	while (true) {
		var _p8 = dict;
		switch (_p8.ctor) {
			case 'Empty':
				return _elm_lang$core$Maybe$Nothing;
			case 'Leaf':
				var _p9 = _p8._0;
				return _elm_lang$core$Maybe$Just(
					{ctor: '_Tuple2', _0: _p9.key, _1: _p9.value});
			default:
				var _v11 = _p8._0.left;
				dict = _v11;
				continue findMin;
		}
	}
};
var _elm_community$intdict$IntDict$size = function (dict) {
	var _p10 = dict;
	switch (_p10.ctor) {
		case 'Empty':
			return 0;
		case 'Leaf':
			return 1;
		default:
			return _p10._0.size;
	}
};
var _elm_community$intdict$IntDict$isEmpty = function (dict) {
	var _p11 = dict;
	if (_p11.ctor === 'Empty') {
		return true;
	} else {
		return false;
	}
};
var _elm_community$intdict$IntDict$highestBitSet = function (n) {
	var shiftOr = F2(
		function (i, shift) {
			return i | (i >>> shift);
		});
	var n1 = A2(shiftOr, n, 1);
	var n2 = A2(shiftOr, n1, 2);
	var n3 = A2(shiftOr, n2, 4);
	var n4 = A2(shiftOr, n3, 8);
	var n5 = A2(shiftOr, n4, 16);
	return n5 & (~(n5 >>> 1));
};
var _elm_community$intdict$IntDict$signBit = _elm_community$intdict$IntDict$highestBitSet(-1);
var _elm_community$intdict$IntDict$isBranchingBitSet = function (p) {
	return function (_p12) {
		return A2(
			F2(
				function (x, y) {
					return !_elm_lang$core$Native_Utils.eq(x, y);
				}),
			0,
			p.branchingBit & (_elm_community$intdict$IntDict$signBit ^ _p12));
	};
};
var _elm_community$intdict$IntDict$higherBitMask = function (branchingBit) {
	return ~((branchingBit * 2) - 1);
};
var _elm_community$intdict$IntDict$prefixMatches = F2(
	function (p, n) {
		return _elm_lang$core$Native_Utils.eq(
			n & _elm_community$intdict$IntDict$higherBitMask(p.branchingBit),
			p.prefixBits);
	});
var _elm_community$intdict$IntDict$get = F2(
	function (key, dict) {
		get:
		while (true) {
			var _p13 = dict;
			switch (_p13.ctor) {
				case 'Empty':
					return _elm_lang$core$Maybe$Nothing;
				case 'Leaf':
					var _p14 = _p13._0;
					return _elm_lang$core$Native_Utils.eq(_p14.key, key) ? _elm_lang$core$Maybe$Just(_p14.value) : _elm_lang$core$Maybe$Nothing;
				default:
					var _p15 = _p13._0;
					if (!A2(_elm_community$intdict$IntDict$prefixMatches, _p15.prefix, key)) {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						if (A2(_elm_community$intdict$IntDict$isBranchingBitSet, _p15.prefix, key)) {
							var _v15 = key,
								_v16 = _p15.right;
							key = _v15;
							dict = _v16;
							continue get;
						} else {
							var _v17 = key,
								_v18 = _p15.left;
							key = _v17;
							dict = _v18;
							continue get;
						}
					}
			}
		}
	});
var _elm_community$intdict$IntDict$member = F2(
	function (key, dict) {
		var _p16 = A2(_elm_community$intdict$IntDict$get, key, dict);
		if (_p16.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_community$intdict$IntDict$lcp = F2(
	function (x, y) {
		var diff = x ^ y;
		var branchingBit = _elm_community$intdict$IntDict$highestBitSet(diff);
		var mask = _elm_community$intdict$IntDict$higherBitMask(branchingBit);
		var prefixBits = x & mask;
		return {prefixBits: prefixBits, branchingBit: branchingBit};
	});
var _elm_community$intdict$IntDict$isValidKey = function (k) {
	return _elm_lang$core$Native_Utils.eq(k | 0, k);
};
var _elm_community$intdict$IntDict$KeyPrefix = F2(
	function (a, b) {
		return {prefixBits: a, branchingBit: b};
	});
var _elm_community$intdict$IntDict$InnerType = F4(
	function (a, b, c, d) {
		return {prefix: a, left: b, right: c, size: d};
	});
var _elm_community$intdict$IntDict$Inner = function (a) {
	return {ctor: 'Inner', _0: a};
};
var _elm_community$intdict$IntDict$inner = F3(
	function (p, l, r) {
		var _p17 = {ctor: '_Tuple2', _0: l, _1: r};
		if (_p17._0.ctor === 'Empty') {
			return r;
		} else {
			if (_p17._1.ctor === 'Empty') {
				return l;
			} else {
				return _elm_community$intdict$IntDict$Inner(
					{
						prefix: p,
						left: l,
						right: r,
						size: _elm_community$intdict$IntDict$size(l) + _elm_community$intdict$IntDict$size(r)
					});
			}
		}
	});
var _elm_community$intdict$IntDict$Leaf = function (a) {
	return {ctor: 'Leaf', _0: a};
};
var _elm_community$intdict$IntDict$leaf = F2(
	function (k, v) {
		return _elm_community$intdict$IntDict$Leaf(
			{key: k, value: v});
	});
var _elm_community$intdict$IntDict$singleton = F2(
	function (key, value) {
		return A2(_elm_community$intdict$IntDict$leaf, key, value);
	});
var _elm_community$intdict$IntDict$Empty = {ctor: 'Empty'};
var _elm_community$intdict$IntDict$empty = _elm_community$intdict$IntDict$Empty;
var _elm_community$intdict$IntDict$update = F3(
	function (key, alter, dict) {
		var join = F2(
			function (_p19, _p18) {
				var _p20 = _p19;
				var _p24 = _p20._1;
				var _p21 = _p18;
				var _p23 = _p21._1;
				var _p22 = _p21._0;
				var prefix = A2(_elm_community$intdict$IntDict$lcp, _p20._0, _p22);
				return A2(_elm_community$intdict$IntDict$isBranchingBitSet, prefix, _p22) ? A3(_elm_community$intdict$IntDict$inner, prefix, _p24, _p23) : A3(_elm_community$intdict$IntDict$inner, prefix, _p23, _p24);
			});
		var alteredNode = function (mv) {
			var _p25 = alter(mv);
			if (_p25.ctor === 'Just') {
				return A2(_elm_community$intdict$IntDict$leaf, key, _p25._0);
			} else {
				return _elm_community$intdict$IntDict$empty;
			}
		};
		var _p26 = dict;
		switch (_p26.ctor) {
			case 'Empty':
				return alteredNode(_elm_lang$core$Maybe$Nothing);
			case 'Leaf':
				var _p27 = _p26._0;
				return _elm_lang$core$Native_Utils.eq(_p27.key, key) ? alteredNode(
					_elm_lang$core$Maybe$Just(_p27.value)) : A2(
					join,
					{
						ctor: '_Tuple2',
						_0: key,
						_1: alteredNode(_elm_lang$core$Maybe$Nothing)
					},
					{ctor: '_Tuple2', _0: _p27.key, _1: dict});
			default:
				var _p28 = _p26._0;
				return A2(_elm_community$intdict$IntDict$prefixMatches, _p28.prefix, key) ? (A2(_elm_community$intdict$IntDict$isBranchingBitSet, _p28.prefix, key) ? A3(
					_elm_community$intdict$IntDict$inner,
					_p28.prefix,
					_p28.left,
					A3(_elm_community$intdict$IntDict$update, key, alter, _p28.right)) : A3(
					_elm_community$intdict$IntDict$inner,
					_p28.prefix,
					A3(_elm_community$intdict$IntDict$update, key, alter, _p28.left),
					_p28.right)) : A2(
					join,
					{
						ctor: '_Tuple2',
						_0: key,
						_1: alteredNode(_elm_lang$core$Maybe$Nothing)
					},
					{ctor: '_Tuple2', _0: _p28.prefix.prefixBits, _1: dict});
		}
	});
var _elm_community$intdict$IntDict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_community$intdict$IntDict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_community$intdict$IntDict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_community$intdict$IntDict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_community$intdict$IntDict$filter = F2(
	function (predicate, dict) {
		var add = F3(
			function (k, v, d) {
				return A2(predicate, k, v) ? A3(_elm_community$intdict$IntDict$insert, k, v, d) : d;
			});
		return A3(_elm_community$intdict$IntDict$foldl, add, _elm_community$intdict$IntDict$empty, dict);
	});
var _elm_community$intdict$IntDict$map = F2(
	function (f, dict) {
		var _p29 = dict;
		switch (_p29.ctor) {
			case 'Empty':
				return _elm_community$intdict$IntDict$empty;
			case 'Leaf':
				var _p30 = _p29._0;
				return A2(
					_elm_community$intdict$IntDict$leaf,
					_p30.key,
					A2(f, _p30.key, _p30.value));
			default:
				var _p31 = _p29._0;
				return A3(
					_elm_community$intdict$IntDict$inner,
					_p31.prefix,
					A2(_elm_community$intdict$IntDict$map, f, _p31.left),
					A2(_elm_community$intdict$IntDict$map, f, _p31.right));
		}
	});
var _elm_community$intdict$IntDict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p32) {
				var _p33 = _p32;
				var _p35 = _p33._1;
				var _p34 = _p33._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_community$intdict$IntDict$insert, key, value, _p34),
					_1: _p35
				} : {
					ctor: '_Tuple2',
					_0: _p34,
					_1: A3(_elm_community$intdict$IntDict$insert, key, value, _p35)
				};
			});
		return A3(
			_elm_community$intdict$IntDict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_community$intdict$IntDict$empty, _1: _elm_community$intdict$IntDict$empty},
			dict);
	});
var _elm_community$intdict$IntDict$fromList = function (pairs) {
	return A3(
		_elm_lang$core$List$foldl,
		_elm_lang$core$Basics$uncurry(_elm_community$intdict$IntDict$insert),
		_elm_community$intdict$IntDict$empty,
		pairs);
};
var _elm_community$intdict$IntDict$Right = {ctor: 'Right'};
var _elm_community$intdict$IntDict$Left = {ctor: 'Left'};
var _elm_community$intdict$IntDict$Disjunct = F2(
	function (a, b) {
		return {ctor: 'Disjunct', _0: a, _1: b};
	});
var _elm_community$intdict$IntDict$Parent = F2(
	function (a, b) {
		return {ctor: 'Parent', _0: a, _1: b};
	});
var _elm_community$intdict$IntDict$SamePrefix = {ctor: 'SamePrefix'};
var _elm_community$intdict$IntDict$determineBranchRelation = F2(
	function (l, r) {
		var childEdge = F2(
			function (prefix, c) {
				return A2(_elm_community$intdict$IntDict$isBranchingBitSet, prefix, c.prefix.prefixBits) ? _elm_community$intdict$IntDict$Right : _elm_community$intdict$IntDict$Left;
			});
		var rp = r.prefix;
		var lp = l.prefix;
		var mask = _elm_community$intdict$IntDict$highestBitSet(
			A2(_elm_lang$core$Basics$max, lp.branchingBit, rp.branchingBit));
		var modifiedRightPrefix = A3(_elm_community$intdict$IntDict$combineBits, rp.prefixBits, ~lp.prefixBits, mask);
		var prefix = A2(_elm_community$intdict$IntDict$lcp, lp.prefixBits, modifiedRightPrefix);
		return _elm_lang$core$Native_Utils.eq(lp, rp) ? _elm_community$intdict$IntDict$SamePrefix : (_elm_lang$core$Native_Utils.eq(prefix, lp) ? A2(
			_elm_community$intdict$IntDict$Parent,
			_elm_community$intdict$IntDict$Left,
			A2(childEdge, l.prefix, r)) : (_elm_lang$core$Native_Utils.eq(prefix, rp) ? A2(
			_elm_community$intdict$IntDict$Parent,
			_elm_community$intdict$IntDict$Right,
			A2(childEdge, r.prefix, l)) : A2(
			_elm_community$intdict$IntDict$Disjunct,
			prefix,
			A2(childEdge, prefix, l))));
	});
var _elm_community$intdict$IntDict$uniteWith = F3(
	function (merger, l, r) {
		var mergeWith = F3(
			function (key, left, right) {
				var _p36 = {ctor: '_Tuple2', _0: left, _1: right};
				if (_p36._0.ctor === 'Just') {
					if (_p36._1.ctor === 'Just') {
						return _elm_lang$core$Maybe$Just(
							A3(merger, key, _p36._0._0, _p36._1._0));
					} else {
						return left;
					}
				} else {
					if (_p36._1.ctor === 'Just') {
						return right;
					} else {
						return _elm_lang$core$Native_Utils.crashCase(
							'IntDict',
							{
								start: {line: 427, column: 7},
								end: {line: 432, column: 144}
							},
							_p36)('IntDict.uniteWith: mergeWith was called with 2 Nothings. This is a bug in the implementation, please file a bug report!');
					}
				}
			});
		var _p38 = {ctor: '_Tuple2', _0: l, _1: r};
		_v28_2:
		do {
			_v28_1:
			do {
				switch (_p38._0.ctor) {
					case 'Empty':
						return r;
					case 'Leaf':
						switch (_p38._1.ctor) {
							case 'Empty':
								break _v28_1;
							case 'Leaf':
								break _v28_2;
							default:
								break _v28_2;
						}
					default:
						switch (_p38._1.ctor) {
							case 'Empty':
								break _v28_1;
							case 'Leaf':
								var _p40 = _p38._1._0;
								return A3(
									_elm_community$intdict$IntDict$update,
									_p40.key,
									function (l_) {
										return A3(
											mergeWith,
											_p40.key,
											l_,
											_elm_lang$core$Maybe$Just(_p40.value));
									},
									l);
							default:
								var _p43 = _p38._1._0;
								var _p42 = _p38._0._0;
								var _p41 = A2(_elm_community$intdict$IntDict$determineBranchRelation, _p42, _p43);
								switch (_p41.ctor) {
									case 'SamePrefix':
										return A3(
											_elm_community$intdict$IntDict$inner,
											_p42.prefix,
											A3(_elm_community$intdict$IntDict$uniteWith, merger, _p42.left, _p43.left),
											A3(_elm_community$intdict$IntDict$uniteWith, merger, _p42.right, _p43.right));
									case 'Parent':
										if (_p41._0.ctor === 'Left') {
											if (_p41._1.ctor === 'Right') {
												return A3(
													_elm_community$intdict$IntDict$inner,
													_p42.prefix,
													_p42.left,
													A3(_elm_community$intdict$IntDict$uniteWith, merger, _p42.right, r));
											} else {
												return A3(
													_elm_community$intdict$IntDict$inner,
													_p42.prefix,
													A3(_elm_community$intdict$IntDict$uniteWith, merger, _p42.left, r),
													_p42.right);
											}
										} else {
											if (_p41._1.ctor === 'Right') {
												return A3(
													_elm_community$intdict$IntDict$inner,
													_p43.prefix,
													_p43.left,
													A3(_elm_community$intdict$IntDict$uniteWith, merger, l, _p43.right));
											} else {
												return A3(
													_elm_community$intdict$IntDict$inner,
													_p43.prefix,
													A3(_elm_community$intdict$IntDict$uniteWith, merger, l, _p43.left),
													_p43.right);
											}
										}
									default:
										if (_p41._1.ctor === 'Left') {
											return A3(_elm_community$intdict$IntDict$inner, _p41._0, l, r);
										} else {
											return A3(_elm_community$intdict$IntDict$inner, _p41._0, r, l);
										}
								}
						}
				}
			} while(false);
			return l;
		} while(false);
		var _p39 = _p38._0._0;
		return A3(
			_elm_community$intdict$IntDict$update,
			_p39.key,
			function (r_) {
				return A3(
					mergeWith,
					_p39.key,
					_elm_lang$core$Maybe$Just(_p39.value),
					r_);
			},
			r);
	});
var _elm_community$intdict$IntDict$union = _elm_community$intdict$IntDict$uniteWith(
	F3(
		function (key, old, $new) {
			return old;
		}));
var _elm_community$intdict$IntDict$intersect = F2(
	function (l, r) {
		intersect:
		while (true) {
			var _p44 = {ctor: '_Tuple2', _0: l, _1: r};
			_v30_2:
			do {
				_v30_1:
				do {
					switch (_p44._0.ctor) {
						case 'Empty':
							return _elm_community$intdict$IntDict$Empty;
						case 'Leaf':
							switch (_p44._1.ctor) {
								case 'Empty':
									break _v30_1;
								case 'Leaf':
									break _v30_2;
								default:
									break _v30_2;
							}
						default:
							switch (_p44._1.ctor) {
								case 'Empty':
									break _v30_1;
								case 'Leaf':
									var _p46 = _p44._1._0;
									var _p45 = A2(_elm_community$intdict$IntDict$get, _p46.key, l);
									if (_p45.ctor === 'Just') {
										return A2(_elm_community$intdict$IntDict$leaf, _p46.key, _p45._0);
									} else {
										return _elm_community$intdict$IntDict$Empty;
									}
								default:
									var _p49 = _p44._1._0;
									var _p48 = _p44._0._0;
									var _p47 = A2(_elm_community$intdict$IntDict$determineBranchRelation, _p48, _p49);
									switch (_p47.ctor) {
										case 'SamePrefix':
											return A3(
												_elm_community$intdict$IntDict$inner,
												_p48.prefix,
												A2(_elm_community$intdict$IntDict$intersect, _p48.left, _p49.left),
												A2(_elm_community$intdict$IntDict$intersect, _p48.right, _p49.right));
										case 'Parent':
											if (_p47._0.ctor === 'Left') {
												if (_p47._1.ctor === 'Right') {
													var _v33 = _p48.right,
														_v34 = r;
													l = _v33;
													r = _v34;
													continue intersect;
												} else {
													var _v35 = _p48.left,
														_v36 = r;
													l = _v35;
													r = _v36;
													continue intersect;
												}
											} else {
												if (_p47._1.ctor === 'Right') {
													var _v37 = l,
														_v38 = _p49.right;
													l = _v37;
													r = _v38;
													continue intersect;
												} else {
													var _v39 = l,
														_v40 = _p49.left;
													l = _v39;
													r = _v40;
													continue intersect;
												}
											}
										default:
											return _elm_community$intdict$IntDict$Empty;
									}
							}
					}
				} while(false);
				return _elm_community$intdict$IntDict$Empty;
			} while(false);
			return A2(_elm_community$intdict$IntDict$member, _p44._0._0.key, r) ? l : _elm_community$intdict$IntDict$Empty;
		}
	});
var _elm_community$intdict$IntDict$diff = F2(
	function (l, r) {
		diff:
		while (true) {
			var _p50 = {ctor: '_Tuple2', _0: l, _1: r};
			_v41_2:
			do {
				_v41_1:
				do {
					switch (_p50._0.ctor) {
						case 'Empty':
							return _elm_community$intdict$IntDict$Empty;
						case 'Leaf':
							switch (_p50._1.ctor) {
								case 'Empty':
									break _v41_1;
								case 'Leaf':
									break _v41_2;
								default:
									break _v41_2;
							}
						default:
							switch (_p50._1.ctor) {
								case 'Empty':
									break _v41_1;
								case 'Leaf':
									return A2(_elm_community$intdict$IntDict$remove, _p50._1._0.key, l);
								default:
									var _p53 = _p50._1._0;
									var _p52 = _p50._0._0;
									var _p51 = A2(_elm_community$intdict$IntDict$determineBranchRelation, _p52, _p53);
									switch (_p51.ctor) {
										case 'SamePrefix':
											return A3(
												_elm_community$intdict$IntDict$inner,
												_p52.prefix,
												A2(_elm_community$intdict$IntDict$diff, _p52.left, _p53.left),
												A2(_elm_community$intdict$IntDict$diff, _p52.right, _p53.right));
										case 'Parent':
											if (_p51._0.ctor === 'Left') {
												if (_p51._1.ctor === 'Left') {
													return A3(
														_elm_community$intdict$IntDict$inner,
														_p52.prefix,
														A2(_elm_community$intdict$IntDict$diff, _p52.left, r),
														_p52.right);
												} else {
													return A3(
														_elm_community$intdict$IntDict$inner,
														_p52.prefix,
														_p52.left,
														A2(_elm_community$intdict$IntDict$diff, _p52.right, r));
												}
											} else {
												if (_p51._1.ctor === 'Left') {
													var _v43 = l,
														_v44 = _p53.left;
													l = _v43;
													r = _v44;
													continue diff;
												} else {
													var _v45 = l,
														_v46 = _p53.right;
													l = _v45;
													r = _v46;
													continue diff;
												}
											}
										default:
											return l;
									}
							}
					}
				} while(false);
				return l;
			} while(false);
			return A2(_elm_community$intdict$IntDict$member, _p50._0._0.key, r) ? _elm_community$intdict$IntDict$Empty : l;
		}
	});
var _elm_community$intdict$IntDict$merge = F6(
	function (left, both, right, l, r, acc) {
		var m = A3(_elm_community$intdict$IntDict$merge, left, both, right);
		var _p54 = {ctor: '_Tuple2', _0: l, _1: r};
		_v47_2:
		do {
			_v47_1:
			do {
				switch (_p54._0.ctor) {
					case 'Empty':
						return A3(_elm_community$intdict$IntDict$foldl, right, acc, r);
					case 'Leaf':
						switch (_p54._1.ctor) {
							case 'Empty':
								break _v47_1;
							case 'Leaf':
								break _v47_2;
							default:
								break _v47_2;
						}
					default:
						switch (_p54._1.ctor) {
							case 'Empty':
								break _v47_1;
							case 'Leaf':
								var _p58 = _p54._1._0;
								var _p57 = A2(_elm_community$intdict$IntDict$get, _p58.key, l);
								if (_p57.ctor === 'Nothing') {
									return A3(
										m,
										l,
										_elm_community$intdict$IntDict$Empty,
										A3(right, _p58.key, _p58.value, acc));
								} else {
									return A3(
										m,
										A2(_elm_community$intdict$IntDict$remove, _p58.key, l),
										_elm_community$intdict$IntDict$Empty,
										A4(both, _p58.key, _p57._0, _p58.value, acc));
								}
							default:
								var _p61 = _p54._1._0;
								var _p60 = _p54._0._0;
								var _p59 = A2(_elm_community$intdict$IntDict$determineBranchRelation, _p60, _p61);
								switch (_p59.ctor) {
									case 'SamePrefix':
										return A3(
											m,
											_p60.right,
											_p61.right,
											A3(m, _p60.left, _p61.left, acc));
									case 'Parent':
										if (_p59._0.ctor === 'Left') {
											if (_p59._1.ctor === 'Left') {
												return A3(
													m,
													_p60.right,
													_elm_community$intdict$IntDict$Empty,
													A3(m, _p60.left, r, acc));
											} else {
												return A3(
													m,
													_p60.right,
													r,
													A3(m, _p60.left, _elm_community$intdict$IntDict$Empty, acc));
											}
										} else {
											if (_p59._1.ctor === 'Left') {
												return A3(
													m,
													_elm_community$intdict$IntDict$Empty,
													_p61.right,
													A3(m, l, _p61.left, acc));
											} else {
												return A3(
													m,
													l,
													_p61.right,
													A3(m, _elm_community$intdict$IntDict$Empty, _p61.left, acc));
											}
										}
									default:
										if (_p59._1.ctor === 'Left') {
											return A3(
												m,
												_elm_community$intdict$IntDict$Empty,
												r,
												A3(m, l, _elm_community$intdict$IntDict$Empty, acc));
										} else {
											return A3(
												m,
												l,
												_elm_community$intdict$IntDict$Empty,
												A3(m, _elm_community$intdict$IntDict$Empty, r, acc));
										}
								}
						}
				}
			} while(false);
			return A3(_elm_community$intdict$IntDict$foldl, left, acc, l);
		} while(false);
		var _p56 = _p54._0._0;
		var _p55 = A2(_elm_community$intdict$IntDict$get, _p56.key, r);
		if (_p55.ctor === 'Nothing') {
			return A3(
				m,
				_elm_community$intdict$IntDict$Empty,
				r,
				A3(left, _p56.key, _p56.value, acc));
		} else {
			return A3(
				m,
				_elm_community$intdict$IntDict$Empty,
				A2(_elm_community$intdict$IntDict$remove, _p56.key, r),
				A4(both, _p56.key, _p56.value, _p55._0, acc));
		}
	});

var _elm_community$graph$Graph$ignorePath = F4(
	function (visit, path, _p0, acc) {
		var _p1 = path;
		if (_p1.ctor === '[]') {
			return _elm_lang$core$Native_Utils.crashCase(
				'Graph',
				{
					start: {line: 1017, column: 5},
					end: {line: 1022, column: 26}
				},
				_p1)('Graph.ignorePath: No algorithm should ever pass an empty path into this BfsNodeVisitor.');
		} else {
			return A2(visit, _p1._0, acc);
		}
	});
var _elm_community$graph$Graph$onFinish = F3(
	function (visitor, ctx, acc) {
		return {
			ctor: '_Tuple2',
			_0: acc,
			_1: visitor(ctx)
		};
	});
var _elm_community$graph$Graph$onDiscovery = F3(
	function (visitor, ctx, acc) {
		return {
			ctor: '_Tuple2',
			_0: A2(visitor, ctx, acc),
			_1: _elm_lang$core$Basics$identity
		};
	});
var _elm_community$graph$Graph$alongIncomingEdges = function (ctx) {
	return _elm_community$intdict$IntDict$keys(ctx.incoming);
};
var _elm_community$graph$Graph$alongOutgoingEdges = function (ctx) {
	return _elm_community$intdict$IntDict$keys(ctx.outgoing);
};
var _elm_community$graph$Graph$applyEdgeDiff = F3(
	function (nodeId, diff, graphRep) {
		var updateOutgoingEdge = F2(
			function (upd, node) {
				return _elm_lang$core$Native_Utils.update(
					node,
					{
						outgoing: A3(_elm_community$intdict$IntDict$update, nodeId, upd, node.outgoing)
					});
			});
		var updateIncomingEdge = F2(
			function (upd, node) {
				return _elm_lang$core$Native_Utils.update(
					node,
					{
						incoming: A3(_elm_community$intdict$IntDict$update, nodeId, upd, node.incoming)
					});
			});
		var edgeUpdateToMaybe = function (edgeUpdate) {
			var _p3 = edgeUpdate;
			if (_p3.ctor === 'Insert') {
				return _elm_lang$core$Maybe$Just(_p3._0);
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		};
		var updateAdjacency = F3(
			function (updateEdge, updatedId, edgeUpdate) {
				var updateLbl = updateEdge(
					_elm_lang$core$Basics$always(
						edgeUpdateToMaybe(edgeUpdate)));
				return A2(
					_elm_community$intdict$IntDict$update,
					updatedId,
					_elm_lang$core$Maybe$map(updateLbl));
			});
		var flippedFoldl = F3(
			function (f, dict, acc) {
				return A3(_elm_community$intdict$IntDict$foldl, f, acc, dict);
			});
		return A3(
			flippedFoldl,
			updateAdjacency(updateOutgoingEdge),
			diff.outgoing,
			A3(
				flippedFoldl,
				updateAdjacency(updateIncomingEdge),
				diff.incoming,
				graphRep));
	});
var _elm_community$graph$Graph$emptyDiff = {incoming: _elm_community$intdict$IntDict$empty, outgoing: _elm_community$intdict$IntDict$empty};
var _elm_community$graph$Graph$unGraph = function (graph) {
	var _p4 = graph;
	return _p4._0;
};
var _elm_community$graph$Graph$size = function (_p5) {
	return _elm_community$intdict$IntDict$size(
		_elm_community$graph$Graph$unGraph(_p5));
};
var _elm_community$graph$Graph$member = function (nodeId) {
	return function (_p6) {
		return A2(
			_elm_community$intdict$IntDict$member,
			nodeId,
			_elm_community$graph$Graph$unGraph(_p6));
	};
};
var _elm_community$graph$Graph$get = function (nodeId) {
	return function (_p7) {
		return A2(
			_elm_community$intdict$IntDict$get,
			nodeId,
			_elm_community$graph$Graph$unGraph(_p7));
	};
};
var _elm_community$graph$Graph$nodeIdRange = function (graph) {
	return A2(
		_elm_lang$core$Maybe$andThen,
		function (_p8) {
			var _p9 = _p8;
			return A2(
				_elm_lang$core$Maybe$andThen,
				function (_p10) {
					var _p11 = _p10;
					return _elm_lang$core$Maybe$Just(
						{ctor: '_Tuple2', _0: _p9._0, _1: _p11._0});
				},
				_elm_community$intdict$IntDict$findMax(
					_elm_community$graph$Graph$unGraph(graph)));
		},
		_elm_community$intdict$IntDict$findMin(
			_elm_community$graph$Graph$unGraph(graph)));
};
var _elm_community$graph$Graph$nodes = function (_p12) {
	return A2(
		_elm_lang$core$List$map,
		function (_) {
			return _.node;
		},
		_elm_community$intdict$IntDict$values(
			_elm_community$graph$Graph$unGraph(_p12)));
};
var _elm_community$graph$Graph$nodeIds = function (_p13) {
	return _elm_community$intdict$IntDict$keys(
		_elm_community$graph$Graph$unGraph(_p13));
};
var _elm_community$graph$Graph$edges = function (graph) {
	var flippedFoldl = F3(
		function (f, dict, list) {
			return A3(_elm_community$intdict$IntDict$foldl, f, list, dict);
		});
	var prependEdges = F2(
		function (node1, ctx) {
			return A2(
				flippedFoldl,
				F2(
					function (node2, e) {
						return F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(
							{to: node2, from: node1, label: e});
					}),
				ctx.outgoing);
		});
	return A3(
		flippedFoldl,
		prependEdges,
		_elm_community$graph$Graph$unGraph(graph),
		{ctor: '[]'});
};
var _elm_community$graph$Graph$toString = function (graph) {
	var edgeList = _elm_community$graph$Graph$edges(graph);
	var nodeList = _elm_community$graph$Graph$nodes(graph);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'Graph.fromNodesAndEdges ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(nodeList),
			A2(
				_elm_lang$core$Basics_ops['++'],
				' ',
				_elm_lang$core$Basics$toString(edgeList))));
};
var _elm_community$graph$Graph$Node = F2(
	function (a, b) {
		return {id: a, label: b};
	});
var _elm_community$graph$Graph$Edge = F3(
	function (a, b, c) {
		return {from: a, to: b, label: c};
	});
var _elm_community$graph$Graph$NodeContext = F3(
	function (a, b, c) {
		return {node: a, incoming: b, outgoing: c};
	});
var _elm_community$graph$Graph$EdgeDiff = F2(
	function (a, b) {
		return {incoming: a, outgoing: b};
	});
var _elm_community$graph$Graph$Graph = function (a) {
	return {ctor: 'Graph', _0: a};
};
var _elm_community$graph$Graph$empty = _elm_community$graph$Graph$Graph(_elm_community$intdict$IntDict$empty);
var _elm_community$graph$Graph$isEmpty = function (graph) {
	return _elm_lang$core$Native_Utils.eq(graph, _elm_community$graph$Graph$empty);
};
var _elm_community$graph$Graph$fromNodesAndEdges = F2(
	function (nodes, edges) {
		var addEdge = F2(
			function (edge, rep) {
				var updateIncoming = function (ctx) {
					return _elm_lang$core$Native_Utils.update(
						ctx,
						{
							incoming: A3(_elm_community$intdict$IntDict$insert, edge.from, edge.label, ctx.incoming)
						});
				};
				var updateOutgoing = function (ctx) {
					return _elm_lang$core$Native_Utils.update(
						ctx,
						{
							outgoing: A3(_elm_community$intdict$IntDict$insert, edge.to, edge.label, ctx.outgoing)
						});
				};
				return A3(
					_elm_community$intdict$IntDict$update,
					edge.to,
					_elm_lang$core$Maybe$map(updateIncoming),
					A3(
						_elm_community$intdict$IntDict$update,
						edge.from,
						_elm_lang$core$Maybe$map(updateOutgoing),
						rep));
			});
		var addEdgeIfValid = F2(
			function (edge, rep) {
				return (A2(_elm_community$intdict$IntDict$member, edge.from, rep) && A2(_elm_community$intdict$IntDict$member, edge.to, rep)) ? A2(addEdge, edge, rep) : rep;
			});
		var nodeRep = A3(
			_elm_lang$core$List$foldl,
			function (n) {
				return A2(
					_elm_community$intdict$IntDict$insert,
					n.id,
					A3(_elm_community$graph$Graph$NodeContext, n, _elm_community$intdict$IntDict$empty, _elm_community$intdict$IntDict$empty));
			},
			_elm_community$intdict$IntDict$empty,
			nodes);
		return _elm_community$graph$Graph$Graph(
			A3(_elm_lang$core$List$foldl, addEdgeIfValid, nodeRep, edges));
	});
var _elm_community$graph$Graph$fromNodeLabelsAndEdgePairs = F2(
	function (labels, edgePairs) {
		var edges = A2(
			_elm_lang$core$List$map,
			function (_p14) {
				var _p15 = _p14;
				return A3(
					_elm_community$graph$Graph$Edge,
					_p15._0,
					_p15._1,
					{ctor: '_Tuple0'});
			},
			edgePairs);
		var nodes = _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				F2(
					function (lbl, _p16) {
						var _p17 = _p16;
						var _p18 = _p17._0;
						return {
							ctor: '_Tuple2',
							_0: _p18 + 1,
							_1: {
								ctor: '::',
								_0: A2(_elm_community$graph$Graph$Node, _p18, lbl),
								_1: _p17._1
							}
						};
					}),
				{
					ctor: '_Tuple2',
					_0: 0,
					_1: {ctor: '[]'}
				},
				labels));
		return A2(_elm_community$graph$Graph$fromNodesAndEdges, nodes, edges);
	});
var _elm_community$graph$Graph$symmetricClosure = function (edgeMerger) {
	var orderedEdgeMerger = F4(
		function (from, to, outgoing, incoming) {
			return (_elm_lang$core$Native_Utils.cmp(from, to) < 1) ? A4(edgeMerger, from, to, outgoing, incoming) : A4(edgeMerger, to, from, incoming, outgoing);
		});
	var updateContext = F2(
		function (nodeId, ctx) {
			var edges = A3(
				_elm_community$intdict$IntDict$uniteWith,
				orderedEdgeMerger(nodeId),
				ctx.outgoing,
				ctx.incoming);
			return _elm_lang$core$Native_Utils.update(
				ctx,
				{outgoing: edges, incoming: edges});
		});
	return function (_p19) {
		return _elm_community$graph$Graph$Graph(
			A2(
				_elm_community$intdict$IntDict$map,
				updateContext,
				_elm_community$graph$Graph$unGraph(_p19)));
	};
};
var _elm_community$graph$Graph$reverseEdges = function () {
	var updateContext = F2(
		function (nodeId, ctx) {
			return _elm_lang$core$Native_Utils.update(
				ctx,
				{outgoing: ctx.incoming, incoming: ctx.outgoing});
		});
	return function (_p20) {
		return _elm_community$graph$Graph$Graph(
			A2(
				_elm_community$intdict$IntDict$map,
				updateContext,
				_elm_community$graph$Graph$unGraph(_p20)));
	};
}();
var _elm_community$graph$Graph$Remove = function (a) {
	return {ctor: 'Remove', _0: a};
};
var _elm_community$graph$Graph$Insert = function (a) {
	return {ctor: 'Insert', _0: a};
};
var _elm_community$graph$Graph$computeEdgeDiff = F2(
	function (old, $new) {
		var collectUpdates = F3(
			function (edgeUpdate, updatedId, label) {
				var replaceUpdate = function (old) {
					var _p21 = {
						ctor: '_Tuple2',
						_0: old,
						_1: edgeUpdate(label)
					};
					if (_p21._0.ctor === 'Just') {
						if (_p21._0._0.ctor === 'Remove') {
							if (_p21._1.ctor === 'Insert') {
								var _p22 = _p21._1._0;
								return _elm_lang$core$Native_Utils.eq(_p21._0._0._0, _p22) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
									_elm_community$graph$Graph$Insert(_p22));
							} else {
								return _elm_lang$core$Native_Utils.crashCase(
									'Graph',
									{
										start: {line: 255, column: 21},
										end: {line: 269, column: 36}
									},
									_p21)('Graph.computeEdgeDiff: Collected two removals for the same edge. This is an error in the implementation of Graph and you should file a bug report!');
							}
						} else {
							return _elm_lang$core$Native_Utils.crashCase(
								'Graph',
								{
									start: {line: 255, column: 21},
									end: {line: 269, column: 36}
								},
								_p21)('Graph.computeEdgeDiff: Collected inserts before removals. This is an error in the implementation of Graph and you should file a bug report!');
						}
					} else {
						return _elm_lang$core$Maybe$Just(_p21._1);
					}
				};
				return A2(_elm_community$intdict$IntDict$update, updatedId, replaceUpdate);
			});
		var collect = F3(
			function (edgeUpdate, adj, updates) {
				return A3(
					_elm_community$intdict$IntDict$foldl,
					collectUpdates(edgeUpdate),
					updates,
					adj);
			});
		var _p25 = {ctor: '_Tuple2', _0: old, _1: $new};
		if (_p25._0.ctor === 'Nothing') {
			if (_p25._1.ctor === 'Nothing') {
				return _elm_community$graph$Graph$emptyDiff;
			} else {
				var _p27 = _p25._1._0;
				return {
					outgoing: A3(collect, _elm_community$graph$Graph$Insert, _p27.incoming, _elm_community$intdict$IntDict$empty),
					incoming: A3(collect, _elm_community$graph$Graph$Insert, _p27.outgoing, _elm_community$intdict$IntDict$empty)
				};
			}
		} else {
			if (_p25._1.ctor === 'Nothing') {
				var _p26 = _p25._0._0;
				return {
					outgoing: A3(collect, _elm_community$graph$Graph$Remove, _p26.incoming, _elm_community$intdict$IntDict$empty),
					incoming: A3(collect, _elm_community$graph$Graph$Remove, _p26.outgoing, _elm_community$intdict$IntDict$empty)
				};
			} else {
				var _p29 = _p25._0._0;
				var _p28 = _p25._1._0;
				return _elm_lang$core$Native_Utils.eq(_p29, _p28) ? _elm_community$graph$Graph$emptyDiff : {
					outgoing: A3(
						collect,
						_elm_community$graph$Graph$Insert,
						_p28.incoming,
						A3(collect, _elm_community$graph$Graph$Remove, _p29.incoming, _elm_community$intdict$IntDict$empty)),
					incoming: A3(
						collect,
						_elm_community$graph$Graph$Insert,
						_p28.outgoing,
						A3(collect, _elm_community$graph$Graph$Remove, _p29.outgoing, _elm_community$intdict$IntDict$empty))
				};
			}
		}
	});
var _elm_community$graph$Graph$update = F2(
	function (nodeId, updater) {
		var wrappedUpdater = function (rep) {
			var filterInvalidEdges = function (ctx) {
				return _elm_community$intdict$IntDict$filter(
					F2(
						function (id, _p30) {
							return _elm_lang$core$Native_Utils.eq(id, ctx.node.id) || A2(_elm_community$intdict$IntDict$member, id, rep);
						}));
			};
			var cleanUpEdges = function (ctx) {
				return _elm_lang$core$Native_Utils.update(
					ctx,
					{
						incoming: A2(filterInvalidEdges, ctx, ctx.incoming),
						outgoing: A2(filterInvalidEdges, ctx, ctx.outgoing)
					});
			};
			var old = A2(_elm_community$intdict$IntDict$get, nodeId, rep);
			var $new = A2(
				_elm_lang$core$Maybe$map,
				cleanUpEdges,
				updater(old));
			var diff = A2(_elm_community$graph$Graph$computeEdgeDiff, old, $new);
			return A3(
				_elm_community$intdict$IntDict$update,
				nodeId,
				_elm_lang$core$Basics$always($new),
				A3(_elm_community$graph$Graph$applyEdgeDiff, nodeId, diff, rep));
		};
		return function (_p31) {
			return _elm_community$graph$Graph$Graph(
				wrappedUpdater(
					_elm_community$graph$Graph$unGraph(_p31)));
		};
	});
var _elm_community$graph$Graph$insert = F2(
	function (nodeContext, graph) {
		return A3(
			_elm_community$graph$Graph$update,
			nodeContext.node.id,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(nodeContext)),
			graph);
	});
var _elm_community$graph$Graph$inducedSubgraph = F2(
	function (nodeIds, graph) {
		var insertContextById = F2(
			function (nodeId, acc) {
				var _p32 = A2(_elm_community$graph$Graph$get, nodeId, graph);
				if (_p32.ctor === 'Just') {
					return A2(_elm_community$graph$Graph$insert, _p32._0, acc);
				} else {
					return acc;
				}
			});
		return A3(_elm_lang$core$List$foldl, insertContextById, _elm_community$graph$Graph$empty, nodeIds);
	});
var _elm_community$graph$Graph$remove = F2(
	function (nodeId, graph) {
		return A3(
			_elm_community$graph$Graph$update,
			nodeId,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			graph);
	});
var _elm_community$graph$Graph$fold = F3(
	function (f, acc, graph) {
		var go = F2(
			function (acc, graph1) {
				go:
				while (true) {
					var maybeContext = A2(
						_elm_lang$core$Maybe$andThen,
						function (id) {
							return A2(_elm_community$graph$Graph$get, id, graph);
						},
						A2(
							_elm_lang$core$Maybe$map,
							_elm_lang$core$Tuple$first,
							_elm_community$graph$Graph$nodeIdRange(graph1)));
					var _p33 = maybeContext;
					if (_p33.ctor === 'Just') {
						var _p34 = _p33._0;
						var _v11 = A2(f, _p34, acc),
							_v12 = A2(_elm_community$graph$Graph$remove, _p34.node.id, graph1);
						acc = _v11;
						graph1 = _v12;
						continue go;
					} else {
						return acc;
					}
				}
			});
		return A2(go, acc, graph);
	});
var _elm_community$graph$Graph$mapContexts = function (f) {
	return A2(
		_elm_community$graph$Graph$fold,
		function (ctx) {
			return _elm_community$graph$Graph$insert(
				f(ctx));
		},
		_elm_community$graph$Graph$empty);
};
var _elm_community$graph$Graph$mapNodes = function (f) {
	return A2(
		_elm_community$graph$Graph$fold,
		function (ctx) {
			return _elm_community$graph$Graph$insert(
				_elm_lang$core$Native_Utils.update(
					ctx,
					{
						node: {
							id: ctx.node.id,
							label: f(ctx.node.label)
						}
					}));
		},
		_elm_community$graph$Graph$empty);
};
var _elm_community$graph$Graph$mapEdges = function (f) {
	return A2(
		_elm_community$graph$Graph$fold,
		function (ctx) {
			return _elm_community$graph$Graph$insert(
				_elm_lang$core$Native_Utils.update(
					ctx,
					{
						outgoing: A2(
							_elm_community$intdict$IntDict$map,
							F2(
								function (n, e) {
									return f(e);
								}),
							ctx.outgoing),
						incoming: A2(
							_elm_community$intdict$IntDict$map,
							F2(
								function (n, e) {
									return f(e);
								}),
							ctx.incoming)
					}));
		},
		_elm_community$graph$Graph$empty);
};
var _elm_community$graph$Graph$guidedDfs = F5(
	function (selectNeighbors, visitNode, seeds, acc, graph) {
		var go = F3(
			function (seeds, acc, graph) {
				go:
				while (true) {
					var _p35 = seeds;
					if (_p35.ctor === '[]') {
						return {ctor: '_Tuple2', _0: acc, _1: graph};
					} else {
						var _p41 = _p35._1;
						var _p40 = _p35._0;
						var _p36 = A2(_elm_community$graph$Graph$get, _p40, graph);
						if (_p36.ctor === 'Nothing') {
							var _v15 = _p41,
								_v16 = acc,
								_v17 = graph;
							seeds = _v15;
							acc = _v16;
							graph = _v17;
							continue go;
						} else {
							var _p39 = _p36._0;
							var _p37 = A2(visitNode, _p39, acc);
							var accAfterDiscovery = _p37._0;
							var finishNode = _p37._1;
							var _p38 = A3(
								go,
								selectNeighbors(_p39),
								accAfterDiscovery,
								A2(_elm_community$graph$Graph$remove, _p40, graph));
							var accBeforeFinish = _p38._0;
							var graph1 = _p38._1;
							var accAfterFinish = finishNode(accBeforeFinish);
							var _v18 = _p41,
								_v19 = accAfterFinish,
								_v20 = graph1;
							seeds = _v18;
							acc = _v19;
							graph = _v20;
							continue go;
						}
					}
				}
			});
		return A3(go, seeds, acc, graph);
	});
var _elm_community$graph$Graph$dfs = F3(
	function (visitNode, acc, graph) {
		return _elm_lang$core$Tuple$first(
			A5(
				_elm_community$graph$Graph$guidedDfs,
				_elm_community$graph$Graph$alongOutgoingEdges,
				visitNode,
				_elm_community$graph$Graph$nodeIds(graph),
				acc,
				graph));
	});
var _elm_community$graph$Graph$dfsForest = F2(
	function (seeds, graph) {
		var visitNode = F2(
			function (ctx, trees) {
				return {
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: function (children) {
						return {
							ctor: '::',
							_0: A2(_elm_community$graph$Graph_Tree$inner, ctx, children),
							_1: trees
						};
					}
				};
			});
		return _elm_lang$core$List$reverse(
			_elm_lang$core$Tuple$first(
				A5(
					_elm_community$graph$Graph$guidedDfs,
					_elm_community$graph$Graph$alongOutgoingEdges,
					visitNode,
					seeds,
					{ctor: '[]'},
					graph)));
	});
var _elm_community$graph$Graph$dfsTree = F2(
	function (seed, graph) {
		var _p42 = A2(
			_elm_community$graph$Graph$dfsForest,
			{
				ctor: '::',
				_0: seed,
				_1: {ctor: '[]'}
			},
			graph);
		if (_p42.ctor === '[]') {
			return _elm_community$graph$Graph_Tree$empty;
		} else {
			if (_p42._1.ctor === '[]') {
				return _p42._0;
			} else {
				return _elm_lang$core$Native_Utils.crashCase(
					'Graph',
					{
						start: {line: 953, column: 5},
						end: {line: 961, column: 126}
					},
					_p42)('dfsTree: There can\'t be more than one DFS tree. This invariant is violated, please report this bug.');
			}
		}
	});
var _elm_community$graph$Graph$stronglyConnectedComponents = function (graph) {
	var timestamps = A3(
		_elm_community$graph$Graph$dfs,
		_elm_community$graph$Graph$onFinish(
			function (_p44) {
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					function (_) {
						return _.id;
					}(
						function (_) {
							return _.node;
						}(_p44)));
			}),
		{ctor: '[]'},
		graph);
	var forest = A2(
		_elm_community$graph$Graph$dfsForest,
		timestamps,
		_elm_community$graph$Graph$reverseEdges(graph));
	var components = A2(
		_elm_lang$core$List$map,
		function (_p45) {
			return _elm_community$graph$Graph$reverseEdges(
				A3(
					_elm_lang$core$List$foldr,
					_elm_community$graph$Graph$insert,
					_elm_community$graph$Graph$empty,
					_elm_community$graph$Graph_Tree$preOrderList(_p45)));
		},
		forest);
	return components;
};
var _elm_community$graph$Graph$topologicalSort = function (graph) {
	var unwrapSingleNodeGraph = function (g) {
		var _p46 = _elm_community$graph$Graph$nodeIdRange(g);
		if (_p46.ctor === 'Nothing') {
			return _elm_lang$core$Native_Utils.crashCase(
				'Graph',
				{
					start: {line: 1198, column: 13},
					end: {line: 1208, column: 32}
				},
				_p46)('Invariant hurt in Graph.topologicalSort: No strongly connected component should be empty');
		} else {
			var _p48 = A2(_elm_community$graph$Graph$get, _p46._0._0, g);
			if (_p48.ctor === 'Nothing') {
				return _elm_lang$core$Native_Utils.crashCase(
					'Graph',
					{
						start: {line: 1203, column: 21},
						end: {line: 1208, column: 32}
					},
					_p48)('Invariant hurt in Graph.topologicalSort: nodeId in nodeIdRange of the strongly connected component should be present in the original graph');
			} else {
				return _p48._0;
			}
		}
	};
	var scc = _elm_community$graph$Graph$stronglyConnectedComponents(graph);
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$List$length(scc),
		_elm_community$graph$Graph$size(graph)) ? _elm_lang$core$Result$Ok(
		A2(_elm_lang$core$List$map, unwrapSingleNodeGraph, scc)) : _elm_lang$core$Result$Err(scc);
};
var _elm_community$graph$Graph$guidedBfs = F5(
	function (selectNeighbors, visitNode, seeds, acc, graph) {
		var enqueueMany = F4(
			function (distance, parentPath, nodeIds, queue) {
				return A3(
					_elm_lang$core$List$foldl,
					_avh4$elm_fifo$Fifo$insert,
					queue,
					A2(
						_elm_lang$core$List$map,
						function (id) {
							return {ctor: '_Tuple3', _0: id, _1: parentPath, _2: distance};
						},
						nodeIds));
			});
		var go = F3(
			function (seeds, acc, graph) {
				go:
				while (true) {
					var _p50 = _avh4$elm_fifo$Fifo$remove(seeds);
					if (_p50._0.ctor === 'Nothing') {
						return {ctor: '_Tuple2', _0: acc, _1: graph};
					} else {
						var _p55 = _p50._1;
						var _p54 = _p50._0._0._0;
						var _p53 = _p50._0._0._2;
						var _p51 = A2(_elm_community$graph$Graph$get, _p54, graph);
						if (_p51.ctor === 'Nothing') {
							var _v26 = _p55,
								_v27 = acc,
								_v28 = graph;
							seeds = _v26;
							acc = _v27;
							graph = _v28;
							continue go;
						} else {
							var _p52 = _p51._0;
							var path = {ctor: '::', _0: _p52, _1: _p50._0._0._1};
							var accAfterVisit = A3(visitNode, path, _p53, acc);
							var seeds2 = A4(
								enqueueMany,
								_p53 + 1,
								path,
								selectNeighbors(_p52),
								_p55);
							var _v29 = seeds2,
								_v30 = accAfterVisit,
								_v31 = A2(_elm_community$graph$Graph$remove, _p54, graph);
							seeds = _v29;
							acc = _v30;
							graph = _v31;
							continue go;
						}
					}
				}
			});
		return A3(
			go,
			A4(
				enqueueMany,
				0,
				{ctor: '[]'},
				seeds,
				_avh4$elm_fifo$Fifo$empty),
			acc,
			graph);
	});
var _elm_community$graph$Graph$bfs = F3(
	function (visitNode, acc, graph) {
		bfs:
		while (true) {
			var _p56 = _elm_community$graph$Graph$nodeIdRange(graph);
			if (_p56.ctor === 'Nothing') {
				return acc;
			} else {
				var _p57 = A5(
					_elm_community$graph$Graph$guidedBfs,
					_elm_community$graph$Graph$alongOutgoingEdges,
					visitNode,
					{
						ctor: '::',
						_0: _p56._0._0,
						_1: {ctor: '[]'}
					},
					acc,
					graph);
				var finalAcc = _p57._0;
				var restgraph1 = _p57._1;
				var _v33 = visitNode,
					_v34 = finalAcc,
					_v35 = restgraph1;
				visitNode = _v33;
				acc = _v34;
				graph = _v35;
				continue bfs;
			}
		}
	});
var _elm_community$graph$Graph$heightLevels = function (graph) {
	var subtract = F2(
		function (a, b) {
			return b - a;
		});
	var decrementAndNoteSources = F3(
		function (id, _p59, _p58) {
			var _p60 = _p58;
			var _p64 = _p60._0;
			var indegreesDec = A3(
				_elm_community$intdict$IntDict$update,
				id,
				_elm_lang$core$Maybe$map(
					subtract(1)),
				_p60._1);
			var _p61 = A2(_elm_community$intdict$IntDict$get, id, indegreesDec);
			if ((_p61.ctor === 'Just') && (_p61._0 === 0)) {
				var _p62 = A2(_elm_community$graph$Graph$get, id, graph);
				if (_p62.ctor === 'Just') {
					return {
						ctor: '_Tuple2',
						_0: {ctor: '::', _0: _p62._0, _1: _p64},
						_1: indegreesDec
					};
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Graph',
						{
							start: {line: 1150, column: 21},
							end: {line: 1155, column: 157}
						},
						_p62)('Graph.heightLevels: Could not get a node of a graph which should be there by invariants. Please file a bug report!');
				}
			} else {
				return {ctor: '_Tuple2', _0: _p64, _1: indegreesDec};
			}
		});
	var decrementIndegrees = F3(
		function (source, nextLevel, indegrees) {
			return A3(
				_elm_community$intdict$IntDict$foldl,
				decrementAndNoteSources,
				{ctor: '_Tuple2', _0: nextLevel, _1: indegrees},
				source.outgoing);
		});
	var go = F4(
		function (currentLevel, nextLevel, indegrees, graph) {
			var _p65 = {ctor: '_Tuple2', _0: currentLevel, _1: nextLevel};
			if (_p65._0.ctor === '[]') {
				if (_p65._1.ctor === '[]') {
					return {
						ctor: '::',
						_0: {ctor: '[]'},
						_1: {ctor: '[]'}
					};
				} else {
					return {
						ctor: '::',
						_0: {ctor: '[]'},
						_1: A4(
							go,
							nextLevel,
							{ctor: '[]'},
							indegrees,
							graph)
					};
				}
			} else {
				var _p69 = _p65._0._0;
				var _p66 = A3(decrementIndegrees, _p69, nextLevel, indegrees);
				var nextLevel1 = _p66._0;
				var indegrees1 = _p66._1;
				var _p67 = A4(
					go,
					_p65._0._1,
					nextLevel1,
					indegrees1,
					A2(_elm_community$graph$Graph$remove, _p69.node.id, graph));
				if (_p67.ctor === '[]') {
					return _elm_lang$core$Native_Utils.crashCase(
						'Graph',
						{
							start: {line: 1176, column: 21},
							end: {line: 1181, column: 56}
						},
						_p67)('Graph.heightLevels: Reached a branch which is impossible by invariants. Please file a bug report!');
				} else {
					return {
						ctor: '::',
						_0: {ctor: '::', _0: _p69, _1: _p67._0},
						_1: _p67._1
					};
				}
			}
		});
	var countIndegrees = A2(
		_elm_community$graph$Graph$fold,
		function (ctx) {
			return A2(
				_elm_community$intdict$IntDict$insert,
				ctx.node.id,
				_elm_community$intdict$IntDict$size(ctx.incoming));
		},
		_elm_community$intdict$IntDict$empty);
	var sources = A3(
		_elm_community$graph$Graph$fold,
		F2(
			function (ctx, acc) {
				return _elm_community$intdict$IntDict$isEmpty(ctx.incoming) ? {ctor: '::', _0: ctx, _1: acc} : acc;
			}),
		{ctor: '[]'},
		graph);
	return A4(
		go,
		sources,
		{ctor: '[]'},
		countIndegrees(graph),
		graph);
};

var _elm_lang$core$Random$onSelfMsg = F3(
	function (_p1, _p0, seed) {
		return _elm_lang$core$Task$succeed(seed);
	});
var _elm_lang$core$Random$magicNum8 = 2147483562;
var _elm_lang$core$Random$range = function (_p2) {
	return {ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Random$magicNum8};
};
var _elm_lang$core$Random$magicNum7 = 2147483399;
var _elm_lang$core$Random$magicNum6 = 2147483563;
var _elm_lang$core$Random$magicNum5 = 3791;
var _elm_lang$core$Random$magicNum4 = 40692;
var _elm_lang$core$Random$magicNum3 = 52774;
var _elm_lang$core$Random$magicNum2 = 12211;
var _elm_lang$core$Random$magicNum1 = 53668;
var _elm_lang$core$Random$magicNum0 = 40014;
var _elm_lang$core$Random$step = F2(
	function (_p3, seed) {
		var _p4 = _p3;
		return _p4._0(seed);
	});
var _elm_lang$core$Random$onEffects = F3(
	function (router, commands, seed) {
		var _p5 = commands;
		if (_p5.ctor === '[]') {
			return _elm_lang$core$Task$succeed(seed);
		} else {
			var _p6 = A2(_elm_lang$core$Random$step, _p5._0._0, seed);
			var value = _p6._0;
			var newSeed = _p6._1;
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p7) {
					return A3(_elm_lang$core$Random$onEffects, router, _p5._1, newSeed);
				},
				A2(_elm_lang$core$Platform$sendToApp, router, value));
		}
	});
var _elm_lang$core$Random$listHelp = F4(
	function (list, n, generate, seed) {
		listHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 1) < 0) {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$reverse(list),
					_1: seed
				};
			} else {
				var _p8 = generate(seed);
				var value = _p8._0;
				var newSeed = _p8._1;
				var _v2 = {ctor: '::', _0: value, _1: list},
					_v3 = n - 1,
					_v4 = generate,
					_v5 = newSeed;
				list = _v2;
				n = _v3;
				generate = _v4;
				seed = _v5;
				continue listHelp;
			}
		}
	});
var _elm_lang$core$Random$minInt = -2147483648;
var _elm_lang$core$Random$maxInt = 2147483647;
var _elm_lang$core$Random$iLogBase = F2(
	function (b, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, b) < 0) ? 1 : (1 + A2(_elm_lang$core$Random$iLogBase, b, (i / b) | 0));
	});
var _elm_lang$core$Random$command = _elm_lang$core$Native_Platform.leaf('Random');
var _elm_lang$core$Random$Generator = function (a) {
	return {ctor: 'Generator', _0: a};
};
var _elm_lang$core$Random$list = F2(
	function (n, _p9) {
		var _p10 = _p9;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				return A4(
					_elm_lang$core$Random$listHelp,
					{ctor: '[]'},
					n,
					_p10._0,
					seed);
			});
	});
var _elm_lang$core$Random$map = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p13 = _p12._0(seed0);
				var a = _p13._0;
				var seed1 = _p13._1;
				return {
					ctor: '_Tuple2',
					_0: func(a),
					_1: seed1
				};
			});
	});
var _elm_lang$core$Random$map2 = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p18 = _p16._0(seed0);
				var a = _p18._0;
				var seed1 = _p18._1;
				var _p19 = _p17._0(seed1);
				var b = _p19._0;
				var seed2 = _p19._1;
				return {
					ctor: '_Tuple2',
					_0: A2(func, a, b),
					_1: seed2
				};
			});
	});
var _elm_lang$core$Random$pair = F2(
	function (genA, genB) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			genA,
			genB);
	});
var _elm_lang$core$Random$map3 = F4(
	function (func, _p22, _p21, _p20) {
		var _p23 = _p22;
		var _p24 = _p21;
		var _p25 = _p20;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p26 = _p23._0(seed0);
				var a = _p26._0;
				var seed1 = _p26._1;
				var _p27 = _p24._0(seed1);
				var b = _p27._0;
				var seed2 = _p27._1;
				var _p28 = _p25._0(seed2);
				var c = _p28._0;
				var seed3 = _p28._1;
				return {
					ctor: '_Tuple2',
					_0: A3(func, a, b, c),
					_1: seed3
				};
			});
	});
var _elm_lang$core$Random$map4 = F5(
	function (func, _p32, _p31, _p30, _p29) {
		var _p33 = _p32;
		var _p34 = _p31;
		var _p35 = _p30;
		var _p36 = _p29;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p37 = _p33._0(seed0);
				var a = _p37._0;
				var seed1 = _p37._1;
				var _p38 = _p34._0(seed1);
				var b = _p38._0;
				var seed2 = _p38._1;
				var _p39 = _p35._0(seed2);
				var c = _p39._0;
				var seed3 = _p39._1;
				var _p40 = _p36._0(seed3);
				var d = _p40._0;
				var seed4 = _p40._1;
				return {
					ctor: '_Tuple2',
					_0: A4(func, a, b, c, d),
					_1: seed4
				};
			});
	});
var _elm_lang$core$Random$map5 = F6(
	function (func, _p45, _p44, _p43, _p42, _p41) {
		var _p46 = _p45;
		var _p47 = _p44;
		var _p48 = _p43;
		var _p49 = _p42;
		var _p50 = _p41;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p51 = _p46._0(seed0);
				var a = _p51._0;
				var seed1 = _p51._1;
				var _p52 = _p47._0(seed1);
				var b = _p52._0;
				var seed2 = _p52._1;
				var _p53 = _p48._0(seed2);
				var c = _p53._0;
				var seed3 = _p53._1;
				var _p54 = _p49._0(seed3);
				var d = _p54._0;
				var seed4 = _p54._1;
				var _p55 = _p50._0(seed4);
				var e = _p55._0;
				var seed5 = _p55._1;
				return {
					ctor: '_Tuple2',
					_0: A5(func, a, b, c, d, e),
					_1: seed5
				};
			});
	});
var _elm_lang$core$Random$andThen = F2(
	function (callback, _p56) {
		var _p57 = _p56;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p58 = _p57._0(seed);
				var result = _p58._0;
				var newSeed = _p58._1;
				var _p59 = callback(result);
				var genB = _p59._0;
				return genB(newSeed);
			});
	});
var _elm_lang$core$Random$State = F2(
	function (a, b) {
		return {ctor: 'State', _0: a, _1: b};
	});
var _elm_lang$core$Random$initState = function (seed) {
	var s = A2(_elm_lang$core$Basics$max, seed, 0 - seed);
	var q = (s / (_elm_lang$core$Random$magicNum6 - 1)) | 0;
	var s2 = A2(_elm_lang$core$Basics_ops['%'], q, _elm_lang$core$Random$magicNum7 - 1);
	var s1 = A2(_elm_lang$core$Basics_ops['%'], s, _elm_lang$core$Random$magicNum6 - 1);
	return A2(_elm_lang$core$Random$State, s1 + 1, s2 + 1);
};
var _elm_lang$core$Random$next = function (_p60) {
	var _p61 = _p60;
	var _p63 = _p61._1;
	var _p62 = _p61._0;
	var k2 = (_p63 / _elm_lang$core$Random$magicNum3) | 0;
	var rawState2 = (_elm_lang$core$Random$magicNum4 * (_p63 - (k2 * _elm_lang$core$Random$magicNum3))) - (k2 * _elm_lang$core$Random$magicNum5);
	var newState2 = (_elm_lang$core$Native_Utils.cmp(rawState2, 0) < 0) ? (rawState2 + _elm_lang$core$Random$magicNum7) : rawState2;
	var k1 = (_p62 / _elm_lang$core$Random$magicNum1) | 0;
	var rawState1 = (_elm_lang$core$Random$magicNum0 * (_p62 - (k1 * _elm_lang$core$Random$magicNum1))) - (k1 * _elm_lang$core$Random$magicNum2);
	var newState1 = (_elm_lang$core$Native_Utils.cmp(rawState1, 0) < 0) ? (rawState1 + _elm_lang$core$Random$magicNum6) : rawState1;
	var z = newState1 - newState2;
	var newZ = (_elm_lang$core$Native_Utils.cmp(z, 1) < 0) ? (z + _elm_lang$core$Random$magicNum8) : z;
	return {
		ctor: '_Tuple2',
		_0: newZ,
		_1: A2(_elm_lang$core$Random$State, newState1, newState2)
	};
};
var _elm_lang$core$Random$split = function (_p64) {
	var _p65 = _p64;
	var _p68 = _p65._1;
	var _p67 = _p65._0;
	var _p66 = _elm_lang$core$Tuple$second(
		_elm_lang$core$Random$next(_p65));
	var t1 = _p66._0;
	var t2 = _p66._1;
	var new_s2 = _elm_lang$core$Native_Utils.eq(_p68, 1) ? (_elm_lang$core$Random$magicNum7 - 1) : (_p68 - 1);
	var new_s1 = _elm_lang$core$Native_Utils.eq(_p67, _elm_lang$core$Random$magicNum6 - 1) ? 1 : (_p67 + 1);
	return {
		ctor: '_Tuple2',
		_0: A2(_elm_lang$core$Random$State, new_s1, t2),
		_1: A2(_elm_lang$core$Random$State, t1, new_s2)
	};
};
var _elm_lang$core$Random$Seed = function (a) {
	return {ctor: 'Seed', _0: a};
};
var _elm_lang$core$Random$int = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (_p69) {
				var _p70 = _p69;
				var _p75 = _p70._0;
				var base = 2147483561;
				var f = F3(
					function (n, acc, state) {
						f:
						while (true) {
							var _p71 = n;
							if (_p71 === 0) {
								return {ctor: '_Tuple2', _0: acc, _1: state};
							} else {
								var _p72 = _p75.next(state);
								var x = _p72._0;
								var nextState = _p72._1;
								var _v27 = n - 1,
									_v28 = x + (acc * base),
									_v29 = nextState;
								n = _v27;
								acc = _v28;
								state = _v29;
								continue f;
							}
						}
					});
				var _p73 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p73._0;
				var hi = _p73._1;
				var k = (hi - lo) + 1;
				var n = A2(_elm_lang$core$Random$iLogBase, base, k);
				var _p74 = A3(f, n, 1, _p75.state);
				var v = _p74._0;
				var nextState = _p74._1;
				return {
					ctor: '_Tuple2',
					_0: lo + A2(_elm_lang$core$Basics_ops['%'], v, k),
					_1: _elm_lang$core$Random$Seed(
						_elm_lang$core$Native_Utils.update(
							_p75,
							{state: nextState}))
				};
			});
	});
var _elm_lang$core$Random$bool = A2(
	_elm_lang$core$Random$map,
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		})(1),
	A2(_elm_lang$core$Random$int, 0, 1));
var _elm_lang$core$Random$float = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p76 = A2(
					_elm_lang$core$Random$step,
					A2(_elm_lang$core$Random$int, _elm_lang$core$Random$minInt, _elm_lang$core$Random$maxInt),
					seed);
				var number = _p76._0;
				var newSeed = _p76._1;
				var negativeOneToOne = _elm_lang$core$Basics$toFloat(number) / _elm_lang$core$Basics$toFloat(_elm_lang$core$Random$maxInt - _elm_lang$core$Random$minInt);
				var _p77 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p77._0;
				var hi = _p77._1;
				var scaled = ((lo + hi) / 2) + ((hi - lo) * negativeOneToOne);
				return {ctor: '_Tuple2', _0: scaled, _1: newSeed};
			});
	});
var _elm_lang$core$Random$initialSeed = function (n) {
	return _elm_lang$core$Random$Seed(
		{
			state: _elm_lang$core$Random$initState(n),
			next: _elm_lang$core$Random$next,
			split: _elm_lang$core$Random$split,
			range: _elm_lang$core$Random$range
		});
};
var _elm_lang$core$Random$init = A2(
	_elm_lang$core$Task$andThen,
	function (t) {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Random$initialSeed(
				_elm_lang$core$Basics$round(t)));
	},
	_elm_lang$core$Time$now);
var _elm_lang$core$Random$Generate = function (a) {
	return {ctor: 'Generate', _0: a};
};
var _elm_lang$core$Random$generate = F2(
	function (tagger, generator) {
		return _elm_lang$core$Random$command(
			_elm_lang$core$Random$Generate(
				A2(_elm_lang$core$Random$map, tagger, generator)));
	});
var _elm_lang$core$Random$cmdMap = F2(
	function (func, _p78) {
		var _p79 = _p78;
		return _elm_lang$core$Random$Generate(
			A2(_elm_lang$core$Random$map, func, _p79._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Random'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Random$init, onEffects: _elm_lang$core$Random$onEffects, onSelfMsg: _elm_lang$core$Random$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Random$cmdMap};

var _elm_community$random_extra$Random_Extra$andThen6 = F7(
	function (constructor, generatorA, generatorB, generatorC, generatorD, generatorE, generatorF) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Random$andThen,
											function (e) {
												return A2(
													_elm_lang$core$Random$andThen,
													function (f) {
														return A6(constructor, a, b, c, d, e, f);
													},
													generatorF);
											},
											generatorE);
									},
									generatorD);
							},
							generatorC);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$andThen5 = F6(
	function (constructor, generatorA, generatorB, generatorC, generatorD, generatorE) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Random$andThen,
											function (e) {
												return A5(constructor, a, b, c, d, e);
											},
											generatorE);
									},
									generatorD);
							},
							generatorC);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$andThen4 = F5(
	function (constructor, generatorA, generatorB, generatorC, generatorD) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									function (d) {
										return A4(constructor, a, b, c, d);
									},
									generatorD);
							},
							generatorC);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$andThen3 = F4(
	function (constructor, generatorA, generatorB, generatorC) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							function (c) {
								return A3(constructor, a, b, c);
							},
							generatorC);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$andThen2 = F3(
	function (constructor, generatorA, generatorB) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(constructor, a, b);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$rangeLengthList = F3(
	function (minLength, maxLength, generator) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (len) {
				return A2(_elm_lang$core$Random$list, len, generator);
			},
			A2(_elm_lang$core$Random$int, minLength, maxLength));
	});
var _elm_community$random_extra$Random_Extra$result = F3(
	function (genBool, genErr, genVal) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (b) {
				return b ? A2(_elm_lang$core$Random$map, _elm_lang$core$Result$Ok, genVal) : A2(_elm_lang$core$Random$map, _elm_lang$core$Result$Err, genErr);
			},
			genBool);
	});
var _elm_community$random_extra$Random_Extra$sample = function () {
	var find = F2(
		function (k, ys) {
			find:
			while (true) {
				var _p0 = ys;
				if (_p0.ctor === '[]') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_elm_lang$core$Native_Utils.eq(k, 0)) {
						return _elm_lang$core$Maybe$Just(_p0._0);
					} else {
						var _v1 = k - 1,
							_v2 = _p0._1;
						k = _v1;
						ys = _v2;
						continue find;
					}
				}
			}
		});
	return function (xs) {
		return A2(
			_elm_lang$core$Random$map,
			function (i) {
				return A2(find, i, xs);
			},
			A2(
				_elm_lang$core$Random$int,
				0,
				_elm_lang$core$List$length(xs) - 1));
	};
}();
var _elm_community$random_extra$Random_Extra$frequency = function (pairs) {
	var pick = F2(
		function (choices, n) {
			pick:
			while (true) {
				var _p1 = choices;
				if ((_p1.ctor === '::') && (_p1._0.ctor === '_Tuple2')) {
					var _p2 = _p1._0._0;
					if (_elm_lang$core$Native_Utils.cmp(n, _p2) < 1) {
						return _p1._0._1;
					} else {
						var _v4 = _p1._1,
							_v5 = n - _p2;
						choices = _v4;
						n = _v5;
						continue pick;
					}
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Random.Extra',
						{
							start: {line: 154, column: 13},
							end: {line: 162, column: 79}
						},
						_p1)('Empty list passed to Random.Extra.frequency!');
				}
			}
		});
	var total = _elm_lang$core$List$sum(
		A2(
			_elm_lang$core$List$map,
			function (_p4) {
				return _elm_lang$core$Basics$abs(
					_elm_lang$core$Tuple$first(_p4));
			},
			pairs));
	return A2(
		_elm_lang$core$Random$andThen,
		pick(pairs),
		A2(_elm_lang$core$Random$float, 0, total));
};
var _elm_community$random_extra$Random_Extra$choices = function (gens) {
	return _elm_community$random_extra$Random_Extra$frequency(
		A2(
			_elm_lang$core$List$map,
			function (g) {
				return {ctor: '_Tuple2', _0: 1, _1: g};
			},
			gens));
};
var _elm_community$random_extra$Random_Extra$choice = F2(
	function (x, y) {
		return A2(
			_elm_lang$core$Random$map,
			function (b) {
				return b ? x : y;
			},
			_elm_lang$core$Random$bool);
	});
var _elm_community$random_extra$Random_Extra$oneIn = function (n) {
	return A2(
		_elm_lang$core$Random$map,
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(1),
		A2(_elm_lang$core$Random$int, 1, n));
};
var _elm_community$random_extra$Random_Extra$andMap = F2(
	function (generator, funcGenerator) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			funcGenerator,
			generator);
	});
var _elm_community$random_extra$Random_Extra$map6 = F7(
	function (f, generatorA, generatorB, generatorC, generatorD, generatorE, generatorF) {
		return A2(
			_elm_community$random_extra$Random_Extra$andMap,
			generatorF,
			A6(_elm_lang$core$Random$map5, f, generatorA, generatorB, generatorC, generatorD, generatorE));
	});
var _elm_community$random_extra$Random_Extra$constant = function (value) {
	return A2(
		_elm_lang$core$Random$map,
		function (_p5) {
			return value;
		},
		_elm_lang$core$Random$bool);
};
var _elm_community$random_extra$Random_Extra$filter = F2(
	function (predicate, generator) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return predicate(a) ? _elm_community$random_extra$Random_Extra$constant(a) : A2(_elm_community$random_extra$Random_Extra$filter, predicate, generator);
			},
			generator);
	});
var _elm_community$random_extra$Random_Extra$combine = function (generators) {
	var _p6 = generators;
	if (_p6.ctor === '[]') {
		return _elm_community$random_extra$Random_Extra$constant(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p6._0,
			_elm_community$random_extra$Random_Extra$combine(_p6._1));
	}
};
var _elm_community$random_extra$Random_Extra$maybe = F2(
	function (genBool, genA) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (b) {
				return b ? A2(_elm_lang$core$Random$map, _elm_lang$core$Maybe$Just, genA) : _elm_community$random_extra$Random_Extra$constant(_elm_lang$core$Maybe$Nothing);
			},
			genBool);
	});

var _elm_lang$dom$Dom$blur = _elm_lang$dom$Native_Dom.blur;
var _elm_lang$dom$Dom$focus = _elm_lang$dom$Native_Dom.focus;
var _elm_lang$dom$Dom$NotFound = function (a) {
	return {ctor: 'NotFound', _0: a};
};

var _elm_lang$dom$Dom_Size$width = _elm_lang$dom$Native_Dom.width;
var _elm_lang$dom$Dom_Size$height = _elm_lang$dom$Native_Dom.height;
var _elm_lang$dom$Dom_Size$VisibleContentWithBordersAndMargins = {ctor: 'VisibleContentWithBordersAndMargins'};
var _elm_lang$dom$Dom_Size$VisibleContentWithBorders = {ctor: 'VisibleContentWithBorders'};
var _elm_lang$dom$Dom_Size$VisibleContent = {ctor: 'VisibleContent'};
var _elm_lang$dom$Dom_Size$Content = {ctor: 'Content'};

var _elm_lang$dom$Dom_Scroll$toX = _elm_lang$dom$Native_Dom.setScrollLeft;
var _elm_lang$dom$Dom_Scroll$x = _elm_lang$dom$Native_Dom.getScrollLeft;
var _elm_lang$dom$Dom_Scroll$toRight = _elm_lang$dom$Native_Dom.toRight;
var _elm_lang$dom$Dom_Scroll$toLeft = function (id) {
	return A2(_elm_lang$dom$Dom_Scroll$toX, id, 0);
};
var _elm_lang$dom$Dom_Scroll$toY = _elm_lang$dom$Native_Dom.setScrollTop;
var _elm_lang$dom$Dom_Scroll$y = _elm_lang$dom$Native_Dom.getScrollTop;
var _elm_lang$dom$Dom_Scroll$toBottom = _elm_lang$dom$Native_Dom.toBottom;
var _elm_lang$dom$Dom_Scroll$toTop = function (id) {
	return A2(_elm_lang$dom$Dom_Scroll$toY, id, 0);
};

var _elm_lang$svg$Svg$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$svg$Svg$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$svg$Svg$svgNamespace = A2(
	_elm_lang$virtual_dom$VirtualDom$property,
	'namespace',
	_elm_lang$core$Json_Encode$string('http://www.w3.org/2000/svg'));
var _elm_lang$svg$Svg$node = F3(
	function (name, attributes, children) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom$node,
			name,
			{ctor: '::', _0: _elm_lang$svg$Svg$svgNamespace, _1: attributes},
			children);
	});
var _elm_lang$svg$Svg$svg = _elm_lang$svg$Svg$node('svg');
var _elm_lang$svg$Svg$foreignObject = _elm_lang$svg$Svg$node('foreignObject');
var _elm_lang$svg$Svg$animate = _elm_lang$svg$Svg$node('animate');
var _elm_lang$svg$Svg$animateColor = _elm_lang$svg$Svg$node('animateColor');
var _elm_lang$svg$Svg$animateMotion = _elm_lang$svg$Svg$node('animateMotion');
var _elm_lang$svg$Svg$animateTransform = _elm_lang$svg$Svg$node('animateTransform');
var _elm_lang$svg$Svg$mpath = _elm_lang$svg$Svg$node('mpath');
var _elm_lang$svg$Svg$set = _elm_lang$svg$Svg$node('set');
var _elm_lang$svg$Svg$a = _elm_lang$svg$Svg$node('a');
var _elm_lang$svg$Svg$defs = _elm_lang$svg$Svg$node('defs');
var _elm_lang$svg$Svg$g = _elm_lang$svg$Svg$node('g');
var _elm_lang$svg$Svg$marker = _elm_lang$svg$Svg$node('marker');
var _elm_lang$svg$Svg$mask = _elm_lang$svg$Svg$node('mask');
var _elm_lang$svg$Svg$pattern = _elm_lang$svg$Svg$node('pattern');
var _elm_lang$svg$Svg$switch = _elm_lang$svg$Svg$node('switch');
var _elm_lang$svg$Svg$symbol = _elm_lang$svg$Svg$node('symbol');
var _elm_lang$svg$Svg$desc = _elm_lang$svg$Svg$node('desc');
var _elm_lang$svg$Svg$metadata = _elm_lang$svg$Svg$node('metadata');
var _elm_lang$svg$Svg$title = _elm_lang$svg$Svg$node('title');
var _elm_lang$svg$Svg$feBlend = _elm_lang$svg$Svg$node('feBlend');
var _elm_lang$svg$Svg$feColorMatrix = _elm_lang$svg$Svg$node('feColorMatrix');
var _elm_lang$svg$Svg$feComponentTransfer = _elm_lang$svg$Svg$node('feComponentTransfer');
var _elm_lang$svg$Svg$feComposite = _elm_lang$svg$Svg$node('feComposite');
var _elm_lang$svg$Svg$feConvolveMatrix = _elm_lang$svg$Svg$node('feConvolveMatrix');
var _elm_lang$svg$Svg$feDiffuseLighting = _elm_lang$svg$Svg$node('feDiffuseLighting');
var _elm_lang$svg$Svg$feDisplacementMap = _elm_lang$svg$Svg$node('feDisplacementMap');
var _elm_lang$svg$Svg$feFlood = _elm_lang$svg$Svg$node('feFlood');
var _elm_lang$svg$Svg$feFuncA = _elm_lang$svg$Svg$node('feFuncA');
var _elm_lang$svg$Svg$feFuncB = _elm_lang$svg$Svg$node('feFuncB');
var _elm_lang$svg$Svg$feFuncG = _elm_lang$svg$Svg$node('feFuncG');
var _elm_lang$svg$Svg$feFuncR = _elm_lang$svg$Svg$node('feFuncR');
var _elm_lang$svg$Svg$feGaussianBlur = _elm_lang$svg$Svg$node('feGaussianBlur');
var _elm_lang$svg$Svg$feImage = _elm_lang$svg$Svg$node('feImage');
var _elm_lang$svg$Svg$feMerge = _elm_lang$svg$Svg$node('feMerge');
var _elm_lang$svg$Svg$feMergeNode = _elm_lang$svg$Svg$node('feMergeNode');
var _elm_lang$svg$Svg$feMorphology = _elm_lang$svg$Svg$node('feMorphology');
var _elm_lang$svg$Svg$feOffset = _elm_lang$svg$Svg$node('feOffset');
var _elm_lang$svg$Svg$feSpecularLighting = _elm_lang$svg$Svg$node('feSpecularLighting');
var _elm_lang$svg$Svg$feTile = _elm_lang$svg$Svg$node('feTile');
var _elm_lang$svg$Svg$feTurbulence = _elm_lang$svg$Svg$node('feTurbulence');
var _elm_lang$svg$Svg$font = _elm_lang$svg$Svg$node('font');
var _elm_lang$svg$Svg$linearGradient = _elm_lang$svg$Svg$node('linearGradient');
var _elm_lang$svg$Svg$radialGradient = _elm_lang$svg$Svg$node('radialGradient');
var _elm_lang$svg$Svg$stop = _elm_lang$svg$Svg$node('stop');
var _elm_lang$svg$Svg$circle = _elm_lang$svg$Svg$node('circle');
var _elm_lang$svg$Svg$ellipse = _elm_lang$svg$Svg$node('ellipse');
var _elm_lang$svg$Svg$image = _elm_lang$svg$Svg$node('image');
var _elm_lang$svg$Svg$line = _elm_lang$svg$Svg$node('line');
var _elm_lang$svg$Svg$path = _elm_lang$svg$Svg$node('path');
var _elm_lang$svg$Svg$polygon = _elm_lang$svg$Svg$node('polygon');
var _elm_lang$svg$Svg$polyline = _elm_lang$svg$Svg$node('polyline');
var _elm_lang$svg$Svg$rect = _elm_lang$svg$Svg$node('rect');
var _elm_lang$svg$Svg$use = _elm_lang$svg$Svg$node('use');
var _elm_lang$svg$Svg$feDistantLight = _elm_lang$svg$Svg$node('feDistantLight');
var _elm_lang$svg$Svg$fePointLight = _elm_lang$svg$Svg$node('fePointLight');
var _elm_lang$svg$Svg$feSpotLight = _elm_lang$svg$Svg$node('feSpotLight');
var _elm_lang$svg$Svg$altGlyph = _elm_lang$svg$Svg$node('altGlyph');
var _elm_lang$svg$Svg$altGlyphDef = _elm_lang$svg$Svg$node('altGlyphDef');
var _elm_lang$svg$Svg$altGlyphItem = _elm_lang$svg$Svg$node('altGlyphItem');
var _elm_lang$svg$Svg$glyph = _elm_lang$svg$Svg$node('glyph');
var _elm_lang$svg$Svg$glyphRef = _elm_lang$svg$Svg$node('glyphRef');
var _elm_lang$svg$Svg$textPath = _elm_lang$svg$Svg$node('textPath');
var _elm_lang$svg$Svg$text_ = _elm_lang$svg$Svg$node('text');
var _elm_lang$svg$Svg$tref = _elm_lang$svg$Svg$node('tref');
var _elm_lang$svg$Svg$tspan = _elm_lang$svg$Svg$node('tspan');
var _elm_lang$svg$Svg$clipPath = _elm_lang$svg$Svg$node('clipPath');
var _elm_lang$svg$Svg$colorProfile = _elm_lang$svg$Svg$node('colorProfile');
var _elm_lang$svg$Svg$cursor = _elm_lang$svg$Svg$node('cursor');
var _elm_lang$svg$Svg$filter = _elm_lang$svg$Svg$node('filter');
var _elm_lang$svg$Svg$script = _elm_lang$svg$Svg$node('script');
var _elm_lang$svg$Svg$style = _elm_lang$svg$Svg$node('style');
var _elm_lang$svg$Svg$view = _elm_lang$svg$Svg$node('view');

var _elm_lang$svg$Svg_Attributes$writingMode = _elm_lang$virtual_dom$VirtualDom$attribute('writing-mode');
var _elm_lang$svg$Svg_Attributes$wordSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('word-spacing');
var _elm_lang$svg$Svg_Attributes$visibility = _elm_lang$virtual_dom$VirtualDom$attribute('visibility');
var _elm_lang$svg$Svg_Attributes$unicodeBidi = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-bidi');
var _elm_lang$svg$Svg_Attributes$textRendering = _elm_lang$virtual_dom$VirtualDom$attribute('text-rendering');
var _elm_lang$svg$Svg_Attributes$textDecoration = _elm_lang$virtual_dom$VirtualDom$attribute('text-decoration');
var _elm_lang$svg$Svg_Attributes$textAnchor = _elm_lang$virtual_dom$VirtualDom$attribute('text-anchor');
var _elm_lang$svg$Svg_Attributes$stroke = _elm_lang$virtual_dom$VirtualDom$attribute('stroke');
var _elm_lang$svg$Svg_Attributes$strokeWidth = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-width');
var _elm_lang$svg$Svg_Attributes$strokeOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-opacity');
var _elm_lang$svg$Svg_Attributes$strokeMiterlimit = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-miterlimit');
var _elm_lang$svg$Svg_Attributes$strokeLinejoin = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linejoin');
var _elm_lang$svg$Svg_Attributes$strokeLinecap = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linecap');
var _elm_lang$svg$Svg_Attributes$strokeDashoffset = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dashoffset');
var _elm_lang$svg$Svg_Attributes$strokeDasharray = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dasharray');
var _elm_lang$svg$Svg_Attributes$stopOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stop-opacity');
var _elm_lang$svg$Svg_Attributes$stopColor = _elm_lang$virtual_dom$VirtualDom$attribute('stop-color');
var _elm_lang$svg$Svg_Attributes$shapeRendering = _elm_lang$virtual_dom$VirtualDom$attribute('shape-rendering');
var _elm_lang$svg$Svg_Attributes$pointerEvents = _elm_lang$virtual_dom$VirtualDom$attribute('pointer-events');
var _elm_lang$svg$Svg_Attributes$overflow = _elm_lang$virtual_dom$VirtualDom$attribute('overflow');
var _elm_lang$svg$Svg_Attributes$opacity = _elm_lang$virtual_dom$VirtualDom$attribute('opacity');
var _elm_lang$svg$Svg_Attributes$mask = _elm_lang$virtual_dom$VirtualDom$attribute('mask');
var _elm_lang$svg$Svg_Attributes$markerStart = _elm_lang$virtual_dom$VirtualDom$attribute('marker-start');
var _elm_lang$svg$Svg_Attributes$markerMid = _elm_lang$virtual_dom$VirtualDom$attribute('marker-mid');
var _elm_lang$svg$Svg_Attributes$markerEnd = _elm_lang$virtual_dom$VirtualDom$attribute('marker-end');
var _elm_lang$svg$Svg_Attributes$lightingColor = _elm_lang$virtual_dom$VirtualDom$attribute('lighting-color');
var _elm_lang$svg$Svg_Attributes$letterSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('letter-spacing');
var _elm_lang$svg$Svg_Attributes$kerning = _elm_lang$virtual_dom$VirtualDom$attribute('kerning');
var _elm_lang$svg$Svg_Attributes$imageRendering = _elm_lang$virtual_dom$VirtualDom$attribute('image-rendering');
var _elm_lang$svg$Svg_Attributes$glyphOrientationVertical = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-vertical');
var _elm_lang$svg$Svg_Attributes$glyphOrientationHorizontal = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-horizontal');
var _elm_lang$svg$Svg_Attributes$fontWeight = _elm_lang$virtual_dom$VirtualDom$attribute('font-weight');
var _elm_lang$svg$Svg_Attributes$fontVariant = _elm_lang$virtual_dom$VirtualDom$attribute('font-variant');
var _elm_lang$svg$Svg_Attributes$fontStyle = _elm_lang$virtual_dom$VirtualDom$attribute('font-style');
var _elm_lang$svg$Svg_Attributes$fontStretch = _elm_lang$virtual_dom$VirtualDom$attribute('font-stretch');
var _elm_lang$svg$Svg_Attributes$fontSize = _elm_lang$virtual_dom$VirtualDom$attribute('font-size');
var _elm_lang$svg$Svg_Attributes$fontSizeAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('font-size-adjust');
var _elm_lang$svg$Svg_Attributes$fontFamily = _elm_lang$virtual_dom$VirtualDom$attribute('font-family');
var _elm_lang$svg$Svg_Attributes$floodOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('flood-opacity');
var _elm_lang$svg$Svg_Attributes$floodColor = _elm_lang$virtual_dom$VirtualDom$attribute('flood-color');
var _elm_lang$svg$Svg_Attributes$filter = _elm_lang$virtual_dom$VirtualDom$attribute('filter');
var _elm_lang$svg$Svg_Attributes$fill = _elm_lang$virtual_dom$VirtualDom$attribute('fill');
var _elm_lang$svg$Svg_Attributes$fillRule = _elm_lang$virtual_dom$VirtualDom$attribute('fill-rule');
var _elm_lang$svg$Svg_Attributes$fillOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('fill-opacity');
var _elm_lang$svg$Svg_Attributes$enableBackground = _elm_lang$virtual_dom$VirtualDom$attribute('enable-background');
var _elm_lang$svg$Svg_Attributes$dominantBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('dominant-baseline');
var _elm_lang$svg$Svg_Attributes$display = _elm_lang$virtual_dom$VirtualDom$attribute('display');
var _elm_lang$svg$Svg_Attributes$direction = _elm_lang$virtual_dom$VirtualDom$attribute('direction');
var _elm_lang$svg$Svg_Attributes$cursor = _elm_lang$virtual_dom$VirtualDom$attribute('cursor');
var _elm_lang$svg$Svg_Attributes$color = _elm_lang$virtual_dom$VirtualDom$attribute('color');
var _elm_lang$svg$Svg_Attributes$colorRendering = _elm_lang$virtual_dom$VirtualDom$attribute('color-rendering');
var _elm_lang$svg$Svg_Attributes$colorProfile = _elm_lang$virtual_dom$VirtualDom$attribute('color-profile');
var _elm_lang$svg$Svg_Attributes$colorInterpolation = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation');
var _elm_lang$svg$Svg_Attributes$colorInterpolationFilters = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation-filters');
var _elm_lang$svg$Svg_Attributes$clip = _elm_lang$virtual_dom$VirtualDom$attribute('clip');
var _elm_lang$svg$Svg_Attributes$clipRule = _elm_lang$virtual_dom$VirtualDom$attribute('clip-rule');
var _elm_lang$svg$Svg_Attributes$clipPath = _elm_lang$virtual_dom$VirtualDom$attribute('clip-path');
var _elm_lang$svg$Svg_Attributes$baselineShift = _elm_lang$virtual_dom$VirtualDom$attribute('baseline-shift');
var _elm_lang$svg$Svg_Attributes$alignmentBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('alignment-baseline');
var _elm_lang$svg$Svg_Attributes$zoomAndPan = _elm_lang$virtual_dom$VirtualDom$attribute('zoomAndPan');
var _elm_lang$svg$Svg_Attributes$z = _elm_lang$virtual_dom$VirtualDom$attribute('z');
var _elm_lang$svg$Svg_Attributes$yChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('yChannelSelector');
var _elm_lang$svg$Svg_Attributes$y2 = _elm_lang$virtual_dom$VirtualDom$attribute('y2');
var _elm_lang$svg$Svg_Attributes$y1 = _elm_lang$virtual_dom$VirtualDom$attribute('y1');
var _elm_lang$svg$Svg_Attributes$y = _elm_lang$virtual_dom$VirtualDom$attribute('y');
var _elm_lang$svg$Svg_Attributes$xmlSpace = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var _elm_lang$svg$Svg_Attributes$xmlLang = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:lang');
var _elm_lang$svg$Svg_Attributes$xmlBase = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:base');
var _elm_lang$svg$Svg_Attributes$xlinkType = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:type');
var _elm_lang$svg$Svg_Attributes$xlinkTitle = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:title');
var _elm_lang$svg$Svg_Attributes$xlinkShow = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:show');
var _elm_lang$svg$Svg_Attributes$xlinkRole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:role');
var _elm_lang$svg$Svg_Attributes$xlinkHref = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:href');
var _elm_lang$svg$Svg_Attributes$xlinkArcrole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:arcrole');
var _elm_lang$svg$Svg_Attributes$xlinkActuate = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:actuate');
var _elm_lang$svg$Svg_Attributes$xChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('xChannelSelector');
var _elm_lang$svg$Svg_Attributes$x2 = _elm_lang$virtual_dom$VirtualDom$attribute('x2');
var _elm_lang$svg$Svg_Attributes$x1 = _elm_lang$virtual_dom$VirtualDom$attribute('x1');
var _elm_lang$svg$Svg_Attributes$xHeight = _elm_lang$virtual_dom$VirtualDom$attribute('x-height');
var _elm_lang$svg$Svg_Attributes$x = _elm_lang$virtual_dom$VirtualDom$attribute('x');
var _elm_lang$svg$Svg_Attributes$widths = _elm_lang$virtual_dom$VirtualDom$attribute('widths');
var _elm_lang$svg$Svg_Attributes$width = _elm_lang$virtual_dom$VirtualDom$attribute('width');
var _elm_lang$svg$Svg_Attributes$viewTarget = _elm_lang$virtual_dom$VirtualDom$attribute('viewTarget');
var _elm_lang$svg$Svg_Attributes$viewBox = _elm_lang$virtual_dom$VirtualDom$attribute('viewBox');
var _elm_lang$svg$Svg_Attributes$vertOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-y');
var _elm_lang$svg$Svg_Attributes$vertOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-x');
var _elm_lang$svg$Svg_Attributes$vertAdvY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-adv-y');
var _elm_lang$svg$Svg_Attributes$version = _elm_lang$virtual_dom$VirtualDom$attribute('version');
var _elm_lang$svg$Svg_Attributes$values = _elm_lang$virtual_dom$VirtualDom$attribute('values');
var _elm_lang$svg$Svg_Attributes$vMathematical = _elm_lang$virtual_dom$VirtualDom$attribute('v-mathematical');
var _elm_lang$svg$Svg_Attributes$vIdeographic = _elm_lang$virtual_dom$VirtualDom$attribute('v-ideographic');
var _elm_lang$svg$Svg_Attributes$vHanging = _elm_lang$virtual_dom$VirtualDom$attribute('v-hanging');
var _elm_lang$svg$Svg_Attributes$vAlphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('v-alphabetic');
var _elm_lang$svg$Svg_Attributes$unitsPerEm = _elm_lang$virtual_dom$VirtualDom$attribute('units-per-em');
var _elm_lang$svg$Svg_Attributes$unicodeRange = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-range');
var _elm_lang$svg$Svg_Attributes$unicode = _elm_lang$virtual_dom$VirtualDom$attribute('unicode');
var _elm_lang$svg$Svg_Attributes$underlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('underline-thickness');
var _elm_lang$svg$Svg_Attributes$underlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('underline-position');
var _elm_lang$svg$Svg_Attributes$u2 = _elm_lang$virtual_dom$VirtualDom$attribute('u2');
var _elm_lang$svg$Svg_Attributes$u1 = _elm_lang$virtual_dom$VirtualDom$attribute('u1');
var _elm_lang$svg$Svg_Attributes$type_ = _elm_lang$virtual_dom$VirtualDom$attribute('type');
var _elm_lang$svg$Svg_Attributes$transform = _elm_lang$virtual_dom$VirtualDom$attribute('transform');
var _elm_lang$svg$Svg_Attributes$to = _elm_lang$virtual_dom$VirtualDom$attribute('to');
var _elm_lang$svg$Svg_Attributes$title = _elm_lang$virtual_dom$VirtualDom$attribute('title');
var _elm_lang$svg$Svg_Attributes$textLength = _elm_lang$virtual_dom$VirtualDom$attribute('textLength');
var _elm_lang$svg$Svg_Attributes$targetY = _elm_lang$virtual_dom$VirtualDom$attribute('targetY');
var _elm_lang$svg$Svg_Attributes$targetX = _elm_lang$virtual_dom$VirtualDom$attribute('targetX');
var _elm_lang$svg$Svg_Attributes$target = _elm_lang$virtual_dom$VirtualDom$attribute('target');
var _elm_lang$svg$Svg_Attributes$tableValues = _elm_lang$virtual_dom$VirtualDom$attribute('tableValues');
var _elm_lang$svg$Svg_Attributes$systemLanguage = _elm_lang$virtual_dom$VirtualDom$attribute('systemLanguage');
var _elm_lang$svg$Svg_Attributes$surfaceScale = _elm_lang$virtual_dom$VirtualDom$attribute('surfaceScale');
var _elm_lang$svg$Svg_Attributes$style = _elm_lang$virtual_dom$VirtualDom$attribute('style');
var _elm_lang$svg$Svg_Attributes$string = _elm_lang$virtual_dom$VirtualDom$attribute('string');
var _elm_lang$svg$Svg_Attributes$strikethroughThickness = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-thickness');
var _elm_lang$svg$Svg_Attributes$strikethroughPosition = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-position');
var _elm_lang$svg$Svg_Attributes$stitchTiles = _elm_lang$virtual_dom$VirtualDom$attribute('stitchTiles');
var _elm_lang$svg$Svg_Attributes$stemv = _elm_lang$virtual_dom$VirtualDom$attribute('stemv');
var _elm_lang$svg$Svg_Attributes$stemh = _elm_lang$virtual_dom$VirtualDom$attribute('stemh');
var _elm_lang$svg$Svg_Attributes$stdDeviation = _elm_lang$virtual_dom$VirtualDom$attribute('stdDeviation');
var _elm_lang$svg$Svg_Attributes$startOffset = _elm_lang$virtual_dom$VirtualDom$attribute('startOffset');
var _elm_lang$svg$Svg_Attributes$spreadMethod = _elm_lang$virtual_dom$VirtualDom$attribute('spreadMethod');
var _elm_lang$svg$Svg_Attributes$speed = _elm_lang$virtual_dom$VirtualDom$attribute('speed');
var _elm_lang$svg$Svg_Attributes$specularExponent = _elm_lang$virtual_dom$VirtualDom$attribute('specularExponent');
var _elm_lang$svg$Svg_Attributes$specularConstant = _elm_lang$virtual_dom$VirtualDom$attribute('specularConstant');
var _elm_lang$svg$Svg_Attributes$spacing = _elm_lang$virtual_dom$VirtualDom$attribute('spacing');
var _elm_lang$svg$Svg_Attributes$slope = _elm_lang$virtual_dom$VirtualDom$attribute('slope');
var _elm_lang$svg$Svg_Attributes$seed = _elm_lang$virtual_dom$VirtualDom$attribute('seed');
var _elm_lang$svg$Svg_Attributes$scale = _elm_lang$virtual_dom$VirtualDom$attribute('scale');
var _elm_lang$svg$Svg_Attributes$ry = _elm_lang$virtual_dom$VirtualDom$attribute('ry');
var _elm_lang$svg$Svg_Attributes$rx = _elm_lang$virtual_dom$VirtualDom$attribute('rx');
var _elm_lang$svg$Svg_Attributes$rotate = _elm_lang$virtual_dom$VirtualDom$attribute('rotate');
var _elm_lang$svg$Svg_Attributes$result = _elm_lang$virtual_dom$VirtualDom$attribute('result');
var _elm_lang$svg$Svg_Attributes$restart = _elm_lang$virtual_dom$VirtualDom$attribute('restart');
var _elm_lang$svg$Svg_Attributes$requiredFeatures = _elm_lang$virtual_dom$VirtualDom$attribute('requiredFeatures');
var _elm_lang$svg$Svg_Attributes$requiredExtensions = _elm_lang$virtual_dom$VirtualDom$attribute('requiredExtensions');
var _elm_lang$svg$Svg_Attributes$repeatDur = _elm_lang$virtual_dom$VirtualDom$attribute('repeatDur');
var _elm_lang$svg$Svg_Attributes$repeatCount = _elm_lang$virtual_dom$VirtualDom$attribute('repeatCount');
var _elm_lang$svg$Svg_Attributes$renderingIntent = _elm_lang$virtual_dom$VirtualDom$attribute('rendering-intent');
var _elm_lang$svg$Svg_Attributes$refY = _elm_lang$virtual_dom$VirtualDom$attribute('refY');
var _elm_lang$svg$Svg_Attributes$refX = _elm_lang$virtual_dom$VirtualDom$attribute('refX');
var _elm_lang$svg$Svg_Attributes$radius = _elm_lang$virtual_dom$VirtualDom$attribute('radius');
var _elm_lang$svg$Svg_Attributes$r = _elm_lang$virtual_dom$VirtualDom$attribute('r');
var _elm_lang$svg$Svg_Attributes$primitiveUnits = _elm_lang$virtual_dom$VirtualDom$attribute('primitiveUnits');
var _elm_lang$svg$Svg_Attributes$preserveAspectRatio = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAspectRatio');
var _elm_lang$svg$Svg_Attributes$preserveAlpha = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAlpha');
var _elm_lang$svg$Svg_Attributes$pointsAtZ = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtZ');
var _elm_lang$svg$Svg_Attributes$pointsAtY = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtY');
var _elm_lang$svg$Svg_Attributes$pointsAtX = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtX');
var _elm_lang$svg$Svg_Attributes$points = _elm_lang$virtual_dom$VirtualDom$attribute('points');
var _elm_lang$svg$Svg_Attributes$pointOrder = _elm_lang$virtual_dom$VirtualDom$attribute('point-order');
var _elm_lang$svg$Svg_Attributes$patternUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternUnits');
var _elm_lang$svg$Svg_Attributes$patternTransform = _elm_lang$virtual_dom$VirtualDom$attribute('patternTransform');
var _elm_lang$svg$Svg_Attributes$patternContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternContentUnits');
var _elm_lang$svg$Svg_Attributes$pathLength = _elm_lang$virtual_dom$VirtualDom$attribute('pathLength');
var _elm_lang$svg$Svg_Attributes$path = _elm_lang$virtual_dom$VirtualDom$attribute('path');
var _elm_lang$svg$Svg_Attributes$panose1 = _elm_lang$virtual_dom$VirtualDom$attribute('panose-1');
var _elm_lang$svg$Svg_Attributes$overlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('overline-thickness');
var _elm_lang$svg$Svg_Attributes$overlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('overline-position');
var _elm_lang$svg$Svg_Attributes$origin = _elm_lang$virtual_dom$VirtualDom$attribute('origin');
var _elm_lang$svg$Svg_Attributes$orientation = _elm_lang$virtual_dom$VirtualDom$attribute('orientation');
var _elm_lang$svg$Svg_Attributes$orient = _elm_lang$virtual_dom$VirtualDom$attribute('orient');
var _elm_lang$svg$Svg_Attributes$order = _elm_lang$virtual_dom$VirtualDom$attribute('order');
var _elm_lang$svg$Svg_Attributes$operator = _elm_lang$virtual_dom$VirtualDom$attribute('operator');
var _elm_lang$svg$Svg_Attributes$offset = _elm_lang$virtual_dom$VirtualDom$attribute('offset');
var _elm_lang$svg$Svg_Attributes$numOctaves = _elm_lang$virtual_dom$VirtualDom$attribute('numOctaves');
var _elm_lang$svg$Svg_Attributes$name = _elm_lang$virtual_dom$VirtualDom$attribute('name');
var _elm_lang$svg$Svg_Attributes$mode = _elm_lang$virtual_dom$VirtualDom$attribute('mode');
var _elm_lang$svg$Svg_Attributes$min = _elm_lang$virtual_dom$VirtualDom$attribute('min');
var _elm_lang$svg$Svg_Attributes$method = _elm_lang$virtual_dom$VirtualDom$attribute('method');
var _elm_lang$svg$Svg_Attributes$media = _elm_lang$virtual_dom$VirtualDom$attribute('media');
var _elm_lang$svg$Svg_Attributes$max = _elm_lang$virtual_dom$VirtualDom$attribute('max');
var _elm_lang$svg$Svg_Attributes$mathematical = _elm_lang$virtual_dom$VirtualDom$attribute('mathematical');
var _elm_lang$svg$Svg_Attributes$maskUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskUnits');
var _elm_lang$svg$Svg_Attributes$maskContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskContentUnits');
var _elm_lang$svg$Svg_Attributes$markerWidth = _elm_lang$virtual_dom$VirtualDom$attribute('markerWidth');
var _elm_lang$svg$Svg_Attributes$markerUnits = _elm_lang$virtual_dom$VirtualDom$attribute('markerUnits');
var _elm_lang$svg$Svg_Attributes$markerHeight = _elm_lang$virtual_dom$VirtualDom$attribute('markerHeight');
var _elm_lang$svg$Svg_Attributes$local = _elm_lang$virtual_dom$VirtualDom$attribute('local');
var _elm_lang$svg$Svg_Attributes$limitingConeAngle = _elm_lang$virtual_dom$VirtualDom$attribute('limitingConeAngle');
var _elm_lang$svg$Svg_Attributes$lengthAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('lengthAdjust');
var _elm_lang$svg$Svg_Attributes$lang = _elm_lang$virtual_dom$VirtualDom$attribute('lang');
var _elm_lang$svg$Svg_Attributes$keyTimes = _elm_lang$virtual_dom$VirtualDom$attribute('keyTimes');
var _elm_lang$svg$Svg_Attributes$keySplines = _elm_lang$virtual_dom$VirtualDom$attribute('keySplines');
var _elm_lang$svg$Svg_Attributes$keyPoints = _elm_lang$virtual_dom$VirtualDom$attribute('keyPoints');
var _elm_lang$svg$Svg_Attributes$kernelUnitLength = _elm_lang$virtual_dom$VirtualDom$attribute('kernelUnitLength');
var _elm_lang$svg$Svg_Attributes$kernelMatrix = _elm_lang$virtual_dom$VirtualDom$attribute('kernelMatrix');
var _elm_lang$svg$Svg_Attributes$k4 = _elm_lang$virtual_dom$VirtualDom$attribute('k4');
var _elm_lang$svg$Svg_Attributes$k3 = _elm_lang$virtual_dom$VirtualDom$attribute('k3');
var _elm_lang$svg$Svg_Attributes$k2 = _elm_lang$virtual_dom$VirtualDom$attribute('k2');
var _elm_lang$svg$Svg_Attributes$k1 = _elm_lang$virtual_dom$VirtualDom$attribute('k1');
var _elm_lang$svg$Svg_Attributes$k = _elm_lang$virtual_dom$VirtualDom$attribute('k');
var _elm_lang$svg$Svg_Attributes$intercept = _elm_lang$virtual_dom$VirtualDom$attribute('intercept');
var _elm_lang$svg$Svg_Attributes$in2 = _elm_lang$virtual_dom$VirtualDom$attribute('in2');
var _elm_lang$svg$Svg_Attributes$in_ = _elm_lang$virtual_dom$VirtualDom$attribute('in');
var _elm_lang$svg$Svg_Attributes$ideographic = _elm_lang$virtual_dom$VirtualDom$attribute('ideographic');
var _elm_lang$svg$Svg_Attributes$id = _elm_lang$virtual_dom$VirtualDom$attribute('id');
var _elm_lang$svg$Svg_Attributes$horizOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-y');
var _elm_lang$svg$Svg_Attributes$horizOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-x');
var _elm_lang$svg$Svg_Attributes$horizAdvX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-adv-x');
var _elm_lang$svg$Svg_Attributes$height = _elm_lang$virtual_dom$VirtualDom$attribute('height');
var _elm_lang$svg$Svg_Attributes$hanging = _elm_lang$virtual_dom$VirtualDom$attribute('hanging');
var _elm_lang$svg$Svg_Attributes$gradientUnits = _elm_lang$virtual_dom$VirtualDom$attribute('gradientUnits');
var _elm_lang$svg$Svg_Attributes$gradientTransform = _elm_lang$virtual_dom$VirtualDom$attribute('gradientTransform');
var _elm_lang$svg$Svg_Attributes$glyphRef = _elm_lang$virtual_dom$VirtualDom$attribute('glyphRef');
var _elm_lang$svg$Svg_Attributes$glyphName = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-name');
var _elm_lang$svg$Svg_Attributes$g2 = _elm_lang$virtual_dom$VirtualDom$attribute('g2');
var _elm_lang$svg$Svg_Attributes$g1 = _elm_lang$virtual_dom$VirtualDom$attribute('g1');
var _elm_lang$svg$Svg_Attributes$fy = _elm_lang$virtual_dom$VirtualDom$attribute('fy');
var _elm_lang$svg$Svg_Attributes$fx = _elm_lang$virtual_dom$VirtualDom$attribute('fx');
var _elm_lang$svg$Svg_Attributes$from = _elm_lang$virtual_dom$VirtualDom$attribute('from');
var _elm_lang$svg$Svg_Attributes$format = _elm_lang$virtual_dom$VirtualDom$attribute('format');
var _elm_lang$svg$Svg_Attributes$filterUnits = _elm_lang$virtual_dom$VirtualDom$attribute('filterUnits');
var _elm_lang$svg$Svg_Attributes$filterRes = _elm_lang$virtual_dom$VirtualDom$attribute('filterRes');
var _elm_lang$svg$Svg_Attributes$externalResourcesRequired = _elm_lang$virtual_dom$VirtualDom$attribute('externalResourcesRequired');
var _elm_lang$svg$Svg_Attributes$exponent = _elm_lang$virtual_dom$VirtualDom$attribute('exponent');
var _elm_lang$svg$Svg_Attributes$end = _elm_lang$virtual_dom$VirtualDom$attribute('end');
var _elm_lang$svg$Svg_Attributes$elevation = _elm_lang$virtual_dom$VirtualDom$attribute('elevation');
var _elm_lang$svg$Svg_Attributes$edgeMode = _elm_lang$virtual_dom$VirtualDom$attribute('edgeMode');
var _elm_lang$svg$Svg_Attributes$dy = _elm_lang$virtual_dom$VirtualDom$attribute('dy');
var _elm_lang$svg$Svg_Attributes$dx = _elm_lang$virtual_dom$VirtualDom$attribute('dx');
var _elm_lang$svg$Svg_Attributes$dur = _elm_lang$virtual_dom$VirtualDom$attribute('dur');
var _elm_lang$svg$Svg_Attributes$divisor = _elm_lang$virtual_dom$VirtualDom$attribute('divisor');
var _elm_lang$svg$Svg_Attributes$diffuseConstant = _elm_lang$virtual_dom$VirtualDom$attribute('diffuseConstant');
var _elm_lang$svg$Svg_Attributes$descent = _elm_lang$virtual_dom$VirtualDom$attribute('descent');
var _elm_lang$svg$Svg_Attributes$decelerate = _elm_lang$virtual_dom$VirtualDom$attribute('decelerate');
var _elm_lang$svg$Svg_Attributes$d = _elm_lang$virtual_dom$VirtualDom$attribute('d');
var _elm_lang$svg$Svg_Attributes$cy = _elm_lang$virtual_dom$VirtualDom$attribute('cy');
var _elm_lang$svg$Svg_Attributes$cx = _elm_lang$virtual_dom$VirtualDom$attribute('cx');
var _elm_lang$svg$Svg_Attributes$contentStyleType = _elm_lang$virtual_dom$VirtualDom$attribute('contentStyleType');
var _elm_lang$svg$Svg_Attributes$contentScriptType = _elm_lang$virtual_dom$VirtualDom$attribute('contentScriptType');
var _elm_lang$svg$Svg_Attributes$clipPathUnits = _elm_lang$virtual_dom$VirtualDom$attribute('clipPathUnits');
var _elm_lang$svg$Svg_Attributes$class = _elm_lang$virtual_dom$VirtualDom$attribute('class');
var _elm_lang$svg$Svg_Attributes$capHeight = _elm_lang$virtual_dom$VirtualDom$attribute('cap-height');
var _elm_lang$svg$Svg_Attributes$calcMode = _elm_lang$virtual_dom$VirtualDom$attribute('calcMode');
var _elm_lang$svg$Svg_Attributes$by = _elm_lang$virtual_dom$VirtualDom$attribute('by');
var _elm_lang$svg$Svg_Attributes$bias = _elm_lang$virtual_dom$VirtualDom$attribute('bias');
var _elm_lang$svg$Svg_Attributes$begin = _elm_lang$virtual_dom$VirtualDom$attribute('begin');
var _elm_lang$svg$Svg_Attributes$bbox = _elm_lang$virtual_dom$VirtualDom$attribute('bbox');
var _elm_lang$svg$Svg_Attributes$baseProfile = _elm_lang$virtual_dom$VirtualDom$attribute('baseProfile');
var _elm_lang$svg$Svg_Attributes$baseFrequency = _elm_lang$virtual_dom$VirtualDom$attribute('baseFrequency');
var _elm_lang$svg$Svg_Attributes$azimuth = _elm_lang$virtual_dom$VirtualDom$attribute('azimuth');
var _elm_lang$svg$Svg_Attributes$autoReverse = _elm_lang$virtual_dom$VirtualDom$attribute('autoReverse');
var _elm_lang$svg$Svg_Attributes$attributeType = _elm_lang$virtual_dom$VirtualDom$attribute('attributeType');
var _elm_lang$svg$Svg_Attributes$attributeName = _elm_lang$virtual_dom$VirtualDom$attribute('attributeName');
var _elm_lang$svg$Svg_Attributes$ascent = _elm_lang$virtual_dom$VirtualDom$attribute('ascent');
var _elm_lang$svg$Svg_Attributes$arabicForm = _elm_lang$virtual_dom$VirtualDom$attribute('arabic-form');
var _elm_lang$svg$Svg_Attributes$amplitude = _elm_lang$virtual_dom$VirtualDom$attribute('amplitude');
var _elm_lang$svg$Svg_Attributes$allowReorder = _elm_lang$virtual_dom$VirtualDom$attribute('allowReorder');
var _elm_lang$svg$Svg_Attributes$alphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('alphabetic');
var _elm_lang$svg$Svg_Attributes$additive = _elm_lang$virtual_dom$VirtualDom$attribute('additive');
var _elm_lang$svg$Svg_Attributes$accumulate = _elm_lang$virtual_dom$VirtualDom$attribute('accumulate');
var _elm_lang$svg$Svg_Attributes$accelerate = _elm_lang$virtual_dom$VirtualDom$attribute('accelerate');
var _elm_lang$svg$Svg_Attributes$accentHeight = _elm_lang$virtual_dom$VirtualDom$attribute('accent-height');

var _strelka_2017$phi$Chat_Model$mcaName = function (action) {
	var _p0 = action;
	switch (_p0.ctor) {
		case 'McaRunDay':
			return 'Next Day';
		case 'McaWeatherForecast':
			return 'Weather Forecast';
		case 'McaChangeDesign':
			return 'Change Design';
		case 'McaRunWeek':
			return 'Next Week';
		default:
			return 'Selection some location';
	}
};
var _strelka_2017$phi$Chat_Model$MultiChoiceMessage = F2(
	function (a, b) {
		return {text: a, options: b};
	});
var _strelka_2017$phi$Chat_Model$FreeTextInput = {ctor: 'FreeTextInput'};
var _strelka_2017$phi$Chat_Model$MultiChoiceInput = {ctor: 'MultiChoiceInput'};
var _strelka_2017$phi$Chat_Model$BotItem = function (a) {
	return {ctor: 'BotItem', _0: a};
};
var _strelka_2017$phi$Chat_Model$UserMessage = function (a) {
	return {ctor: 'UserMessage', _0: a};
};
var _strelka_2017$phi$Chat_Model$MultiChoiceItem = function (a) {
	return {ctor: 'MultiChoiceItem', _0: a};
};
var _strelka_2017$phi$Chat_Model$BotMessage = function (a) {
	return {ctor: 'BotMessage', _0: a};
};
var _strelka_2017$phi$Chat_Model$initChat = _strelka_2017$phi$Chat_Model$BotItem(
	_strelka_2017$phi$Chat_Model$BotMessage('Welcome to Φ Chat! I only respond to commands for now.\nCurrent available commands are:\n\n/weather (i tell you abt the weather today)\n/turn (i move to the next day)\n/describe [nodeId] (i tell you some info about a specific node)\n'));
var _strelka_2017$phi$Chat_Model$WidgetItem = function (a) {
	return {ctor: 'WidgetItem', _0: a};
};
var _strelka_2017$phi$Chat_Model$McaSelectLocation = function (a) {
	return {ctor: 'McaSelectLocation', _0: a};
};
var _strelka_2017$phi$Chat_Model$McaChangeDesign = {ctor: 'McaChangeDesign'};
var _strelka_2017$phi$Chat_Model$McaWeatherForecast = {ctor: 'McaWeatherForecast'};
var _strelka_2017$phi$Chat_Model$McaRunWeek = {ctor: 'McaRunWeek'};
var _strelka_2017$phi$Chat_Model$McaRunDay = {ctor: 'McaRunDay'};
var _strelka_2017$phi$Chat_Model$BotMultiQuestion = {ctor: 'BotMultiQuestion'};
var _strelka_2017$phi$Chat_Model$WeatherWidget = {ctor: 'WeatherWidget'};

var _strelka_2017$phi$Simulation_Model$Coords = F2(
	function (a, b) {
		return {x: a, y: b};
	});
var _strelka_2017$phi$Simulation_Model$Line = F2(
	function (a, b) {
		return {from: a, to: b};
	});
var _strelka_2017$phi$Simulation_Model$ReputationRatio = F2(
	function (a, b) {
		return {a: a, b: b};
	});
var _strelka_2017$phi$Simulation_Model$NarrativeItem = F2(
	function (a, b) {
		return {event: a, message: b};
	});
var _strelka_2017$phi$Simulation_Model$SiteInfo = F2(
	function (a, b) {
		return {name: a, population: b};
	});
var _strelka_2017$phi$Simulation_Model$SimMap = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {name: a, population: b, initialNetwork: c, initialWeather: d, initialWeatherList: e, narrative: f, initialBudget: g, initialReputationRatio: h, initialNegawattLimit: i};
	});
var _strelka_2017$phi$Simulation_Model$EncodedEdge = F2(
	function (a, b) {
		return {transmissionLine: a, pos: b};
	});
var _strelka_2017$phi$Simulation_Model$SimGenerator = F4(
	function (a, b, c, d) {
		return {dailyGeneration: a, maxGeneration: b, pos: c, generatorType: d};
	});
var _strelka_2017$phi$Simulation_Model$Battery = F3(
	function (a, b, c) {
		return {capacity: a, storage: b, pos: c};
	});
var _strelka_2017$phi$Simulation_Model$PeerJoules = F5(
	function (a, b, c, d, e) {
		return {storedJoules: a, actualConsumption: b, desiredConsumption: c, seedRatingJoules: d, tradeBalance: e};
	});
var _strelka_2017$phi$Simulation_Model$Peer = F4(
	function (a, b, c, d) {
		return {joules: a, negawatts: b, reputation: c, pos: d};
	});
var _strelka_2017$phi$Simulation_Model$Weather = F2(
	function (a, b) {
		return {sun: a, wind: b};
	});
var _strelka_2017$phi$Simulation_Model$BatNode = function (a) {
	return {ctor: 'BatNode', _0: a};
};
var _strelka_2017$phi$Simulation_Model$PeerNode = function (a) {
	return {ctor: 'PeerNode', _0: a};
};
var _strelka_2017$phi$Simulation_Model$GeneratorNode = function (a) {
	return {ctor: 'GeneratorNode', _0: a};
};
var _strelka_2017$phi$Simulation_Model$SolarPanel = {ctor: 'SolarPanel'};
var _strelka_2017$phi$Simulation_Model$WindTurbine = {ctor: 'WindTurbine'};

var _strelka_2017$phi$Simulation_SimulationInterop$animationFinished = _elm_lang$core$Native_Platform.incomingPort('animationFinished', _elm_lang$core$Json_Decode$string);

var _strelka_2017$phi$Action$SendToEliza = function (a) {
	return {ctor: 'SendToEliza', _0: a};
};
var _strelka_2017$phi$Action$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _strelka_2017$phi$Action$ToggleInputType = {ctor: 'ToggleInputType'};
var _strelka_2017$phi$Action$MultiChoiceMsg = function (a) {
	return {ctor: 'MultiChoiceMsg', _0: a};
};
var _strelka_2017$phi$Action$DaySummary = {ctor: 'DaySummary'};
var _strelka_2017$phi$Action$CallTurn = {ctor: 'CallTurn'};
var _strelka_2017$phi$Action$UpdateWeather = function (a) {
	return {ctor: 'UpdateWeather', _0: a};
};
var _strelka_2017$phi$Action$AnimationFinished = function (a) {
	return {ctor: 'AnimationFinished', _0: a};
};
var _strelka_2017$phi$Action$AnimateTrade = {ctor: 'AnimateTrade'};
var _strelka_2017$phi$Action$AnimatePeerConsumption = {ctor: 'AnimatePeerConsumption'};
var _strelka_2017$phi$Action$AnimateGeneration = {ctor: 'AnimateGeneration'};
var _strelka_2017$phi$Action$RenderPhiNetwork = {ctor: 'RenderPhiNetwork'};
var _strelka_2017$phi$Action$AddEdge = function (a) {
	return {ctor: 'AddEdge', _0: a};
};
var _strelka_2017$phi$Action$AddPeer = function (a) {
	return {ctor: 'AddPeer', _0: a};
};
var _strelka_2017$phi$Action$AddGenerator = function (a) {
	return {ctor: 'AddGenerator', _0: a};
};
var _strelka_2017$phi$Action$DescribeNode = function (a) {
	return {ctor: 'DescribeNode', _0: a};
};
var _strelka_2017$phi$Action$CheckWeather = {ctor: 'CheckWeather'};
var _strelka_2017$phi$Action$NoOp = {ctor: 'NoOp'};
var _strelka_2017$phi$Action$SendBotChatItem = function (a) {
	return {ctor: 'SendBotChatItem', _0: a};
};
var _strelka_2017$phi$Action$SendUserChatMsg = {ctor: 'SendUserChatMsg'};
var _strelka_2017$phi$Action$Input = function (a) {
	return {ctor: 'Input', _0: a};
};

var _strelka_2017$phi$Charts$percentFormat = function (percent) {
	return function (x) {
		return A2(_elm_lang$core$Basics_ops['++'], x, '%');
	}(
		A2(
			_cuducos$elm_format_number$FormatNumber$format,
			{decimals: 0, thousandSeparator: ',', decimalSeparator: '.'},
			100 * percent));
};
var _strelka_2017$phi$Charts$donutChart = F3(
	function (size, thickness, percent) {
		var radius = _elm_lang$core$Basics$toFloat((size - thickness) - 1) / 2.0;
		var radiusStr = _elm_lang$core$Basics$toString(radius);
		var circumference = (2 * _elm_lang$core$Basics$pi) * radius;
		var center = _elm_lang$core$Basics$toString(
			_elm_lang$core$Basics$toFloat(size) / 2.0);
		var viewbox = _elm_lang$svg$Svg_Attributes$viewBox(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'0 0 ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(size),
					A2(
						_elm_lang$core$Basics_ops['++'],
						' ',
						_elm_lang$core$Basics$toString(size)))));
		return A2(
			_elm_lang$svg$Svg$svg,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$width(
					_elm_lang$core$Basics$toString(size)),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$height(
						_elm_lang$core$Basics$toString(size)),
					_1: {
						ctor: '::',
						_0: viewbox,
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$class('donut'),
							_1: {ctor: '[]'}
						}
					}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$svg$Svg$circle,
					{
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$class('donut-hole'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$cx(center),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$cy(center),
								_1: {
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$r(radiusStr),
									_1: {
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$fill('#fff'),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$svg$Svg$circle,
						{
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$class('donut-ring'),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$cx(center),
								_1: {
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$cy(center),
									_1: {
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$r(radiusStr),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$fill('transparent'),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$stroke('#d2d3d4'),
												_1: {
													ctor: '::',
													_0: _elm_lang$svg$Svg_Attributes$strokeWidth(
														_elm_lang$core$Basics$toString(thickness)),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$svg$Svg$circle,
							{
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$class('donut-segment'),
								_1: {
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$cx(center),
									_1: {
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$cy(center),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$r(radiusStr),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$fill('transparent'),
												_1: {
													ctor: '::',
													_0: _elm_lang$svg$Svg_Attributes$strokeWidth(
														_elm_lang$core$Basics$toString(thickness)),
													_1: {
														ctor: '::',
														_0: _elm_lang$svg$Svg_Attributes$strokeDasharray(
															A2(
																_elm_lang$core$Basics_ops['++'],
																_elm_lang$core$Basics$toString(percent * circumference),
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	' ',
																	_elm_lang$core$Basics$toString((1 - percent) * circumference)))),
														_1: {
															ctor: '::',
															_0: _elm_lang$svg$Svg_Attributes$strokeDashoffset(
																_elm_lang$core$Basics$toString(circumference / 4)),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							},
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _strelka_2017$phi$Charts$donutWithPct = F3(
	function (size, thickness, percent) {
		var displayPct = percent * 100;
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$class('donut_chart'),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$width(
						_elm_lang$core$Basics$toString(size)),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$height(
							_elm_lang$core$Basics$toString(size)),
						_1: {ctor: '[]'}
					}
				}
			},
			{
				ctor: '::',
				_0: A3(_strelka_2017$phi$Charts$donutChart, size, thickness, percent),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$span,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								_strelka_2017$phi$Charts$percentFormat(percent)),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			});
	});

var _strelka_2017$phi$Chat_Chat$parseUserMessage = function (chatMsg) {
	return (!A2(_elm_lang$core$String$startsWith, '/', chatMsg)) ? _strelka_2017$phi$Action$SendToEliza(chatMsg) : (_elm_lang$core$Native_Utils.eq(chatMsg, '/weather') ? _strelka_2017$phi$Action$CheckWeather : (_elm_lang$core$Native_Utils.eq(chatMsg, '/turn') ? _strelka_2017$phi$Action$CallTurn : (A2(_elm_lang$core$String$startsWith, '/describe', chatMsg) ? A2(
		_elm_lang$core$Maybe$withDefault,
		_strelka_2017$phi$Action$SendBotChatItem(
			_strelka_2017$phi$Chat_Model$BotMessage('I can\'t find that node!')),
		A2(
			_elm_lang$core$Maybe$map,
			_strelka_2017$phi$Action$DescribeNode,
			A2(
				_elm_lang$core$Maybe$andThen,
				function (_p0) {
					return _elm_lang$core$Result$toMaybe(
						_elm_lang$core$String$toInt(_p0));
				},
				function (_p1) {
					return _elm_lang$core$List$head(
						A2(_elm_lang$core$List$drop, 1, _p1));
				}(
					A2(_elm_lang$core$String$split, ' ', chatMsg))))) : _strelka_2017$phi$Action$SendBotChatItem(
		_strelka_2017$phi$Chat_Model$BotMessage('Sorry, I only respond to a few commands! Current available ones are:\n\n/weather (i tell you abt the weather today)\n/turn (i move to the next day)\n/describe [nodeId] (i tell you some info about a specific node)\n')))));
};
var _strelka_2017$phi$Chat_Chat$sendToEliza = _elm_lang$core$Native_Platform.outgoingPort(
	'sendToEliza',
	function (v) {
		return v;
	});
var _strelka_2017$phi$Chat_Chat$elizaReply = _elm_lang$core$Native_Platform.incomingPort('elizaReply', _elm_lang$core$Json_Decode$string);

var _strelka_2017$phi$Simulation_GraphUpdates$nodeUpdater = F2(
	function (n, foundCtx) {
		var _p0 = foundCtx;
		if (_p0.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				_elm_lang$core$Native_Utils.update(
					_p0._0,
					{node: n}));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _strelka_2017$phi$Simulation_GraphUpdates$updateNodes = F2(
	function (updatedNodeList, network) {
		updateNodes:
		while (true) {
			var _p1 = updatedNodeList;
			if (_p1.ctor === '[]') {
				return network;
			} else {
				var _p2 = _p1._0;
				var _v2 = _p1._1,
					_v3 = A3(
					_elm_community$graph$Graph$update,
					_p2.id,
					_strelka_2017$phi$Simulation_GraphUpdates$nodeUpdater(_p2),
					network);
				updatedNodeList = _v2;
				network = _v3;
				continue updateNodes;
			}
		}
	});
var _strelka_2017$phi$Simulation_GraphUpdates$createEdge = F2(
	function (a, b) {
		return A3(
			_elm_community$graph$Graph$Edge,
			a,
			b,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(a),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'-',
					_elm_lang$core$Basics$toString(b))));
	});
var _strelka_2017$phi$Simulation_GraphUpdates$addEdge = F2(
	function (edge, network) {
		return A2(
			_elm_community$graph$Graph$fromNodesAndEdges,
			_elm_community$graph$Graph$nodes(network),
			{
				ctor: '::',
				_0: edge,
				_1: _elm_community$graph$Graph$edges(network)
			});
	});
var _strelka_2017$phi$Simulation_GraphUpdates$addNode = F2(
	function (nodeLabel, network) {
		var nodeId = A2(
			_elm_lang$core$Maybe$withDefault,
			0,
			A2(
				_elm_lang$core$Maybe$map,
				function (_p3) {
					return A2(
						F2(
							function (x, y) {
								return x + y;
							}),
						1,
						_elm_lang$core$Tuple$second(_p3));
				},
				_elm_community$graph$Graph$nodeIdRange(network)));
		var node = A2(_elm_community$graph$Graph$Node, nodeId, nodeLabel);
		return A2(
			_elm_community$graph$Graph$insert,
			A3(_elm_community$graph$Graph$NodeContext, node, _elm_community$intdict$IntDict$empty, _elm_community$intdict$IntDict$empty),
			network);
	});

var _strelka_2017$phi$Simulation_WeatherList$weatherTupleToWeather = function (_p0) {
	var _p1 = _p0;
	return {sun: _p1._0, wind: _p1._1};
};
var _strelka_2017$phi$Simulation_WeatherList$restWeather = function (list) {
	var initialList = {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.224285714},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 0.155, _1: 0.427142857},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 0.58, _1: 0.111428571},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.234285714},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.101428571},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 0.645, _1: 0.427142857},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 0.435, _1: 0.224285714},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 0.435, _1: 0.377142857},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 0.665, _1: 0.437142857},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 0.415, _1: 0.345714286},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 0.435, _1: 0.222857143},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 0.79, _1: 0.224285714},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 0.53, _1: 0.437142857},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 0.395, _1: 0.274285714},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 0.58, _1: 0.111428571},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 0.78, _1: 0.325714286},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 0.405, _1: 0.152857143},
																		_1: {
																			ctor: '::',
																			_0: {ctor: '_Tuple2', _0: 0.695, _1: 0.162857143},
																			_1: {
																				ctor: '::',
																				_0: {ctor: '_Tuple2', _0: 0.415, _1: 0.101428571},
																				_1: {
																					ctor: '::',
																					_0: {ctor: '_Tuple2', _0: 0.435, _1: 0.335714286},
																					_1: {
																						ctor: '::',
																						_0: {ctor: '_Tuple2', _0: 0.395, _1: 0.377142857},
																						_1: {
																							ctor: '::',
																							_0: {ctor: '_Tuple2', _0: 0.31, _1: 0.355714286},
																							_1: {
																								ctor: '::',
																								_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.264285714},
																								_1: {
																									ctor: '::',
																									_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.274285714},
																									_1: {
																										ctor: '::',
																										_0: {ctor: '_Tuple2', _0: 0.51, _1: 0.222857143},
																										_1: {
																											ctor: '::',
																											_0: {ctor: '_Tuple2', _0: 0.3, _1: 0.192857143},
																											_1: {
																												ctor: '::',
																												_0: {ctor: '_Tuple2', _0: 0.445, _1: 0.212857143},
																												_1: {
																													ctor: '::',
																													_0: {ctor: '_Tuple2', _0: 0.145, _1: 0.264285714},
																													_1: {
																														ctor: '::',
																														_0: {ctor: '_Tuple2', _0: 0.135, _1: 0.224285714},
																														_1: {
																															ctor: '::',
																															_0: {ctor: '_Tuple2', _0: 0.445, _1: 0.212857143},
																															_1: {
																																ctor: '::',
																																_0: {ctor: '_Tuple2', _0: 0.78, _1: 0.365714286},
																																_1: {
																																	ctor: '::',
																																	_0: {ctor: '_Tuple2', _0: 0.76, _1: 0.305714286},
																																	_1: {
																																		ctor: '::',
																																		_0: {ctor: '_Tuple2', _0: 0.695, _1: 0.254285714},
																																		_1: {
																																			ctor: '::',
																																			_0: {ctor: '_Tuple2', _0: 0.76, _1: 0.254285714},
																																			_1: {
																																				ctor: '::',
																																				_0: {ctor: '_Tuple2', _0: 0.425, _1: 0.407142857},
																																				_1: {
																																					ctor: '::',
																																					_0: {ctor: '_Tuple2', _0: 0.145, _1: 0.355714286},
																																					_1: {
																																						ctor: '::',
																																						_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.417142857},
																																						_1: {
																																							ctor: '::',
																																							_0: {ctor: '_Tuple2', _0: 0.435, _1: 0.162857143},
																																							_1: {
																																								ctor: '::',
																																								_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.427142857},
																																								_1: {
																																									ctor: '::',
																																									_0: {ctor: '_Tuple2', _0: 0.27, _1: 0.52},
																																									_1: {
																																										ctor: '::',
																																										_0: {ctor: '_Tuple2', _0: 0.83, _1: 0.367142857},
																																										_1: {
																																											ctor: '::',
																																											_0: {ctor: '_Tuple2', _0: 0.82, _1: 0.284285714},
																																											_1: {
																																												ctor: '::',
																																												_0: {ctor: '_Tuple2', _0: 0.665, _1: 0.141428571},
																																												_1: {
																																													ctor: '::',
																																													_0: {ctor: '_Tuple2', _0: 0.54, _1: 0.162857143},
																																													_1: {
																																														ctor: '::',
																																														_0: {ctor: '_Tuple2', _0: 0.435, _1: 0.131428571},
																																														_1: {
																																															ctor: '::',
																																															_0: {ctor: '_Tuple2', _0: 0.57, _1: 0.172857143},
																																															_1: {
																																																ctor: '::',
																																																_0: {ctor: '_Tuple2', _0: 0.935, _1: 0.172857143},
																																																_1: {
																																																	ctor: '::',
																																																	_0: {ctor: '_Tuple2', _0: 0.655, _1: 0.162857143},
																																																	_1: {
																																																		ctor: '::',
																																																		_0: {ctor: '_Tuple2', _0: 0.705, _1: 0.172857143},
																																																		_1: {
																																																			ctor: '::',
																																																			_0: {ctor: '_Tuple2', _0: 0.705, _1: 0.294285714},
																																																			_1: {
																																																				ctor: '::',
																																																				_0: {ctor: '_Tuple2', _0: 0.195, _1: 0.305714286},
																																																				_1: {
																																																					ctor: '::',
																																																					_0: {ctor: '_Tuple2', _0: 0.415, _1: 0.284285714},
																																																					_1: {
																																																						ctor: '::',
																																																						_0: {ctor: '_Tuple2', _0: 0.57, _1: 0.202857143},
																																																						_1: {
																																																							ctor: '::',
																																																							_0: {ctor: '_Tuple2', _0: 0.79, _1: 8.1428571e-2},
																																																							_1: {
																																																								ctor: '::',
																																																								_0: {ctor: '_Tuple2', _0: 0.57, _1: 0.244285714},
																																																								_1: {
																																																									ctor: '::',
																																																									_0: {ctor: '_Tuple2', _0: 0.695, _1: 0.222857143},
																																																									_1: {
																																																										ctor: '::',
																																																										_0: {ctor: '_Tuple2', _0: 0.77, _1: 0.152857143},
																																																										_1: {
																																																											ctor: '::',
																																																											_0: {ctor: '_Tuple2', _0: 0.77, _1: 0.212857143},
																																																											_1: {
																																																												ctor: '::',
																																																												_0: {ctor: '_Tuple2', _0: 0.53, _1: 0.365714286},
																																																												_1: {
																																																													ctor: '::',
																																																													_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.437142857},
																																																													_1: {
																																																														ctor: '::',
																																																														_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.437142857},
																																																														_1: {
																																																															ctor: '::',
																																																															_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.387142857},
																																																															_1: {
																																																																ctor: '::',
																																																																_0: {ctor: '_Tuple2', _0: 0.3, _1: 0.377142857},
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.55},
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: {ctor: '_Tuple2', _0: 0.405, _1: 0.244285714},
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: {ctor: '_Tuple2', _0: 0.435, _1: 0.274285714},
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: {ctor: '_Tuple2', _0: 0.405, _1: 0.284285714},
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: {ctor: '_Tuple2', _0: 0.455, _1: 0.101428571},
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: {ctor: '_Tuple2', _0: 0.33, _1: 0.151428571},
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: {ctor: '_Tuple2', _0: 0.58, _1: 0.141428571},
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: {ctor: '_Tuple2', _0: 0.78, _1: 0.101428571},
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: {ctor: '_Tuple2', _0: 0.53, _1: 0.152857143},
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: {ctor: '_Tuple2', _0: 0.155, _1: 0.345714286},
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.397142857},
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: {ctor: '_Tuple2', _0: 0.395, _1: 0.172857143},
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: {ctor: '_Tuple2', _0: 0.77, _1: 0.224285714},
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: {ctor: '_Tuple2', _0: 0.925, _1: 0.437142857},
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: {ctor: '_Tuple2', _0: 0.76, _1: 0.417142857},
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: {ctor: '_Tuple2', _0: 0.31, _1: 0.315714286},
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: {ctor: '_Tuple2', _0: 0.405, _1: 0.427142857},
																																																																																	_1: {
																																																																																		ctor: '::',
																																																																																		_0: {ctor: '_Tuple2', _0: 0.83, _1: 0.407142857},
																																																																																		_1: {
																																																																																			ctor: '::',
																																																																																			_0: {ctor: '_Tuple2', _0: 0.425, _1: 0.141428571},
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: {ctor: '_Tuple2', _0: 0.32, _1: 0.162857143},
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.222857143},
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: {ctor: '_Tuple2', _0: 0.32, _1: 1.0e-2},
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: {ctor: '_Tuple2', _0: 0.58, _1: 0.192857143},
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: {ctor: '_Tuple2', _0: 0.205, _1: 0.274285714},
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.367142857},
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.367142857},
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: {ctor: '_Tuple2', _0: 0.28, _1: 0.182857143},
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: {ctor: '_Tuple2', _0: 0.155, _1: 4.0e-2},
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: {ctor: '_Tuple2', _0: 0.135, _1: 7.0e-2},
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: {ctor: '_Tuple2', _0: 0.425, _1: 0.274285714},
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: {ctor: '_Tuple2', _0: 0.52, _1: 0.581428571},
																																																																																															_1: {
																																																																																																ctor: '::',
																																																																																																_0: {ctor: '_Tuple2', _0: 0.135, _1: 0.56},
																																																																																																_1: {
																																																																																																	ctor: '::',
																																																																																																	_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.407142857},
																																																																																																	_1: {
																																																																																																		ctor: '::',
																																																																																																		_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.305714286},
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.478571429},
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.478571429},
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.335714286},
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 9.1428571e-2},
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: {ctor: '_Tuple2', _0: 0.175, _1: 0.397142857},
																																																																																																							_1: {
																																																																																																								ctor: '::',
																																																																																																								_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.427142857},
																																																																																																								_1: {
																																																																																																									ctor: '::',
																																																																																																									_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.325714286},
																																																																																																									_1: {
																																																																																																										ctor: '::',
																																																																																																										_0: {ctor: '_Tuple2', _0: 0.145, _1: 0.101428571},
																																																																																																										_1: {
																																																																																																											ctor: '::',
																																																																																																											_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.468571429},
																																																																																																											_1: {
																																																																																																												ctor: '::',
																																																																																																												_0: {ctor: '_Tuple2', _0: 0.445, _1: 0.784285714},
																																																																																																												_1: {
																																																																																																													ctor: '::',
																																																																																																													_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.611428571},
																																																																																																													_1: {
																																																																																																														ctor: '::',
																																																																																																														_0: {ctor: '_Tuple2', _0: 0.165, _1: 0.335714286},
																																																																																																														_1: {
																																																																																																															ctor: '::',
																																																																																																															_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.151428571},
																																																																																																															_1: {
																																																																																																																ctor: '::',
																																																																																																																_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.345714286},
																																																																																																																_1: {
																																																																																																																	ctor: '::',
																																																																																																																	_0: {ctor: '_Tuple2', _0: 0.685, _1: 0.141428571},
																																																																																																																	_1: {
																																																																																																																		ctor: '::',
																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.32, _1: 0.151428571},
																																																																																																																		_1: {
																																																																																																																			ctor: '::',
																																																																																																																			_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.111428571},
																																																																																																																			_1: {
																																																																																																																				ctor: '::',
																																																																																																																				_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.508571429},
																																																																																																																				_1: {
																																																																																																																					ctor: '::',
																																																																																																																					_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.448571429},
																																																																																																																					_1: {
																																																																																																																						ctor: '::',
																																																																																																																						_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.345714286},
																																																																																																																						_1: {
																																																																																																																							ctor: '::',
																																																																																																																							_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.305714286},
																																																																																																																							_1: {
																																																																																																																								ctor: '::',
																																																																																																																								_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.325714286},
																																																																																																																								_1: {
																																																																																																																									ctor: '::',
																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.488571429},
																																																																																																																									_1: {
																																																																																																																										ctor: '::',
																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.455, _1: 0.438571429},
																																																																																																																										_1: {
																																																																																																																											ctor: '::',
																																																																																																																											_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.325714286},
																																																																																																																											_1: {
																																																																																																																												ctor: '::',
																																																																																																																												_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.365714286},
																																																																																																																												_1: {
																																																																																																																													ctor: '::',
																																																																																																																													_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.254285714},
																																																																																																																													_1: {
																																																																																																																														ctor: '::',
																																																																																																																														_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.367142857},
																																																																																																																														_1: {
																																																																																																																															ctor: '::',
																																																																																																																															_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.51},
																																																																																																																															_1: {
																																																																																																																																ctor: '::',
																																																																																																																																_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.448571429},
																																																																																																																																_1: {
																																																																																																																																	ctor: '::',
																																																																																																																																	_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.508571429},
																																																																																																																																	_1: {
																																																																																																																																		ctor: '::',
																																																																																																																																		_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.397142857},
																																																																																																																																		_1: {
																																																																																																																																			ctor: '::',
																																																																																																																																			_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.427142857},
																																																																																																																																			_1: {
																																																																																																																																				ctor: '::',
																																																																																																																																				_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.284285714},
																																																																																																																																				_1: {
																																																																																																																																					ctor: '::',
																																																																																																																																					_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.151428571},
																																																																																																																																					_1: {
																																																																																																																																						ctor: '::',
																																																																																																																																						_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 2.0e-2},
																																																																																																																																						_1: {
																																																																																																																																							ctor: '::',
																																																																																																																																							_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.202857143},
																																																																																																																																							_1: {
																																																																																																																																								ctor: '::',
																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.165, _1: 0.417142857},
																																																																																																																																								_1: {
																																																																																																																																									ctor: '::',
																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.54, _1: 0.488571429},
																																																																																																																																									_1: {
																																																																																																																																										ctor: '::',
																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.672857143},
																																																																																																																																										_1: {
																																																																																																																																											ctor: '::',
																																																																																																																																											_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.651428571},
																																																																																																																																											_1: {
																																																																																																																																												ctor: '::',
																																																																																																																																												_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.222857143},
																																																																																																																																												_1: {
																																																																																																																																													ctor: '::',
																																																																																																																																													_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.274285714},
																																																																																																																																													_1: {
																																																																																																																																														ctor: '::',
																																																																																																																																														_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.54},
																																																																																																																																														_1: {
																																																																																																																																															ctor: '::',
																																																																																																																																															_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.448571429},
																																																																																																																																															_1: {
																																																																																																																																																ctor: '::',
																																																																																																																																																_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.57},
																																																																																																																																																_1: {
																																																																																																																																																	ctor: '::',
																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 0.205, _1: 0.315714286},
																																																																																																																																																	_1: {
																																																																																																																																																		ctor: '::',
																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.417142857},
																																																																																																																																																		_1: {
																																																																																																																																																			ctor: '::',
																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.397142857},
																																																																																																																																																			_1: {
																																																																																																																																																				ctor: '::',
																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.335714286},
																																																																																																																																																				_1: {
																																																																																																																																																					ctor: '::',
																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.274285714},
																																																																																																																																																					_1: {
																																																																																																																																																						ctor: '::',
																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.437142857},
																																																																																																																																																						_1: {
																																																																																																																																																							ctor: '::',
																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.377142857},
																																																																																																																																																							_1: {
																																																																																																																																																								ctor: '::',
																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.315714286},
																																																																																																																																																								_1: {
																																																																																																																																																									ctor: '::',
																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.305714286},
																																																																																																																																																									_1: {
																																																																																																																																																										ctor: '::',
																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.325714286},
																																																																																																																																																										_1: {
																																																																																																																																																											ctor: '::',
																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.437142857},
																																																																																																																																																											_1: {
																																																																																																																																																												ctor: '::',
																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.458571429},
																																																																																																																																																												_1: {
																																																																																																																																																													ctor: '::',
																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.397142857},
																																																																																																																																																													_1: {
																																																																																																																																																														ctor: '::',
																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.182857143},
																																																																																																																																																														_1: {
																																																																																																																																																															ctor: '::',
																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.284285714},
																																																																																																																																																															_1: {
																																																																																																																																																																ctor: '::',
																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.182857143},
																																																																																																																																																																_1: {
																																																																																																																																																																	ctor: '::',
																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.335714286},
																																																																																																																																																																	_1: {
																																																																																																																																																																		ctor: '::',
																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.478571429},
																																																																																																																																																																		_1: {
																																																																																																																																																																			ctor: '::',
																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.397142857},
																																																																																																																																																																			_1: {
																																																																																																																																																																				ctor: '::',
																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.51},
																																																																																																																																																																				_1: {
																																																																																																																																																																					ctor: '::',
																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.774285714},
																																																																																																																																																																					_1: {
																																																																																																																																																																						ctor: '::',
																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.56, _1: 0.611428571},
																																																																																																																																																																						_1: {
																																																																																																																																																																							ctor: '::',
																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 1.02, _1: 0.355714286},
																																																																																																																																																																							_1: {
																																																																																																																																																																								ctor: '::',
																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 1.08, _1: 0.355714286},
																																																																																																																																																																								_1: {
																																																																																																																																																																									ctor: '::',
																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.175, _1: 0.407142857},
																																																																																																																																																																									_1: {
																																																																																																																																																																										ctor: '::',
																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.345714286},
																																																																																																																																																																										_1: {
																																																																																																																																																																											ctor: '::',
																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.295714286},
																																																																																																																																																																											_1: {
																																																																																																																																																																												ctor: '::',
																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 0.155, _1: 0.335714286},
																																																																																																																																																																												_1: {
																																																																																																																																																																													ctor: '::',
																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.274285714},
																																																																																																																																																																													_1: {
																																																																																																																																																																														ctor: '::',
																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.367142857},
																																																																																																																																																																														_1: {
																																																																																																																																																																															ctor: '::',
																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 0.455, _1: 0.305714286},
																																																																																																																																																																															_1: {
																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.427142857},
																																																																																																																																																																																_1: {
																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.417142857},
																																																																																																																																																																																	_1: {
																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 7.0e-2},
																																																																																																																																																																																		_1: {
																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.222857143},
																																																																																																																																																																																			_1: {
																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.54},
																																																																																																																																																																																				_1: {
																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.3, _1: 0.652857143},
																																																																																																																																																																																					_1: {
																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.395, _1: 0.458571429},
																																																																																																																																																																																						_1: {
																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.325714286},
																																																																																																																																																																																							_1: {
																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.195, _1: 0.162857143},
																																																																																																																																																																																								_1: {
																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.195, _1: 0.212857143},
																																																																																																																																																																																									_1: {
																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.205, _1: 0.56},
																																																																																																																																																																																										_1: {
																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 0.165, _1: 0.295714286},
																																																																																																																																																																																											_1: {
																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.437142857},
																																																																																																																																																																																												_1: {
																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 0.33, _1: 0.212857143},
																																																																																																																																																																																													_1: {
																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.365714286},
																																																																																																																																																																																														_1: {
																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.387142857},
																																																																																																																																																																																															_1: {
																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 0.455, _1: 6.0e-2},
																																																																																																																																																																																																_1: {
																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.294285714},
																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.295714286},
																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.641428571},
																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 0.455, _1: 0.397142857},
																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.274285714},
																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.274285714},
																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.305714286},
																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.254285714},
																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.274285714},
																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.397142857},
																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.254285714},
																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.182857143},
																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.438571429},
																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.427142857},
																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.367142857},
																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.367142857},
																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.295714286},
																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.468571429},
																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.437142857},
																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.55},
																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.415, _1: 0.662857143},
																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.905, _1: 0.641428571},
																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 0.885, _1: 0.601428571},
																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.905, _1: 0.335714286},
																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.445, _1: 0.101428571},
																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.294285714},
																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 0.395, _1: 0.244285714},
																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.427142857},
																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.274285714},
																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.652857143},
																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.631428571},
																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 9.1428571e-2},
																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 0.135, _1: 0.162857143},
																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.155, _1: 0.387142857},
																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.651428571},
																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 0.435, _1: 0.427142857},
																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.51},
																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.455, _1: 0.417142857},
																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.377142857},
																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.498571429},
																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.53, _1: 0.764285714},
																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.395, _1: 0.274285714},
																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 3.0e-2, _1: 0.305714286},
																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.355714286},
																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 0.135, _1: 0.254285714},
																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 0.945, _1: 0.254285714},
																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 0.175, _1: 0.427142857},
																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.468571429},
																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 0.77, _1: 0.427142857},
																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.31, _1: 0.274285714},
																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.335714286},
																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 0.52, _1: 0.437142857},
																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.58, _1: 0.427142857},
																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.77, _1: 0.468571429},
																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 1.07, _1: 0.387142857},
																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.455, _1: 0.325714286},
																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.315714286},
																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.53},
																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.488571429},
																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.417142857},
																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.305714286},
																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 1.01},
																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.937142857},
																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 0.705, _1: 0.182857143},
																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 0.195, _1: 0.325714286},
																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.205, _1: 0.437142857},
																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.55},
																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.51},
																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.355714286},
																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.387142857},
																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 0.135, _1: 0.244285714},
																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.315714286},
																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.195, _1: 0.468571429},
																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.407142857},
																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.315714286},
																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.325714286},
																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.478571429},
																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.295714286},
																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.407142857},
																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 0.205, _1: 0.305714286},
																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.274285714},
																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.274285714},
																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.335714286},
																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.387142857},
																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.52, _1: 0.192857143},
																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.53, _1: 0.367142857},
																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 0.83, _1: 0.52},
																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.205, _1: 9.1428571e-2},
																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.635, _1: 0.172857143},
																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.26, _1: 0.101428571},
																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 0.895, _1: 0.131428571},
																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 0.405, _1: 0.264285714},
																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 0.145, _1: 9.1428571e-2},
																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 0.52, _1: 0.172857143},
																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 0.455, _1: 0.631428571},
																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.52},
																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.222857143},
																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.145, _1: 0.254285714},
																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 0.145, _1: 0.244285714},
																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 0.51, _1: 0.427142857},
																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.415, _1: 0.254285714},
																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.695, _1: 0.397142857},
																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 0.58, _1: 0.355714286},
																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.28, _1: 0.52},
																																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.32, _1: 0.621428571},
																																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.425, _1: 0.478571429},
																																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 0.8, _1: 0.468571429},
																																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 0.3, _1: 0.284285714},
																																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 0.51, _1: 0.387142857},
																																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 0.165, _1: 0.417142857},
																																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 1.0e-2, _1: 0.295714286},
																																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.365714286},
																																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.295714286},
																																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.26, _1: 0.365714286},
																																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 0.29, _1: 0.417142857},
																																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 0.26, _1: 0.212857143},
																																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 2.0e-2, _1: 0.315714286},
																																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.425, _1: 0.295714286},
																																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 0.205, _1: 0.274285714},
																																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.52, _1: 0.448571429},
																																																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.3, _1: 0.397142857},
																																																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.135, _1: 0.355714286},
																																																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 0.175, _1: 0.468571429},
																																																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 0.56, _1: 0.488571429},
																																																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 7.0e-2, _1: 0.244285714},
																																																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 0.26, _1: 0.397142857},
																																																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 0.55, _1: 0.315714286},
																																																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 0.32, _1: 0.581428571},
																																																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 0.54, _1: 0.702857143},
																																																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.175, _1: 0.305714286},
																																																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.397142857},
																																																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 0.26, _1: 0.397142857},
																																																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.52, _1: 0.365714286},
																																																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.8, _1: 0.274285714},
																																																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 0.165, _1: 0.51},
																																																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.365714286},
																																																																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 4.0e-2, _1: 0.508571429},
																																																																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.425, _1: 0.56},
																																																																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 0.955, _1: 0.427142857},
																																																																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.377142857},
																																																																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 0.705, _1: 0.438571429},
																																																																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 0.955, _1: 0.724285714},
																																																																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 0.935, _1: 0.784285714},
																																																																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 0.81, _1: 0.498571429},
																																																																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.325714286},
																																																																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.27, _1: 0.641428571},
																																																																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 0.53, _1: 0.224285714},
																																																																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 6.0e-2, _1: 0.438571429},
																																																																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.165, _1: 0.57},
																																																																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.175, _1: 0.284285714},
																																																																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 0.28, _1: 0.274285714},
																																																																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.51, _1: 0.224285714},
																																																																																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.455, _1: 0.284285714},
																																																																																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.925, _1: 0.264285714},
																																																																																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 0.55, _1: 0.315714286},
																																																																																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 5.0e-2, _1: 0.448571429},
																																																																																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																																																																																													_0: {ctor: '_Tuple2', _0: 8.0e-2, _1: 0.835714286},
																																																																																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																																																																																														_0: {ctor: '_Tuple2', _0: 0.78, _1: 0.437142857},
																																																																																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																																																																																															_0: {ctor: '_Tuple2', _0: 0.53, _1: 0.182857143},
																																																																																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																_0: {ctor: '_Tuple2', _0: 0.27, _1: 0.172857143},
																																																																																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																	_0: {ctor: '_Tuple2', _0: 0.175, _1: 0.722857143},
																																																																																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																		_0: {ctor: '_Tuple2', _0: 0.53, _1: 0.508571429},
																																																																																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																			_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.152857143},
																																																																																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																				_0: {ctor: '_Tuple2', _0: 0.55, _1: 0.151428571},
																																																																																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																					_0: {ctor: '_Tuple2', _0: 0.145, _1: 0.162857143},
																																																																																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																						_0: {ctor: '_Tuple2', _0: 0.27, _1: 0.274285714},
																																																																																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																							_0: {ctor: '_Tuple2', _0: 0.385, _1: 0.448571429},
																																																																																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																								_0: {ctor: '_Tuple2', _0: 0.195, _1: 0.387142857},
																																																																																																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																									_0: {ctor: '_Tuple2', _0: 0.165, _1: 0.274285714},
																																																																																																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																										_0: {ctor: '_Tuple2', _0: 0.3, _1: 0.407142857},
																																																																																																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																											_0: {ctor: '_Tuple2', _0: 0.185, _1: 0.325714286},
																																																																																																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																																																																																																												_0: {ctor: '_Tuple2', _0: 0.407142857, _1: 0.195},
																																																																																																																																																																																																																																																																																																																																																																												_1: {ctor: '[]'}
																																																																																																																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																}
																																																																																																																																																																																																																															}
																																																																																																																																																																																																																														}
																																																																																																																																																																																																																													}
																																																																																																																																																																																																																												}
																																																																																																																																																																																																																											}
																																																																																																																																																																																																																										}
																																																																																																																																																																																																																									}
																																																																																																																																																																																																																								}
																																																																																																																																																																																																																							}
																																																																																																																																																																																																																						}
																																																																																																																																																																																																																					}
																																																																																																																																																																																																																				}
																																																																																																																																																																																																																			}
																																																																																																																																																																																																																		}
																																																																																																																																																																																																																	}
																																																																																																																																																																																																																}
																																																																																																																																																																																																															}
																																																																																																																																																																																																														}
																																																																																																																																																																																																													}
																																																																																																																																																																																																												}
																																																																																																																																																																																																											}
																																																																																																																																																																																																										}
																																																																																																																																																																																																									}
																																																																																																																																																																																																								}
																																																																																																																																																																																																							}
																																																																																																																																																																																																						}
																																																																																																																																																																																																					}
																																																																																																																																																																																																				}
																																																																																																																																																																																																			}
																																																																																																																																																																																																		}
																																																																																																																																																																																																	}
																																																																																																																																																																																																}
																																																																																																																																																																																															}
																																																																																																																																																																																														}
																																																																																																																																																																																													}
																																																																																																																																																																																												}
																																																																																																																																																																																											}
																																																																																																																																																																																										}
																																																																																																																																																																																									}
																																																																																																																																																																																								}
																																																																																																																																																																																							}
																																																																																																																																																																																						}
																																																																																																																																																																																					}
																																																																																																																																																																																				}
																																																																																																																																																																																			}
																																																																																																																																																																																		}
																																																																																																																																																																																	}
																																																																																																																																																																																}
																																																																																																																																																																															}
																																																																																																																																																																														}
																																																																																																																																																																													}
																																																																																																																																																																												}
																																																																																																																																																																											}
																																																																																																																																																																										}
																																																																																																																																																																									}
																																																																																																																																																																								}
																																																																																																																																																																							}
																																																																																																																																																																						}
																																																																																																																																																																					}
																																																																																																																																																																				}
																																																																																																																																																																			}
																																																																																																																																																																		}
																																																																																																																																																																	}
																																																																																																																																																																}
																																																																																																																																																															}
																																																																																																																																																														}
																																																																																																																																																													}
																																																																																																																																																												}
																																																																																																																																																											}
																																																																																																																																																										}
																																																																																																																																																									}
																																																																																																																																																								}
																																																																																																																																																							}
																																																																																																																																																						}
																																																																																																																																																					}
																																																																																																																																																				}
																																																																																																																																																			}
																																																																																																																																																		}
																																																																																																																																																	}
																																																																																																																																																}
																																																																																																																																															}
																																																																																																																																														}
																																																																																																																																													}
																																																																																																																																												}
																																																																																																																																											}
																																																																																																																																										}
																																																																																																																																									}
																																																																																																																																								}
																																																																																																																																							}
																																																																																																																																						}
																																																																																																																																					}
																																																																																																																																				}
																																																																																																																																			}
																																																																																																																																		}
																																																																																																																																	}
																																																																																																																																}
																																																																																																																															}
																																																																																																																														}
																																																																																																																													}
																																																																																																																												}
																																																																																																																											}
																																																																																																																										}
																																																																																																																									}
																																																																																																																								}
																																																																																																																							}
																																																																																																																						}
																																																																																																																					}
																																																																																																																				}
																																																																																																																			}
																																																																																																																		}
																																																																																																																	}
																																																																																																																}
																																																																																																															}
																																																																																																														}
																																																																																																													}
																																																																																																												}
																																																																																																											}
																																																																																																										}
																																																																																																									}
																																																																																																								}
																																																																																																							}
																																																																																																						}
																																																																																																					}
																																																																																																				}
																																																																																																			}
																																																																																																		}
																																																																																																	}
																																																																																																}
																																																																																															}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}
																																																																																	}
																																																																																}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	};
	return A2(
		_elm_lang$core$Maybe$withDefault,
		initialList,
		_elm_lang$core$List$tail(list));
};

var _strelka_2017$phi$Simulation_Init_Generators$generateEdge = A2(
	_elm_lang$core$Random$generate,
	_strelka_2017$phi$Action$AddEdge,
	A3(
		_elm_lang$core$Random$map2,
		_strelka_2017$phi$Simulation_GraphUpdates$createEdge,
		A2(_elm_lang$core$Random$int, 0, 10),
		A2(_elm_lang$core$Random$int, 0, 10)));
var _strelka_2017$phi$Simulation_Init_Generators$coordsGenerator = A3(
	_elm_lang$core$Random$map2,
	_strelka_2017$phi$Simulation_Model$Coords,
	A2(_elm_lang$core$Random$float, 30.5234 - 1.0e-2, 30.5234 + 1.0e-2),
	A2(_elm_lang$core$Random$float, 50.4501 - 1.0e-2, 50.4501 + 1.0e-2));
var _strelka_2017$phi$Simulation_Init_Generators$generatePVPanel = A2(
	_elm_lang$core$Random$generate,
	_strelka_2017$phi$Action$AddGenerator,
	A5(
		_elm_lang$core$Random$map4,
		_strelka_2017$phi$Simulation_Model$SimGenerator,
		_elm_community$random_extra$Random_Extra$constant(
			{ctor: '[]'}),
		A2(_elm_lang$core$Random$float, 0, 10),
		_strelka_2017$phi$Simulation_Init_Generators$coordsGenerator,
		_elm_community$random_extra$Random_Extra$constant(_strelka_2017$phi$Simulation_Model$SolarPanel)));
var _strelka_2017$phi$Simulation_Init_Generators$generateWindTurbine = A2(
	_elm_lang$core$Random$generate,
	_strelka_2017$phi$Action$AddGenerator,
	A5(
		_elm_lang$core$Random$map4,
		_strelka_2017$phi$Simulation_Model$SimGenerator,
		_elm_community$random_extra$Random_Extra$constant(
			{ctor: '[]'}),
		A2(_elm_lang$core$Random$float, 0, 10),
		_strelka_2017$phi$Simulation_Init_Generators$coordsGenerator,
		_elm_community$random_extra$Random_Extra$constant(_strelka_2017$phi$Simulation_Model$WindTurbine)));
var _strelka_2017$phi$Simulation_Init_Generators$generatePeer = A2(
	_elm_lang$core$Random$generate,
	_strelka_2017$phi$Action$AddPeer,
	A5(
		_elm_lang$core$Random$map4,
		_strelka_2017$phi$Simulation_Model$Peer,
		A6(
			_elm_lang$core$Random$map5,
			_strelka_2017$phi$Simulation_Model$PeerJoules,
			_elm_community$random_extra$Random_Extra$constant(
				{
					ctor: '::',
					_0: 0,
					_1: {ctor: '[]'}
				}),
			_elm_community$random_extra$Random_Extra$constant(
				{
					ctor: '::',
					_0: 0,
					_1: {ctor: '[]'}
				}),
			A2(_elm_lang$core$Random$float, 5, 10),
			_elm_community$random_extra$Random_Extra$constant(
				{
					ctor: '::',
					_0: 0,
					_1: {ctor: '[]'}
				}),
			_elm_community$random_extra$Random_Extra$constant(
				{
					ctor: '::',
					_0: 0,
					_1: {ctor: '[]'}
				})),
		_elm_community$random_extra$Random_Extra$constant(
			{
				ctor: '::',
				_0: 0,
				_1: {ctor: '[]'}
			}),
		_elm_community$random_extra$Random_Extra$constant(
			{
				ctor: '::',
				_0: 1,
				_1: {ctor: '[]'}
			}),
		_strelka_2017$phi$Simulation_Init_Generators$coordsGenerator));

var _strelka_2017$phi$Model$initGenerators = A2(
	_elm_lang$core$Basics_ops['++'],
	A2(_elm_lang$core$List$repeat, 12, _strelka_2017$phi$Simulation_Init_Generators$generateEdge),
	A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$List$repeat, 2, _strelka_2017$phi$Simulation_Init_Generators$generatePeer),
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$List$repeat, 4, _strelka_2017$phi$Simulation_Init_Generators$generatePVPanel),
			A2(_elm_lang$core$List$repeat, 4, _strelka_2017$phi$Simulation_Init_Generators$generateWindTurbine))));
var _strelka_2017$phi$Model$initNegawattLimit = function (map) {
	return map.initialNegawattLimit;
};
var _strelka_2017$phi$Model$initReputation = function (map) {
	return map.initialReputationRatio;
};
var _strelka_2017$phi$Model$initNarrative = {
	ctor: '::',
	_0: A2(_strelka_2017$phi$Simulation_Model$NarrativeItem, 'start', 'hi!'),
	_1: {ctor: '[]'}
};
var _strelka_2017$phi$Model$initBudget = function (map) {
	return map.initialBudget;
};
var _strelka_2017$phi$Model$initWeatherList = function (map) {
	return map.initialWeatherList;
};
var _strelka_2017$phi$Model$initWeather = function (map) {
	return map.initialWeather;
};
var _strelka_2017$phi$Model$initGraph = function (map) {
	return map.initialNetwork;
};
var _strelka_2017$phi$Model$initMap = A9(
	_strelka_2017$phi$Simulation_Model$SimMap,
	'Kolionovo',
	5523,
	_elm_community$graph$Graph$empty,
	{sun: 0.5, wind: 0.5},
	_strelka_2017$phi$Simulation_WeatherList$restWeather(
		{ctor: '[]'}),
	_strelka_2017$phi$Model$initNarrative,
	{
		ctor: '::',
		_0: 10000,
		_1: {ctor: '[]'}
	},
	{a: 1, b: 0},
	21);
var _strelka_2017$phi$Model$initSiteInfo = function (map) {
	return {name: map.name, population: map.population};
};
var _strelka_2017$phi$Model$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {input: a, inputType: b, messages: c, network: d, weather: e, weatherList: f, siteInfo: g, budget: h, reputationRatio: i, negawattLimit: j, mdl: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _strelka_2017$phi$Model$initModel = function () {
	var map = _strelka_2017$phi$Model$initMap;
	return A2(
		_elm_lang$core$Platform_Cmd_ops['!'],
		_strelka_2017$phi$Model$Model('')(_strelka_2017$phi$Chat_Model$FreeTextInput)(
			{
				ctor: '::',
				_0: _strelka_2017$phi$Chat_Model$initChat,
				_1: {ctor: '[]'}
			})(
			_strelka_2017$phi$Model$initGraph(map))(
			_strelka_2017$phi$Model$initWeather(map))(
			_strelka_2017$phi$Model$initWeatherList(map))(
			_strelka_2017$phi$Model$initSiteInfo(map))(
			_strelka_2017$phi$Model$initBudget(map))(
			_strelka_2017$phi$Model$initReputation(map))(
			_strelka_2017$phi$Model$initNegawattLimit(map))(_debois$elm_mdl$Material$model),
		_strelka_2017$phi$Model$initGenerators);
}();

var _strelka_2017$phi$Simulation_SimulationHelpers$takeTailDefaultEmpty = function (list) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		{ctor: '[]'},
		_elm_lang$core$List$tail(list));
};
var _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0 = function (list) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		0,
		_elm_lang$core$List$head(list));
};
var _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault1 = function (list) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		1,
		_elm_lang$core$List$head(list));
};

var _strelka_2017$phi$Simulation_Simulation$maxDesiredTrade = function (peerInNeed) {
	return peerInNeed.joules.desiredConsumption - _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(peerInNeed.joules.actualConsumption);
};
var _strelka_2017$phi$Simulation_Simulation$setNegawatts = F2(
	function (newNW, peer) {
		return _elm_lang$core$Native_Utils.update(
			peer,
			{negawatts: newNW});
	});
var _strelka_2017$phi$Simulation_Simulation$setJoules = F2(
	function (newJoules, peer) {
		return _elm_lang$core$Native_Utils.update(
			peer,
			{joules: newJoules});
	});
var _strelka_2017$phi$Simulation_Simulation$asJoulesIn = _elm_lang$core$Basics$flip(_strelka_2017$phi$Simulation_Simulation$setJoules);
var _strelka_2017$phi$Simulation_Simulation$setTradeBalance = F2(
	function (tb, joules) {
		return _elm_lang$core$Native_Utils.update(
			joules,
			{tradeBalance: tb});
	});
var _strelka_2017$phi$Simulation_Simulation$setStoredJoules = F2(
	function (sjl, joules) {
		return _elm_lang$core$Native_Utils.update(
			joules,
			{storedJoules: sjl});
	});
var _strelka_2017$phi$Simulation_Simulation$asStoredJoulesIn = _elm_lang$core$Basics$flip(_strelka_2017$phi$Simulation_Simulation$setStoredJoules);
var _strelka_2017$phi$Simulation_Simulation$setNegawattsStoredJoulesAndBalance = F2(
	function (_p0, peer) {
		var _p1 = _p0;
		return A2(
			_strelka_2017$phi$Simulation_Simulation$setNegawatts,
			_p1._0,
			A2(
				_strelka_2017$phi$Simulation_Simulation$asJoulesIn,
				peer,
				A2(
					_strelka_2017$phi$Simulation_Simulation$setTradeBalance,
					_p1._2,
					A2(_strelka_2017$phi$Simulation_Simulation$setStoredJoules, _p1._1, peer.joules))));
	});
var _strelka_2017$phi$Simulation_Simulation$setActualConsumption = F2(
	function (ac, joules) {
		return _elm_lang$core$Native_Utils.update(
			joules,
			{actualConsumption: ac});
	});
var _strelka_2017$phi$Simulation_Simulation$asActualConsumptionIn = _elm_lang$core$Basics$flip(_strelka_2017$phi$Simulation_Simulation$setActualConsumption);
var _strelka_2017$phi$Simulation_Simulation$consumeFromStorage = function (node) {
	var _p2 = node;
	if (_p2.ctor === 'PeerNode') {
		var _p3 = _p2._0;
		var storedJoules = _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(_p3.joules.storedJoules);
		var actualConsumption = _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(_p3.joules.actualConsumption);
		var remainingDesiredConsumption = A2(_elm_lang$core$Basics$max, 0, _p3.joules.desiredConsumption - actualConsumption);
		var toConsume = A2(_elm_lang$core$Basics$min, remainingDesiredConsumption, storedJoules);
		return _strelka_2017$phi$Simulation_Model$PeerNode(
			A2(
				_strelka_2017$phi$Simulation_Simulation$asJoulesIn,
				_p3,
				A2(
					_strelka_2017$phi$Simulation_Simulation$asActualConsumptionIn,
					_p3.joules,
					{
						ctor: '::',
						_0: actualConsumption + toConsume,
						_1: A2(
							_elm_lang$core$Maybe$withDefault,
							{ctor: '[]'},
							_elm_lang$core$List$tail(_p3.joules.actualConsumption))
					})));
	} else {
		return node;
	}
};
var _strelka_2017$phi$Simulation_Simulation$setNegawattsActualConsumptionAndBalance = F2(
	function (_p4, peer) {
		var _p5 = _p4;
		return A2(
			_strelka_2017$phi$Simulation_Simulation$setNegawatts,
			_p5._0,
			A2(
				_strelka_2017$phi$Simulation_Simulation$asJoulesIn,
				peer,
				A2(
					_strelka_2017$phi$Simulation_Simulation$setTradeBalance,
					_p5._2,
					A2(_strelka_2017$phi$Simulation_Simulation$setActualConsumption, _p5._1, peer.joules))));
	});
var _strelka_2017$phi$Simulation_Simulation$networkGeneratedEnergy = function (network) {
	var nodeGeneratedEnergy = function (_p6) {
		var _p7 = _p6;
		var _p8 = _p7.label;
		if (_p8.ctor === 'GeneratorNode') {
			return _elm_lang$core$List$head(_p8._0.dailyGeneration);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	return _elm_lang$core$List$sum(
		A2(
			_elm_lang$core$List$filterMap,
			nodeGeneratedEnergy,
			_elm_community$graph$Graph$nodes(network)));
};
var _strelka_2017$phi$Simulation_Simulation$networkTradedEnergy = function (network) {
	var nodeTradedEnergy = function (_p9) {
		var _p10 = _p9;
		var _p11 = _p10.label;
		if (_p11.ctor === 'PeerNode') {
			var balance = _elm_lang$core$List$head(_p11._0.joules.tradeBalance);
			return (_elm_lang$core$Native_Utils.cmp(
				A2(_elm_lang$core$Maybe$withDefault, 0, balance),
				0) > 0) ? balance : _elm_lang$core$Maybe$Nothing;
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	return _elm_lang$core$List$sum(
		A2(
			_elm_lang$core$List$filterMap,
			nodeTradedEnergy,
			_elm_community$graph$Graph$nodes(network)));
};
var _strelka_2017$phi$Simulation_Simulation$updateBudget = function (model) {
	return {
		ctor: '::',
		_0: (_strelka_2017$phi$Simulation_Simulation$networkTradedEnergy(model.network) * 0.15) + _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(model.budget),
		_1: model.budget
	};
};
var _strelka_2017$phi$Simulation_Simulation$networkConsumedEnergy = function (network) {
	var nodeConsumedEnergy = function (_p12) {
		var _p13 = _p12;
		var _p14 = _p13.label;
		if (_p14.ctor === 'PeerNode') {
			return _elm_lang$core$List$head(_p14._0.joules.actualConsumption);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	return _elm_lang$core$List$sum(
		A2(
			_elm_lang$core$List$filterMap,
			nodeConsumedEnergy,
			_elm_community$graph$Graph$nodes(network)));
};
var _strelka_2017$phi$Simulation_Simulation$networkStoredEnergy = function (network) {
	var nodeStoredEnergy = function (_p15) {
		var _p16 = _p15;
		var _p17 = _p16.label;
		if (_p17.ctor === 'PeerNode') {
			return _elm_lang$core$List$head(_p17._0.joules.storedJoules);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	return _elm_lang$core$List$sum(
		A2(
			_elm_lang$core$List$filterMap,
			nodeStoredEnergy,
			_elm_community$graph$Graph$nodes(network)));
};
var _strelka_2017$phi$Simulation_Simulation$toPeer = function (_p18) {
	var _p19 = _p18;
	var _p20 = _p19.label;
	if (_p20.ctor === 'PeerNode') {
		return _elm_lang$core$Maybe$Just(_p20._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _strelka_2017$phi$Simulation_Simulation$distributeGeneratedJoules = F3(
	function (limit, ratio, network) {
		var networkDesiredEnergy = _elm_lang$core$List$sum(
			A2(
				_elm_lang$core$List$filterMap,
				function (_p21) {
					return A2(
						_elm_lang$core$Maybe$map,
						function (_p22) {
							return function (_) {
								return _.desiredConsumption;
							}(
								function (_) {
									return _.joules;
								}(_p22));
						},
						_strelka_2017$phi$Simulation_Simulation$toPeer(_p21));
				},
				_elm_community$graph$Graph$nodes(network)));
		var weightedSeed = F2(
			function (peer, seedFactor) {
				return seedFactor * 0;
			});
		var weightedNegawatts = F2(
			function (peer, negawattsFactor) {
				return negawattsFactor * _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(peer.negawatts);
			});
		var reputationRating = function (peer) {
			return (1 + A2(weightedNegawatts, peer, ratio.a)) + A2(weightedSeed, peer, ratio.b);
		};
		var weightConstant = A2(
			F2(
				function (x, y) {
					return x / y;
				}),
			1,
			_elm_lang$core$List$sum(
				A2(
					_elm_lang$core$List$filterMap,
					function (_p23) {
						return A2(
							_elm_lang$core$Maybe$map,
							function (x) {
								return x.joules.desiredConsumption * reputationRating(x);
							},
							_strelka_2017$phi$Simulation_Simulation$toPeer(_p23));
					},
					_elm_community$graph$Graph$nodes(network))));
		var totalGeneratedEnergy = _strelka_2017$phi$Simulation_Simulation$networkGeneratedEnergy(network);
		var allocatedJoules = function (peer) {
			return ((weightConstant * peer.joules.desiredConsumption) * reputationRating(peer)) * totalGeneratedEnergy;
		};
		var updatePeer = function (peer) {
			var myAllocatedJoules = allocatedJoules(peer);
			var joulesForStorage = A2(_elm_lang$core$Basics$max, 0, myAllocatedJoules - peer.joules.desiredConsumption);
			var newStoredJoules = joulesForStorage + _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(peer.joules.storedJoules);
			var newConsumption = myAllocatedJoules - joulesForStorage;
			var negawattAllocation = A2(_elm_lang$core$Basics$max, 0, limit - newConsumption);
			return A2(
				_strelka_2017$phi$Simulation_Simulation$setNegawatts,
				{ctor: '::', _0: negawattAllocation, _1: peer.negawatts},
				A2(
					_strelka_2017$phi$Simulation_Simulation$asJoulesIn,
					peer,
					A2(
						_strelka_2017$phi$Simulation_Simulation$setStoredJoules,
						{ctor: '::', _0: newStoredJoules, _1: peer.joules.storedJoules},
						A2(
							_strelka_2017$phi$Simulation_Simulation$setActualConsumption,
							{ctor: '::', _0: newConsumption, _1: peer.joules.actualConsumption},
							peer.joules))));
		};
		var updateNode = function (node) {
			var _p24 = node;
			if (_p24.ctor === 'PeerNode') {
				return _strelka_2017$phi$Simulation_Model$PeerNode(
					updatePeer(_p24._0));
			} else {
				return node;
			}
		};
		return A2(_elm_community$graph$Graph$mapNodes, updateNode, network);
	});
var _strelka_2017$phi$Simulation_Simulation$tradingPhase = function (network) {
	var supplyNodesFilter = function (_p25) {
		var _p26 = _p25;
		var _p27 = _p26.label;
		if (_p27.ctor === 'PeerNode') {
			return _elm_lang$core$Native_Utils.cmp(
				_strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(_p27._0.joules.storedJoules),
				0) > 0;
		} else {
			return false;
		}
	};
	var supplyNodes = A2(
		_elm_lang$core$List$filter,
		supplyNodesFilter,
		_elm_community$graph$Graph$nodes(network));
	var demandNodesFilter = function (_p28) {
		var _p29 = _p28;
		var _p30 = _p29.label;
		if (_p30.ctor === 'PeerNode') {
			var _p31 = _p30._0;
			return _elm_lang$core$Native_Utils.cmp(
				_strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(_p31.joules.actualConsumption) - _p31.joules.desiredConsumption,
				0) < 0;
		} else {
			return false;
		}
	};
	var nodesInDistress = A2(
		_elm_lang$core$List$filter,
		demandNodesFilter,
		_elm_community$graph$Graph$nodes(network));
	var newSupplyChanges = F2(
		function (tradeRatio, peer) {
			var currentSJ = _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(peer.joules.storedJoules);
			var currentNW = _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(peer.negawatts);
			return {
				ctor: '_Tuple3',
				_0: {
					ctor: '::',
					_0: currentNW + (currentNW * tradeRatio),
					_1: _strelka_2017$phi$Simulation_SimulationHelpers$takeTailDefaultEmpty(peer.negawatts)
				},
				_1: {
					ctor: '::',
					_0: currentSJ - (currentSJ * tradeRatio),
					_1: _strelka_2017$phi$Simulation_SimulationHelpers$takeTailDefaultEmpty(peer.joules.storedJoules)
				},
				_2: {
					ctor: '::',
					_0: currentSJ * tradeRatio,
					_1: _strelka_2017$phi$Simulation_SimulationHelpers$takeTailDefaultEmpty(peer.joules.tradeBalance)
				}
			};
		});
	var updateNodeSupplyReward = F2(
		function (tradeRatio, peer) {
			var _p32 = A2(newSupplyChanges, tradeRatio, peer);
			var newNW = _p32._0;
			var newSJ = _p32._1;
			var newTB = _p32._2;
			var updatedPeer = A2(
				_strelka_2017$phi$Simulation_Simulation$setNegawattsStoredJoulesAndBalance,
				{ctor: '_Tuple3', _0: newNW, _1: newSJ, _2: newTB},
				peer);
			return updatedPeer;
		});
	var updateNodeListSupply = F2(
		function (tradeRatio, list) {
			updateNodeListSupply:
			while (true) {
				var _p33 = list;
				if (_p33.ctor === '[]') {
					return list;
				} else {
					var _p36 = _p33._1;
					var _p35 = _p33._0;
					var _p34 = _p35.label;
					if (_p34.ctor === 'PeerNode') {
						var tail = A2(updateNodeListSupply, tradeRatio, _p36);
						var updatedNode = A2(updateNodeSupplyReward, tradeRatio, _p34._0);
						return {
							ctor: '::',
							_0: _elm_lang$core$Native_Utils.update(
								_p35,
								{
									label: _strelka_2017$phi$Simulation_Model$PeerNode(updatedNode)
								}),
							_1: tail
						};
					} else {
						var _v20 = tradeRatio,
							_v21 = _p36;
						tradeRatio = _v20;
						list = _v21;
						continue updateNodeListSupply;
					}
				}
			}
		});
	var newDemandChanges = F2(
		function (pool, peer) {
			var currentDesired = _strelka_2017$phi$Simulation_Simulation$maxDesiredTrade(peer);
			var currentAC = _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(peer.joules.actualConsumption);
			var currentNW = _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(peer.negawatts);
			var actualTradeConsumption = A2(
				_elm_lang$core$Basics$min,
				pool,
				A2(_elm_lang$core$Basics$min, currentNW, currentDesired));
			var newPool = pool - actualTradeConsumption;
			return {
				ctor: '_Tuple4',
				_0: {
					ctor: '::',
					_0: currentNW - actualTradeConsumption,
					_1: _strelka_2017$phi$Simulation_SimulationHelpers$takeTailDefaultEmpty(peer.negawatts)
				},
				_1: {
					ctor: '::',
					_0: currentAC + actualTradeConsumption,
					_1: _strelka_2017$phi$Simulation_SimulationHelpers$takeTailDefaultEmpty(peer.joules.actualConsumption)
				},
				_2: {
					ctor: '::',
					_0: 0 - actualTradeConsumption,
					_1: _strelka_2017$phi$Simulation_SimulationHelpers$takeTailDefaultEmpty(peer.joules.tradeBalance)
				},
				_3: newPool
			};
		});
	var updateNodeDemand = F2(
		function (pool, peer) {
			var _p37 = A2(newDemandChanges, pool, peer);
			var newNW = _p37._0;
			var newAC = _p37._1;
			var newTB = _p37._2;
			var newPool = _p37._3;
			var updatedPeer = A2(
				_strelka_2017$phi$Simulation_Simulation$setNegawattsActualConsumptionAndBalance,
				{ctor: '_Tuple3', _0: newNW, _1: newAC, _2: newTB},
				peer);
			return {ctor: '_Tuple2', _0: newPool, _1: updatedPeer};
		});
	var updateNodeListDemand = F2(
		function (pool, list) {
			updateNodeListDemand:
			while (true) {
				var _p38 = list;
				if (_p38.ctor === '[]') {
					return {ctor: '_Tuple2', _0: pool, _1: list};
				} else {
					var _p43 = _p38._1;
					var _p42 = _p38._0;
					var _p39 = _p42.label;
					if (_p39.ctor === 'PeerNode') {
						var _p40 = A2(updateNodeDemand, pool, _p39._0);
						var newPool = _p40._0;
						var updatedNode = _p40._1;
						var _p41 = A2(updateNodeListDemand, newPool, _p43);
						var restPool = _p41._0;
						var tail = _p41._1;
						return {
							ctor: '_Tuple2',
							_0: restPool,
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									_p42,
									{
										label: _strelka_2017$phi$Simulation_Model$PeerNode(updatedNode)
									}),
								_1: tail
							}
						};
					} else {
						var _v24 = pool,
							_v25 = _p43;
						pool = _v24;
						list = _v25;
						continue updateNodeListDemand;
					}
				}
			}
		});
	var getInitialPool = _elm_lang$core$List$sum(
		A2(
			_elm_lang$core$List$filterMap,
			function (_p44) {
				return A2(
					_elm_lang$core$Maybe$map,
					function (_p45) {
						return _strelka_2017$phi$Simulation_SimulationHelpers$takeFirstElementWithDefault0(
							function (_) {
								return _.storedJoules;
							}(
								function (_) {
									return _.joules;
								}(_p45)));
					},
					_strelka_2017$phi$Simulation_Simulation$toPeer(_p44));
			},
			_elm_community$graph$Graph$nodes(network)));
	var updateNetwork = function () {
		var supplyList = supplyNodes;
		var demandList = nodesInDistress;
		var initialPool = getInitialPool;
		var _p46 = A2(updateNodeListDemand, initialPool, demandList);
		var poolLeft = _p46._0;
		var updatedDemandNodes = _p46._1;
		var tradeRatioValue = F2(
			function (initialPool, actualPool) {
				var _p47 = initialPool;
				if (_p47 === 0) {
					return 0;
				} else {
					return (initialPool - poolLeft) / initialPool;
				}
			});
		var updatedSupplyNodes = A2(
			updateNodeListSupply,
			A2(tradeRatioValue, initialPool, poolLeft),
			supplyList);
		return A2(
			_strelka_2017$phi$Simulation_GraphUpdates$updateNodes,
			updatedSupplyNodes,
			A2(_strelka_2017$phi$Simulation_GraphUpdates$updateNodes, updatedDemandNodes, network));
	}();
	return updateNetwork;
};
var _strelka_2017$phi$Simulation_Simulation$joulesToGenerators = F2(
	function (weather, network) {
		var newDailyGeneration = F2(
			function (node, weatherFactor) {
				return {ctor: '::', _0: node.maxGeneration * weatherFactor, _1: node.dailyGeneration};
			});
		var wind = weather.wind;
		var sun = weather.sun;
		var updateNode = function (node) {
			var _p48 = node;
			if (_p48.ctor === 'GeneratorNode') {
				var _p50 = _p48._0;
				var _p49 = _p50.generatorType;
				if (_p49.ctor === 'SolarPanel') {
					return _strelka_2017$phi$Simulation_Model$GeneratorNode(
						_elm_lang$core$Native_Utils.update(
							_p50,
							{
								dailyGeneration: A2(newDailyGeneration, _p50, sun)
							}));
				} else {
					return _strelka_2017$phi$Simulation_Model$GeneratorNode(
						_elm_lang$core$Native_Utils.update(
							_p50,
							{
								dailyGeneration: A2(newDailyGeneration, _p50, wind)
							}));
				}
			} else {
				return node;
			}
		};
		return A2(_elm_community$graph$Graph$mapNodes, updateNode, network);
	});
var _strelka_2017$phi$Simulation_Simulation$renderPhiNetwork = _elm_lang$core$Native_Platform.outgoingPort(
	'renderPhiNetwork',
	function (v) {
		return [
			_elm_lang$core$Native_List.toArray(v._0).map(
			function (v) {
				return {id: v.id, label: v.label};
			}),
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return {
					transmissionLine: {from: v.transmissionLine.from, to: v.transmissionLine.to, label: v.transmissionLine.label},
					pos: {
						from: {x: v.pos.from.x, y: v.pos.from.y},
						to: {x: v.pos.to.x, y: v.pos.to.y}
					}
				};
			})
		];
	});
var _strelka_2017$phi$Simulation_Simulation$animateGeneration = _elm_lang$core$Native_Platform.outgoingPort(
	'animateGeneration',
	function (v) {
		return [
			_elm_lang$core$Native_List.toArray(v._0).map(
			function (v) {
				return {id: v.id, label: v.label};
			}),
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return {
					transmissionLine: {from: v.transmissionLine.from, to: v.transmissionLine.to, label: v.transmissionLine.label},
					pos: {
						from: {x: v.pos.from.x, y: v.pos.from.y},
						to: {x: v.pos.to.x, y: v.pos.to.y}
					}
				};
			})
		];
	});
var _strelka_2017$phi$Simulation_Simulation$animatePeerConsumption = _elm_lang$core$Native_Platform.outgoingPort(
	'animatePeerConsumption',
	function (v) {
		return [
			_elm_lang$core$Native_List.toArray(v._0).map(
			function (v) {
				return {id: v.id, label: v.label};
			}),
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return {
					transmissionLine: {from: v.transmissionLine.from, to: v.transmissionLine.to, label: v.transmissionLine.label},
					pos: {
						from: {x: v.pos.from.x, y: v.pos.from.y},
						to: {x: v.pos.to.x, y: v.pos.to.y}
					}
				};
			})
		];
	});
var _strelka_2017$phi$Simulation_Simulation$animateTrade = _elm_lang$core$Native_Platform.outgoingPort(
	'animateTrade',
	function (v) {
		return [
			_elm_lang$core$Native_List.toArray(v._0).map(
			function (v) {
				return {id: v.id, label: v.label};
			}),
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return {
					transmissionLine: {from: v.transmissionLine.from, to: v.transmissionLine.to, label: v.transmissionLine.label},
					pos: {
						from: {x: v.pos.from.x, y: v.pos.from.y},
						to: {x: v.pos.to.x, y: v.pos.to.y}
					}
				};
			})
		];
	});

var _strelka_2017$phi$Chat_Narrative$dayTraded = function (model) {
	var totalTraded = _elm_lang$core$Basics$toString(
		_strelka_2017$phi$Simulation_Simulation$networkTradedEnergy(model.network));
	var text = A2(
		_elm_lang$core$Basics_ops['++'],
		'The community had traded ',
		A2(_elm_lang$core$Basics_ops['++'], totalTraded, ' kWh of energy'));
	return _strelka_2017$phi$Chat_Model$MultiChoiceItem(
		A2(
			_strelka_2017$phi$Chat_Model$MultiChoiceMessage,
			text,
			{
				ctor: '::',
				_0: _strelka_2017$phi$Chat_Model$McaWeatherForecast,
				_1: {
					ctor: '::',
					_0: _strelka_2017$phi$Chat_Model$McaRunDay,
					_1: {
						ctor: '::',
						_0: _strelka_2017$phi$Chat_Model$McaChangeDesign,
						_1: {ctor: '[]'}
					}
				}
			}));
};
var _strelka_2017$phi$Chat_Narrative$dayConsumed = function (model) {
	var totalConsumed = _elm_lang$core$Basics$toString(
		_strelka_2017$phi$Simulation_Simulation$networkConsumedEnergy(model.network));
	var text = A2(
		_elm_lang$core$Basics_ops['++'],
		'The community had consumed ',
		A2(_elm_lang$core$Basics_ops['++'], totalConsumed, ' kWh of energy'));
	return _strelka_2017$phi$Chat_Model$BotMessage(text);
};
var _strelka_2017$phi$Chat_Narrative$dayGenerated = function (model) {
	var totalStored = _elm_lang$core$Basics$toString(
		_strelka_2017$phi$Simulation_Simulation$networkStoredEnergy(model.network));
	var generatedEnergy = _elm_lang$core$Basics$toString(
		_strelka_2017$phi$Simulation_Simulation$networkGeneratedEnergy(model.network));
	var text = A2(
		_elm_lang$core$Basics_ops['++'],
		'Today we have generated ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			generatedEnergy,
			A2(
				_elm_lang$core$Basics_ops['++'],
				' kWh in total, ',
				A2(_elm_lang$core$Basics_ops['++'], totalStored, ' kWh has stored in the batteries.'))));
	return _strelka_2017$phi$Chat_Model$BotMessage(text);
};
var _strelka_2017$phi$Chat_Narrative$dayBeginning = function (model) {
	var text = 'Glorious new day in Arstotzka';
	return _strelka_2017$phi$Chat_Model$BotMessage(text);
};
var _strelka_2017$phi$Chat_Narrative$daySummary = function (model) {
	var totalStored = _elm_lang$core$Basics$toString(
		_strelka_2017$phi$Simulation_Simulation$networkStoredEnergy(model.network));
	var totalConsumed = _elm_lang$core$Basics$toString(
		_strelka_2017$phi$Simulation_Simulation$networkConsumedEnergy(model.network));
	var generatedEnergy = _elm_lang$core$Basics$toString(
		_strelka_2017$phi$Simulation_Simulation$networkGeneratedEnergy(model.network));
	var text = A2(
		_elm_lang$core$Basics_ops['++'],
		'Yesterday we have generated ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			generatedEnergy,
			A2(
				_elm_lang$core$Basics_ops['++'],
				' kWh in total, ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'the community had consumed ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						totalConsumed,
						A2(
							_elm_lang$core$Basics_ops['++'],
							' kWh of energy, and ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								totalStored,
								A2(_elm_lang$core$Basics_ops['++'], ' kWh has stored in the batteries.', ' Do you want to know more before I go on?'))))))));
	return _strelka_2017$phi$Chat_Model$MultiChoiceItem(
		A2(
			_strelka_2017$phi$Chat_Model$MultiChoiceMessage,
			text,
			{
				ctor: '::',
				_0: _strelka_2017$phi$Chat_Model$McaWeatherForecast,
				_1: {
					ctor: '::',
					_0: _strelka_2017$phi$Chat_Model$McaRunDay,
					_1: {
						ctor: '::',
						_0: _strelka_2017$phi$Chat_Model$McaChangeDesign,
						_1: {ctor: '[]'}
					}
				}
			}));
};

var _strelka_2017$phi$Chat_View$viewChatMsg = function (chatItem) {
	var textContent = function (msgText) {
		return {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('text_wrapper'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('text'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(msgText),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	};
	var messageHeader = function (name) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('message_header'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(name),
				_1: {ctor: '[]'}
			});
	};
	var messageWrapper = F2(
		function (senderClass, children) {
			return A2(
				_elm_lang$html$Html$li,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class(
						A2(_elm_lang$core$Basics_ops['++'], 'message appeared ', senderClass)),
					_1: {ctor: '[]'}
				},
				children);
		});
	var _p0 = chatItem;
	if (_p0.ctor === 'UserMessage') {
		return A2(
			messageWrapper,
			'user-sent',
			textContent(_p0._0));
	} else {
		var contents = function () {
			var _p1 = _p0._0;
			switch (_p1.ctor) {
				case 'BotMessage':
					return textContent(_p1._0);
				case 'WidgetItem':
					return textContent('rendering a fancy widget');
				default:
					return textContent(_p1._0.text);
			}
		}();
		return A2(
			messageWrapper,
			'bot-sent',
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: messageHeader('Phi'),
					_1: {ctor: '[]'}
				},
				contents));
	}
};

var _strelka_2017$phi$Simulation_Encoding$pos = function (nodeLabel) {
	var _p0 = nodeLabel;
	switch (_p0.ctor) {
		case 'GeneratorNode':
			return _p0._0.pos;
		case 'BatNode':
			return _p0._0.pos;
		default:
			return _p0._0.pos;
	}
};
var _strelka_2017$phi$Simulation_Encoding$encodeEdge = F2(
	function (graph, tLine) {
		var maybeTo = A2(
			_elm_lang$core$Maybe$map,
			function (_p1) {
				return _strelka_2017$phi$Simulation_Encoding$pos(
					function (_) {
						return _.label;
					}(
						function (_) {
							return _.node;
						}(_p1)));
			},
			A2(_elm_community$graph$Graph$get, tLine.to, graph));
		var maybeFrom = A2(
			_elm_lang$core$Maybe$map,
			function (_p2) {
				return _strelka_2017$phi$Simulation_Encoding$pos(
					function (_) {
						return _.label;
					}(
						function (_) {
							return _.node;
						}(_p2)));
			},
			A2(_elm_community$graph$Graph$get, tLine.from, graph));
		var maybeLine = A3(_elm_lang$core$Maybe$map2, _strelka_2017$phi$Simulation_Model$Line, maybeFrom, maybeTo);
		return A2(
			_elm_lang$core$Maybe$map,
			_strelka_2017$phi$Simulation_Model$EncodedEdge(tLine),
			maybeLine);
	});
var _strelka_2017$phi$Simulation_Encoding$encodeCoords = function (pos) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'x',
				_1: _elm_lang$core$Json_Encode$float(pos.x)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'y',
					_1: _elm_lang$core$Json_Encode$float(pos.y)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _strelka_2017$phi$Simulation_Encoding$encodeGeneratorType = function (generatorType) {
	var _p3 = generatorType;
	if (_p3.ctor === 'WindTurbine') {
		return _elm_lang$core$Json_Encode$string('windTurbine');
	} else {
		return _elm_lang$core$Json_Encode$string('solarPanel');
	}
};
var _strelka_2017$phi$Simulation_Encoding$encodeList = F2(
	function (encoder, list) {
		return _elm_lang$core$Json_Encode$list(
			A2(_elm_lang$core$List$map, encoder, list));
	});
var _strelka_2017$phi$Simulation_Encoding$encodeNodeLabel = function (nodeLabel) {
	var _p4 = nodeLabel;
	switch (_p4.ctor) {
		case 'GeneratorNode':
			var _p5 = _p4._0;
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'maxGeneration',
						_1: _elm_lang$core$Json_Encode$float(_p5.maxGeneration)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'dailyGeneration',
							_1: A2(_strelka_2017$phi$Simulation_Encoding$encodeList, _elm_lang$core$Json_Encode$float, _p5.dailyGeneration)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'pos',
								_1: _strelka_2017$phi$Simulation_Encoding$encodeCoords(_p5.pos)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'generatorType',
									_1: _strelka_2017$phi$Simulation_Encoding$encodeGeneratorType(_p5.generatorType)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'nodeType',
										_1: _elm_lang$core$Json_Encode$string('generator')
									},
									_1: {ctor: '[]'}
								}
							}
						}
					}
				});
		case 'PeerNode':
			var _p6 = _p4._0;
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'actualConsumption',
						_1: A2(_strelka_2017$phi$Simulation_Encoding$encodeList, _elm_lang$core$Json_Encode$float, _p6.joules.actualConsumption)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'storedJoules',
							_1: A2(_strelka_2017$phi$Simulation_Encoding$encodeList, _elm_lang$core$Json_Encode$float, _p6.joules.storedJoules)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'desiredConsumption',
								_1: _elm_lang$core$Json_Encode$float(_p6.joules.desiredConsumption)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'negawatts',
									_1: A2(_strelka_2017$phi$Simulation_Encoding$encodeList, _elm_lang$core$Json_Encode$float, _p6.negawatts)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'seedRating',
										_1: A2(_strelka_2017$phi$Simulation_Encoding$encodeList, _elm_lang$core$Json_Encode$float, _p6.joules.seedRatingJoules)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'tradeBalance',
											_1: A2(_strelka_2017$phi$Simulation_Encoding$encodeList, _elm_lang$core$Json_Encode$float, _p6.joules.tradeBalance)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'reputationRating',
												_1: A2(_strelka_2017$phi$Simulation_Encoding$encodeList, _elm_lang$core$Json_Encode$float, _p6.reputation)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'pos',
													_1: _strelka_2017$phi$Simulation_Encoding$encodeCoords(_p6.pos)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'nodeType',
														_1: _elm_lang$core$Json_Encode$string('peer')
													},
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				});
		default:
			var _p7 = _p4._0;
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'capacity',
						_1: _elm_lang$core$Json_Encode$float(_p7.capacity)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'storage',
							_1: _elm_lang$core$Json_Encode$float(_p7.storage)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'pos',
								_1: _strelka_2017$phi$Simulation_Encoding$encodeCoords(_p7.pos)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'nodeType',
									_1: _elm_lang$core$Json_Encode$string('battery')
								},
								_1: {ctor: '[]'}
							}
						}
					}
				});
	}
};
var _strelka_2017$phi$Simulation_Encoding$encodeNode = function (_p8) {
	var _p9 = _p8;
	return A2(
		_elm_community$graph$Graph$Node,
		_p9.id,
		_strelka_2017$phi$Simulation_Encoding$encodeNodeLabel(_p9.label));
};
var _strelka_2017$phi$Simulation_Encoding$encodeGraph = function (graph) {
	var tLines = A2(
		_elm_lang$core$List$filterMap,
		_strelka_2017$phi$Simulation_Encoding$encodeEdge(graph),
		_elm_community$graph$Graph$edges(graph));
	var encodedNodes = A2(
		_elm_lang$core$List$map,
		_strelka_2017$phi$Simulation_Encoding$encodeNode,
		_elm_community$graph$Graph$nodes(graph));
	return {ctor: '_Tuple2', _0: encodedNodes, _1: tLines};
};

var _strelka_2017$phi$Update$update = F2(
	function (msg, model) {
		update:
		while (true) {
			var addChatItem = F2(
				function (chatMsg, model) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							messages: {ctor: '::', _0: chatMsg, _1: model.messages}
						});
				});
			var scrollDown = A2(
				_elm_lang$core$Task$attempt,
				_elm_lang$core$Basics$always(_strelka_2017$phi$Action$NoOp),
				_elm_lang$dom$Dom_Scroll$toBottom('toScroll'));
			var noOp = A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{ctor: '[]'});
			var _p0 = msg;
			switch (_p0.ctor) {
				case 'NoOp':
					return noOp;
				case 'Input':
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{input: _p0._0}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				case 'Mdl':
					return A3(_debois$elm_mdl$Material$update, _strelka_2017$phi$Action$Mdl, _p0._0, model);
				case 'SendUserChatMsg':
					if (_elm_lang$core$String$isEmpty(model.input)) {
						return noOp;
					} else {
						var clearedInputModel = _elm_lang$core$Native_Utils.update(
							model,
							{input: ''});
						var chatMsg = _strelka_2017$phi$Chat_Model$UserMessage(model.input);
						var newModel = A2(addChatItem, chatMsg, clearedInputModel);
						return A3(
							_ccapndave$elm_update_extra$Update_Extra$andThen,
							_strelka_2017$phi$Update$update,
							_strelka_2017$phi$Chat_Chat$parseUserMessage(model.input),
							{ctor: '_Tuple2', _0: newModel, _1: scrollDown});
					}
				case 'SendBotChatItem':
					return {
						ctor: '_Tuple2',
						_0: A2(
							addChatItem,
							_strelka_2017$phi$Chat_Model$BotItem(_p0._0),
							model),
						_1: scrollDown
					};
				case 'CheckWeather':
					return _strelka_2017$phi$Update$weatherForecast(model);
				case 'DaySummary':
					var _v1 = _strelka_2017$phi$Action$SendBotChatItem(
						_strelka_2017$phi$Chat_Narrative$dayBeginning(model)),
						_v2 = model;
					msg = _v1;
					model = _v2;
					continue update;
				case 'CallTurn':
					return A3(
						_ccapndave$elm_update_extra$Update_Extra$andThen,
						_strelka_2017$phi$Update$update,
						_strelka_2017$phi$Action$DaySummary,
						_strelka_2017$phi$Update$runDay(model));
				case 'DescribeNode':
					return _strelka_2017$phi$Update$update(
						function (_p1) {
							return _strelka_2017$phi$Action$SendBotChatItem(
								_strelka_2017$phi$Chat_Model$BotMessage(_p1));
						}(
							A2(
								_elm_lang$core$Maybe$withDefault,
								'Node not found :(',
								A2(
									_elm_lang$core$Maybe$map,
									function (_p2) {
										return A2(
											_elm_lang$core$Json_Encode$encode,
											4,
											_strelka_2017$phi$Simulation_Encoding$encodeNodeLabel(
												function (_) {
													return _.label;
												}(
													function (_) {
														return _.node;
													}(_p2))));
									},
									A2(_elm_community$graph$Graph$get, _p0._0, model.network)))))(model);
				case 'AddGenerator':
					var _v3 = _strelka_2017$phi$Action$RenderPhiNetwork,
						_v4 = _elm_lang$core$Native_Utils.update(
						model,
						{
							network: A2(
								_strelka_2017$phi$Simulation_GraphUpdates$addNode,
								_strelka_2017$phi$Simulation_Model$GeneratorNode(_p0._0),
								model.network)
						});
					msg = _v3;
					model = _v4;
					continue update;
				case 'AddPeer':
					var _v5 = _strelka_2017$phi$Action$RenderPhiNetwork,
						_v6 = _elm_lang$core$Native_Utils.update(
						model,
						{
							network: A2(
								_strelka_2017$phi$Simulation_GraphUpdates$addNode,
								_strelka_2017$phi$Simulation_Model$PeerNode(_p0._0),
								model.network)
						});
					msg = _v5;
					model = _v6;
					continue update;
				case 'AddEdge':
					var _v7 = _strelka_2017$phi$Action$RenderPhiNetwork,
						_v8 = _elm_lang$core$Native_Utils.update(
						model,
						{
							network: A2(_strelka_2017$phi$Simulation_GraphUpdates$addEdge, _p0._0, model.network)
						});
					msg = _v7;
					model = _v8;
					continue update;
				case 'UpdateWeather':
					var _v9 = _strelka_2017$phi$Action$RenderPhiNetwork,
						_v10 = _elm_lang$core$Native_Utils.update(
						model,
						{
							weather: _p0._0,
							weatherList: _strelka_2017$phi$Simulation_WeatherList$restWeather(model.weatherList)
						});
					msg = _v9;
					model = _v10;
					continue update;
				case 'RenderPhiNetwork':
					return {
						ctor: '_Tuple2',
						_0: model,
						_1: _strelka_2017$phi$Simulation_Simulation$renderPhiNetwork(
							_strelka_2017$phi$Simulation_Encoding$encodeGraph(model.network))
					};
				case 'AnimateGeneration':
					return {
						ctor: '_Tuple2',
						_0: model,
						_1: _strelka_2017$phi$Simulation_Simulation$animateGeneration(
							_strelka_2017$phi$Simulation_Encoding$encodeGraph(model.network))
					};
				case 'AnimatePeerConsumption':
					return {
						ctor: '_Tuple2',
						_0: model,
						_1: _strelka_2017$phi$Simulation_Simulation$animatePeerConsumption(
							_strelka_2017$phi$Simulation_Encoding$encodeGraph(model.network))
					};
				case 'AnimateTrade':
					return {
						ctor: '_Tuple2',
						_0: model,
						_1: _strelka_2017$phi$Simulation_Simulation$animateTrade(
							_strelka_2017$phi$Simulation_Encoding$encodeGraph(model.network))
					};
				case 'AnimationFinished':
					var _p3 = _p0._0;
					switch (_p3) {
						case 'layoutRendered':
							var _v12 = _strelka_2017$phi$Action$AnimateGeneration,
								_v13 = model;
							msg = _v12;
							model = _v13;
							continue update;
						case 'generatorsAnimated':
							return A3(
								_ccapndave$elm_update_extra$Update_Extra$andThen,
								_strelka_2017$phi$Update$update,
								_strelka_2017$phi$Action$AnimatePeerConsumption,
								A2(
									_strelka_2017$phi$Update$update,
									_strelka_2017$phi$Action$SendBotChatItem(
										_strelka_2017$phi$Chat_Narrative$dayGenerated(model)),
									model));
						case 'consumptionAnimated':
							return A3(
								_ccapndave$elm_update_extra$Update_Extra$andThen,
								_strelka_2017$phi$Update$update,
								_strelka_2017$phi$Action$AnimateTrade,
								A2(
									_strelka_2017$phi$Update$update,
									_strelka_2017$phi$Action$SendBotChatItem(
										_strelka_2017$phi$Chat_Narrative$dayConsumed(model)),
									model));
						case 'tradeAnimated':
							var _v14 = _strelka_2017$phi$Action$SendBotChatItem(
								_strelka_2017$phi$Chat_Narrative$dayTraded(model)),
								_v15 = model;
							msg = _v14;
							model = _v15;
							continue update;
						default:
							var _v16 = _strelka_2017$phi$Action$NoOp,
								_v17 = model;
							msg = _v16;
							model = _v17;
							continue update;
					}
				case 'MultiChoiceMsg':
					var _p4 = _p0._0;
					var newModel = A2(
						addChatItem,
						_strelka_2017$phi$Chat_Model$UserMessage(
							_strelka_2017$phi$Chat_Model$mcaName(_p4)),
						model);
					return A2(_strelka_2017$phi$Update$handleMultiChoiceMsg, _p4, newModel);
				case 'ToggleInputType':
					var _p5 = model.inputType;
					if (_p5.ctor === 'FreeTextInput') {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{inputType: _strelka_2017$phi$Chat_Model$MultiChoiceInput}),
							{ctor: '[]'});
					} else {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{inputType: _strelka_2017$phi$Chat_Model$FreeTextInput}),
							{ctor: '[]'});
					}
				default:
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: _strelka_2017$phi$Chat_Chat$sendToEliza(_p0._0),
							_1: {ctor: '[]'}
						});
			}
		}
	});
var _strelka_2017$phi$Update$handleMultiChoiceMsg = F2(
	function (action, model) {
		var _p6 = action;
		switch (_p6.ctor) {
			case 'McaWeatherForecast':
				return _strelka_2017$phi$Update$weatherForecast(model);
			case 'McaChangeDesign':
				return _strelka_2017$phi$Update$changeDesign(model);
			case 'McaRunDay':
				return _strelka_2017$phi$Update$runDay(model);
			case 'McaSelectLocation':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{ctor: '[]'});
			default:
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{ctor: '[]'});
		}
	});
var _strelka_2017$phi$Update$changeDesign = function (model) {
	var chatMsg = _strelka_2017$phi$Chat_Model$BotMessage('Sorry that\'s not available yet!');
	return A2(
		_strelka_2017$phi$Update$update,
		_strelka_2017$phi$Action$SendBotChatItem(chatMsg),
		model);
};
var _strelka_2017$phi$Update$runDay = function (model) {
	var joinEdges = F2(
		function (source, target) {
			return A2(
				_elm_community$graph$Graph$fromNodesAndEdges,
				_elm_community$graph$Graph$nodes(target),
				A2(
					_elm_lang$core$List$append,
					_elm_community$graph$Graph$edges(source),
					_elm_community$graph$Graph$edges(target)));
		});
	var updateNetwork = F2(
		function (source, target) {
			return A2(
				_strelka_2017$phi$Simulation_GraphUpdates$updateNodes,
				_elm_community$graph$Graph$nodes(source),
				target);
		});
	var joinNetworks = F2(
		function (list, network) {
			joinNetworks:
			while (true) {
				var _p7 = list;
				if (_p7.ctor === '[]') {
					return network;
				} else {
					var _v21 = _p7._1,
						_v22 = A2(updateNetwork, _p7._0, network);
					list = _v21;
					network = _v22;
					continue joinNetworks;
				}
			}
		});
	var applyPhases = function (network) {
		return _strelka_2017$phi$Simulation_Simulation$tradingPhase(
			A2(
				_elm_community$graph$Graph$mapNodes,
				_strelka_2017$phi$Simulation_Simulation$consumeFromStorage,
				A3(
					_strelka_2017$phi$Simulation_Simulation$distributeGeneratedJoules,
					model.negawattLimit,
					model.reputationRatio,
					A2(_strelka_2017$phi$Simulation_Simulation$joulesToGenerators, model.weather, network))));
	};
	var newNetworkList = function (nw) {
		return A2(
			_elm_lang$core$List$map,
			applyPhases,
			_elm_community$graph$Graph$stronglyConnectedComponents(
				A2(
					joinEdges,
					_elm_community$graph$Graph$reverseEdges(nw),
					nw)));
	};
	var newNetwork = A2(
		joinNetworks,
		newNetworkList(model.network),
		model.network);
	var modelWithUpdatedNetwork = _elm_lang$core$Native_Utils.update(
		model,
		{network: newNetwork});
	var newBudget = _strelka_2017$phi$Simulation_Simulation$updateBudget(modelWithUpdatedNetwork);
	var newModel = _elm_lang$core$Native_Utils.update(
		modelWithUpdatedNetwork,
		{budget: newBudget});
	return A3(
		_ccapndave$elm_update_extra$Update_Extra$andThen,
		_strelka_2017$phi$Update$update,
		_strelka_2017$phi$Action$RenderPhiNetwork,
		A2(_strelka_2017$phi$Update$generateWeather, model.weatherList, newModel));
};
var _strelka_2017$phi$Update$generateWeather = function (list) {
	var currentList = _strelka_2017$phi$Simulation_WeatherList$restWeather(list);
	var currentWeather = _strelka_2017$phi$Simulation_WeatherList$weatherTupleToWeather(
		A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: 0.5, _1: 0.5},
			_elm_lang$core$List$head(currentList)));
	return _strelka_2017$phi$Update$update(
		_strelka_2017$phi$Action$UpdateWeather(currentWeather));
};
var _strelka_2017$phi$Update$weatherForecast = function (model) {
	var windy = _elm_lang$core$Basics$toString(model.weather.wind);
	var sunny = _elm_lang$core$Basics$toString(model.weather.sun);
	var chatMsg = _strelka_2017$phi$Chat_Model$BotMessage(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'Tomorrow should have ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				sunny,
				A2(
					_elm_lang$core$Basics_ops['++'],
					' amount of sun, ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'and ',
						A2(_elm_lang$core$Basics_ops['++'], windy, ' amount of wind'))))));
	return A3(
		_ccapndave$elm_update_extra$Update_Extra$andThen,
		_strelka_2017$phi$Update$update,
		_strelka_2017$phi$Action$SendBotChatItem(
			_strelka_2017$phi$Chat_Model$WidgetItem(_strelka_2017$phi$Chat_Model$WeatherWidget)),
		A2(
			_strelka_2017$phi$Update$update,
			_strelka_2017$phi$Action$SendBotChatItem(chatMsg),
			model));
};

var _strelka_2017$phi$View$viewMCA = function (action) {
	return A2(
		_debois$elm_mdl$Material_Chip$span,
		{
			ctor: '::',
			_0: _debois$elm_mdl$Material_Options$cs('multi_button'),
			_1: {
				ctor: '::',
				_0: _debois$elm_mdl$Material_Options$onClick(
					_strelka_2017$phi$Action$MultiChoiceMsg(action)),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_debois$elm_mdl$Material_Chip$text,
				{ctor: '[]'},
				_strelka_2017$phi$Chat_Model$mcaName(action)),
			_1: {ctor: '[]'}
		});
};
var _strelka_2017$phi$View$freeTextFooter = function (model) {
	var isEnter = function (num) {
		var _p0 = num;
		if (_p0 === 13) {
			return _strelka_2017$phi$Action$SendUserChatMsg;
		} else {
			return _strelka_2017$phi$Action$NoOp;
		}
	};
	var onEnter = A2(
		_elm_lang$html$Html_Events$on,
		'keyup',
		A2(_elm_lang$core$Json_Decode$map, isEnter, _elm_lang$html$Html_Events$keyCode));
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('input_container'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$input,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('message_input'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$autofocus(true),
						_1: {
							ctor: '::',
							_0: onEnter,
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onInput(_strelka_2017$phi$Action$Input),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$value(model.input),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('hline'),
						_1: {ctor: '[]'}
					},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A5(
						_debois$elm_mdl$Material_Button$render,
						_strelka_2017$phi$Action$Mdl,
						{
							ctor: '::',
							_0: 0,
							_1: {ctor: '[]'}
						},
						model.mdl,
						{
							ctor: '::',
							_0: _debois$elm_mdl$Material_Button$flat,
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options$onClick(_strelka_2017$phi$Action$SendUserChatMsg),
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$cs('send_button'),
									_1: {ctor: '[]'}
								}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Send'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _strelka_2017$phi$View$multiChoiceFooter = function (model) {
	var toMultiChoiceActionList = function (chatItem) {
		var _p1 = chatItem;
		if (_p1.ctor === 'BotItem') {
			var _p2 = _p1._0;
			if (_p2.ctor === 'MultiChoiceItem') {
				return _elm_lang$core$Maybe$Just(_p2._0.options);
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var lastMultiChoiceActionList = A2(
		_elm_lang$core$Maybe$withDefault,
		{
			ctor: '::',
			_0: _strelka_2017$phi$Chat_Model$McaRunDay,
			_1: {ctor: '[]'}
		},
		_elm_lang$core$List$head(
			A2(_elm_lang$core$List$filterMap, toMultiChoiceActionList, model.messages)));
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('input_container'),
			_1: {ctor: '[]'}
		},
		A2(_elm_lang$core$List$map, _strelka_2017$phi$View$viewMCA, lastMultiChoiceActionList));
};
var _strelka_2017$phi$View$inputFooter = function (model) {
	var inputCountainer = function () {
		var _p3 = model.inputType;
		if (_p3.ctor === 'FreeTextInput') {
			return _strelka_2017$phi$View$freeTextFooter(model);
		} else {
			return _strelka_2017$phi$View$multiChoiceFooter(model);
		}
	}();
	var toggleIcon = function () {
		var _p4 = model.inputType;
		if (_p4.ctor === 'FreeTextInput') {
			return 'view_agenda';
		} else {
			return 'text_format';
		}
	}();
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('input_footer'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_debois$elm_mdl$Material_Options$div,
				{
					ctor: '::',
					_0: _debois$elm_mdl$Material_Elevation$e2,
					_1: {
						ctor: '::',
						_0: _debois$elm_mdl$Material_Options$cs('input_wrapper'),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: A5(
						_debois$elm_mdl$Material_Button$render,
						_strelka_2017$phi$Action$Mdl,
						{
							ctor: '::',
							_0: 0,
							_1: {ctor: '[]'}
						},
						model.mdl,
						{
							ctor: '::',
							_0: _debois$elm_mdl$Material_Button$icon,
							_1: {
								ctor: '::',
								_0: _debois$elm_mdl$Material_Options$cs('input_type'),
								_1: {
									ctor: '::',
									_0: _debois$elm_mdl$Material_Options$onClick(_strelka_2017$phi$Action$ToggleInputType),
									_1: {ctor: '[]'}
								}
							}
						},
						{
							ctor: '::',
							_0: _debois$elm_mdl$Material_Icon$i(toggleIcon),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('hline'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: inputCountainer,
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {ctor: '[]'}
		});
};
var _strelka_2017$phi$View$phiCoin = function (budget) {
	return A2(
		F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			}),
		'Φ',
		A2(
			_cuducos$elm_format_number$FormatNumber$format,
			{decimals: 0, thousandSeparator: ',', decimalSeparator: '.'},
			A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				_elm_lang$core$List$head(budget))));
};
var _strelka_2017$phi$View$intFmt = function (num) {
	return A2(
		_cuducos$elm_format_number$FormatNumber$format,
		{decimals: 0, thousandSeparator: ',', decimalSeparator: '.'},
		_elm_lang$core$Basics$toFloat(num));
};
var _strelka_2017$phi$View$chatHeader = function (model) {
	var siteName = model.siteInfo.name;
	var sitePop = _strelka_2017$phi$View$intFmt(model.siteInfo.population);
	var ccText = A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('cc_text'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$b,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('COMMUNITY'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$br,
					{ctor: '[]'},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('coverage'),
					_1: {ctor: '[]'}
				}
			}
		});
	var phText = A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('ph_text'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$b,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('PHI'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$br,
					{ctor: '[]'},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('health'),
					_1: {ctor: '[]'}
				}
			}
		});
	var pt = function (theText) {
		return A2(
			_elm_lang$html$Html$p,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(theText),
				_1: {ctor: '[]'}
			});
	};
	var statusTitle = F3(
		function (className, iconName, txt) {
			return A2(
				_elm_lang$html$Html$span,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class(className),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_debois$elm_mdl$Material_Icon$view,
						iconName,
						{
							ctor: '::',
							_0: _debois$elm_mdl$Material_Icon$size18,
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: pt(txt),
						_1: {ctor: '[]'}
					}
				});
		});
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('chat_header'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('map_status'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('title_bar'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A3(statusTitle, 'site_name', 'location_city', siteName),
							_1: {
								ctor: '::',
								_0: A3(statusTitle, 'population', 'people', sitePop),
								_1: {
									ctor: '::',
									_0: A3(statusTitle, 'week_no', 'today', 'Week 20'),
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('status_body'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('status_section'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('donut_legend'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: phText,
												_1: {
													ctor: '::',
													_0: A3(_strelka_2017$phi$Charts$donutWithPct, 50, 10, 0.5),
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$div,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$class('donut_legend'),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: ccText,
													_1: {
														ctor: '::',
														_0: A3(_strelka_2017$phi$Charts$donutWithPct, 50, 10, 0.3),
														_1: {ctor: '[]'}
													}
												}),
											_1: {ctor: '[]'}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('hline'),
											_1: {ctor: '[]'}
										},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('status_section'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$div,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('budget_status'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$b,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('BUDGET'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$span,
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html_Attributes$class('budget_coin'),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text(
																			_strelka_2017$phi$View$phiCoin(model.budget)),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		});
};
var _strelka_2017$phi$View$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('chat_window'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$ul,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$id('toScroll'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('messages'),
						_1: {ctor: '[]'}
					}
				},
				A2(
					_elm_lang$core$List$map,
					_strelka_2017$phi$Chat_View$viewChatMsg,
					_elm_lang$core$List$reverse(model.messages))),
			_1: {
				ctor: '::',
				_0: _strelka_2017$phi$View$chatHeader(model),
				_1: {
					ctor: '::',
					_0: _strelka_2017$phi$View$inputFooter(model),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _strelka_2017$phi$Main$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: _strelka_2017$phi$Chat_Chat$elizaReply(
				function (_p0) {
					return _strelka_2017$phi$Action$SendBotChatItem(
						_strelka_2017$phi$Chat_Model$BotMessage(_p0));
				}),
			_1: {
				ctor: '::',
				_0: _strelka_2017$phi$Simulation_SimulationInterop$animationFinished(_strelka_2017$phi$Action$AnimationFinished),
				_1: {ctor: '[]'}
			}
		});
};
var _strelka_2017$phi$Main$main = _elm_lang$html$Html$program(
	{init: _strelka_2017$phi$Model$initModel, view: _strelka_2017$phi$View$view, update: _strelka_2017$phi$Update$update, subscriptions: _strelka_2017$phi$Main$subscriptions})();

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _strelka_2017$phi$Main$main !== 'undefined') {
    _strelka_2017$phi$Main$main(Elm['Main'], 'Main', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

