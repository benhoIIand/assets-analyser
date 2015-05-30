(function() {
    Q.all([gzip(filename), analyser(filename)])
        .spread(function(gzipData, analysis) {
            var data = _.assign(gzipData, analysis, {
                type: extension
            });

            console.log('--------------------------------');
            console.log('Uncompressed size: ' + String(data.uncompressedPretty).cyan);
            console.log('Compressed ' + String(data.compressedPretty).cyan);

            console.log(data);
        });

})();
