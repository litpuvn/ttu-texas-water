var statsViewre = new StatsViewer();

var wellManager = new WellManager();
wellManager.init(function () {
    statsViewre.showDailyWaterLevelForCounty("h", "countyStats");
});


var gmap = new GoogleMap('map', wellManager);

