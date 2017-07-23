var apiKey="f77f0fa54024249a37dbb79c1e5b8186";
var mainUrl="http://api.openweathermap.org/data/2.5/weather?";
var unit = "metric";
var unitFormat= "C";

function getWeather(apiUrl){
    $.ajax({
        url: apiUrl,
        success: function(result){
            $(".title").html("Current weather in:");
            $(".temp").html("<div id=\"temp-value\">"+Math.round(result.main.temp)+"</div><span>°</span><div id=\"f-c\">"+unitFormat+"</div><img src=\"images/ico/"+result.weather[0].icon+".png\" alt=\"Icon\">");
            $(".location").html("<i class=\"fa fa-map-marker\"></i>"+result.name+", "+result.sys.country);
            $(".desc").html(result.weather[0].description);
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
        getWeather(mainUrl+"lat="+lat+"&lon="+lon+"&units="+unit+"&APPID="+apiKey);
    }
    navigator.geolocation.getCurrentPosition(geoSuccess,geoError);

    $(".city-form").submit(function(event){
        event.preventDefault();
        var cityName=$(".city-name").val();
        getWeather(mainUrl+"q="+cityName+"&units="+unit+"&APPID="+apiKey);
        $(".city-name").val("");
    });

    $(".temp").on("click",function(){
        var value = $("#temp-value").text();
        if (unit=="metric"){
            value = Math.round(value*9/5+32);
            $("#temp-value").html(value);
            unitFormat = "F";
            $("#f-c").html(unitFormat);
            unit = "imperial";
        }
        else if (unit=="imperial"){
            value =  Math.round((value-32)*5/9);
            $("#temp-value").html(value);
            unitFormat = "C";
            $("#f-c").html(unitFormat);
            unit = "metric";
        }
    });

});