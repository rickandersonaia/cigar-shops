define(['knockout', 'text!./main-map.html'], function (ko, templateMarkup) {
    var City = function (data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.lat = ko.observable(data.lat);
        this.lng = ko.observable(data.lng);
        this.zoom = ko.observable(data.zoom);
    };

    function MainMap(params) {
        var self = this;
        this.cityList = ko.observableArray();
        this.currentCity = ko.observableArray();
        this.message = ko.observable();

        var cityData = $.getJSON("components/main-map/main-map-model.json", function (data) {
            console.log('Successfully read city data from JSON file');
        });

        cityData.done(function (data) {
            for (let element in data) {
                self.cityList.push(new City(data[element]));
            }

            self.currentCity(self.cityList()[0]) ;
            self.message(self.currentCity().name() + " Cigar Stores");

            // var curCity = chooseCurrentCity(data);
            city = new google.maps.LatLng(self.currentCity().lat(), self.currentCity().lng());
            currentCityMap(city, self.currentCity().zoom());
        });

        cityData.fail(function () {
            console.log('Failed to read city data from JSON file')
            var defaultCity = {
                "name": "Palm Springs",
                "lat": "33.7667",
                "lng": "-116.3592",
                "zoom": 10
            };

            location = new google.maps.LatLng(defaultCity.lat, defaultCity.lng);
            currentCityMap(location, defaultCity.zoom);
        })

        this.setCurrentCity = function (selected) {
            self.currentCity(selected);
            city = new google.maps.LatLng(self.currentCity().lat(), self.currentCity().lng());
            currentCityMap(city, self.currentCity().zoom());
        }
    }

    function chooseCurrentCity(data) {
        return 'ps';
    }

    function currentCityMap(city, zoomVal) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: city,
            zoom: zoomVal,
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