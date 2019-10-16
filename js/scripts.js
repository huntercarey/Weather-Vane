(function () {
    //Submit Button Event Handler
    $('#submit').click(function() {
        //Get the value that the user has entered into the search bar and store it
       const searchLocation = $('#searchBar').val();
        //Call the geocode function and pass in the value
        geocode(searchLocation);
        //Clear out the search bar
        $('#searchBar').val('');
    })
})();

//Function to connect to Dark Sky API and get weather data
function getWeatherInfo(latitude, longitude, city, state) {
    //https://api.darksky.net/forecast/e23e5d8cad46646375f6c7d174b48a11/37.8267,-122.4233
    //Base URL/APIKey/Latitude,Longitude


    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," + longitude, {dataType: "jsonp" })
   .done(function(data) {
       console.log(data);
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