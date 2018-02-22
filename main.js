var statsViewer = new StatsViewer();
// var wordCloud = new WordCloud();
// var SERVER_PATH = 'http://localhost:8080';
var SERVER_PATH = 'https://litpuvn.github.io/ttu-texas-water';

// init news
var newsReader = new NewsReader();
newsReader.init();

var wellManager = new WellManager();
var gmap = new GoogleMap('map', wellManager);
var stakeHolderViewer = new StakeHolderViewer();

var menuItemHandler = new MenuItemHandler(stakeHolderViewer);
wellManager.init(function () {

    // statsViewer.showDailyWaterLevelForCounty("h", "statistics");

    // wordCloud.populateWordCloud();
});



