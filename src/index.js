'use strict';

var Q = require('q');
var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var grunt = require('grunt');
var cssAnalyser = require('./lib/cssAnalyser');
var javascriptAnalyser = require('./lib/javascriptAnalyser');
var gzipAnalyser = require('./lib/gzipAnalyser');
var gzip;
var jsAnalyser;

var defaultOptions = {
    tmp: 'tmp',
    gzipLevel: 6
};

var analysers = {
    css: cssAnalyser,
    js: jsAnalyser
};

function dummyAnalyser() {
    var deferred = Q.defer();
    deferred.resolve({});
    return deferred.promise;
}

function analyse(filename) {
    var extension = path.extname(filename).replace('.', '');
    var analyser = analysers[extension] ? analysers[extension] : dummyAnalyser;

    console.log('Analysing ' + filename);

    //Get file size and compression data
    return Q.all([gzip(filename), analyser(filename)])
        .spread(function(gzipData, analysis) {
            var data = _.assign(gzipData, analysis, {
                type: extension,
                filename: filename
            });

            console.log('--------------------------------');
            console.log('Uncompressed size: ' + String(data.uncompressed).cyan);
            console.log('Compressed ' + String(data.compressed).cyan);

            return data;
        });
}

module.exports = function(options, files, done) {
    var deferred = Q.defer();

    var matchedFiles = files.reduce(function(arr, matcher) {
        return glob.sync(matcher, {
            nodir: true
        });
    }, []);

    _.defaults(options, defaultOptions)

    // Make tmp directory
    grunt.file.mkdir(options.tmp);

    gzip = gzipAnalyser(options);
    jsAnalyser = javascriptAnalyser(options);

    return Q.all(matchedFiles.map(analyse)).spread(function() {
        var data = [].slice.call(arguments);

        if (options.output) {
            grunt.file.write(options.output, JSON.stringify(data));
        }

        grunt.file.delete(options.tmp, {
            force: true
        });

        return data;
    });
};
