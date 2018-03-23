// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  $.ajax({
  // What kind of request
  method: 'GET',

  // The URL for the request
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",

  // The type of data we want back
  // dataType: 'json',

  // Code to run if the request succeeds; the JSON
  // response is passed to the function as an argument.
  success: onSuccess
});

// defining the callback function that will happen
// if the request succeeds.
function onSuccess(json) {
    console.log(json.features);
    let quakeLog= json.features;
      console.log(quakeLog[0].properties.mag)

    let timeNow= Date.now();

    var sanFrancisco = {lat: 37.78, lng: -122.44};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: sanFrancisco
          });

    quakeLog.forEach(function(quake){
      let magnitude = quake.properties.mag;
      let place = quake.properties.place;
      let time = quake.properties.time;
      let latNum= quake.geometry.coordinates[1];
      let lngNum = quake.geometry.coordinates[0];
      let positionValue = {lat:latNum, lng:lngNum}


      var marker = new google.maps.Marker({
        position: positionValue,
        map: map
      });

      console.log(positionValue);

      // new google.maps.Marker(`{position: ${positionValue} , map: map}`);
      $('#info').append(`<p>M ${magnitude} - ${place} / ${((timeNow-time)/1000/3600).toFixed(2)} hours ago </p>`);

    })
  }




});
