function Interpolator() {

}

Interpolator.prototype = {
    constructor: Interpolator,

    interpolate_wells: function (counties, well_timeseries) {
        var startYear = 95;
        var endYear = 117;
        var numMonths = (endYear-startYear)*12;

        let countyAverage = {};
        // compute month average
        for(let ct in counties) {
            let wells = counties[ct];

            if (!countyAverage.hasOwnProperty(ct)) {
                countyAverage[ct] = {};
            }

            wells.forEach(function (w) {
                let id = w.id;
                let timeseries = well_timeseries[id];

                timeseries.forEach(function (dt) {
                    let d = new Date(dt['datetime']);
                    let m = (d.getYear()-startYear)*12 + d.getMonth();
                    let v =+w['water_level'];
                    if (!countyAverage[ct][m]) {
                        countyAverage[ct][m] = [];
                    }

                    countyAverage[ct][m].push(v);
                });

            });

            // county month average
            let county_months = countyAverage[ct];
            for (let m in county_months){
                let monthData = county_months[m];
                let sum = 0;

                for (let i=0; i<monthData.length;i++){
                    sum += monthData[i];
                }

                if (monthData.length>0) {
                    monthData["average"] = sum/monthData.length;
                }
            }

            // interpolation - create in a separate object for horizon visualization only
            wells.forEach(function (w) {
                let obj = {};
                let id = w.id;
                let timeseries = well_timeseries[id];
                obj.key = id;
                obj.values = [];

                if (id == '0233914') {
                    console.log('data')
                }

                timeseries.forEach(function (dt) {
                    let d = new Date(dt['datetime']);
                    let m = (d.getYear()-startYear)*12 + d.getMonth();
                    let v =+w['water_level'];
                    obj.values[m] = v;//(v-cut)/cut;
                });

                // Insert county values to array
                for (var i=0; i<numMonths; i++){
                  if (obj.values[i]==undefined){
                    var counttyName = ct;
                    if (countyAverage[counttyName][i]!=undefined && countyAverage[counttyName][i].average!=undefined){
                      var v = countyAverage[counttyName][i].average;
                       obj.values[i] = v;//(v-cut)/cut;
                    }
                  }
                }

                // Extend by interpolate the middle point.
                var obj2 = {};
                obj2.key = "well "+ id;
                obj2.values = [];
                for (var m=0; m<numMonths; m++){
                  obj2.values[m*2] = obj.values[m];
                }

                // Interpolate the value beween 2 continuous months
                for (var m=0; m<numMonths; m++){
                  if (obj2.values[m*2]!=undefined && obj2.values[m*2+2]!=undefined)
                    obj2.values[m*2+1] = (obj2.values[m*2]+obj2.values[m*2+2])/2;
                }

                w.interpolated_series = obj2.values;
                i = obj2.values.length-1;
                for(; i >=0; i-- ) {
                    let tmp = obj2.values[i];
                    if (!tmp) {
                        continue;
                    }

                    break;
                }

                w['water_level'] = obj2.values[i];

            });


        }// end counties loop
    },
};