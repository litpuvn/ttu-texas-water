function WaterTopic() {
    
}

WaterTopic.prototype = {
    constructor: WaterTopic,
    
    init: function (topic, callback) {
        var self = this;
        $.get(SERVER_PATH + "/data/" + topic + ".xml", function(data) {
            console.log(data);
            var $xml = $(data),
            $categories = $xml.first("source").find("category");

            var topicCategories = [];
            $categories.each(function (index, category) {
                  // console.log(item);
                  var $category = $(category);

                  var title = $category.find('topic').text();

                  var categoryObject = {
                      title: title
                  };

                  var $items = $category.first('items').find('item');
                  var myItems = [];
                  var itemObject;
                  $items.each(function (itemIndex, item) {
                      var $item = $(item);

                      itemObject = {
                          title: $item.find('title').text(),
                          body: $item.find('description').text(),
                          link: $item.find('link').text(),
                        updated: $item.find('updated').text()
                      };
                      myItems.push(itemObject);

                  });

                  categoryObject.items = myItems;

                  topicCategories.push(categoryObject);
            });

            self.showWaterSource(topicCategories);
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
        var content = '' +
            '<div style="display: block; margin-top: 10px">' +
                '<div class="topic-category">' +
                    '<div class="topic-category-header"><span>Category</span></div>' +
                    '<div class="topic-category-content">' +
                        '<div><div>Category 1 hello worl for the category</div></div>' +
                        '<div><div>Category 2 that i dont know if it would be good</div></div>' +
                    '</div>' +
                '</div>' +
                '<div class="topic-items">' +
                    '<div style="display: block; height: 15px; margin-bottom: 20px">hello world</div>' +
                    '<div class="topic-item">' +
                        '<div class="topic-item-block">' +
                            '<div class="item-title">Title item 1</div>' +
                            '<div class="item-body">item body</div>' +
                            '<div class="item-more">more...</div>' +
                        '</div>' +
                        '<div class="item-avatar"><img width="45" height="45" src="' + SERVER_PATH + '/resources/img/default-topic.png" /></div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        return content;
    }
};
