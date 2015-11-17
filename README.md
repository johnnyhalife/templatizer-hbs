templatizer-hbs
===============
Simple solution for pre-compiling handlebars templates into vanilla JS functions for blazin' fast client-side use.

## What is this?

[Inspired by templatizer by @HenrikJoreteg](https://github.com/HenrikJoreteg/templatizer).

## Usage

Given:

```
/path
  /to
    /templates
      foo.hbs
      foo-bar.hbs
```

```javascript
templatizer('/path/to/templates/**/*.hbs', '/path/to/output.js', {
  uglify: true,
}, function () {
  var templates = require('/path/to/output.js')

  templates.foo // is a compiled handlebars template
  templates['foo-bar'] // is also a compiled template
})
```

### Stripping file prefixes

Did you end up with the below because of your paths?

```javascript
templates.path.to.templates.foo // is a compiled handlebars template
```

No problem, use:

```javascript
templatizer('/path/to/templates/**/*.hbs', '/path/to/output.js', {
  uglify: true,
  stripPrefix: '/path/to/templates'
}, function () {
  var templates = require('/path/to/output.js')

  templates.foo // is a compiled handlebars template
})
```
