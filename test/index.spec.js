'use strict';

var path = require('path');
var file = require('file-utils');
var chai = require('chai');
var expect = chai.expect;

var assetsAnalyser = require('../src/');

describe('assetsAnalyser', function() {

    beforeEach(function() {
        file.mkdir('tmp');
    });

    it('should run assets analyser', function() {
        var file = path.resolve(__dirname, 'fixtures/css-dummy.css');

        return assetsAnalyser({}, [file]).then(function(results) {
            var date = Date.now();
            expect(results[0].timestamp).to.be.within(date - 10, date + 10);

            delete results[0].timestamp;
            expect(results).to.deep.equal([{
                uncompressed: 214,
                compressed: 149,
                rules: 4,
                totalSelectors: 9,
                averageSelectors: 2.3,
                type: 'css',
                filename: "css-dummy.css",
                filepath: "/test/fixtures/css-dummy.css"
            }]);
        });
    });

});
