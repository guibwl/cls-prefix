# cls-prefix

A simple JavaScript utility for conditionally joining classNames together (like '[classnames](https://www.npmjs.com/package/classnames)') and customize a prefix.

### Why?

When some dom or component need same prefix class name, this lib suitable for this.

### Install

npm:
```sh
npm install cls-prefix -S
```

yarn:
```sh
yarn add cls-prefix
```

### Usage

Commonjs:

```js
const clsPrefix = require('cls-prefix');
```

ESModule:

```js
import clsPrefix from 'cls-prefix';
```

With `<script>` tag:

Alternatively, you can copy `node_modules/cls-prefix/umd/index.js` in your project, on your page with a standalone `<script>` tag and it will export a global `clsPrefix` method.

-------

#### Now on your project:

Basic usage:

```js

const clsPrefixInstance = new clsPrefix("prefix");
const clsPrefixSplice = clsPrefixInstance.splice;


clsPrefixSplice(); // => 'prefix'
clsPrefixSplice('foo', 'bar'); // => 'prefix-foo prefix-bar'
clsPrefixSplice('foo', { bar: true }); // => 'prefix-foo prefix-bar'
clsPrefixSplice({ 'foo-bar': true }); // => 'prefix-foo-bar'
clsPrefixSplice({ 'foo-bar': false }); // => ''
clsPrefixSplice({ foo: true }, { bar: true }); // => 'prefix-foo prefix-bar'
clsPrefixSplice({ foo: true, bar: true }); // => 'prefix-foo prefix-bar'
clsPrefixSplice('foo', ['bar', 'baz']); // => 'prefix-foo prefix-bar prefix-baz'
```

Of course, you can use no prefix:

```js

const clsPrefixInstance = new clsPrefix();
const clsPrefixSplice = clsPrefixInstance.splice;


clsPrefixSplice('foo', 'bar'); // => 'foo bar'
clsPrefixSplice('foo', { bar: true }); // => 'foo bar'

```