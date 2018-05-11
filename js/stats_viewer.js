function StatsViewer() {

}

StatsViewer.prototype = {
    constructor: StatsViewer,

    populate_water_level_timeseries: function (div_container_id, chart_width, chart_height, myData) {
             Highcharts.chart(div_container_id, {
                    chart: {
                        height: chart_height,
                        width: chart_width,
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Well water level timeseries'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Water level (ft)'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            // fillColor: {
                            //     linearGradient: {
                            //         x1: 0,
                            //         y1: 0,
                            //         x2: 0,
                            //         y2: 1
                            //     },
                            //     stops: [
                            //         [0, Highcharts.getOptions().colors[0]],
                            //         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            //     ]
                            // },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        name: 'level',
                        data: myData
                    }]
                });
        },

    showDailyWaterLevelForWell: function (wellId, data) {
        let self = this;
        let chart_height = 250;
        let chart_width = 450;

        if (!!data) {
             var myData = [];

            data.forEach(function (item) {
                var dateValue = Date.parse(item['datetime']);
                var waterLevel = parseFloat(item['water_level']);
                var element = [dateValue, waterLevel];

                myData.push(element);
            });

            self.populate_water_level_timeseries(wellId, chart_width, chart_height, myData);

        }
        else {
            $.get(
                SERVER_PATH + '/data/detail/' + wellId + '-daily.csv',
                function (data) {

                    data = $.csv.toObjects(data);
                    var myData = [];

                    data.forEach(function (item) {
                        var dateValue = Date.parse(item['datetime']);
                        var waterLevel = parseFloat(item['water_level(ft below land surface)']);
                        var element = [dateValue, waterLevel];

                        myData.push(element);
                    });

                    self.populate_water_level_timeseries(wellId, chart_width, chart_height, myData);
                }
            );
        }

    },
    
    showDailyWaterLevelForCounty: function (countyName, container_id) {
        let self = this;
        let chart_height = 250;
        let chart_width = 950;

        $.get(SERVER_PATH + "/data/counties-saturated/" + countyName + "-monthly.csv", function(data) {
           var csvObj = $.csv.toObjects(data);
            var myData = [];

            csvObj.forEach(function (item) {
                var dateValue = Date.parse(item['datetime']);
                var waterLevel = parseFloat(item['saturated_thickness']);
                var element = [dateValue, waterLevel];

                myData.push(element);
            });

            self.populate_water_level_timeseries(container_id, chart_width, chart_height, myData);

        });


        // $.getJSON(
        //     'https://cdn.rawgit.com/highcharts/highcharts/v6.0.5/samples/data/usdeur.json',
        //     function (data) {
        //
        //
        //     }
        // );
    }
    

};