function NewsReader() {

    this.newsItems = []

}

NewsReader.prototype = {
    constructor: NewsReader,

    init: function () {
        var self = this;

        $.get(SERVER_PATH + "/data/news.xml", function(data) {
           var $xml = $(data),
           $items = $xml.first("channel").find("item");
           $items.each(function (index, item) {
                  // console.log(item);
                  var $item = $(item);
                  var newsItemObject = {
                      title: $item.find('title').text(),
                      description: $item.find('description').text(),
                      updated: $item.find('a10\\:updated').text()
                  };

                  self.newsItems.push(newsItemObject);
           });

        });
    },

    getNewsItems: function () {
        return this.newsItems;
    }

};