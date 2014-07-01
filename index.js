// ** templatizer

// glob = require('glob');
module.exports  = function (templateDirectories, outputFile, options, done) {
	console.log('rock and roll');
	done();
}

// var fs = require('fs');
//     		var util = require('util');
//     		var async = require('async');
//     		var handlebars = require('handlebars');
// 				var templates = path.resolve(__dirname, 'vnext/templates/**/*.hbs');
// 				var namespaces = [];

// 				glob(templates, function(err, files) {
// 					if(err) throw err;

// 					var output = [
// 						"var Handlebars = require('handlebars'); \n\n"
// 					];

// 					async.each(files, function(file, cb) {
// 						fs.readFile(file, function(err, content) {
// 							if(err) return cb(err);

// 							var name = file.replace(/^.*\/templates\//, '').replace(/\..*$/, '').replace(/\//g, '.');
// 							var segments = name.split('.');

// 							for(var i = 0; i < segments.length - 1; i++) {
// 								var e = segments.slice(0, i + 1).join('.');

// 								if(namespaces.indexOf(e) === -1) {
// 									namespaces.push(e);

// 									var namespaceContent = util.format("module.exports.%s = {};", e);
// 									output.push(namespaceContent);
// 								}
// 							}

// 							var content = util.format(
// 								"module.exports.%s = Handlebars.template(%s);\n",
// 								name,
// 								handlebars.precompile(content.toString(), {})
// 							);

// 							output.push(content);
// 							cb();
// 						});
// 					}, function(err) {
// 						if(err) throw err;

// 						var fln = path.resolve(__dirname, 'vnext/client/templates.js');
// 						fs.writeFileSync(fln, output.join(' '));
// 						done();
// 					});
// 				});
