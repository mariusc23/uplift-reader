'use strict';

var reader = require('../lib/reader.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['reader'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  static: function(test) {
    test.expect(5);
    var result = reader.readFile('test/fixtures/static.html');
    test.equal(result.js[0], '/static/js/app.js', 'should have correct url');
    test.equal(result.css[0], '/static/css/app.css', 'should have correct url');
    test.equal(result.png[0], '/static/img/favicon.png', 'should have correct url');
    test.equal(result['$build'][0].url, '/static/css/app.min.css', 'should have correct css build path.');
    test.equal(result['$build'][1].url, '/static/js/app.min.js', 'should have correct js build path.');
    test.done();
  },
  jinja: function(test) {
    test.expect(5);
    var result = reader.readFile('test/fixtures/jinja.html');
    test.equal(result.js[0], '/static/js/app.js', 'should have correct url');
    test.equal(result.css[0], '/static/css/app.css', 'should have correct url');
    test.equal(result.png[0], '/static/img/favicon.png', 'should have correct url');
    test.equal(result['$build'][0].url, '/static/css/app.min.css', 'should have correct css build path.');
    test.equal(result['$build'][1].url, '/static/js/app.min.js', 'should have correct js build path.');
    test.done();
  },
};
