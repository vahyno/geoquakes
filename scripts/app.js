// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 3
  });
  $.ajax({
    url: weekly_quakes_endpoint,
    method: "GET",
    success: function(data) {
      // debugger;
      // data.features[0].properties.title
      for(let i = 0; i < data.features.length; i++) {
        let time = ((Date.now() - data.features[i].properties.time) / 60 / 60 / 1000).toFixed(2);
        $("#info").append(`<p>${data.features[i].properties.title} / ${time} hours ago</p>`);
        let marker = new google.maps.Marker({
          position: {
            lat: data.features[i].geometry.coordinates[1],
            lng: data.features[i].geometry.coordinates[0]
          },
          map: map,
          title: data.features[i].properties.title,
          icon: {
            url: "images/earthquake.png",
            scaledSize: {height: 40, width: 40}
          }
        });
        let infowindow = new google.maps.InfoWindow({
          content: data.features[i].properties.title
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }
    }
  });

});
