define(['knockout', 'text!./main-map.html'], function (ko, templateMarkup) {


    function MainMap(params) {
        var self = this;

        self.cityList = ko.observableArray([]);
        self.currentCity = ko.observableArray([]);
        self.message = ko.computed(function () {
            return self.currentCity().name + " Cigar Shops";
        });

        var cityData = $.getJSON("components/main-map/main-map-model.json", function (data) {
            self.cityList(data);
            console.log('Successfully read city data from JSON file');
        });

        cityData.done( function (data) {
            var curCity = chooseCurrentCity(data);
            self.currentCity(data[curCity]);
            city = new google.maps.LatLng(data[curCity].lat, data[curCity].lng);
            currentCityMap(city);
        })

        cityData.fail(function () {
            console.log('Failed to city data from JSON file')
            var defaultCity = {
                    "name": "Palm Springs",
                    "lat": "33.7667",
                    "lng": "-116.3592",
                    "zoom": "10"
                };
            self.currentCity(defaultCity);
            city = new google.maps.LatLng(defaultCity.lat, defaultCity.lng);
            currentCityMap(city);
        })
    }

    function chooseCurrentCity(data){
        return 'la';
    }

    function currentCityMap(city){
        map = new google.maps.Map(document.getElementById('map'), {
            center: city,
            zoom: 10,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER,
                style: google.maps.ZoomControlStyle.SMALL
            },
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            mapTypeControl: false,
            panControl: false
        });
    }


    return {viewModel: MainMap, template: templateMarkup};

});