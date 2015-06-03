'use strict';

var Q = require('q');
var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var file = require('file-utils');
var cssAnalyser = require('./lib/cssAnalyser');
var javascriptAnalyser = require('./lib/javascriptAnalyser');
var gzipAnalyser = require('./lib/gzipAnalyser');
var gzip;

var defaultOptions = {
    tmp: 'tmp',
    gzipLevel: 6
};

var analysers = {};

function dummyAnalyser() {
    var deferred = Q.defer();
    deferred.resolve({});
    // Q.when({})
    return deferred.promise;
}

function analyse(filename) {
    var extension = path.extname(filename).replace('.', '');
    var analyser = analysers[extension] ? analysers[extension] : dummyAnalyser;

    console.log('Analysing', filename, '...');

    //Get file size and compression data
    return Q.all([gzip(filename), analyser(filename)])
        .spread(function(gzipData, analysis) {
            var data = _.assign(gzipData, analysis[0] ? analysis[0] : analysis, {
                type: extension,
                filename: filename
            });

            console.log('--------------------------------');
            console.log('Uncompressed size: ' + String(data.uncompressed).cyan);
            console.log('Compressed ' + String(data.compressed).cyan);

            return data;
        });
}

module.exports = function(options, files) {
    gzip = gzipAnalyser(options);
    analysers.css = cssAnalyser(options);
    analysers.js = javascriptAnalyser(options);

    var matchedFiles = files.reduce(function(arr, matcher) {
        return glob.sync(matcher, {
            nodir: true
        });
    }, []);

    _.defaults(options, defaultOptions);

    // Make tmp directory
    file.mkdir(options.tmp);

    return Q.all(matchedFiles.map(analyse)).spread(function() {
        var data = [].slice.call(arguments);

        if (options.output) {
            file.write(options.output, JSON.stringify(data));
        }

        file.delete(options.tmp, {
            force: true
        });

        return data;
    });
};
