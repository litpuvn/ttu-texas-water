function WellManager() {
    this.counties = {};
}


WellManager.prototype = {
    constructor: WellManager,

    init: function (callback) {

        var self = this;

       $.get(SERVER_PATH + "/data/wells.csv", function(data) {
           var csvObj = $.csv.toObjects(data);

           csvObj.forEach(function (row) {
               var county = row['county'];

               if (!self.counties.hasOwnProperty(county)) {
                   self.counties[county] = [];
               }

               var wellObject = {
                   id: row['state_well_number'],
                   water_level: row['daily_high_water_level'],
                   latitude: Number(row['latitude']),
                   longitude: Number(row['longitude']),
                   aquifer: row['aquifer'],
                   county: row['county'],
                   active: 'Active' === row['active']
               };


                self.counties[county].push(wellObject)

           });

           if (!!callback) {
               callback();
           }

       });

    },

    getWellsByCounty: function (countyName) {
        return this.counties[countyName];
    },

    getCounties: function () {
        return this.counties;
    },

    getWellTimeSeries: function (wellId, callback) {
         $.get(SERVER_PATH + "/data/detail/" + wellId + "-daily.csv", function(data) {
           var csvObj = $.csv.toObjects(data);
           // console.log(csvObj);

           callback(csvObj);
       });
    }
};
