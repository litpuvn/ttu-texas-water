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
            zoom: 8
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
                        console.log(data);
                        infoWindow.setContent('<div style="height: 300px; width: 400px; font-weight: bold">' +
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

                        infoWindow.open(self.map, wellMarker);
                    });

                });

            });
        }
    }
};

