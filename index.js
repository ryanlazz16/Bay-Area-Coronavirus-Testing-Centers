data = [];
markers = [];

function icon(public) {
  if (public) {
    return "./hospital.png";
  }
  return "./firstaid.png";
}

function initMap() {

  var options = {
    zoom: 9.40,
    center:{lat:37.6922, lng:-122.1307}
  };

  var map = new google.maps.Map(document.getElementById('map'), options);

  function addMarker(name, coords, public) {

    // create marker
    var marker = new google.maps.Marker({
      position:coords,
      map:map,
      icon: icon(public),
      //animation: google.maps.Animation.BOUNCE,
    });
    //markers.push(marker);

    //create info window
    var infoWindow = new google.maps.InfoWindow({
      content:"<p class=\"hi\">"+name+"<p>"
    });
    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    })
  }

  d3.csv("./data.csv", function(d) {
    data = d;
    //console.log(data);

    data.forEach((testCenter, i) => {
      console.log(testCenter["Test Center"])
      var coords = {lat:parseFloat(testCenter.Latitude), lng:parseFloat(testCenter.Longitude)};
      addMarker(testCenter["Test Center"], coords, Math.round(Math.random()));
    });
  });

}
