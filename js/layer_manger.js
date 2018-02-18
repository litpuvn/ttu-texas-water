function LayerManager() {

    this.layers = {};

}


LayerManager.prototype = {
    constructor: LayerManager,

    addState: function (stateId, callback) {
        if (this.layers.hasOwnProperty(stateId)) {
            return true;
        }

        this.layers[stateId] =  {
            id: stateId,
            counties: [],
            paths: []
        };

        var self = this;

        $.get(SERVER_PATH + "/data/geo/" + stateId + ".kml", function(data) {
            var $xml = $(data);
            var $geometry = $xml.find('Document').find('Placemark').find('Polygon').find('outerBoundaryIs')
                .find('LinearRing').find('coordinates');

            var coords = $geometry.text().split(' ');
            coords.forEach(function (item) {

                var myGeo = item.split(",");
                // longitude, latitude, and altitude
                if (myGeo.length !== 3) {
                    throw new Error('Something went wrong with geometry');
                }

                self.layers[stateId].paths.push({lat: parseFloat(myGeo[1]), lng: parseFloat(myGeo[0])});
            });

            if (!!callback) {
                callback(self.layers[stateId]);
            }
        });
    },

    getLayer: function (layerId) {
        return this.layers[layerId];
    }

};