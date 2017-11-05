function initialize() {
    var input = document.getElementById('city-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());

        //place.name;
        var center = new google.maps.LatLng(lat, lng);

        //********** "Panel_Image" needs be replaced with an id on the div holding the results **********\\

        var map = new google.maps.Map(document.getElementById("Panel_Image"), {
            center: center,
            zoom: 15
        });
        var request = {
            location: center,
            radius: '5000',
            keyword: ['sea food']
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
            restaurantPhoto.attr("alt", resp[0].name);
            $("#restaurantPhoto").html(restaurantPhoto);

        });

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=fb715a35d9acbd969dacad1fb90c06bc&q&units=imperial"
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
            }).done(function(response) {

                console.log(response);
                console.log("Temp: "  + response.main.temp);
               

                $(".weather").html("It is Currently " + response.main.temp + "°F, ");

                temperature = response.main.temp;

                if( temperature < 70){

                    foodType = "Cold";

                } else if (temperature > 71 && temperature < 80 ){
                    foodType = "Warm";
                } else {
                    foodType = "Hot"
                };

            $(".foodType").html("It's "+ foodType);

        });
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
