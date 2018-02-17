var statsViewre = new StatsViewer();
var wordCloud = new WordCloud();
// var SERVER_PATH = 'http://localhost:8080';
var SERVER_PATH = 'https://litpuvn.github.io/ttu-texas-water';

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