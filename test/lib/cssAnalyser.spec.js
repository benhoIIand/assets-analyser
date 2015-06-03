'use strict';

var path = require('path');
var chai = require('chai');
var expect = chai.expect;

var cssAnalyser = require('../../src/lib/cssAnalyser')();

describe('cssAnalyser', function() {

    it('should return the analysis of a given CSS file', function() {
        return cssAnalyser(path.resolve(__dirname, '../fixtures/css-dummy.css')).then(function(result) {
            expect(result).to.deep.equal({
                rules: 4,
                totalSelectors: 9,
                averageSelectors: 2.3
            });
        });
    });

});
