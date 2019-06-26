
var objekat;

function getPoziv(mojUrl){
    var zahtjev = new XMLHttpRequest();

    zahtjev.onload = function(){
        if (zahtjev.status === 200){
            objekat = JSON.parse(zahtjev.responseText);
            ispis(objekat);
        }
        else{
            var el = document.createElement("p");
            el.innerHTML = 'City is not avaliable! ' + '</br>' + 'Please check your spelling.';
            var add = document.getElementById("add1");
            add.style.height = "10%";
            add.style.padding = "20px";
            add.style.transition = "all 2s";
            add.style.border = "1px solid white";
            var add2 = document.getElementById("add2");
            add2.innerHTML = el.innerHTML;
            var data = document.getElementById("data");
            data.innerHTML = '';

            var sl1 = document.getElementById("first");
            var sl2 = document.getElementById("second");
            var sl3 = document.getElementById("third");

            sl1.style.display = "none";
            sl2.style.display = "none";
            sl3.style.display = "none";

        }
    }
    zahtjev.open("GET", mojUrl, true);
    zahtjev.send(null);
}

function pretrazi(){
    var city = document.getElementById("city").value;
    var mojUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=917b026a997320574cd4315b9bf4c73a';
    getPoziv(mojUrl);


    var ponisti = document.getElementById("contentIntro");
    ponisti.style.display = "none";

    prognozaZaTriDana();
}

function ispis(obj){

    checkWeather(obj);

    var city = document.getElementById("city");
    city.value = obj.name + ', ' + obj.sys.country;

    var p = document.createElement('p');
    var temp = Math.round(obj.main.temp - 274.15, 2);
    p.style.letterSpacing = '0.5px';
    p.innerHTML = '<b>' + obj.name + '</b>' + '</br>';
    p.innerHTML += 'Temperature: ' +(temp) + '&#8451' + '</br>';
    p.innerHTML += 'Humidity: ' + obj.main.humidity + '%' + '</br>';
    p.innerHTML += 'Wind speed: ' + obj.wind.speed + ' km/h </br>' + '</br>';
    p.innerHTML += 'Hi: <b>' + Math.round(obj.main.temp_max - 274.15, 2) + '&#8451' + '</b></br>';
    p.innerHTML += 'Lo: <b>' + Math.round(obj.main.temp_min - 274.15, 2) + '&#8451' + '</b></br>';


    var slika = document.createElement('img');
    slika.style.width = '60%';
    var icon = obj.weather[0].icon;

    slika.setAttribute('src', 'https://openweathermap.org/img/w/' + icon +'.png');
   
    var add = document.getElementById("add2");
    var data = document.getElementById("data");

    var add1 = document.getElementById("add1");
    add1.style.height = "50%";
    add1.style.boxSizing = "border-box";
    add1.style.padding = "20px";
    add1.style.transition = "all 1s";
    add.style.padding = '15px 15px 30px 10px';
    add.innerHTML = '';
    add.append(slika);
    data.innerHTML = '';
    data.append(p);
    add1.style.border = "1px solid white";


}

function checkWeather(obj){

    body = document.getElementById("body");
    console.log(obj.weather[0].icon);
    if(obj.weather[0].icon === "01n" || obj.weather[0].icon === "02n" || obj.weather[0].icon === "03n" ||
    obj.weather[0].icon === "04n" || obj.weather[0].icon === "09n" || obj.weather[0].icon === "10n"
    || obj.weather[0].icon === "11n"){
        body.style.background = "url('./images/night.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
    }
    else if(obj.weather[0].main === "Clear"){
        body.style.background = "url('./images/sun.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
    }
    else if(obj.weather[0].main === "Clouds"){
        body.style.background = "url('./images/clouds.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
    }
    else if(obj.weather[0].main === "Snow"){
        body.style.background = "url('./images/snow-covered-giants-of-nature.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
    }
    else if(obj.weather[0].main === "Rain"){
        body.style.background = "url('./images/rain.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
    }
    else if(obj.weather[0].main === "Thunderstorm"){
        body.style.background = "url('./images/thunderstorm.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
    }
    else if(obj.weather[0].main === "Drizzle"){
        body.style.background = "url('./images/drizzle.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
    }
    else{
        body.style.backgroundColor = "rgb(22, 30, 59)";
    }
}

function vrijeme(){
    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
               $.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +"&key=AIzaSyB0y4nFfkVRArjpqIl-9KVcany7sjL6aHQ", function(data) {
                    var city = document.getElementById("city");
                    console.log(data);
                    city.value = data.results[5].formatted_address;
                    pretrazi();
                  })
            })
        }
    
}

function prognozaZaTriDana(){
    var valueText = document.getElementById("city").value;
    var mojUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + valueText + '&mode=json&APPID=e9fb9625dad739e3c55db01ff9cb24c8';
    getPoziv1(mojUrl);

}

function getPoziv1(mojUrl){
        console.log(mojUrl);
        var zahtjev = new XMLHttpRequest();
        var obj;
        zahtjev.onload = function(){
            if (zahtjev.status === 200){
                obj = JSON.parse(zahtjev.responseText);
                ispis1(obj);
            }
            else{
                console.log("City not avaliable");
            }
        }
    
        zahtjev.open("GET", mojUrl, true);
        zahtjev.send(null);
}

function ispis1(obj){
    console.log(obj);
    var sl1 = document.getElementById("first");
    var sl2 = document.getElementById("second");
    var sl3 = document.getElementById("third");
    sl1.style.display = "block";
    sl2.style.display = "block";
    sl3.style.display = "block";

    sl1.innerHTML = '<p id="sati1"></p>';
    sl2.innerHTML = '<p id="sati2"></p>';
    sl3.innerHTML = '<p id="sati3"></p>';

    vrijemeTriSata(obj, sl1, 0);
    vrijemeTriSata(obj, sl2, 1);
    vrijemeTriSata(obj, sl3, 2);

}

function vrijemeTriSata(obj, sl, id){
    var idd = parseInt(id);
    sl.style.border = '1px solid white';
    var sati = document.getElementById("sati" + (idd+1).toString());
    var vrijeme = obj.list[idd].dt_txt;
    sati.innerHTML = vrijeme.split(' ')[1].substr(0, 5);

    var slika = document.createElement('img');
    slika.style.width = '40%';
    var icon = obj.list[idd].weather[0].icon;
    slika.setAttribute('src', 'https://openweathermap.org/img/w/' + icon +'.png');
    sl.append(slika);


    var temp = document.createElement("p");
    temp.innerHTML = '<b>' + Math.round(obj.list[idd].main.temp - 274.15) + '&#8451' + '</br>';
    temp.style.color = "white";
    temp.innerHTML += obj.list[id].weather[0].main + '</b>';
    temp.style.marginBottom = "5%";
    temp.style.letterSpacing = "0.5px";
    
    var wind = obj.list[idd].wind.speed;
    temp.innerHTML += '</br>'+ wind + ' km/h';
    sl.append(temp);

}