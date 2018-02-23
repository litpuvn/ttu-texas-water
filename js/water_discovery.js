function WaterDiscovery() {
    this.waterTopic = new WaterTopic();
}

WaterDiscovery.prototype = {
    constructor: WaterDiscovery,

    showTopics: function() {
        var self = this;

        vex.dialog.open(
            {
                message: 'Water Discovery',
                className: 'discovery-window',
                overlayClassName: 'news-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: self._createWaterDiscoveryTopics(),
                buttons: [],
                callback: function(data) {
                    if (!data) {
                        return console.log('No data for news');
                    }
                },

                afterOpen: function (element) {
                    console.log(element);
                }
            }
        );
    },

    showTopic: function (topic) {
        this.waterTopic.init(topic);
    },

    showCategory: function (categoryId) {
        this.waterTopic.showCategory(categoryId);
    },

    _createWaterDiscoveryTopics: function () {
        var content = '' +
            '<table class="discovery-content">' +
            '<tr class="discovery-content-row">' +
            '<td onclick="menuItemHandler.showWaterTopic(\'water_source\')"><img class="discovery-topic" src="' + SERVER_PATH + '/resources/img/water-source.png" /><br/><span class="discovery-topic-link">1. Water Sources</span></td>' +
            '<td><img class="discovery-topic" src="' + SERVER_PATH + '/resources/img/water-processing.png"  /><br/><span class="discovery-topic-link">2. Water Processing</span></td>' +
            '</tr>' +
            '<tr class="discovery-content-row">' +
            '<td><img class="discovery-topic" src="' + SERVER_PATH + '/resources/img/water-usage.jpeg" /><br/><span class="discovery-topic-link">3. Water Usage</span></td>' +
            '<td><img class="discovery-topic" src="' + SERVER_PATH + '/resources/img/water-treatment.jpg" /><br/><span class="discovery-topic-link">4. Water Treatment</span></td>' +
            '</tr>' +
            '</table>'
        ;

        return content;
    }

};