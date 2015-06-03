'use strict';

var path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

var cssAnalyser = require('../../src/lib/cssAnalyser')();

describe('cssAnalyser', function() {

    it('should return the analysis of a given CSS file', function(done) {
        expect(cssAnalyser(path.resolve(__dirname, '../fixtures/css-dummy.css'))).to.eventually.become({
            rules: 4,
            totalSelectors: 9,
            averageSelectors: 2.3
        }).notify(done);
    });

});
