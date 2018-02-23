function WaterTopic() {
    
}

WaterTopic.prototype = {
    constructor: WaterTopic,
    
    init: function (topic, callback) {
        var self = this;
        $.get(SERVER_PATH + "/data/" + topic + ".xml", function(data) {
            console.log(data);
           // var $xml = $(data),
           // $items = $xml.first("channel").find("item");
           // $items.each(function (index, item) {
           //        // console.log(item);
           //        var $item = $(item);
           //        var newsItemObject = {
           //            title: $item.find('title').text(),
           //            description: $item.find('description').text(),
           //            updated: $item.find('a10\\:updated').text(),
           //            link: $item.find('link').text(),
           //        };
           //
           //        self.newsItems.push(newsItemObject);
           // });

            self.showWaterSource(data);


        });
    },

    showWaterSource: function (data) {
        vex.dialog.open(
            {
                message: 'Water Source',
                className: 'water-topic-window',
                overlayClassName: 'news-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: this._createWaterSourceContent(),
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

    _createWaterSourceContent: function (data) {
        return 'Hello world'
    }
};
