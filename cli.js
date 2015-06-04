#! /usr/bin/env node

'use strict';

var meow = require('meow');
var analyse = require('./src/');

var cli = meow({
    help: [
        'Usage',
        '  asset-analyser --analysers',
        '  asset-analyser --files',
        '  asset-analyser --gzipLevel',
        '  asset-analyser --quiet',
        '',
        'Exits with code 0 when the name is available or 2 when taken'
    ].join('\n')
});

if (!cli.flags.files) {
    console.error('`files` required');
    process.exit(1);
}

analyse(cli.flags, cli.flags.files.split(',')).then(function() {
    process.exit(0);
}, function(err) {
    console.error(err);
    process.exit(1);
});
