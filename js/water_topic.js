function WaterTopic() {
    
}

WaterTopic.prototype = {
    constructor: WaterTopic,
    
    init: function (topic, callback) {
        var self = this;

        this.current_topic = topic;
        this.current_category_id = 1;

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
                      title: title,
                      id: $category.attr('id')
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

            self.currentTopicCategories = topicCategories;
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

    showCategory: function (categoryId) {

        var currentCategory = this._getCategoryData(categoryId);
        var content = this._createContentBlockForCategory(currentCategory);

        $('#topic-items').html(content);

        // alert("showing category" + categoryId);
    },

    _getCategoryData: function (categoryId) {
        var cate;
        for(var i=0; i < this.currentTopicCategories.length; i++) {
            cate = this.currentTopicCategories[i];
            if (cate['id'] == categoryId) {
                return cate;
            }

        }

        throw new Error('not found category id=' + categoryId);

    },

    _createWaterSourceContent: function (categories) {
        var categoryBlock = '';

        categories.forEach(function (cate) {
            categoryBlock += '<div onclick="menuItemHandler.showCategory(' + cate['id'] + ')"><div>' + cate['title'] + '</div></div>';

        });

        var selectedCategory = categories[0]
        var selectedContentBody = this._createContentBlockForCategory(selectedCategory);

        var content = '' +
            '<div style="display: block; margin-top: 10px">' +
                '<div class="topic-category">' +
                    '<div class="topic-category-header"><span>Category</span></div>' +
                    '<div class="topic-category-content">' + categoryBlock +
                    '</div>' +
                '</div>' +
                '<div id="topic-items" class="topic-items">' + selectedContentBody +
                '</div>' +
            '</div>';

        return content;
    },
    
    _createContentBlockForCategory: function (category) {
        var contentBlock =  '<div class="topic-category-heading" style="display: block; height: 15px; margin-bottom: 20px">' + category['title'] + '</div>';
        var items = category['items'];
        var itemBlock = '';
        var self = this;
        items.forEach(function (item) {

            var itemRate = 3 + Math.round(2*Math.random());
            var itemRating = self._createRatingView(itemRate);

            itemBlock += '' +
                 '<div class="topic-item">' +
                        '<div class="topic-item-block">' +
                            '<div class="item-title"><a href="' + item['link'] + '">' + item['title'] + '</a></div>' +
                            '<div class="item-body">' + item['body'] + '</div>' +
                            '<div class="item-more"><a href="' + item['link'] + '" target="_blank">more...</a></div>' +
                        '</div>' +
                        '<div class="item-avatar"><img  src="' + SERVER_PATH + '/resources/img/default-topic.png" /></div>' +
                        '<div class="item-rating">' + itemRating + '</div>' +
                    '</div>'
            ;
        });

        return contentBlock + itemBlock;

    },

    _createRatingView: function (currentRate) {
        var ratingContent = '';
        var items = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];

        items.forEach(function (rate) {
            var checked = rate === currentRate ? 'checked' : '';
            var forItem = rate === Math.round(rate) ? ('star' + rate) : ('star' + Math.floor(rate) + 'half');
            // var idItem = rate === Math.round(rate) ? ('star' + rate) : ('star' + Math.floor(rate) + 'half');
            var cssClass = rate === Math.round(rate) ? 'full' : 'half';

            ratingContent += '<input type="radio" name="rating" value="' + rate + '" ' + checked + '/>' +
                '<label class = "' + cssClass + '" for="' + forItem + '" title=""></label>\n'

        });

        var content = '' +
            '<fieldset class="rating">' +
                    ratingContent +
            '</fieldset>' +
            '<span style="float: left">(' + Math.round(5*Math.random()) + ')</span>'
        ;

        return content;

    }
};
