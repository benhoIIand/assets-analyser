'use strict';

require('colors');
var Q = require('q');
var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var file = require('file-utils');
var cssAnalyser = require('./lib/cssAnalyser');
var javascriptAnalyser = require('./lib/javascriptAnalyser');
var gzipAnalyser = require('./lib/gzipAnalyser');

var defaultOptions = {
    analysers: ['css', 'js'],
    gzipLevel: 6,
    quiet: false,
    verbose: false,
    tmp: './tmp'
};

module.exports = function(options, files) {
    _.defaults(options, defaultOptions);
    options.tmp = path.resolve(options.tmp);
    options.analysers = _.isArray(options.analysers) ? options.analysers : options.analysers.split(',');

    var gzip = gzipAnalyser(options);

    var analysers = {};

    if(_.contains(options.analysers, 'css')) {
        analysers.css = cssAnalyser(options);
    }

    if(_.contains(options.analysers, 'js')) {
        analysers.js = javascriptAnalyser(options);
    }

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

    function analyse(filepath) {
        var extension = path.extname(filepath).replace('.', '');
        var analyser = analysers[extension] ? analysers[extension] : dummyAnalyser;
        var relativePath = filepath.replace(process.cwd(), '');

        if(!options.quiet) {
            console.info('Analysing', relativePath, '...');
        }

        //Get file size and compression data
        return Q.all([gzip(filepath), analyser(filepath)])
            .spread(function(gzipData, analysis) {
                var data = _.assign(gzipData, analysis[0] ? analysis[0] : analysis, {
                    type: extension,
                    filename: filepath.split('/').pop(),
                    filepath: relativePath
                });

                if(!options.quiet) {
                    console.info('--------------------------------');
                    console.info('Uncompressed size: ' + String(data.uncompressed).cyan);
                    console.info('Compressed ' + String(data.compressed).cyan);
                }

                if(options.verbose) {
                    console.info(data);
                }

                return data;
            });
    }
};

function dummyAnalyser() {
    return Q.when({});
}
