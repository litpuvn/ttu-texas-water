function WaterForecasting() {
}


WaterForecasting.prototype = {
    constructor: WaterForecasting,

    showCountyForecast: function (county) {

         var self = this;

        vex.dialog.open(
            {
                message: 'Water Discovery',
                className: 'discovery-window',
                overlayClassName: 'news-overlay',
                showCloseButton: false,
                escapeButtonCloses: true,
                overlayClosesOnClick: true,
                input: '<b>hello word</b>',
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
};