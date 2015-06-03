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
    gzipLevel: 6,
    tmp: './tmp'
};

var analysers = {};

function dummyAnalyser() {
    var deferred = Q.defer();
    deferred.resolve({});
    // Q.when({})
    return deferred.promise;
}

function analyse(filepath) {
    var extension = path.extname(filepath).replace('.', '');
    var analyser = analysers[extension] ? analysers[extension] : dummyAnalyser;
    var relativePath = filepath.replace(process.cwd(), '');

    console.log('Analysing', relativePath, '...');

    //Get file size and compression data
    return Q.all([gzip(filepath), analyser(filepath)])
        .spread(function(gzipData, analysis) {
            var data = _.assign(gzipData, analysis[0] ? analysis[0] : analysis, {
                type: extension,
                filename: filepath.split('/').pop(),
                filepath: relativePath
            });

            console.log('--------------------------------');
            console.log('Uncompressed size: ' + String(data.uncompressed).cyan);
            console.log('Compressed ' + String(data.compressed).cyan);

            return data;
        });
}

module.exports = function(options, files) {
    _.defaults(options, defaultOptions);

    options.tmp = path.resolve(options.tmp);

    gzip = gzipAnalyser(options);
    analysers.css = cssAnalyser(options);
    analysers.js = javascriptAnalyser(options);

    var matchedFiles = files.reduce(function(arr, matcher) {
        return glob.sync(path.resolve(matcher), {
            nodir: true
        });
    }, []);

    // Make tmp directory
    file.mkdir(options.tmp);

    return Q.all(matchedFiles.map(analyse)).spread(function() {
        var data = [].slice.call(arguments);

        file.delete(options.tmp, {
            force: true
        });

        if (options.output) {
            file.write(options.output, JSON.stringify(data));
        }

        return data;
    });
};
