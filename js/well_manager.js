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
                   latitude: row['latitude'],
                   longitude: row['longitude'],
                   aquifer: row['aquifer'],
                   active: 'Active' === row['active']
               };


                self.counties[county].push(wellObject)

           });
       })

    },

    getWellsByCounty: function (countyName) {
        return self.counties[countyName];
    }
};
