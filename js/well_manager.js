function WellManager() {
    this.counties = {};
}


WellManager.prototype = {
    constructor: WellManager,

    init: function () {

        var self = this;

       $.get("../data/wells.csv", function(data) {
           var csvObj = $.csv.toObjects(data);

           csvObj.forEach(function (row) {
               var county = row['county'];

               if (!self.counties.hasOwnProperty(county)) {
                   self.counties[county] = [];
               }

               var wellObject = {
                   id: row['state_well_number'],
                   water_level: row['state_well_number'],
                   latitude: Number(row['latitude']),
                   longitude: Number(row['longitude']),
                   aquifer: row['aquifer'],
                   active: 'Active' === row['active']
               };


                self.counties[county].push(wellObject)

           });

           console.log(self.counties);
       });

    },

    getWellsByCounty: function (countyName) {
        return this.counties[countyName];
    },

    getCounties: function () {
        return this.counties;
    },

    getWellTimeSeries: function (wellId, callback) {
         $.get("../data/detail/" + wellId + ".csv", function(data) {
           var csvObj = $.csv.toObjects(data);
           console.log(csvObj);

           callback(csvObj);
       });
    }
};
