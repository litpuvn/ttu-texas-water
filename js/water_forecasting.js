function WaterForecasting() {
    // this.counties = ["cameron","dallam","baylor","lamb","brewster","la salle","hood","val verde","hansford","burnet","somervell","crosby","bee","tarrant","travis","washington","mason","jasper","donley","hutchinson","armstrong","erath","gray","atascosa","dawson","presidio","sutton","bastrop","karnes","kinney","reeves","reagan","gillespie","duval","terry","bell","bexar","pecos","kerr","rusk","zavala","haskell","williamson","tom green","deaf smith","walker","hale","mcculloch","martin","live oak","potter","roberts","comal","johnson","swisher","wilson","real","bandera","wheeler","victoria","hartley","kleberg","jeff davis","polk","schleicher","wharton","kendall","grayson","hill","brooks","coryell","crockett","smith","ellis","milam","anderson","jim hogg","glasscock","dallas","edwards","winkler","uvalde","san jacinto","el paso","bailey","hays","carson","gonzales","culberson","hidalgo","frio","hudspeth","mclennan","montgomery","ward","harris"];
    this.counties = [
        "lamb", "swisher", "crosby", "deaf smith", "hemphill",
        "martin", "gaines", "hockley", "lubbock", "briscoe",
        "wheeler", "moore", "midland", "potter", "castro", "gray",
        "hutchinson", "lipscomb", "randall", "garza", "sherman",
        "yoakum", "terry", "andrews", "lynn", "hartley", "dickens",
        "parmer", "dawson", "bailey", "runnels", "dallam", "glasscock",
        "borden", "hansford", "donley", "ochiltree", "oldham", "ector",
        "roberts", "armstrong", "hale", "carson", "cochran", "howard", "floyd",
    ];
    this.counties = this.counties.sort();
}


WaterForecasting.prototype = {
    constructor: WaterForecasting,

    showCountyForecast: function (county) {

         var self = this;

        vex.dialog.open(
            {
                message: 'Water Level Forecasting',
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

                    statsViewer.showDailyWaterLevelForCounty('hartley', 'my_county');
                }
            }
        );
    },

    _create_water_forecast: function () {
        let countyOptions = '';
        let self = this;
        let c, capC;

        for(let i=0; i<self.counties.length; i++) {
            c = self.counties[i];
            capC = c.charAt(0).toUpperCase() + c.slice(1);

            if (c == 'hartley') {
                countyOptions += '<option value="' + c + '" selected>' + capC + '</option>\n';

            }else{
                countyOptions += '<option value="' + c + '">' + capC + '</option>\n';
            }
        }

        return '' +
            '<div class="water-forecasting-header">' +
                '<div>Select a county</div>' +
                '<select class="select-counties" onchange="statsViewer.showDailyWaterLevelForCounty(this.value, \'my_county\');">' + countyOptions + '</select>' +
                // '<div class="select-lead-time">' +
                //     '<div>Select lead time</div>' +
                //     '<select>' +
                //     '   <option value="7">7 days</option>' +
                //     '</select>' +
                // '</div>' +   // '<div class="select-lead-time">' +
                //     '<div>Select lead time</div>' +
                //     '<select>' +
                //     '   <option value="7">7 days</option>' +
                //     '</select>' +
                // '</div>' +

            '</div>' +
            '<div id="my_county"></div>';

    }
};