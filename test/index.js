var test = require('ava');
var templatizer = require('../');
var path = require('path');
var rimraf = require('rimraf');
var fs = require('fs')

var TMPDIR = __dirname + '/temp'

if (fs.existsSync(TMPDIR)) {
	rimraf.sync(TMPDIR);
}

fs.mkdirSync(TMPDIR);

test('Should survive dashes in template file name', t => {
	var output = TMPDIR + '/with-dashes.js'

	templatizer(__dirname + '/fixtures/**/*.hbs', output, {
		stripPrefix: __dirname + '/fixtures',
		uglify: false
	}, () => {
		var templates = require(output);

		t.ok(templates['foo-bar'], 'Did not compile templates with dashes in the name');
		t.ok(templates.foo, 'Did not compile templates');
		t.same(templates.foo({
			wat: 'world'
		}), '<div>hello world</div>\n', 'Template was not a template')

		t.end();
	})
});

test('Templates should be templates', t => {
	var output = TMPDIR + '/with-dashes.js'

	templatizer(__dirname + '/fixtures/**/*.hbs', output, {
		stripPrefix: __dirname + '/fixtures',
		uglify: false
	}, () => {
		var templates = require(output);

		t.same(templates.foo({
			wat: 'world'
		}), '<div>hello world</div>\n', 'Template was not a template')

		t.end();
	})
});

test('Should compile templates without stripping path prefix', t => {
	var output = TMPDIR + '/without-prefix.js'

	templatizer(__dirname + '/fixtures/**/*.hbs', output, {
		uglify: false
	}, () => {
		var templates = require(output);

		var segment = (__dirname + '/fixtures')
			.replace(/^\//, '')
			.split('/')
			.reduce((last, segment) => {
				return last[segment]
			}, templates);

		t.ok(segment['foo-bar'], 'Did not compile templates with dashes in the name');
		t.ok(segment.foo, 'Did not compile templates');

		t.end();
	})
});
