
// declaring initial variables 

var foods
var foodType

// initialize function
function initialize() {

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

function Func(){

    //request variable used to run the Google Places Search
        var request = {
            location: center,
            radius: '5000',
            keyword: foods
        };

        console.log("**********LOOOKKKKK " + foods)

        // running the Google Places API Search 
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(resp) {
            //console log response
            console.log(resp);
            console.log("Restaurant Name:" + " " + resp[0].name);
            console.log("Address:" + " " + resp[0].vicinity);
            console.log("Opening Hours:" + " " + resp[0].opening_hours.open_now);
            console.log("Rating:" + " " + resp[0].rating);
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

    };


//************** Weather API Querying AJAX*******************************************

// variable for the open Weather map API to query based on lat and long
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=fb715a35d9acbd969dacad1fb90c06bc&q&units=imperial"
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
            }).done(function(response) {

                console.log(response);
                console.log("Temp: "  + response.main.temp);
               

//***********************************************************************************************************
//**********Print Weather to HTML  ***************************************************************************************
                $(".weather").html("It is Currently " + response.main.temp + "°F, ");
//****************************************************************************************


            //grab the temperature of the weathe API
                temperature = response.main.temp;

                //if statement to determine if the temperature is hot or warm or cold
                if( temperature < 70){

                    foodType = "Cold";

                } else if (temperature > 71 && temperature < 80 ){

                    foodType = "Warm";

                } else {

                    foodType = "Hot"
                };

            // Print Food Type to HTML
            $(".foodType").html("It's "+ foodType);


//***********If statment to determine what food to query *************************
            if(foodType === "Cold"){

                foods = "soup" || "ramen";

            } else  {

                foods = "icecream";
            }
//*********************************************************************************

//** Run Function to query Google Places API with Foodtype
            Func();

        });
    });
}


google.maps.event.addDomListener(window, 'load', initialize);
