var statsViewer = new StatsViewer();
// var wordCloud = new WordCloud();
var SERVER_PATH = 'http://127.0.0.1:8080';
// var SERVER_PATH = 'https://litpuvn.github.io/ttu-texas-water';

// init news
var newsReader = new NewsReader();
newsReader.init();

var wellManager = new WellManager();
var gmap = new GoogleMap('map', wellManager);
var stakeHolderViewer = new StakeHolderViewer();

var menuItemHandler = new MenuItemHandler(stakeHolderViewer);

var comparison = new ComparisonChart(400, 300, {top: 20, left: 30, bottom: 10, right: 10});

wellManager.init(function () {

    // statsViewer.showDailyWaterLevelForCounty("h", "statistics");

    // wordCloud.populateWordCloud();


    // comparison.load('data/detail/0655504-daily.csv', 'data/counties/armstrong-daily.csv');
});



