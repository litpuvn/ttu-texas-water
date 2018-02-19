function StatsViewer() {

}

StatsViewer.prototype = {
    constructor: StatsViewer,

    showDailyWaterLevelForWell: function (wellId) {
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

                Highcharts.chart(wellId, {
                    chart: {
                        height: 250,
                        width: 450,
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
            }
        );
    },
    
    showDailyWaterLevelForCounty: function (countyName, container_id) {
        $.getJSON(
            'https://cdn.rawgit.com/highcharts/highcharts/v6.0.5/samples/data/usdeur.json',
            function (data) {

                Highcharts.chart(container_id, {
                    chart: {
                        height: 230,
                        zoomType: 'x'
                    },
                    title: {
                        text: 'USD to EUR exchange rate over time'
                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Exchange rate'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
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
                        name: 'USD to EUR',
                        data: data
                    }]
                });
            }
        );
    }
    

};