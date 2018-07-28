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

    this.well_data = {};
    this.well_monthly = {};

    this.interpolator = new Interpolator();

}


WellManager.prototype = {
    constructor: WellManager,

    init: function (callback) {

        var self = this;

        let month_series = {};
       $.get(SERVER_PATH + "/data/reduced_well_data.csv", function(data) {
       // $.get(SERVER_PATH + "/data/reduced-2.csv", function(data) {
           var csvObj = $.csv.toObjects(data);

           let max_water_level = 0;
           csvObj.forEach(function (row) {
               let county = row['county'];
               county = county.toLowerCase();
               let aquier = row['aquifer'];

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

               let wl = parseFloat(row['water_level']);
               if (wl < 0) {
                   wl = 0;
               }


               if (wl > max_water_level) {
                   max_water_level = wl;
               }
               var wellObject = {
                   id: wellId,
                   water_level: wl.toFixed(2),
                   latitude: Number(row['latitude']),
                   longitude: Number(row['longitude']),
                   aquifer: row['aquifer'],
                   county: row['county'],
                   datetime: row['year'] + '-' + row['month'] + '-' + row['day'],

                   // active: 'Active' === row['active']
                   active: true
               };

               if (wl > 680) {
                   console.log(wl);
                   return;
               }

               if (!self.well_data.hasOwnProperty(wellId)) {
                   self.well_data[wellId] = wellObject
               }


                if (!self.well_timeseries.hasOwnProperty(wellId)) {
                    self.well_timeseries[wellId] = [];
                    self.counties[county].push(wellObject);
                }

                let series = self.well_timeseries[wellId];
                series.push({
                    datetime: row['year'] + '-' + row['month'] + '-' + row['day'],
                    water_level: wellObject.water_level
                });


                // compute monthly average
                if (!month_series.hasOwnProperty(wellId)) {
                    month_series[wellId] = {};
                }

                let current_month_well = month_series[wellId];
                let month = row['year'] + '-' + row['month'];
                if(!current_month_well.hasOwnProperty(month)) {
                    current_month_well[month] = [];
                }

                let current_month = current_month_well[month];
                current_month.push(+wellObject.water_level);
           });

           console.log('Max water level:', max_water_level);

           for(let welllId in month_series) {
               if(!month_series.hasOwnProperty(welllId)) {
                   continue;
               }

               let current_well_series = month_series[welllId];
               for(let month in current_well_series) {
                   if (!current_well_series.hasOwnProperty(month)) {
                       continue;
                   }

                   let sr = current_well_series[month];
                   let w_month = 0;
                   let w_avg = 0;

                   for(let i=0; i < sr.length; i++) {
                       w_month += sr[i];
                   }

                   if (sr.length > 0) {
                       w_avg = w_month / sr.length;
                   }

                   if(!self.well_monthly.hasOwnProperty(welllId)) {
                       self.well_monthly[welllId] = {};
                   }

                   let current_well = self.well_monthly[welllId];
                   if (!current_well.hasOwnProperty(month)) {
                       current_well[month] = w_avg
                   }
               }
           }

           // compute monthly average and partial interpolation
           // partial interpolation means: only interpolate if we can do (having pre-value, post-value and interpolate middle value)
           self.interpolator.interpolate_wells(self.counties, self.well_timeseries);

           self.wellsLoaded = true;
           self.dispatchEvent( { type: 'wellLoaded', message: '' } );

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
    },

    getWellData: function (wellId) {
        return this.well_data[wellId];
    },

    getWellMonthlyData: function (wellId) {
        return this.well_monthly[wellId];
    },

    getRandomWellInCounty: function (county) {
        let county_wells = this.getWellsByCounty(county);

        if (!county_wells || county_wells.length < 1) {
            return null;
        }

        let well_index = Math.floor(Math.random() * county_wells.length);

        return county_wells[well_index];
    }


};

Object.assign( WellManager.prototype, EventDispatcher.prototype );
