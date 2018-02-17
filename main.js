var statsViewre = new StatsViewer();
var wordCloud = new WordCloud();

// init news
var newsReader = new NewsReader();
newsReader.init();

var wellManager = new WellManager();
wellManager.init(function () {
    statsViewre.showDailyWaterLevelForCounty("h", "countyStats");

    wordCloud.populateWordCloud();
});


var gmap = new GoogleMap('map', wellManager);

function handle_stakeholder_click() {
    document.getElementById("myDropdown").classList.toggle("show");
}