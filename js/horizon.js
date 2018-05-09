function Horizon(wellManager) {
    this.wellManager = wellManager;
}


Horizon.prototype = {
    constructor: Horizon,
    
    drawHorizon: function () {
         // Clean of any previus horizons

        let self = this;

        let wells = self.wellManager.getWellsByCounty('Kerr');


        let wellList = [
            // {id: 100, series: [120, 130, 120, 230], color: '#ff0000'},
            // {id: 101, series: [100, 89, 89, 300], color: '#00ff00'},
            // {id: 102, series: [99, 88, 77, 66], color: '#0000ff'},
        ];

        d3.select("#horizonChart").selectAll('.horizon').remove();
        d3.select("#horizonChart").selectAll('.horizonSVG').remove();
        let div = d3.select("body").append("div")
          .attr("class", "tooltip horizon-tooltip")
          .style("opacity", 0);
        let count = 0;
        let max_well = 20 > wells.length ?  wells.length : 20;
        let c20 = d3.scale.category20();

        for(let i=0; i < max_well; i++) {
            let curWell = wells[i];
            curWell.color = c20(i);
            $.get(SERVER_PATH + "/data/detail/"  + curWell.id + "-daily.csv", function(data, error, index) {
                  let csvObj = $.csv.toObjects(data);
                  // console.log('Well ' + curWell.id);

                  curWell.series = csvObj.map(function (item) {
                     return parseInt(item['water_level(ft below land surface)']);
                  });

                  wellList.push(curWell);

                  d3.select("#horizonChart").selectAll('.horizon')
                    .data(wellList)
                    .enter()
                    .append('div')
                    .attr('class', 'horizon')
                    .each(function(d) {
                        d3.horizonChart()
                            .title("well "+d.id)
                            //.colors(idv.colorManager.getAllWaterColorsAsArray())  // colorsWater is defined in color.manager.js
                           // .colors([ '#4575b4', '#abd9e9', '#fee090', '#f46d43'])
                           // .colors(['rgb(255,0,255)','rgb(255,0,0)','rgba(250,200,160)', 'rgba(200,150,130)', 'rgb(160,160,80)', 'rgb(0,120,160)', 'rgb(0,60,120)', 'rgb(0,0,60)'])
                            .colors(['#313695', '#313695', '#4575b4', '#74add1', '#abd9e9',
                                     'rgb(250,200,160)', 'rgba(200,150,130,255)','rgb(160,160,80)', 'rgb(0,120,160)', 'rgb(0,60,120)']) // can not add 'rgb(0,0,60)' because the max saturated thickness is 548.9
                            .height(27)
                            .call(this, d.series)
                        ;
                    });

                count ++;
                if (count == max_well) {
                      d3.selectAll('.horizon')
                        .on("mouseover", function(d) {
                            div.transition()
                                .duration(200)
                                .style("opacity", .9);
                            div.html("County: " + d.county + ", Water level:" + d.water_level)
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY - 28) + "px");
                        })
                        .on("mouseout", function(d) {
                            div.transition()
                                .duration(500)
                                .style("opacity", 0);
                        })
                        .insert('svg', ':nth-child(2)')
                          .attr('width', 14)
                          .attr('height', 14)
                          .attr('preserveAspectRatio', "none")
                          .attr("class", "horizon-chart-well")
                        .append('circle')
                          .attr('cx', 6)
                          .attr('cy', 6)
                          .attr('stroke-width', 0.5)
                          .attr('stroke', '#000')
                          .attr('r', 5)
                          .style('fill', function (d) {
                              return d.color;
                          })
                    ;


                    var startYear = 95;
                    var endYear = 117;
                    var numMonths = (endYear-startYear)*12;

                    // Draw x axis *********************************
                    var mindate = new Date(1900+startYear,1,1),
                      maxdate = new Date(1900+endYear,1,1);

                    // define the y axis
                    var xScale = d3.time.scale()
                          .domain([mindate, maxdate])    // values between for month of january
                          .range([0, 2*numMonths]);   // map these the the chart width = total width minus padding at both sides

                    var xAxis = d3.svg.axis()
                            .orient("bottom")
                            .scale(xScale);

                    var svgAxis = d3.select("#horizonChart").append("svg")
                            .attr("class", "horizonSVG")
                            .attr("width", 700)
                            .attr("height", 20)
                            .append("g")
                              .attr("transform", "translate(" + 85 + "," + 20 +")");

                    svgAxis.append("g")
                      .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
                      .attr("dy", -13)
                      .attr("transform", "translate(" + 0 + "," + -20 +")")
                      .call(xAxis)
                    ;
                }
            });
        }







        }
};
