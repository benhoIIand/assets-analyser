(function() {

    window.fetch('output.json').then(function(response) {
        return response.json().then(drawThings);
    });

    function drawThings(files) {

        files.map(function (obj) {
            obj.name = obj.filename.split('/').pop();
            obj.size = (obj.uncompressed / 1024).toFixed(1);
            obj.unit = 'kb';
            obj.id = 'chart-' + obj.name.replace(/\./g, '-');
            obj.history = [obj.uncompressed, obj.uncompressed * 1.2, obj.uncompressed * 1.8];
            return obj;
        });

        function ViewModel() {
            this.files = files;
        }

        ko.applyBindings(new ViewModel());

        files.forEach(function(file) {
            var el = document.getElementById(file.id);

            var data = file.history.map(function (size, i) {
                return {
                    x: i,
                    y: size
                };
            });

            var graph = new Rickshaw.Graph({
                element: el,
                series: [{
                    color: 'white',
                    data: data
                }]
            });

            var resize = function() {
                graph.configure({
                    width: el.clientWidth,
                    height: el.clientHeight
                });
                graph.render();
            };

            window.addEventListener('resize', resize);
            resize();
        });
    }

})();
