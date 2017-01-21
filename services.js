//SERVICES

weatherApp2.service('cityService', function() {

    this.city = 'Fundão, Portugal';

    this.cities = [{
        name: 'Felgueiras',
        hour: '10:00',
        temp: '10'
    },
    {
        name: 'Lixa',
        hour: ' 10:00',
        temp: '12'
    }]

})

weatherApp2.service('weatherService', [ '$resource', function($resource){

  this.getWeather = function(city, days){

    var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{get: {method: "JSONP"}});

      return weatherAPI.get({q: city , cnt: days ,units:"metric", appid: "082c34236a151c1c88b51da077466817"});

  }


}])

weatherApp2.service('weatherService', function($resource){
  this.getWeather =  function(city, days){
    var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        get: {
            method: "JSONP"
        }
    });

    return weatherAPI.get({
        q: city,
        cnt: days,
        appid: "e773764473d587969ebf1ea30f6c885d",
        units: 'metric'
    });
  };
});
