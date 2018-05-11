function WellManager() {
    this.counties = {};
    this.wellsLoaded = false;
    //http://www.texascounties.net/statistics/regions.htm
    this.westTexas = [

        // 'Brewster', 'Culberson', 'El Paso', 'Hudspeth', 'Jeff Davis', 'Presidio',
        //
        // 'Andrews', 'Borden', 'Crane', 'Dawson', 'Ector', 'Gaines', 'Glasscock', 'Howard', 'Loving', 'Martin', 'Midland',
        // 'Pecos', 'Reeves', 'Terrell', 'Upton', 'Ward', 'Winkler',
        //
        //  'Coke', 'Concho', 'Crockett', 'Irion', 'Kimble', 'Mason', 'McCulloch', 'Menard', 'Reagan', 'Schleicher',
        // 'Sterling', 'Sutton', 'Tom Green',
        //
        // 'Bailey', 'Cochran', 'Crosby', 'Dickens', 'Floyd', 'Garza', 'Hale', 'Hockley', 'King', 'Lamb', 'Lubbock', 'Lynn',
        // 'Motley', 'Terry', 'Yoakum',
        //
        // 'Brown', 'Callahan', 'Coleman', 'Comanche', 'Eastland', 'Fisher', 'Haskell', 'Jones', 'Kent', 'Knox', 'Mitchell',
        // 'Nolan', 'Runnels', 'Scurry', 'Shackelford', 'Stephens', 'Stonewall', 'Taylor', 'Throckmorton'
    ];

    this.well_timeseries = {};

    this.interpolator = new Interpolator();

}


WellManager.prototype = {
    constructor: WellManager,

    init: function (callback) {

        var self = this;

       $.get(SERVER_PATH + "/data/reduced_well_data.csv", function(data) {
           var csvObj = $.csv.toObjects(data);

           csvObj.forEach(function (row) {
               var county = row['county'];
               var aquier = row['aquifer'];

               // if (aquier != 'Ogallala') {
               //     return;
               // }

               // if (self.westTexas.indexOf(county) < 0) {
               //     return; // ignore non-west texas region
               // }

               if (!self.counties.hasOwnProperty(county)) {
                   self.counties[county] = [];
               }

               var wellId = row['id'];
               if (wellId.length < 7) {
                   wellId = '0' + wellId;
               }

               var wellObject = {
                   id: wellId,
                   water_level: row['water_level'],
                   latitude: Number(row['latitude']),
                   longitude: Number(row['longitude']),
                   aquifer: row['aquifer'],
                   county: row['county'],
                   active: 'Active' === row['active']
               };



                if (!self.well_timeseries.hasOwnProperty(wellId)) {
                    self.well_timeseries[wellId] = [];
                    self.counties[county].push(wellObject);
                }

                let series = self.well_timeseries[wellId];
                series.push({
                    datetime: row['year'] + '-' + row['month'] + '-' + row['day'],
                    water_level: wellObject.water_level
                });

           });

           self.wellsLoaded = true;
           self.dispatchEvent( { type: 'wellLoaded', message: '' } );

           // compute monthly average and partial interpolation
           // partial interpolation means: only interpolate if we can do (having pre-value, post-value and interpolate middle value)
           self.interpolator.interpolate_wells(self.counties, self.well_timeseries);


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
    },

    getLoadedWellTimeSeries: function (wellId) {
        return this.well_timeseries[wellId];
    },

    isWellsLoaded: function () {
        return this.wellsLoaded;
    }
};

Object.assign( WellManager.prototype, EventDispatcher.prototype );
