'use strict';

var fs = require('fs');
var path = require('path');
var grunt = require('grunt');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

var javascriptAnalyser = require('../../src/lib/javascriptAnalyser')({
    tmp: 'tmp-javascript'
});

describe('javascriptAnalyser', function() {

    beforeEach(function() {
        grunt.file.mkdir('tmp-javascript');
    });

    afterEach(function() {
        grunt.file.delete('tmp-javascript');
    });

    it('should return the analysis of a given javascript file', function(done) {
        expect(javascriptAnalyser(path.resolve(__dirname, '../fixtures/js-dummy.js'))).to.eventually.become([{
            "date": undefined,
            "info": {
                "file": "/Users/benh/projects/assets-analyser/test/fixtures/js-dummy.js",
                "fileShort": "/Users/benh/projects/assets-analyser/test/fixtures/js-dummy.js",
                "fileSafe": "_Users_benh_projects_assets_analyser_test_fixtures_js_dummy_js",
                "link": "files/_Users_benh_projects_assets_analyser_test_fixtures_js_dummy_js/index.html"
            },
            "complexity": {
                "aggregate": {
                    "sloc": {
                        "logical": 2,
                        "physical": 3
                    },
                    "cyclomatic": 1,
                    "halstead": {
                        "operators": {
                            "distinct": 2,
                            "total": 2,
                            "identifiers": ["function", "return"]
                        },
                        "operands": {
                            "distinct": 2,
                            "total": 2,
                            "identifiers": ["hello", "\"hello\""]
                        },
                        "length": 4,
                        "vocabulary": 4,
                        "difficulty": 1,
                        "volume": 8,
                        "effort": 8,
                        "bugs": 0.0026666666666666666,
                        "time": 0.4444444444444444
                    },
                    "name": undefined,
                    "params": 0,
                    "line": 1,
                    "cyclomaticDensity": 50,
                    "complexity": {
                        "cyclomatic": 1,
                        "sloc": {
                            "logical": 2,
                            "physical": 3
                        },
                        "halstead": {
                            "operators": {
                                "distinct": 2,
                                "total": 2,
                                "identifiers": ["function", "return"]
                            },
                            "operands": {
                                "distinct": 2,
                                "total": 2,
                                "identifiers": ["hello", "\"hello\""]
                            },
                            "length": 4,
                            "vocabulary": 4,
                            "difficulty": 1,
                            "volume": 8,
                            "effort": 8,
                            "bugs": 0.0026666666666666666,
                            "time": 0.4444444444444444
                        }
                    }
                },
                "functions": [{
                    "name": "hello",
                    "sloc": {
                        "logical": 1,
                        "physical": 3
                    },
                    "cyclomatic": 1,
                    "halstead": {
                        "operators": {
                            "distinct": 1,
                            "total": 1,
                            "identifiers": ["return"]
                        },
                        "operands": {
                            "distinct": 1,
                            "total": 1,
                            "identifiers": ["\"hello\""]
                        },
                        "length": 2,
                        "vocabulary": 2,
                        "difficulty": 0.5,
                        "volume": 2,
                        "effort": 1,
                        "bugs": 0.0006666666666666666,
                        "time": 0.05555555555555555
                    },
                    "params": 0,
                    "line": 1,
                    "cyclomaticDensity": 100,
                    "complexity": {
                        "cyclomatic": 1,
                        "sloc": {
                            "logical": 1,
                            "physical": 3
                        },
                        "halstead": {
                            "operators": {
                                "distinct": 1,
                                "total": 1,
                                "identifiers": ["return"]
                            },
                            "operands": {
                                "distinct": 1,
                                "total": 1,
                                "identifiers": ["\"hello\""]
                            },
                            "length": 2,
                            "vocabulary": 2,
                            "difficulty": 0.5,
                            "volume": 2,
                            "effort": 1,
                            "bugs": 0.0006666666666666666,
                            "time": 0.05555555555555555
                        }
                    }
                }],
                "dependencies": [],
                "maintainability": 100,
                "loc": 1,
                "cyclomatic": 1,
                "effort": 1,
                "params": 0,
                "module": "/Users/benh/projects/assets-analyser/test/fixtures/js-dummy.js"
            },
            "jshint": {
                "messages": [{
                    "severity": "error",
                    "line": 2,
                    "column": 5,
                    "message": "Missing \"use strict\" statement.",
                    "source": "Missing \"use strict\" statement."
                }, {
                    "severity": "error",
                    "line": 1,
                    "column": 10,
                    "message": "'hello' is defined but never used.",
                    "source": "'{a}' is defined but never used."
                }]
            }
        }]).notify(done);
    });

});
