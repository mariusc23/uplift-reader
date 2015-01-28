# uplift-reader 

[![npm](https://img.shields.io/npm/v/uplift-reader.svg)](https://www.npmjs.com/package/uplift-reader)

Reads resource urls in a template. Jinja compatible.

## Getting Started
Install the module with: `npm install uplift-reader`

```js
var reader = require('uplift-reader');
reader.read('<script src="whatever.js"></script>');
reader.readFile('/path/to/file.js');
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2015 Marius Craciunoiu  
Licensed under the MIT license.
