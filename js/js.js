var apiKey="f77f0fa54024249a37dbb79c1e5b8186";
var mainUrl="http://api.openweathermap.org/data/2.5/weather?";

function getWeather(apiUrl){
    console.log(apiUrl);
    $.ajax({
        url: apiUrl,
        success: function(result){
            $(".title").html("Current weather in:");
            $(".temp").html(result.main.temp+"<span>°</span>C");
            $(".location").html("<i class=\"fa fa-map-marker\"></i>"+result.name+", "+result.sys.country);
            $("#wind").html("<img src=\"images/wind.png\" alt=\"Wind\">"+result.wind.speed+"m/s");
            $("#hum").html("<img src=\"images/humidity.png\" alt=\"Humidity\">"+result.main.humidity+"%");
            $("#pressure").html("<img src=\"images/pressure.png\" alt=\"Pressure\">"+result.main.pressure+"hPa");
        }
    });
}

$(document).ready(function(){
    if(!navigator.geolocation){
        $(".title").html("That browser dosen't support Geolocation :( <br/> Try to use form below.");
    }
    function geoError(){
        $(".title").html("Couldn't read your position :( <br/> Try to use form below.");
    }

    function geoSuccess(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getWeather(mainUrl+"lat="+lat+"&lon="+lon+"&units=metric&APPID="+apiKey);
    }
    navigator.geolocation.getCurrentPosition(geoSuccess,geoError);

    $(".city-form").submit(function(event){
        event.preventDefault();
        var cityName=$(".city-name").val();
        getWeather(mainUrl+"q="+cityName+"&units=metric&APPID="+apiKey);
        $(".city-name").val("");
    });
});