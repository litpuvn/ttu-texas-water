function MenuItemHandler(stakeHolderViewer) {
    this.stakeHolderViewer = stakeHolderViewer;
    this.discovery = new WaterDiscovery();
    this.waterForecasting = new WaterForecasting();
}

MenuItemHandler.prototype = {
    constructor: MenuItemHandler,

    onAdminBoardClick: function () {
        this.showStakeHolders();

        this.stakeHolderViewer.showAdminBoardGroup();
    },

    onAgChatClick: function () {
        this.showStakeHolders();

        this.stakeHolderViewer.showAgChatGroup();
    },

    onDiscoveryClick: function () {
        this.discovery.showTopics();
    },

    onCountyChangeSelect: function (selectedCounty) {
        // alert('Selected county: ' + selectedCounty);

        horizon.drawHorizon(selectedCounty);
        comparisonChart.generateChart(selectedCounty)
    },

    showStakeHolders: function () {
        document.getElementById("myDropdown").classList.toggle("show");
    },

    showWaterTopic: function (topic) {
        this.discovery.showTopic(topic);
    },

    showCategory: function (categoryId) {
        this.discovery.showCategory(categoryId);

    },

    showWaterForecasting: function () {
        this.waterForecasting.showCountyForecast('lubbock');
    }
};