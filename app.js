// declaring initial variables 

var foods
var foodType
var coldFoods = ["Pho", "Chilli", "Spicy", "Soup", "Hot Chocolate"]
var warmFoods = ["Boba", "Ice Cream", "Mac n Cheese", "Shaved Ice", "Burgers"]
var hotFoods = ["Shaved Ice", "Boba", "Gelato", "Salad", "Smoothies", "Breweries"]

//*************** Firebase **********************************************************************

var config = {
    apiKey: "AIzaSyBQaM8Oo_2iZEiV1AHFl3p1YCkAwOpLacA",
    authDomain: "myproject-e1235.firebaseapp.com",
    databaseURL: "https://myproject-e1235.firebaseio.com",
    projectId: "myproject-e1235",
    storageBucket: "myproject-e1235.appspot.com",
    messagingSenderId: "402017814268"
};

firebase.initializeApp(config);


// Create a variable to reference the database

var database = firebase.database();

//**************************************************************************************************
// keypress function to prevent enter key from freshing the page on user input

function keypress() {
      $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return $( "#input-message" ).html("Please select a city from the drop down menu");
    }
  });
}
// initialize function to run both Google places query and Open Weathermap API
function initialize() {

    //call keypress function
    keypress();

    // Google autocomplete location for input form//

    var input = document.getElementById('city-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var inputLocation = place.formatted_address;
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

        // Function for calling the Google Places API, for use of grabing the food type inside of the Weather AJAX http request

        function googlePlacesSearch(food1, food2, food3, food4, food5) {

            //hide the initial input form

            $("#start-input").addClass("hide");

            //remove the hide class from the results ID to show resturant reccomendations and weather
            $("#results").removeClass("hide");

            // Remove ID from initial input form
            $(".initial-form").removeAttr("id");

            //place city-input ID on new form on top of page to be used with places auto complete
            $(".new-form").attr("id","city-input");


            // clear all cards each time this function is ran
            $(".firstCard").empty();

            //declaring food variable that is passed into the GoooglePlacesSearch function
            var foods = [food1, food2, food3, food4, food5];

            //console log to see what is printing from foods
            console.log('what food? ', foods);

            // for loop to run 4 times through the foods array
            for (var i = 0; i < 4; i++) {

            //request variable used to run the Google Places Search
                var request = {
                    location: center,
                    radius: '5000',
                    keyword: foods[i]
                };

                // test to see what foods is being collected - for testint purposes
                console.log("**********LOOOKKKKK " + foods[i])

                // running the Google Places API Search 
                service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(resp) {

                    console.log(resp);

                    //console log response - testing purposes
                    console.log("this is a test print" + foods)
                    console.log("Restaurant Name:" + " " + resp[0].name);
                    console.log("Address:" + " " + resp[0].vicinity);
                    console.log("Rating:" + " " + resp[0].rating);
                    console.log("Restaurant Photo URL:" + " " + resp[0].photos[0].getUrl({ maxWidth: 6000 }));

                    // Push to HTML + old code for reference (before dyanmically generating elements)
                    var resName = resp[0].name;
                    // $("#restaurantName").html(resp[0].name);
                    var resAddress = resp[0].vicinity;
                    // $("#restaurantAddress").html(resp[0].vicinity);
                    //$("#restaurantHours").html(resp[0].opening_hours.open_now);
                    var resRating = resp[0].rating;
                    // $("#restaurantRating").html(resp[0].rating);
                    // generate image
                    var photoUrl = resp[0].photos[0].getUrl({ maxWidth: 6000 });
                    var restaurantPhoto = $("<img>");
                    var insertImage = $("#insert-image");
                    restaurantPhoto.attr("src", photoUrl);
                    restaurantPhoto.attr("alt", resp[0].name);
                    // $("#insert-image").append(restaurantPhoto);


                    // Creates a element dynamically to make materialize card
                    //create main card container
                    var cardContainer = $("<div>");
                    cardContainer.attr("class", "col s12 m6 hoverable")
                    // create the card div
                    var cardDiv = $("<div>");
                    cardDiv.attr("class", "card")
                    // create the card image div
                    var cardImageDiv = $("<div>");
                    cardImageDiv.attr("class", "card-image");
                    cardDiv.append(cardImageDiv);
                    cardImageDiv.append(restaurantPhoto);
                    // create the card span to hold restaruant name
                    var cardSpan = $("<span>");
                    cardSpan.attr("class", "card-title");
                    cardSpan.html(resName);

                    // create the card content div to hold address information
                    var cardContent = $("<div>");
                    cardContent.attr("class", "card-content");
                    // create p tag that will go inside the card content
                    var cardP = $("<p>");
                    cardP.html("<p>" + resAddress + "</p><p>Rating: " + resRating + "</p>")
                    cardImageDiv.append(cardSpan);
                    cardContent.append(cardP);
                    cardDiv.append(cardContent)
                    cardContainer.append(cardDiv)

                    //append the dynamically genereated card to the HTML
                    $(".firstCard").append(cardContainer);

                    // insertImage.html(restaurantPhoto);



                });

            };
            // when for loop is over run initialize again so that the places autocomplete works with the new input form 
         initialize();   
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
            console.log("Temp: " + response.main.temp);
            console.log(inputLocation);







            //***********************************************************************************************************
            //**********Print Weather to HTML  ***************************************************************************************
            $(".weather").html("It's Currently " + response.main.temp + " °F, ").css("font-weight", "bold");
            //****************************************************************************************


            //grab the temperature of the weathe API
            temperature = response.main.temp;

            database.ref().set({
                usrLocation: inputLocation,
                usrTemp: temperature,

            });

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
            if (foodType === "Cold") {

                foods = coldFoods;

            } else if (foodType === "Warm") {

                foods = warmFoods;
            } else {
                foods = hotFoods;
            }
            //*********************************************************************************

            //** Run Function to query Google Places API with Foodtype
            googlePlacesSearch(foods[0], foods[1], foods[2], foods[3], foods[4]);

        });
    });
}

//************FIREBASE*****************************************************************
// Grab most recent value on firebase for location and temp and print to HTML
database.ref().on("value", function(snapshot) {

    console.log(snapshot.val());


    $("#recent-display").html("<p> Location: " + snapshot.val().usrLocation + "</p><p> Temperature: " + snapshot.val().usrTemp + "°F");


}, function(errorObject) {

    console.log("The read failed: " + errorObject.code);
});
//******************************************************************************************

// ********** back to top button
$(document).ready(function() {
  $('a.bktop').click(function(e){
    $('html, body').animate({scrollTop:0}, '1000');
    e.preventDefault();
  });
  $(window).scroll(function() {
    if($(this).scrollTop() > 200){
      $('.bktop').fadeIn('2000');
    } else {
      $('.bktop').fadeOut('500');
    }
  });
});

//*******************************************
// Dom Listener to run initialize on load
google.maps.event.addDomListener(window, 'load', initialize);