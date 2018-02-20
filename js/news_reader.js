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
                      updated: $item.find('a10\\:updated').text(),
                      link: $item.find('link').text(),
                  };

                  self.newsItems.push(newsItemObject);
           });

        });
    },

    getNewsItems: function () {
        return this.newsItems;
    },

    generateNewsHtml: function () {
        var news = '';
        var simpleNews;
        var newsObject = this.getNewsItems();

        newsObject.forEach(function (newsObj) {
            simpleNews = '<div class="news-item">' + ['<b>' + newsObj.title + '</b><br/>',
            '<i>' + newsObj.description + '</i>',
            '<a href="' + newsObj.link + '" target="_blank">&nbsp;more</a>',
            '<div class="news-date">' + newsObj.updated + '</div>',

                ].join('') +
            '</div>';

            news += simpleNews;

        });

        return news;
    },
    
    showNews: function () {
        vex.dialog.open(
            {
                message: 'News',
                className: 'news-window',
                overlayClassName: 'news-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: this.generateNewsHtml(),
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
    }

};