define(['knockout', 'text!./main-map.html'], function (ko, templateMarkup) {
    var City = function(){
        this.id = ko.observable('ps');
        this.name = ko.observable('Palm Springs');
        this.lat = ko.observable('33.7667');
        this.lng = ko.observable('-116.3592');
        this.zoom = ko.observable('10');
    };

    function MainMap(params) {
        var self = this;
        this.currentCity = ko.observable( new City());
        this.message = this.currentCity().name() + " Cigar Stores";
        var cityData = $.getJSON("components/main-map/main-map-model.json", function (data) {
            console.log('Successfully read city data from JSON file');
        });

        cityData.done( function (data) {
            this.currentCity = ko.observable( new City());
            var curCity = chooseCurrentCity(data);
            city = new google.maps.LatLng(this.currentCity().lat(), this.currentCity().lng());
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

            location = new google.maps.LatLng(defaultCity.lat, defaultCity.lng);
            currentCityMap(location);
        })
    }

    function chooseCurrentCity(data){
        return 'ps';
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