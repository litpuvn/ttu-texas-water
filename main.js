var statsViewer = new StatsViewer();
var wordCloud = new WordCloud();
// var SERVER_PATH = 'http://localhost:8080';
var SERVER_PATH = 'https://litpuvn.github.io/ttu-texas-water';

// init news
var newsReader = new NewsReader();
newsReader.init();

var wellManager = new WellManager();
var gmap = new GoogleMap('map', wellManager);

wellManager.init(function () {

    // statsViewer.showDailyWaterLevelForCounty("h", "statistics");

    // wordCloud.populateWordCloud();
});



function handle_stakeholder_click() {
    document.getElementById("myDropdown").classList.toggle("show");
}