    let map, heatmap;
    let dataPoints = [];

      // Creating function that will initialize the map
      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 10,
          center: { lat: 41.8781, lng: -87.6298 },
        });
        
      }

      function toggleHeatmap() {
        /*
          HeatMap Will be Layered on top of the Google Map
          (Requirement 3.2.2)
        */
        heatmap.setMap(heatmap.getMap() ? null : map);
      }

      // Creating function that will change the gradient of the hotspots
      function changeGradient() {
        const gradient = [
          "rgba(0, 255, 255, 0)",
          "rgba(0, 255, 255, 1)",
          "rgba(0, 191, 255, 1)",
          "rgba(0, 127, 255, 1)",
          "rgba(0, 63, 255, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(0, 0, 223, 1)",
          "rgba(0, 0, 191, 1)",
          "rgba(0, 0, 159, 1)",
          "rgba(0, 0, 127, 1)",
          "rgba(63, 0, 91, 1)",
          "rgba(127, 0, 63, 1)",
          "rgba(191, 0, 31, 1)",
          "rgba(255, 0, 0, 1)",
        ];
        heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
      }

      // Creating function to change the radius of the hotspots
      function changeRadius() {
        heatmap.set("radius", heatmap.get("radius") ? null : 20);
      }

      // Creating function to change opacity of the heatmap
      function changeOpacity() {
        heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
      }

      
      function getPoints() {
        let mapKey = document.getElementById("mapPoints").value
        dataPoints = []
        /*
          Utilizing the Google Maps API, HeatMap API, and the Socrata API
          (Requirement 3.2,3.2.3)
        */
        $.ajax({
            url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json",
            type: "GET",
            data: {
              "$limit" : 10000,
              "$$app_token" : mapKey
            }
        }).done(function(data) {
          
          for(let i = 0; i < data.length; i++) {
              if(!isNaN(parseFloat(data[i].longitude)) && !isNaN(parseFloat(data[i].latitude))) {
                dataPoints.push(new google.maps.LatLng(parseFloat(data[i].latitude),parseFloat(data[i].longitude)))
              } 
          }
          heatmap = new google.maps.visualization.HeatmapLayer({
            data: dataPoints,
            map: map,
          });

          document.getElementById("districtSelector").selectedIndex = "0";
          document.getElementById("yearSelector").selectedIndex = "0";
          document.getElementById("wardSelector").selectedIndex = "0";

          heatmap.setMap(map)
        });
      }

      function getWardData(value) {
        if(value == "null") {
          initMap();
          return;
        }
        initMap()

        let mapKey = document.getElementById("mapPoints").value
        dataPoints = []
        /*
          Utilizing the Google Maps API, HeatMap API, and the Socrata API
          (Requirement 3.2,3.2.3)
        */
        $.ajax({
            url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json?ward=" + value,
            type: "GET",
            data: {
              "$limit" : 10000,
              "$$app_token" : mapKey
            }
        }).done(function(data) {
          
          for(let i = 0; i < data.length; i++) {
              if(!isNaN(parseFloat(data[i].longitude)) && !isNaN(parseFloat(data[i].latitude))) {
                dataPoints.push(new google.maps.LatLng(parseFloat(data[i].latitude),parseFloat(data[i].longitude)))
              } 
          }
          heatmap = new google.maps.visualization.HeatmapLayer({
            data: dataPoints,
            map: map,
          });

          document.getElementById("districtSelector").selectedIndex = "0";
          document.getElementById("yearSelector").selectedIndex = "0";

          heatmap.setMap(map)
        });
      }

      function getDistrictData(value) {
        if(value == "null") {
          initMap();
          return;
        }
        initMap()

        let mapKey = document.getElementById("mapPoints").value
        dataPoints = []
        /*
          Utilizing the Google Maps API, HeatMap API, and the Socrata API
          (Requirement 3.2,3.2.3)
        */
        $.ajax({
            url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json?district=" + value,
            type: "GET",
            data: {
              "$limit" : 10000,
              "$$app_token" : mapKey
            }
        }).done(function(data) {
          
          for(let i = 0; i < data.length; i++) {
              if(!isNaN(parseFloat(data[i].longitude)) && !isNaN(parseFloat(data[i].latitude))) {
                dataPoints.push(new google.maps.LatLng(parseFloat(data[i].latitude),parseFloat(data[i].longitude)))
              } 
          }
          heatmap = new google.maps.visualization.HeatmapLayer({
            data: dataPoints,
            map: map,
          });

          document.getElementById("wardSelector").selectedIndex = "0";
          document.getElementById("yearSelector").selectedIndex = "0";

          heatmap.setMap(map)
        });
      }

      function getYearData(value) {
        if(value == "null") {
          initMap();
          return;
        }
        initMap()

        let mapKey = document.getElementById("mapPoints").value
        dataPoints = []
        /*
          Utilizing the Google Maps API, HeatMap API, and the Socrata API
          (Requirement 3.2,3.2.3)
        */
        $.ajax({
            url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json?year=" + value,
            type: "GET",
            data: {
              "$limit" : 10000,
              "$$app_token" : mapKey
            }
        }).done(function(data) {
          
          for(let i = 0; i < data.length; i++) {
              if(!isNaN(parseFloat(data[i].longitude)) && !isNaN(parseFloat(data[i].latitude))) {
                dataPoints.push(new google.maps.LatLng(parseFloat(data[i].latitude),parseFloat(data[i].longitude)))
              } 
          }
          heatmap = new google.maps.visualization.HeatmapLayer({
            data: dataPoints,
            map: map,
          });

          document.getElementById("wardSelector").selectedIndex = "0";
          document.getElementById("districtSelector").selectedIndex = "0";

          heatmap.setMap(map)
        });
      }