

// on click function targeting the submit button

$(".submit-btn").on("click", function() {

        // Don't refresh the page!
        event.preventDefault();

        var temperature = 0;
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
                
                console.log("Temp: "  + response.main.temp);
                $(".weather").html(response.main.temp + "°F");

                temperature = response.main.temp;

        });

        console.log("new temp:" +  temperature);


        // clear the location input form
        $("#city-input").val("");

    //end of on click function-----------    
    });