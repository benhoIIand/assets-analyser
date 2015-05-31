'use strict';

var fs = require('fs');
var assetAnaylser = require('./src/');

var prev = {
    'example/css/build.css': [{
        uncompressed: 769,
        compressed: 259,
        rules: 316,
        totalSelectors: 282,
        averageSelectors: 387,
        type: 'css',
        filename: 'example/css/build.css',
        datetime: 1433102852688
    }],
    'example/js/example.js': [{
        uncompressed: 1169,
        compressed: 259,
        type: 'js',
        filename: 'example/js/example.js',
        datetime: 1433102852688
    }, {
        uncompressed: 1969,
        compressed: 259,
        type: 'js',
        filename: 'example/js/example.js',
        datetime: 1433102852688
    }]
};

assetAnaylser({}, ['example/**/*']).then(function(data) {

    data.forEach(function(file) {
        if (prev[file.filename]) {
            prev[file.filename].push(file);
        } else {
            prev[file.filename] = [file];
        }
    });

    fs.writeFile('./dashboard/anaylsis.json', JSON.stringify(prev));

});
