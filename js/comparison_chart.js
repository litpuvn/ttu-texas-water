function ComparisonChart(wellManager) {
    this.wellManager = wellManager;


    this.setting = {
        margin: {top: 20, right: 0, bottom: 30, left: 70},
        svgWidth: 800,
        svgHeight: 360
    };

    this.setting["width"] = this.setting.svgWidth - this.setting.margin.left - this.setting.margin.right;
    this.setting["height"] = this.setting.svgHeight - this.setting.margin.top - this.setting.margin.bottom;

    this.setting["xScale"] = d3.time.scale().range([0, this.setting.width]);
    this.setting["yScale"] = d3.scale.linear().range([this.setting.height, 0]);

    this.setting["xAxis"] = d3.svg.axis().scale(this.setting["xScale"]).orient("bottom").tickFormat(d3.time.format("%Y"));
    this.setting["yAxis"] = d3.svg.axis().scale(this.setting["yScale"]).orient("left");

    this.colorAboveCounty = '#66aa33';
    this.colorBelowCounty = '#cc6633';
}

ComparisonChart.prototype = {
    constructor: ComparisonChart,

    init: function (containerId) {
        let margin = this.setting.margin;
        let svgWidth = this.setting.svgWidth;
        let svgHeight = this.setting.svgHeight;


        let mySvg = d3.select("body").select(containerId).append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", "translate(" + (margin.left-10) + "," + margin.top + ")")
            ;

        this.svg = mySvg;

        return mySvg;
    },

    /**
     * Comparison between county average and the specified well
     * @param county
     * @param wellId
     */
    generateChart: function (county, wellId) {
        let self = this;

        $.get(SERVER_PATH + "/data/counties-saturated/" + county.toLowerCase() + "-monthly.csv", function(data) {

            let chart_data = [];

            let county_series_data = $.csv.toObjects(data);
            let well_monthly_data = self.wellManager.getWellMonthlyData(wellId);

            // let min_data_length = Math.min(county_series_data.length, well_monthly_data.length);

            let parseDate = d3.time.format("%Y-%m").parse;


            for(let month in well_monthly_data) {
                if (!well_monthly_data.hasOwnProperty(month)) {
                    continue;
                }

                let well_value = well_monthly_data[month];
                for(let i=0; i < county_series_data.length; i++) {
                    let county_item = county_series_data[i];
                    if (month === county_item['datetime']) {
                        let tmp = {
                            'year': parseDate(month),
                            'county': +county_item['saturated_thickness'],
                            'well': well_value
                        };

                        chart_data.push(tmp);
                    }
                }
            }

            self.__populate_comparison_chart(county, wellId, chart_data)

        });
    },

    __populate_comparison_chart: function (county, wellId, chart_data) {
          let x = this.setting.xScale;
        let y = this.setting.yScale;
        let width = this.setting.width;
        let height = this.setting.height;
        let margin = this.setting.margin;
        let self = this;
        let columnKey ='well';
        let averageKey = 'county';

        let lineAverage = d3.svg.area()
            .defined(function(d) { return !!d[averageKey]; }) // Omit empty values.
            .x(function(d) { return x(d.year); })
            .y(function(d) {
                return y(d[averageKey]); }
                );

        let lineBase = d3.svg.area()
            .defined(function(d) { return !!d[columnKey]; }) // Omit empty values.
            .x(function(d) { return x(d.year); })
            .y(function(d) {
                return height + y(d[columnKey]); }
            );

        let area = d3.svg.area()
            // .interpolate("basis")
            .defined(function(d) { return !!d[columnKey]; }) // Omit empty values.
            .x(function(d) {
                return x(d.year);
            })
            .y1(function(d) { return y(d[averageKey]); });


        let svg = this.svg;


         svg.selectAll("*").remove();

        let timeDomain = d3.extent(chart_data, function(d) {
            return d['year'];
        });

        let yDomainMax = d3.max(chart_data, function (d) {
           return Math.max(d['county'], d['well'] )
        });

        let yDomainMin = d3.min(chart_data, function (d) {
           return Math.min(d['county'], d['well'] )
        });


        x.domain(timeDomain);
        y.domain([yDomainMin-10, yDomainMax + 10]);

        let myWell = this.wellManager.getWellData(wellId);

        // if (!newChart) {

            // clipping ----------------------------
            svg.datum(chart_data);

            // creating clip path items ---------------------
            svg.append("clipPath")
                .attr("id", "clip-below")
                .append("path")
                .attr("d", area.y0(height));

            svg.append("clipPath")
                .attr("id", "clip-above")
                .append("path")
                .attr("d", area.y0(0));

            //----------- Creating lines with clip path items created-------

            svg.selectAll('.areaAbove').remove();//.transition()
              //  .duration(2000).attr('opacity', 0);


            svg.append("path")
                    .attr("class", "areaAbove")
                    .attr('opacity', 1)
                    .style("fill", self.colorAboveCounty)     // set the fill colour
                    .attr("clip-path", "url(#clip-above)")
                    .attr("d", area.y0(function(d) {  return y(d[columnKey]); }))
                ;

            svg.selectAll('.areaBelow').remove();//.transition()

            svg.append("path")
                    .attr("class", "areaBelow")
                    .attr('opacity', 1)
                    .style("fill", self.colorBelowCounty)     // set the fill colour
                    .attr("clip-path", "url(#clip-below)")
                    .attr("d", area)
                ;

            svg.append('path')
                .attr("class", "wline")
                .style("stroke", '#000')
                .attr('opacity', 0)
                .attr("d", lineBase);

            svg.selectAll('.wline')
                .attr("d", lineBase)
                .attr('opacity', 1)

            // .style("stroke", "#f00")
            ;

            // painting average line
            svg.append('path')
                .attr("class", "lineAverage")
                .style("stroke", '#000')
                .attr('opacity', 0.6)
                .attr("d", lineAverage);

            svg.selectAll('.lineAverage')
                .attr("d", lineAverage)
                .attr('opacity', 0.6)
            ;

            // preparing tooltip for each dot
            // Define the div for the tooltip
            let div = d3.select("body").append("div")
                .attr("class", "tooltip tooltip-comparison")
                .style("opacity", 0);

             let format = d3.time.format("%Y-%m");
            // dot over existed data
            svg.selectAll("dot")
                // .data(data.filter(function (d) {
                //     return d['populated'] === false;
                // }))
                .data(chart_data)
                .enter().append("circle")
                .attr("cx", function(d) {
                    return x(d.year); })
                .attr("cy", function(d) {
                    return y(d[columnKey]);
                })
                .attr('opacity', 0)
                .attr("r", 0)
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div	.html("Date: " + format(d.year) + "<br/>Water Level: " + d[columnKey])
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .transition()
                .duration(2500)
                .attr('opacity', 1)
                .style("stroke-width", 0.5)
                .style("stroke", '#000')
                .style("fill", myWell.color)
                .attr("r", 3)
                // .each(flickering)
            ;

            // dot over existed data
            svg.selectAll("dot-avg")
                .data(chart_data)
                .enter().append("circle")
                .attr("cx", function(d) {
                    return x(d.year); })
                .attr("cy", function(d) {
                    return y(d[averageKey]);
                })
                .attr('opacity', 0)
                .attr("r", 0)
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div	.html("Date: " + format(d.year) + "<br/>Water Level: " + d[averageKey])
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .transition()
                .duration(2500)
                .attr('opacity', 1)
                .style("stroke-width", 0.5)
                .style("stroke", '#000')
                .style("fill", '#000')
                .attr("r", 3)
                // .each(flickering)
            ;

        // coordinate
        let xAxis = this.setting.xAxis;
        let yAxis = this.setting.yAxis;

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("y", 30)
            .attr("x", width + 3)
            .style("text-anchor", "end")
            .text("Year")

        ;

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 25 - this.setting.margin.left)
            .attr("x", 0 - (height / 2) - 10)
            .attr("dy", ".51em")
            .style("text-anchor", "middle")
            // .style("text-anchor", "end")
            .text("Water Level (ft)")
        ;
    }

};