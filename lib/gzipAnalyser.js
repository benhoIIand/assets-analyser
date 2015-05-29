'use strict';

var fs = require('fs');
var path = require('path');
var Q = require('q');
var zlib = require('zlib');

module.exports = function(options) {

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
        var dest = 'tmp/' + file + '.gz';

        var srcStream = fs.createReadStream(filename);
        var destStream = fs.createWriteStream(dest);
        var compressor = zlib.createGzip.call(zlib, options);

        compressor.on('error', function() {
            deferred.reject(new Error('GZip compression of ' + filename + ' failed.'));
        });

        destStream.on('close', function() {
            deferred.resolve({
                uncompressed: Number(getSize(filename).toFixed(1)),
                compressed: Number(getSize(dest).toFixed(1)),
            });
        });

        srcStream.pipe(compressor).pipe(destStream);

        return deferred.promise;
    };

};
