//Width and height of map
var width = 1080;
var height = 570;



// D3 Projection
var projection = d3.geo.albersUsa()
				   .translate([(width/2)+70, (height/2)-310])    // translate to center of screen
				   .scale([2250]);          // scale things down so see entire US
        
// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  



//Create SVG element and append map to the SVG
var svg = d3.select("#map")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
        
// Append Div for tooltip to SVG
var div = d3.select("#map")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);

var g = svg.append('g');
var mapLayer = g.append('g')
  .classed('map-layer', true);
    
    
// Load GeoJSON data and merge with states data
d3.json("us-states.json", function(error,json) {


		
// Bind the data to the SVG and create one path per GeoJSON feature
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")

	.attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "1")
		 

d3.csv("NEW.csv", function(data) {

dataset = data.map(function(d) { return [ +d["latitude"], +d["longitude"] ]; });
   console.log(data)
   svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
               return projection([d["longitude"], d["latitude"]])[0];
               })
     .attr("cy", function(d) {
               return projection([d["longitude"],d["latitude"]])[1];
               })
     .attr("r", 2.5 )
     .style("fill", "red")
	.on("mouseover", function(d) {      
    	div.transition()        
      	   .duration(200)      
           .style("opacity", .9);      
           div.text("County name:"+d.county+"\n"+"Well number:" +d.well_number)
           .attr("fill","steelblue")
           .style("left", (d3.event.pageX) + "px")     
           .style("top", (d3.event.pageY - 28) + "px");    
	})   

    // fade out tooltip on mouse out               
    .on("mouseout", function(d) {       
        div.transition()        
           .duration(500)      
           .style("opacity", 0);   
    });
});  
        
 
    });
