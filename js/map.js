var infoWindow;
//Info Window Size:
var infoWindowWidth = 400;
var infoWindowHeight = 300;


function GoogleMap(containerId) {
    this.containerId = containerId
}

GoogleMap.prototype = {
    constructor: GoogleMap,

    initMap: function () {

          this.map = new google.maps.Map(document.getElementById(this.containerId), {
            center: {lat: 31.865833, lng: -95.496388},
            zoom: 15
          });

          infoWindow = new google.maps.InfoWindow();
          // initWellMarkers();
    }
};


function initWellMarkers(){
	$.get("https://raw.githubusercontent.com/litpuvn/ttu-texas-water/master/data/wells.csv", function(data) {
    WellInfo = GetWellInfo(data);

    var markers = []
    for(i = 0; i < WellInfo.length; i++){
      markers.push(new google.maps.Marker({
        position: {lat: WellInfo[i][1], lng: WellInfo[i][2]},
        map: map,
        title: "I'm Well!",
        WellNum: WellInfo[i][0]//,
        //icon: 'ICON URL HERE'
      }));

      google.maps.event.addListener(markers[i], 'click', function(){
        infoWindow.setContent('<div id="test" style="height: ' + infoWindowHeight + 'px; width: ' + infoWindowWidth + 'px"></div>');
        ChartData(this.WellNum, 'test');
        infoWindow.open(map, this);
      });
    }
		PrintList(WellInfo);

	}, 'text');
}
