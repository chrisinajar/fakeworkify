# Fakeworkify
#### Mock implementation of webworkify for test cases

## Installation
`npm install --save-dev fakeworkify`

## Usage
The idea is to allow CLI test cases which utilize webworkers to still work. Use [proxyquire](https://npmjs.com/package/proxyquire) to inject the mock implementation into your modules.
```js
var proxyquire = require('proxyquire');

var myModule = proxyquire('./my-module', {
  webworkify: require('fakeworkify')
});
```

# License
MIT
