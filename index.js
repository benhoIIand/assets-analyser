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

var defaultOptions = {
    gzipLevel: 6
};

var analysers = {
    css: cssAnalyser,
    js: javascriptAnalyser
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
    Q.all([gzip(filename), analyser(filename)])
        .spread(function(gzipData, analysis) {
            var data = _.assign(gzipData, analysis, {
                type: extension
            });

            console.log('--------------------------------');
            console.log('Uncompressed size: ' + String(data.uncompressedPretty).cyan);
            console.log('Compressed ' + String(data.compressedPretty).cyan);

            console.log(data);
        });
}

module.exports = function(options, files, done) {
    var matchedFiles = files.reduce(function(arr, matcher) {
        return glob.sync(matcher, {
            nodir: true
        });
    }, []);

    // Make tmp directory
    grunt.file.mkdir('tmp');

    _.defaults(_.clone(defaultOptions), options);
    gzip = gzipAnalyser(options);
    matchedFiles.forEach(analyse);

    setTimeout(done, 500);
};
