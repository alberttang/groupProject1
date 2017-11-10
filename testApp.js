// declaring initial variables 

var foods
var foodType
var coldFoods = ["Pho", "Burgers", "Pizza", "Soup", "Hot Chocolate"]
var warmFoods = ["Boba", "Ice Cream", "Mac n Cheese", "Shaved Ice", "Burgers"]
var hotFoods = ["Shaved Ice", "Boba", "Gelato", "Salad", "Smoothies", "Breweries"]

function keypress() {
    $(document).on("keypress", "form", function(event) {
        return event.keyCode != 13;
    });
}
// initialize function
function initialize() {
    keypress();

    // Google autocomplete location for input form//

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

        // Func() for calling the Google Places API, for use of grabing the food type inside of the Weather AJAX http request

        function googlePlacesSearch(food1,food2,food3, food4, food5) {
            $(".firstCard").empty();


            var foods = [food1, food2, food3, food4, food5];
            console.log('gps what food? ', foods);

            //request variable used to run the Google Places Search
                for (var i = 0; i < 5; i++) {

            var request = {
                location: center,
                radius: '5000',
                keyword: foods[i]
            };

            console.log("**********LOOOKKKKK " + foods[i])

            // running the Google Places API Search 
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, function(resp) {

                console.log(resp);

                //console log response
                console.log("this is a test print" + foods)
                console.log("Restaurant Name:" + " " + resp[2].name);
                console.log("Address:" + " " + resp[2].vicinity);
                console.log("Rating:" + " " + resp[2].rating);
                console.log("Restaurant Photo URL:" + " " + resp[0].photos[0].getUrl({ maxWidth: 100 }));

                // Push to HTML
                var resName = resp[0].name;
                $("#restaurantName").html(resp[0].name);
                var resAddress = resp[0].vicinity;
                $("#restaurantAddress").html(resp[0].vicinity);
                //$("#restaurantHours").html(resp[0].opening_hours.open_now);
                var resRating = resp[0].rating;
                $("#restaurantRating").html(resp[0].rating);
                // generate image
                var photoUrl = resp[0].photos[0].getUrl({ maxWidth: 400 });
                var restaurantPhoto = $("<img>");
                restaurantPhoto.attr("src", photoUrl);
                restaurantPhoto.attr("alt", resp[0].name);
                $("#restaurantPhoto").html(restaurantPhoto);


                // Creates a div to hold the movie
                var cardDiv = $("<div>");
                cardDiv.attr("class", "card")
                var cardImageDiv = $("<div>");
                cardImageDiv.attr("class", "card-image");
                cardDiv.append(cardImageDiv);
                cardImageDiv.append(restaurantPhoto);
                var cardSpan = $("<span>");
                cardSpan.attr("class", "card-title");
                cardSpan.html(resName);
                var cardContent = $("<div>");
                var cardP = $("<p>");
                cardP.html("Adress: " + resAddress + "  -Rating: " + resRating)
                cardContent.append(cardSpan);
                cardContent.append(cardP);
                cardDiv.append(cardContent)
                $(".firstCard").append(cardDiv);


            });

        };
    }


        //************** Weathe API Querying AJAX*******************************************

        // variable for the open Weather map API to query based on lat and long
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=fb715a35d9acbd969dacad1fb90c06bc&q&units=imperial"
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            console.log(response);
            console.log("Temp: " + response.main.temp);


            //***********************************************************************************************************
            //**********Print Weather to HTML  ***************************************************************************************
            $(".weather").html("It's Currently " + response.main.temp + " °F, ").css("font-weight", "bold");
            //****************************************************************************************


            //grab the temperature of the weathe API
            temperature = response.main.temp;

            //if statement to determine if the temperature is hot or warm or cold
            if (temperature < 70) {

                foodType = "Cold";

            } else if (temperature > 71 && temperature < 80) {

                foodType = "Warm";

            } else {

                foodType = "Hot"
            };

            // Print Food Type to HTML
            $(".foodType").html("That's kinda " + foodType + ". We recommend you eat one of the following:").css("font-weight", "bold");


            //***********If statment to determine what food to query *************************
            if(foodType === "Cold"){

                foods = coldFoods;

            } else  if (foodType === "Warm"){

                foods = warmFoods;
            } else{
                foods = hotFoods;
            }
            //*********************************************************************************

            //** Run Function to query Google Places API with Foodtype
            googlePlacesSearch(foods[0],foods[1],foods[2],foods[3],foods[4]);

        });
    });
}


google.maps.event.addDomListener(window, 'load', initialize);