'use strict';

var path = require('path');
var file = require('file-utils');
var chai = require('chai');
var expect = chai.expect;

var javascriptAnalyser = require('../../src/lib/javascriptAnalyser')({
    tmp: 'tmp-javascript'
});

describe('javascriptAnalyser', function() {

    beforeEach(function() {
        file.mkdir('tmp-javascript');
    });

    afterEach(function() {
        file.delete('tmp-javascript');
    });

    it('should return the analysis of a given javascript file', function() {
        return javascriptAnalyser(path.resolve(__dirname, '../fixtures/js-dummy.js')).then(function(result) {
            expect(result).to.be.a('array');
            expect(result[0]).to.have.property('info');
            expect(result[0]).to.have.property('complexity');
        });
    });

});
