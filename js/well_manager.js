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



}


WellManager.prototype = {
    constructor: WellManager,

    init: function (callback) {

        var self = this;

       $.get(SERVER_PATH + "/data/wells.csv", function(data) {
           var csvObj = $.csv.toObjects(data);

           csvObj.forEach(function (row) {
               var county = row['county'];
               var aquier = row['aquifer'];

               if (aquier != 'Ogallala') {
                   return;
               }

               // if (self.westTexas.indexOf(county) < 0) {
               //     return; // ignore non-west texas region
               // }

               if (!self.counties.hasOwnProperty(county)) {
                   self.counties[county] = [];
               }

               var wellId = row['state_well_number'];
               if (wellId.length < 7) {
                   wellId = '0' + wellId;
               }

               var wellObject = {
                   id: wellId,
                   water_level: row['daily_high_water_level'],
                   latitude: Number(row['latitude']),
                   longitude: Number(row['longitude']),
                   aquifer: row['aquifer'],
                   county: row['county'],
                   active: 'Active' === row['active']
               };


                self.counties[county].push(wellObject)

           });

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

    isWellsLoaded: function () {
        return this.wellsLoaded;
    }
};

Object.assign( WellManager.prototype, EventDispatcher.prototype );
