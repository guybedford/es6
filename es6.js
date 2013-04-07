define(['amd-loader', './traceur-compiler'], function(amdLoader, traceur) {
  return amdLoader('es6', 'js', function(name, source, req, callback, errback, config) {

    var url = req.toUrl(name) + '.js';
    var project = new traceur.semantics.symbols.Project(url);
    traceur.options = config.traceur;

    traceur.options.sourceMaps = true;

    var reporter = new traceur.util.ErrorReporter();
    reporter.reportMessageInternal = function(location, kind, format, args) {
      errback(location + '\n ' + format + '\n ' + args + '\n');
    }

    var sourceFile = new traceur.syntax.SourceFile(name, source);
    project.addFile(sourceFile);
    var res = traceur.codegeneration.Compiler.compile(reporter, project, false);

    var options;
    if (traceur.options.sourceMaps) {
      var config = {file: 'traceured.js'};
      var sourceMapGenerator = new traceur.outputgeneration.SourceMapGenerator(config);
      options = {sourceMapGenerator: sourceMapGenerator};
    }

    var source = traceur.outputgeneration.ProjectWriter.write(res, options);

    var sourceMap = JSON.parse(options.sourceMap);
    //sourceMap.sourcesContent = [null, null, null, null];
    // nb make this work
    source += '\n//@ sourceMappingURL=data:application/json;base64,' + btoa(JSON.stringify(options.sourceMap));

    callback(source);
  });
});
