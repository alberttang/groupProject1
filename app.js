

// on click function targeting the submit button

$(".submit-btn").on("click", function() {

        // Don't refresh the page!
        event.preventDefault();

        var temperature = 0;
        var foodType;

        //variable for grabbing the user location input
        var usrInput = $("#city-input").val().trim();

        console.log(usrInput);


        //variable for openweathermap API to query the user input
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?appid=fb715a35d9acbd969dacad1fb90c06bc&q=" + usrInput + "&units=imperial";

        console.log(queryURL);


        // http call to the query URL to GET the temperature and console log and append to the weather ID panel
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



        // clear the location input form
        $("#city-input").val("");

    //end of on click function-----------    
    });


	// array of food recommendations // rey
	var cold = ["Ramen", "Pho", "Soup (Boudin/Soup Plantation)", "Shabu (hot pot)", "Korean BBQ", "Soon Do Boo (Korean Tofu Soup)", "Chicken Tikka Masala", "Hot chocolate"];
	var warm = ["Boba", "Ice Cream", "Mac n cheese", "Shaved Ice", "Burgers (In and out)", "Café’s"];
	var hot = ["Boba", "Shaved Ice ", "Gelato", "Salad", "Smoothies (Jamba Juice)", "Breweries (Anaheim Packing House)"];


	for (var i = 0; i < warm.length; i++) {
		console.log(warm);
	}



