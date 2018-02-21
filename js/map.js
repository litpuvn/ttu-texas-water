function GoogleMap(containerId, wellManager) {
    this.containerId = containerId;
    this.wellManager = wellManager;
    this.wellMarker = {};
    this.map = null;
    this.layerManager = new LayerManager();

    this._wellLoaded = false;
    this._initInvoked = false;

    this._viewOption = 'water-level';
    this.currentHeatMapLayer = null;

    GoogleMap.VIEW_WATER_LEVEL_INDEX = 'water-level'; // default view option
    GoogleMap.VIEW_DROUGHT_INDEX = 'drought-index';

    this._viewOption = GoogleMap.VIEW_WATER_LEVEL_INDEX;

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
            var content = "<div><img src='" + SERVER_PATH + "/resources/img/vdvi.jpg' class='mgGreenIndex' /></div>";
            self._showInfoWindow(content, latLng);
        });
    },

    _showInfoWindow: function (content, pos, callback) {
        var self = this;
        if (!!self.infoWindow) {
            self.infoWindow.close();

            delete self.infoWindow;
            // self.infoWindow.removeEve
        }

        var infoWindow = new google.maps.InfoWindow({
            position:  {lat: pos.lat(), lng: pos.lng()}
        });

        if (!!callback) {
            infoWindow.addListener('domready', callback);
        }


        infoWindow.setContent(content);
        infoWindow.open(self.map);

        self.infoWindow = infoWindow;

    },

    activateWaterLevelHeatMap: function () {
        var layer = new google.maps.FusionTablesLayer({
                // map: self.map,
                heatmap: { enabled: false },
                query: {
                    select: "col4",
                    from: "1a8905VZBsis0r6Ysd0UQytpWaartCwLectsj63jf",
                    where: ""
                },
                options: {
                styleId: 2,
                templateId: 2
                }
        });

        if (!!this.currentHeatMapLayer) {
            this.currentHeatMapLayer.setMap(null);
        }

        this.currentHeatMapLayer = layer;
        this.currentHeatMapLayer.setMap(this.map);


    },

    activateDroughtIndexlHeatMap: function () {
        var layer = new google.maps.FusionTablesLayer({
                heatmap: { enabled: false },
                query: {
                    select: "col4",
                    from: "1e4mmi41K2K9Iiy7tXHP31TeHnTOgLTqCkqWlpSWc",
                    where: ""
                },
                options: {
                styleId: 2,
                templateId: 2
                }
        });


        if (!!this.currentHeatMapLayer) {
            this.currentHeatMapLayer.setMap(null);
        }

        this.currentHeatMapLayer = layer;
        this.currentHeatMapLayer.setMap(this.map);
    },


    populateData: function () {
        var self = this;
        self.populateWells();
        switch (self._viewOption) {
            case GoogleMap.VIEW_WATER_LEVEL_INDEX:
                self.activateWaterLevelHeatMap();
                break;
            case GoogleMap.VIEW_DROUGHT_INDEX:
                self.activateDroughtIndexlHeatMap();
                break;
        }

        // self.layerManager.addState('TX', function (layerData) {
        //     self.populateLayer('TX', layerData);
        //
        // });
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
                    title: 'Well ' + well.id,
                    id: well.id//,
                    //icon: 'ICON URL HERE'
                });

                self.wellMarker[well.id] = wellMarker;

                wellMarker.addListener('click', function() {
                    self.wellManager.getWellTimeSeries(well.id, function (data) {
                        var content = self._generateIndividualWellInfocontent(well);

                        self._showInfoWindow(content, wellMarker.getPosition(), function (e) {
                            statsViewer.showDailyWaterLevelForWell(well.id);
                        });
                    });

                });

            });
        }
    },

    _generateIndividualWellInfocontent: function (well) {
        var content = '' +
            '<div style="height: 430px; width: 500px; font-weight: bold">' +
                    '<table style="width: 400px;">' +
                    '<tr>' +
                    '<td class="well-popup-content">' +
                    '<table style="width: 100%">' +
                    '<tr>' +
                    '   <td>Well</td>' +
                    '   <td>:&nbsp;</td>' +
                    '   <td>' + well.id + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '   <td>Walter level</td>' +
                    '   <td>:&nbsp;</td>' +
                    '   <td>' + well.water_level + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '   <td>Longitude</td>' +
                    '   <td>:&nbsp;</td>' +
                    '   <td>' + well.longitude + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '   <td>Latitude</td>' +
                    '   <td>:&nbsp;</td>' +
                    '   <td>' + well.latitude + '</td>' +
                    '</tr>' +                            '' +

                    '</table>' +
                    '</td>' +
                    '<td class="well-popup-content">' +
                    '<table style="width: 100%">' +
                    '<tr>' +
                    '   <td>Aquifer</td>' +
                    '   <td>:&nbsp;</td>' +
                    '   <td>' + well.aquifer + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '   <td>County</td>' +
                    '   <td>:&nbsp;</td>' +
                    '   <td>' + well.county + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '   <td>Active</td>' +
                    '   <td>:</td>' +
                    '   <td>' + (well.active == true ? 'Yes' : 'No') + '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +

                    '</table>' +
                    '<div id="' + well.id + '"></div>' +
                    '<div class="user-feedback">' +
                        '<table>' +
                        '<tr><td>' +
                        '<textarea class="feedback-content" placeholder="Please write your feedback"></textarea><br/>' +
                        '<input type="button" name="share" value="Share Now" />' +
                        '</td>' +
                        '<td style="vertical-align: top">' +
                            '<div style="padding-left: 5px">' +
                                'Category<br/>' +
                                '<input type="radio" name="category"/><label>Issue</label><br/>' +
                                '<input type="radio" name="category"/><label>Solution</label><br/>' +
                                '<input type="radio" name="category"/><label>General</label>' +
                            '</div>' +
                        '</td>' +
                        '</tr>' +
                        '</table>' +
                    '</div>' +
                '</div>';

        return content;
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



