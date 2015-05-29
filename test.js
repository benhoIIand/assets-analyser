var analyser = require('./index');

analyser({}, ['test/**/*'], function () {
    console.log('all done...');
});
