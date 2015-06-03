'use strict';

var path = require('path');
var file = require('file-utils');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

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

    it('should return the analysis of a given javascript file', function(done) {
        expect(javascriptAnalyser(path.resolve(__dirname, '../fixtures/js-dummy.js'))).to.eventually.become([{
            info: {
                file: '/Users/benh/projects/assets-analyser/test/fixtures/js-dummy.js',
                fileShort: '/Users/benh/projects/assets-analyser/test/fixtures/js-dummy.js',
                fileSafe: '_Users_benh_projects_assets_analyser_test_fixtures_js_dummy_js',
                link: 'files/_Users_benh_projects_assets_analyser_test_fixtures_js_dummy_js/index.html'
            },
            date: undefined,
            complexity: {
                aggregate: {
                    sloc: {
                        logical: 4,
                        physical: 5
                    },
                    cyclomatic: 1,
                    halstead: {
                        operators: {
                            distinct: 3,
                            total: 3,
                            identifiers: ["()", "function", "return"]
                        },
                        operands: {
                            distinct: 3,
                            total: 3,
                            identifiers: ["\"use strict\"", "hello", "\"hello\""]
                        },
                        length: 6,
                        vocabulary: 6,
                        difficulty: 1.5,
                        volume: 15.509775004326936,
                        effort: 23.264662506490403,
                        bugs: 0.005169925001442312,
                        time: 1.292481250360578
                    },
                    name: undefined,
                    params: 0,
                    line: 1,
                    cyclomaticDensity: 25,
                    complexity: {
                        cyclomatic: 1,
                        sloc: {
                            logical: 4,
                            physical: 5
                        },
                        halstead: {
                            operators: {
                                distinct: 3,
                                total: 3,
                                identifiers: ["()", "function", "return"]
                            },
                            operands: {
                                distinct: 3,
                                total: 3,
                                identifiers: ["\"use strict\"", "hello", "\"hello\""]
                            },
                            length: 6,
                            vocabulary: 6,
                            difficulty: 1.5,
                            volume: 15.509775004326936,
                            effort: 23.264662506490403,
                            bugs: 0.005169925001442312,
                            time: 1.292481250360578
                        }
                    }
                },
                functions: [{
                    name: 'hello',
                    sloc: {
                        logical: 1,
                        physical: 3
                    },
                    cyclomatic: 1,
                    halstead: {
                        operators: {
                            distinct: 1,
                            total: 1,
                            identifiers: ["return"]
                        },
                        operands: {
                            distinct: 1,
                            total: 1,
                            identifiers: ["\"hello\""]
                        },
                        length: 2,
                        vocabulary: 2,
                        difficulty: 0.5,
                        volume: 2,
                        effort: 1,
                        bugs: 0.0006666666666666666,
                        time: 0.05555555555555555
                    },
                    params: 0,
                    line: 3,
                    cyclomaticDensity: 100,
                    complexity: {
                        cyclomatic: 1,
                        sloc: {
                            logical: 1,
                            physical: 3
                        },
                        halstead: {
                            operators: {
                                distinct: 1,
                                total: 1,
                                identifiers: ["return"]
                            },
                            operands: {
                                distinct: 1,
                                total: 1,
                                identifiers: ["\"hello\""]
                            },
                            length: 2,
                            vocabulary: 2,
                            difficulty: 0.5,
                            volume: 2,
                            effort: 1,
                            bugs: 0.0006666666666666666,
                            time: 0.05555555555555555
                        }
                    }
                }],
                dependencies: [],
                maintainability: 100,
                loc: 1,
                cyclomatic: 1,
                effort: 1,
                params: 0,
                module: '/Users/benh/projects/assets-analyser/test/fixtures/js-dummy.js'
            },
            jshint: {
                messages: []
            }
        }]).notify(done);
    });

});
