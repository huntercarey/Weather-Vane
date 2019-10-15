(function () {
    // getWeatherInfo();
    geocode();
})();

//Function to connect to Dark Sky API and get weather data
function getWeatherInfo() {
    //https://api.darksky.net/forecast/e23e5d8cad46646375f6c7d174b48a11/37.8267,-122.4233
    //Base URL/APIKey/Latitude,Longitude


    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/37.8267,-122.4233", {dataType: "jsonp" })
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
function geocode() {
    //Base-URL + API Key + &location= + Address
    $.ajax('http://www.mapquestapi.com/geocoding/v1/address?key=' + mapQuestKey + '&location=Washington,DC')
    .done(function(data) {
        console.log(data);
    })
    .fail(function(error) {
        console.log(error);
    })
    .always(function() {
        console.log("Geocoding call finished");
    })
}