
// declaring initial variables 

var foods
var foodType
var coldFoods = ["Pho", "Burgers", "Pizza", "Soup", "Hot Chocolate"]
var warmFoods = ["Boba", "Ice Cream", "Mac n Cheese", "Shaved Ice", "Burgers"]
var hotFoods = ["Shaved Ice", "Boba", "Gelato", "Salad", "Smoothies", "Breweries"]

function keypress(){
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

function googlePlacesSearch(foods){
    console.log('gps what food? ', foods);

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

            console.log(resp);
    
            //console log response
            console.log("this is a test print" + foods)
            console.log("Restaurant Name:" + " " + resp[2].name);
            console.log("Address:" + " " + resp[2].vicinity);
            console.log("Rating:" + " " + resp[2].rating);
            console.log("Restaurant Photo URL:" + " " + resp[0].photos[0].getUrl({ maxWidth: 100 }));

            //["0"].photos["0"].getUrl
        

          	// Push to HTML
		$("#restaurant-1").html(resp[0].name);
		$("#restaurantAddress-1").html("Address: " + resp[0].vicinity);
        $("#restaurantRating-1").html("Rating: " + resp[0].rating);
        
		// generate image
		var photoUrl = resp[0].photos[0].getUrl({ maxWidth: 280 });
		var restaurantPhoto = $("<img>");
		restaurantPhoto.attr("src", photoUrl);
		restaurantPhoto.attr("alt", resp[0].name);
        $("#restaurantPhoto-1").html(restaurantPhoto);

        
        	// Second Results Push to Second Container
		$("#restaurant-2").html(resp[1].name);
		$("#restaurantAddress-2").html("Address: " + resp[1].vicinity);
		$("#restaurantRating-2").html("Rating: " + resp[1].rating);
		// generate image
		var photoUrl = resp[1].photos[0].getUrl({ maxWidth: 280 });
		var restaurantPhoto = $("<img>");
		restaurantPhoto.attr("src", photoUrl);
		restaurantPhoto.attr("alt", resp[1].name);
        $("#restaurantPhoto-2").html(restaurantPhoto);
        
        	// Print the third results to the third results container
		$("#restaurant-3").html(resp[2].name);
		$("#restaurantAddress-3").html("Address: " + resp[2].vicinity);
		$("#restaurantRating-3").html("Rating: " + resp[2].rating);
		// generate image
		var photoUrl = resp[2].photos[0].getUrl({ maxWidth: 280 });
		var restaurantPhoto = $("<img>");
		restaurantPhoto.attr("src", photoUrl);
		restaurantPhoto.attr("alt", resp[2].name);
        $("#restaurantPhoto-3").html(restaurantPhoto);
        
          	// Print the 4th results to the third results container
		$("#restaurant-4").html(resp[3].name);
		$("#restaurantAddress-4").html("Address: " + resp[3].vicinity);
		$("#restaurantRating-4").html("Rating: " + resp[3].rating);
		// generate image
		var photoUrl = resp[3].photos[0].getUrl({ maxWidth: 280 });
		var restaurantPhoto = $("<img>");
		restaurantPhoto.attr("src", photoUrl);
		restaurantPhoto.attr("alt", resp[3].name);
        $("#restaurantPhoto-4").html(restaurantPhoto);
        
               	// Print the 5th results to the third results container
		$("#restaurant-5").html(resp[4].name);
		$("#restaurantAddress-5").html("Address: " + resp[4].vicinity);
		$("#restaurantRating-5").html("Rating: " + resp[4].rating);
		// generate image
		var photoUrl = resp[4].photos[0].getUrl({ maxWidth: 280 });
		var restaurantPhoto = $("<img>");
		restaurantPhoto.attr("src", photoUrl);
		restaurantPhoto.attr("alt", resp[4].name);
        $("#restaurantPhoto-5").html(restaurantPhoto);
        
        // Print the 6th results to the third results container
		$("#restaurant-6").html(resp[5].name);
		$("#restaurantAddress-6").html("Address: " + resp[5].vicinity);
		$("#restaurantRating-6").html("Rating: " + resp[5].rating);
		// generate image
		var photoUrl = resp[5].photos[0].getUrl({ maxWidth: 280 });
		var restaurantPhoto = $("<img>");
		restaurantPhoto.attr("src", photoUrl);
		restaurantPhoto.attr("alt", resp[5].name);
		$("#restaurantPhoto-6").html(restaurantPhoto);

        });

    };


//************** Weathe API Querying AJAX*******************************************

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
                $(".weather").html("It's Currently " + response.main.temp + " °F, ").css("font-weight", "bold");
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
            $(".foodType").html("That's kinda "+ foodType + ". We recommend you eat one of the following:").css("font-weight", "bold");


//***********If statment to determine what food to query *************************
            if(foodType === "Cold"){

                foods = coldFoods;

                // add ajax call here to google places api using a for loop of an array of cold food items 

               var randomFoodfromArray = coldFoods[Math.floor(Math.random()*coldFoods.length)];
               console.log('cold arr: ',randomFoodfromArray)

                googlePlacesSearch(randomFoodfromArray);
                
                }

             else  {

                foods = "icecream";
            }
//*********************************************************************************

//** Run Function to query Google Places API with Foodtype
           // googlePlacesSearch();

        });
    });
}


google.maps.event.addDomListener(window, 'load', initialize);
