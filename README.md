assets-analyser
===============

## This is currently under development

[![npm version](https://badge.fury.io/js/assets-analyser.svg)](http://badge.fury.io/js/assets-analyser)
[![Build Status](https://travis-ci.org/hollandben/assets-analyser.png?branch=master)](https://travis-ci.org/hollandben/assets-analyser)
[![Dependencies](https://david-dm.org/hollandben/assets-analyser/status.svg?style=flat)](https://david-dm.org/hollandben/assets-analyser#info=dependencies)
[![devDependency Status](https://david-dm.org/hollandben/assets-analyser/dev-status.svg?style=flat)](https://david-dm.org/hollandben/assets-analyser#info=devDependencies)

Analyses given files and reports back with compressed/uncompressed file sizes and custom reports.

This module was inspired and based up [grunt-asset-monitor](https://github.com/guardian/grunt-asset-monitor) from the [Guardian team](https://github.com/guardian) and [Patrick Hamman](https://github.com/phamann)

## Options

### analysers

Type: `Array`
Default: `['css', 'js']`

By default, asset-analyser will return the size of each file. This is a list of additional analysis tools for various file types.

### files

Type: `String|Array`
Default: `Required`

Location of files to be analysed - works with glob matching so `/**/*.js` will work.

### gzipLevel

Type: `Number`
Default: `6`

Level of GZip compression to use to generate compressed file size output.

### quiet

Type: `Boolean`
Default: `false`

Disables logging of information - only shows errors.

## Release History

