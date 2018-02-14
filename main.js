var statsViewre = new StatsViewer();
var wordCloud = new WordCloud();

var wellManager = new WellManager();
wellManager.init(function () {
    statsViewre.showDailyWaterLevelForCounty("h", "countyStats");

    wordCloud.populateWordCloud("wordcloud");
});


var gmap = new GoogleMap('map', wellManager);

