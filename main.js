
    var currentTempInCelsius;

    $(document).ready(function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                lat="lat="+position.coords.latitude;
                lon="lon="+position.coords.longitude;
                getWeather();
            });  
        }else{
            console.log("Geolocation is not supported");
        }
        $("#tempUnit").on("click",function(){
            var currentUnit=$("#tempUnit").text();
            var newUnit=currentUnit==="C"?"F":"C";
            $("#tempUnit").text(newUnit);
            if(newUnit=="F"){
                var newTemp=Math.round(parseInt($("#temperature").text()) * 9/5 + 32);
                $("#temperature").text(newTemp + " " + String.fromCharCode(176));
            }
            else{
            $("#temperature").text(currentTempInCelsius  + " " + String.fromCharCode(176));
            }
        })
    });
    function getWeather(){

        var urlString = "https://fcc-weather-api.glitch.me/api/current?"+lat+"&"+lon;
        $.ajax({
            url:urlString,
            success: function(result){
                $(".location").text(result.name+",");
                $(".country").text(result.sys.country);
                    currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
                $("#temperature").text(currentTempInCelsius +" "+String.fromCharCode(176));
                $("#tempUnit").text("C");
                $("#weather").text(result.weather[0].main);
                iconGen(result.weather[0].main);

            }
        })
    }
    function iconGen(desc) {
        var desc = desc.toLowerCase()
        switch (desc) {
            case 'drizzle':
                addIcon(desc)
                break;
            case 'clouds':
                addIcon(desc)
                break;
            case 'rain':
                addIcon(desc)
                break;
            case 'snow':
                addIcon(desc)
                break;
            case 'clear':
                addIcon(desc)
                break;
            case 'thunderstom':
                addIcon(desc)
                break;
            default:
                $('div.clouds').removeClass('hide');
        }
    }
    function addIcon(desc) {
        $('div.' + desc).removeClass('hide');
    }