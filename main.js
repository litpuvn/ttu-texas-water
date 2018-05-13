var statsViewer = new StatsViewer();
// var wordCloud = new WordCloud();
var SERVER_PATH = window.location.href.substring(0, window.location.href.length-1);
// var SERVER_PATH = 'https://litpuvn.github.io/ttu-texas-water';

// init news
var newsReader = new NewsReader();
newsReader.init();

var wellManager = new WellManager();
var gmap = new GoogleMap('map', wellManager);
var stakeHolderViewer = new StakeHolderViewer();

var menuItemHandler = new MenuItemHandler(stakeHolderViewer);
var horizon = new Horizon(wellManager);

var comparisonChart = new ComparisonChart(wellManager);

wellManager.init(function () {
    comparisonChart.init('#statistics');

    // statsViewer.showDailyWaterLevelForCounty("h", "statistics");

    // wordCloud.populateWordCloud();
    horizon.drawHorizon('roberts');
    comparisonChart.generateChart('roberts')
});



