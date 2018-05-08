function WaterForecasting() {
    this.counties = ['Winkler', 'Victoria'];
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
                input: self._create_water_forecast(),
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

    _create_water_forecast: function () {
        let countyOptions = '';
        let self = this;
        let c;

        for(let i=0; i<self.counties.length; i++) {
            c = self.counties[i];
            countyOptions += '<option value="' + c + '">' + c + '</option>\n';
        }

        return '<select>' + countyOptions + '</select>';
    }
};