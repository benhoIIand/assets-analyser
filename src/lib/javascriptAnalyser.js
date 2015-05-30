'use strict';

var Q = require('q');
var plato = require('plato');

module.exports = function(options) {
    return function(file) {
        var deferred = Q.defer();

        plato.inspect(file, options.tmp + '/plato', {}, function(report) {
            deferred.resolve(report);
        });

        return deferred.promise;
    };
};
