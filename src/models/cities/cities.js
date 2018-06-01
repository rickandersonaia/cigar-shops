define(['jquery'], function ($) {

    var cities = {};

    cities.changeHTML = function (arg) {
        $('body').html(arg);
    };


    cities.cityList = function () {
        var stuff = {};
        $.getJSON("models/cities/cities.json", function (data) {
            console.log('Successfully read city data from JSON file');
            console.log(data);
            stuff = data;
            return stuff;
        })
            .fail(function () {
                console.log('Failed to read city data from JSON file');
                stuff = {
                    "name": "Palm Springs",
                    "lat": "33.7667",
                    "lng": "-116.3592",
                    "zoom": 10
                };
                return stuff;
            });
    };

    cities.sayHowdy = function(){
        return 'Howdy';
    }

    return cities;
});