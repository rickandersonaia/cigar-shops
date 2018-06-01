define(['knockout', 'jquery', 'text!./test.html'], function (ko, $, templateMarkup) {

    var City = function (data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.lat = ko.observable(data.lat);
        this.lng = ko.observable(data.lng);
        this.zoom = ko.observable(data.zoom);
    };

    var Place = function (data){
        this.placeId = ko.observable(data.place_id);
        this.placeName = ko.observable(data.name);
    };

    function Test(params) {
        var self = this;
        var service;
        var infowindow;
        this.cityList = ko.observableArray();
        this.currentCity = ko.observableArray();
        this.message = ko.observable();
        this.shopList = ko.observableArray();

        var cityData = $.getJSON("components/main-map/main-map-model.json", function (data) {
            console.log('Successfully read city data from JSON file');
        });

        cityData.done(function (data) {
            for (let element in data) {
                self.cityList.push(new City(data[element]));
            }

            self.currentCity(self.cityList()[0]);
            self.message(self.currentCity().name() + " Cigar Stores");
            self.setCurrentCity(self.currentCity());
        });

        cityData.fail(function () {
            console.log('Failed to read city data from JSON file')
            var defaultCity = {
                "name": "Palm Springs",
                "lat": "33.7667",
                "lng": "-116.3592",
                "zoom": 10
            };

            self.message(defaultCity.name + " Cigar Stores");
            self.setCurrentCity(defaultCity);
        });

        this.setCurrentCity = function (selected) {
            self.currentCity(selected);
            city = new google.maps.LatLng(self.currentCity().lat(), self.currentCity().lng());
            map = new google.maps.Map(document.getElementById('map'), {
                center: city,
                zoom: self.currentCity().zoom(),
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
            var request = {
                location: city,
                radius: '50000',
                query: 'cigar store'
            };

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        addMarker(place);
                    }
                    for (let place in results) {
                        self.shopList.push(new Place(results[place]));
                    }
                    console.log(self.shopList());
                }
            });
            infoWindow = new google.maps.InfoWindow();
            self.message(self.currentCity().name() + " Cigar Stores");
        };


        function addMarker(place) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                var request = {placeId: place.place_id};

                service.getDetails(request, function(result, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        console.error(status);
                        return;
                    }
                    infoWindow.setContent(result.name);
                    infoWindow.open(map, marker);
                });
            });
        }
    }

    return {viewModel: Test, template: templateMarkup};

});
