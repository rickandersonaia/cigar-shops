define(['knockout', 'text!./main-map.html'], function (ko, templateMarkup) {
    var City = function (data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.lat = ko.observable(data.lat);
        this.lng = ko.observable(data.lng);
        this.zoom = ko.observable(data.zoom);
        // this.id = ko.observable('ps');
        // this.name = ko.observable('Palm Springs');
        // this.lat = ko.observable('33.7667');
        // this.lng = ko.observable('-116.3592');
        // this.zoom = ko.observable(10);
    };

    function MainMap(params) {
        var self = this;

        var cityData = $.getJSON("components/main-map/main-map-model.json", function (data) {
            console.log('Successfully read city data from JSON file');
        });

        cityData.done(function (data) {
            this.cityList = ko.observableArray([]);
            for (let element in data) {
                this.cityList.push(new City(data[element]));
            }
            console.log(this.cityList());
            this.currentCity = ko.observable( this.cityList()[0]);
        });

        cityData.fail(function () {
            console.log('Failed to city data from JSON file')
            var defaultCity = {
                "name": "Palm Springs",
                "lat": "33.7667",
                "lng": "-116.3592",
                "zoom": 10
            };

            location = new google.maps.LatLng(defaultCity.lat, defaultCity.lng);
            currentCityMap(location, defaultCity.zoom);
        })
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