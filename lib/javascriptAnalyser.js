'use strict';

var plato = require('plato');

var outputDir = './output/dir';

module.exports = function(file) {
    plato.inspect(file, 'tmp/plato', {}, function(report) {
        console.log(report);
    });
};
