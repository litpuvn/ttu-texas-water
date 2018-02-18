function GoogleMap(containerId, wellManager) {
    this.containerId = containerId;
    this.wellManager = wellManager;
    this.wellMarker = {};
    this.map = null;
    this.layerManager = new LayerManager();
}

GoogleMap.prototype = {
    constructor: GoogleMap,

    initMap: function () {

        var self =this;

          this.map = new google.maps.Map(document.getElementById(this.containerId), {
            center: {lat: 31.865833, lng: -95.496388},
            zoom: 8
          });

          this.infoWindow = new google.maps.InfoWindow();

          while (!self.wellManager.isWellsLoaded()) {
              console.log("waiting for wells being loaded")
          }


        self.populateWells();
        self.layerManager.addState('TX');
        self.populateLayers();
    },

    populateWells: function () {
        var self = this;
        var counties = self.wellManager.getCounties();
        var infoWindow = new google.maps.InfoWindow();

        for(var county in counties) {
            if (!counties.hasOwnProperty(county)) {
                continue;
            }

            var wells = self.wellManager.getWellsByCounty(county);
            wells.forEach(function (well) {

                var wellMarker =  new google.maps.Marker({
                    position: {
                                lat: well.latitude,
                                lng: well.longitude
                    },
                    map: self.map,
                    title: well.id,
                    id: well.id//,
                    //icon: 'ICON URL HERE'
                });

                self.wellMarker[well.id] = wellMarker;

                wellMarker.addListener('click', function() {
                    self.wellManager.getWellTimeSeries(well.id, function (data) {
                        console.log(data);
                        self.infoWindow.setContent('<div style="height: 300px; width: 400px; font-weight: bold">' +
                            '<table>' +
                            '<tr>' +
                            '   <td>Well</td>' +
                            '   <td>:</td>' +
                            '   <td>' + well.id + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '   <td>Walter level</td>' +
                            '   <td>:</td>' +
                            '   <td>' + well.water_level + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '   <td>Longitude</td>' +
                            '   <td>:</td>' +
                            '   <td>' + well.longitude + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '   <td>Latitude</td>' +
                            '   <td>:</td>' +
                            '   <td>' + well.latitude + '</td>' +
                            '</tr>' +                            '' +
                            '<tr>' +
                            '   <td>Aquifer</td>' +
                            '   <td>:</td>' +
                            '   <td>' + well.aquifer + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '   <td>County</td>' +
                            '   <td>:</td>' +
                            '   <td>' + well.county + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '   <td>Active</td>' +
                            '   <td>:</td>' +
                            '   <td>' + (well.active == true ? 'Yes' : 'No') + '</td>' +
                            '</tr>' +
                            '</table>' +
                        '</div>');

                        self.infoWindow.open(self.map, wellMarker);
                    });

                });

            });
        }
    },
    
    populateLayers: function () {
        var self = this;
        var layers = this.layerManager.getLayers();
        for(var key in layers) {
            if (!layers.hasOwnProperty(key)) {
                continue;
            }

            var kmlFile = layers[key];

            var ctaLayer = new google.maps.KmlLayer({
                url: SERVER_PATH + 'data/geo/' + kmlFile,
                map: self.map
            });

            // ctaLayer.setMap(self.map);
        }

    }
};

