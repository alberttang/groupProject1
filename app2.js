var pyrmont = new google.maps.LatLng(33.6845673, -117.82650490000003);

//********** "Panel_Image" needs be replaced with an id on the div holding the results **********\\

var map = new google.maps.Map(document.getElementById("Panel_Image"), {
    center: pyrmont,
    zoom: 15
});
var request = {
    location: pyrmont,
    radius: '5000',
    type: ['restaurant']
};

service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, function(resp) {
    //console log response
    console.log(resp);
    console.log("Restaurant Name:" + " " + resp[0].name);
    console.log("Address:" + " " + resp[0].vicinity);
    console.log("Opening Hours:" + " " + resp[0].opening_hours.open_now);
    console.log("Raiting:" + " " + resp[0].rating);
    console.log("Restaurant Photo URL:" + " " + resp[0].photos[0].getUrl({ maxWidth: 400 }));

    // Push to HTML
    $("#restaurantName").html(resp[0].name);
    $("#restaurantAddress").html(resp[0].vicinity);
    $("#restaurantHours").html(resp[0].opening_hours.open_now);
    $("#restaurantRating").html(resp[0].rating);
    // generate image
    var photoUrl = resp[0].photos[0].getUrl({ maxWidth: 400 });
    var restaurantPhoto = $("<img>");
    restaurantPhoto.attr("src", photoUrl);
    restaurantPhoto.attr("alt", "cat image");
    $("#restaurantPhoto").prepend(restaurantPhoto);

});