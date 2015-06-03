'use strict';

var path = require('path');
var file = require('file-utils');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

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

    it('should return the compression stats of a file', function(done) {
        expect(gzipAnalyser(path.resolve(__dirname, '../fixtures/gzip-dummy.js'))).to.eventually.become({
            uncompressed: 488,
            compressed: 222
        }).notify(done);
    });

});
