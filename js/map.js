function GoogleMap(containerId, wellManager) {
    this.containerId = containerId;
    this.wellManager = wellManager;
    this.wellMarker = {};
}

GoogleMap.prototype = {
    constructor: GoogleMap,

    initMap: function () {

          this.map = new google.maps.Map(document.getElementById(this.containerId), {
            center: {lat: 31.865833, lng: -95.496388},
            zoom: 15
          });

          infoWindow = new google.maps.InfoWindow();
          this.populateWells();
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
                        infoWindow.setContent('<div id="test" style="height: 300px; width: 400px;">' +
                            'Hello world' +
                        '</div>');

                        infoWindow.open(self.map, wellMarker);
                    });

                });

            });
        }
    }
};

