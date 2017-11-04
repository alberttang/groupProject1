

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

                if( temperature < 60){

                    foodType = "Cold";

                } else if (temperature > 61 && temperature < 80 ){
                    foodType = "Warm";
                } else {
                    foodType = "Hot"
                };

            $(".foodType").html("the perfect weather for "+ foodType +" food!");

        });



        // clear the location input form
        $("#city-input").val("");

    //end of on click function-----------    
    });