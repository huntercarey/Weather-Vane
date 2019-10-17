(function () {
    //Submit Button Event Handler
    $('#submit').click(function() {
        //Get the value that the user has entered into the search bar and store it
       const searchLocation = $('#searchBar').val();
        //Call the geocode function and pass in the value
        geocode(searchLocation);
        //Clear out the search bar
        $('#searchBar').val('');
    });
    //ENTERKEY
    $('#searchBar').keydown(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault(); //Stops the key from doing it's default behavior
            const searchLocation = $('#searchBar').val();
            // Call the geocode function and pass in the value
            geocode(searchLocation);
            // Clear out the search bar
            $('#searchBar').val('');
        }
    });

    //When a button is clicked with the id of 'remove' in the document, call this function
    $(document).on('click', 'button#remove', function () {
        //Get the parent element of the button
        let parentDiv = $(this).parent(); //THIS refers to the element that triggered the event handler (in this case the button that was clicked)
        //Get the parent of the div containing the button
        let weatherCardContainer = parentDiv.parent();
        //remove the container and all of its contents
        weatherCardContainer.remove();
    });

})();

//Function to connect to Dark Sky API and get weather data
function getWeatherInfo(latitude, longitude, city, state) {
    //https://api.darksky.net/forecast/e23e5d8cad46646375f6c7d174b48a11/37.8267,-122.4233
    //Base URL/APIKey/Latitude,Longitude


    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," + longitude, {dataType: "jsonp" })
   .done(function(data) {
       //Get the html from the div with the ID of 'template'
       let templateHTML = $('#template').html();

       //We need to get the temperature from dark sky data
       let temperature = data.currently.temperature;
       let conditions = data.currently.summary;

       let currentDayInfo = data.daily.data[0];
       let highTemp = Math.round(currentDayInfo.temperatureHigh);
       let lowTemp = Math.round(currentDayInfo.temperatureLow);
       let precipChance = Math.round(currentDayInfo.precipProbability * 100);

       //Replacing the string '@@city@@' with the city we pass into this function in the html
       templateHTML = templateHTML.replace('@@city@@', city);
       //replace the string '@@currentTemp@@' with the temperature we get back from the API call
       templateHTML = templateHTML.replace('@@currentTemp@@', Math.round(temperature));
       //Replace the string '@@cityState' with the city we pass into the function
       templateHTML = templateHTML.replace('@@cityState@@', city + ' ' + state);
       //replace @@conditions@@ with conditions from API
       templateHTML = templateHTML.replace('@@conditions@@', conditions);
       //replace @@highTemp@@ with high temp from API
       templateHTML = templateHTML.replace('@@highTemp@@', highTemp);
        //repeat
       templateHTML = templateHTML.replace('@@lowTemp@@', lowTemp);
        //repeat
       templateHTML = templateHTML.replace('@@precipitation@@', precipChance);

       //Add the configured templateHTML to our row in the card container
       $('.row').append(templateHTML);
   })
   .fail(function(error){
       console.log(error);
   })
   .always(function(){
       console.log("Weather call complete!");
   })
}

//Function to connect to the MapQuest Geocoding API and get geocoding data
function geocode(location) {
    //Base-URL + API Key + &location= + Address
    $.ajax('http://www.mapquestapi.com/geocoding/v1/address?key=' + mapQuestKey + '&location=' + location)
    .done(function(data) {
        //Get Lat and Lng from the response
        let locations = data.results[0].locations[0];

        let lat = locations.latLng.lat;
        let lng = locations.latLng.lng;

        //Get the city and state so we can display it to the user later
        let city = locations.adminArea5;
        let state = locations.adminArea3;

        //Pass the Lat and Lng into our getWeatherInfo function
        getWeatherInfo(lat, lng, city, state);
    })
    .fail(function(error) {
        console.log(error);
    })
    .always(function() {
        console.log("Geocoding call finished");
    })
}