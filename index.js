// ** templatizer

var fs = require('fs'),
	glob = require('glob'),
	util = require('util'),
	async = require('async'),
	_ = require('underscore'),
	uglifyjs = require('uglify-js'),
	handlebars = require('handlebars');

module.exports  = function (pattern, dest, options, done) {
	var opts = _.extend({
		uglify: true,
		stripPrefix: /^.*\/templates\//
	}, options);

	var namespaces = [];
	var output = [ "var Handlebars = require('handlebars'); \n\n" ];

	glob(pattern, function(err, files) {
		if(err) throw err;

		async.each(files, function(file, cb) {
			fs.readFile(file, function(err, content) {
				if(err) return cb(err);

				var segments = templateName(file, opts);

				for(var i = 0; i < segments.length - 1; i++) {
					var e = segments.slice(0, i + 1).join('');

					if(namespaces.indexOf(e) === -1) {
						namespaces.push(e);

						var namespaceContent = util.format("module.exports%s = {};", e);
						output.push(namespaceContent);
					}
				}

				var content = util.format(
					"module.exports%s = Handlebars.template(%s);\n",
					segments.join(''),
					handlebars.precompile(content.toString(), {})
				);

				output.push(content);
				cb();
			});
		}, function(err) {
			if(err) throw err;

			var textOutput = output.join(' ');

			if(opts.uglify) {
				textOutput = uglifyjs.minify(textOutput, { fromString   : true }).code;
			}

			fs.writeFile(dest, textOutput, done);
		});
	});
};

function templateName (fileName, opts) {
	return fileName
		.replace(opts.stripPrefix, '') // optionally strip a prefix
		.replace(/\..*$/, '') // remove file extension
		.replace(/^\//, '') // remove leading slash
		.split(/\//) // split on slashes
		.map(function (component) {
			return "['" + component.replace(/\'/, "\\'") + "']"
		});
};
