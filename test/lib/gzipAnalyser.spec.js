'use strict';

var fs = require('fs');
var path = require('path');
var grunt = require('grunt');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

var gzipAnalyser = require('../../src/lib/gzipAnalyser')({
    tmp: 'tmp-gzip'
});

describe('gzipAnalyser', function() {

    beforeEach(function() {
        grunt.file.mkdir('tmp-gzip');
    });

    afterEach(function() {
        grunt.file.delete('tmp-gzip');
    });

    it('should return the compression stats of a file', function(done) {
        expect(gzipAnalyser(path.resolve(__dirname, '../fixtures/gzip-dummy.js'))).to.eventually.become({
            uncompressed: 488,
            compressed: 222
        }).notify(done);
    });

});
