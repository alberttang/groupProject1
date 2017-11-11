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


function keypress() {
      $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return $( "#input-message" ).html("Please select a city from the drop down menu");
    }
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

        // Func() for calling the Google Places API, for use of grabing the food type inside of the Weather AJAX http request

        function googlePlacesSearch(food1, food2, food3, food4, food5) {


            $("#start-input").addClass("hide");
            $("#results").removeClass("hide");
            $(".initial-form").removeAttr("id");
            // $(".new-form").attr("id","city-input");



            $(".firstCard").empty();


            var foods = [food1, food2, food3, food4, food5];
            console.log('gps what food? ', foods);

            //request variable used to run the Google Places Search
            for (var i = 0; i < 4; i++) {

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
                    console.log("Restaurant Name:" + " " + resp[0].name);
                    console.log("Address:" + " " + resp[0].vicinity);
                    console.log("Rating:" + " " + resp[0].rating);
                    console.log("Restaurant Photo URL:" + " " + resp[0].photos[0].getUrl({ maxWidth: 6000 }));

                    // Push to HTML
                    var resName = resp[0].name;
                    $("#restaurantName").html(resp[0].name);
                    var resAddress = resp[0].vicinity;
                    $("#restaurantAddress").html(resp[0].vicinity);
                    //$("#restaurantHours").html(resp[0].opening_hours.open_now);
                    var resRating = resp[0].rating;
                    $("#restaurantRating").html(resp[0].rating);
                    // generate image
                    var photoUrl = resp[0].photos[0].getUrl({ maxWidth: 6000 });

                    console.log(photoUrl);

                    if (typeof photoUrl === 'undefined' || !photoUrl || null) {
                        photoURL = "via.placeholder.com/200x200"
                    }

                    var restaurantPhoto = $("<img>");
                    var insertImage = $("#insert-image");
                    restaurantPhoto.attr("src", photoUrl);
                    restaurantPhoto.attr("alt", resp[0].name);
                    // $("#insert-image").append(restaurantPhoto);
                    console.log("look at this element" + restaurantPhoto);


                    // Creates a div to hold the movie
                    var cardContainer = $("<div>");
                    cardContainer.attr("class", "col s12 m6 hoverable")
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
                    cardContent.attr("class", "card-content");
                    var cardP = $("<p>");
                    cardP.html("<p>" + resAddress + "</p><p>Rating: " + resRating + "</p>")
                    cardImageDiv.append(cardSpan);
                    cardContent.append(cardP);
                    cardDiv.append(cardContent)
                    cardContainer.append(cardDiv)
                    $(".firstCard").append(cardContainer);

                    // insertImage.html(restaurantPhoto);



                });

            };
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

database.ref().on("value", function(snapshot) {

    console.log(snapshot.val());


    $("#recent-display").html("<p> Location: " + snapshot.val().usrLocation + "</p><p> Temperature: " + snapshot.val().usrTemp + "°F");


}, function(errorObject) {

    console.log("The read failed: " + errorObject.code);
});
//******************************************************************************************

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














google.maps.event.addDomListener(window, 'load', initialize);