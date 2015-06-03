'use strict';

var path = require('path');
var file = require('file-utils');
var chai = require('chai');
var expect = chai.expect;

var gzipAnalyser = require('../../src/lib/gzipAnalyser')({
    tmp: 'tmp-gzip'
});

describe('gzipAnalyser', function() {

    beforeEach(function() {
        file.mkdir('tmp-gzip');
    });

    afterEach(function() {
        file.delete('tmp-gzip');
    });

    it('should return the compression stats of a file', function() {
        return gzipAnalyser(path.resolve(__dirname, '../fixtures/gzip-dummy.js')).then(function(result) {
            expect(result).to.deep.equal({
                uncompressed: 488,
                compressed: 222
            });
        });
    });

});
