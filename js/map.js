function GoogleMap(containerId, wellManager) {
    this.containerId = containerId;
    this.wellManager = wellManager;
    this.wellMarker = {};
    this.map = null;
    this.layerManager = new LayerManager();

    this._wellLoaded = false;
    this._initInvoked = false;


    var self =this;
    this.wellManager.addEventListener('wellLoaded', function () {
        self._wellLoaded = true;

        if (self._initInvoked) {
            self.populateData();
        }
    })
}

GoogleMap.prototype = {
    constructor: GoogleMap,

    initMap: function () {
        var self = this;
        this.map = new google.maps.Map(document.getElementById(this.containerId), {
            center: {lat: 31.865833, lng: -95.496388},
            zoom: 6
            });

        this._initInvoked = true;

        this.infoWindow = new google.maps.InfoWindow();

        if (this._wellLoaded) {
            this.populateData();
        }

        this.map.data.addListener('click', function(event) {

            var latLng = event.latLng;
            var content = "<div><img src='resources/img/vdvi.jpg' class='mgGreenIndex' /></div>";
            self._showInfoWindow(content, latLng);
        });
    },

    _showInfoWindow: function (content, pos) {
        var self = this;
        if (!!self.infoWindow) {
            self.infoWindow.close();
        }

        var infoWindow = new google.maps.InfoWindow({
            position:  {lat: pos.lat(), lng: pos.lng()}
        });

        infoWindow.setContent(content);
        infoWindow.open(self.map);

        self.infoWindow = infoWindow;

    },

    populateData: function () {
        var self =this;
        self.populateWells();
        self.layerManager.addState('TX', function (layerData) {
            self.populateLayer('TX', layerData);

        });
    },

    populateWells: function () {
        var self = this;
        var counties = self.wellManager.getCounties();

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
                        // console.log(data);
                        var content = '<div style="height: 300px; width: 400px; font-weight: bold">' +
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
                        '</div>';

                        self._showInfoWindow(content, wellMarker.getPosition());
                    });

                });

            });
        }
    },
    
    populateLayer: function (layerId, layerData) {

        if (layerId !== layerData.id) {
            throw new Error('Layer id and data mismatch');
        }

        if (!layerData) {
            layerData = this.layerManager.getLayer(layerId)
        }

        var self = this;

        var polygon = new google.maps.Data.Polygon([layerData.paths]);

        self.map.data.add({geometry: polygon});

    }
};



