ES6 Plugin
===

Load ES6 modules using Traceur, using RequireJS plugin syntax:

```javascript
  define(['es6!some-module'], function(someModule) { ... });
```

For language features, see the [Traceur documentation](https://code.google.com/p/traceur-compiler/wiki/LanguageFeatures).

Installation
---

Needs [AMD-Loader](https://github.com/guybedford/amd-loader) base plugin to work. This is automatically installed with Bower or Volo, otherwise it must be downloaded manually.

```
  volo add guybedford/es6
```

```
  bower install es6
```

When using bower, add the paths (or map) configuration:

```javascript
  paths: {
    es6: 'es6/es6',
    'amd-loader': 'amd-loader/amd-loader'
  }
```
