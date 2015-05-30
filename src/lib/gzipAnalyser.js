'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Q = require('q');
var zlib = require('zlib');

var defaultOptions = {
    tmp: 'tmp',
    gzipLevel: 6
};

module.exports = function(options) {

    _.defaults(options, defaultOptions);

    function getSize(filename) {
        var size = 0;

        if (typeof filename === 'string') {
            try {
                size = fs.statSync(filename).size;
            } catch (e) {}
        } else {
            size = filename;
        }

        return Number(size);
    }

    return function(filename) {
        var deferred = Q.defer();
        var file = path.basename(filename);
        var dest = path.resolve(__dirname, '../../', options.tmp, file + '.gz');

        var srcStream = fs.createReadStream(filename);
        var destStream = fs.createWriteStream(dest);
        var compressor = zlib.createGzip.call(zlib, options);

        compressor.on('error', function() {
            deferred.reject(new Error('GZip compression of ' + filename + ' failed.'));
        });

        destStream.on('close', function() {
            deferred.resolve({
                uncompressed: Number(getSize(filename)),
                compressed: Number(getSize(dest))
            });
        });

        srcStream.pipe(compressor).pipe(destStream);

        return deferred.promise;
    };

};
