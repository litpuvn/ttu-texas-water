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

    showWaterSource: function (categories) {
        vex.dialog.open(
            {
                message: 'Water Source',
                className: 'water-topic-window',
                overlayClassName: 'news-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: this._createWaterSourceContent(categories),
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

    _createWaterSourceContent: function (categories) {
        var categoryBlock = '';

        categories.forEach(function (cate) {
            categoryBlock += '<div><div>' + cate['title'] + '</div></div>';

        });

        var selectedContentBody = this._createContentBlockForCategory(categories[0]);

        var content = '' +
            '<div style="display: block; margin-top: 10px">' +
                '<div class="topic-category">' +
                    '<div class="topic-category-header"><span>Category</span></div>' +
                    '<div class="topic-category-content">' + categoryBlock +
                    '</div>' +
                '</div>' +
                '<div class="topic-items">' + selectedContentBody +
                '</div>' +
            '</div>';

        return content;
    },
    
    _createContentBlockForCategory: function (category) {
        var contentBlock =  '<div class="topic-category-heading" style="display: block; height: 15px; margin-bottom: 20px">' + category['title'] + '</div>';
        var items = category['items'];
        var itemBlock = '';
        items.forEach(function (item) {
            itemBlock += '' +
                 '<div class="topic-item">' +
                        '<div class="topic-item-block">' +
                            '<div class="item-title"><a href="' + item['link'] + '">' + item['title'] + '</a></div>' +
                            '<div class="item-body">' + item['body'] + '</div>' +
                            '<div class="item-more"><a href="' + item['link'] + '" target="_blank">more...</a></div>' +
                        '</div>' +
                        '<div class="item-avatar"><img  src="' + SERVER_PATH + '/resources/img/default-topic.png" /></div>' +
                    '</div>'
            ;
        });

        return contentBlock + itemBlock;

    }
};
