define(['knockout', 'jquery', 'bootstrap', 'text!./main-map.html'], function (ko, $, bs, templateMarkup) {
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

    function MainMap(params) {
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

            city = new google.maps.LatLng(self.currentCity().lat(), self.currentCity().lng());
            self.currentCityMap(city, self.currentCity().zoom());
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
            self.currentCityMap(location, defaultCity.zoom);
            self.message(defaultCity.name + " Cigar Stores");

        });

        this.setCurrentCity = function (selected) {
            self.currentCity(selected);
            city = new google.maps.LatLng(self.currentCity().lat(), self.currentCity().lng());
            self.currentCityMap(city, self.currentCity().zoom());
            self.message(self.currentCity().name() + " Cigar Stores");
        };

        this.currentCityMap = function(city, zoomVal) {
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
            var request = {
                location: city,
                radius: '50000',
                query: 'cigar store'
            };

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, self.callback);
            infoWindow = new google.maps.InfoWindow();
        };

        this.callback = function(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    addMarker(place);
                }
                console.log(self.shopList());
                self.shopList(self.createShopList(results));
                console.log(self.shopList());
            }
        };

        this.createShopList = function(placesResults){
            shopList = [];
            for (let place in placesResults) {
                shopList.push(new Place(placesResults[place]));
            }
            return shopList;
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

                    if(result.opening_hours.open_now){
                        var open = '<span class="open">Open Now</span>'
                    }else{
                        var open = '<span class="closed">Closed</span>'
                    }

                    var content = '<p class="info-window-title"><b>' + result.name + '</b></p>' +
                        '<p>' + result.vicinity + '</p>' +
                        '<p>' + result.formatted_phone_number + '</p>' +
                        '<p> Rating: ' + result.rating + ' of 5</p>' +
                        '<p class="info-window-footer">' + open + '<button id="more-details">More details</button></p>';
                    infoWindow.setContent(content);

                    infoWindow.open(map, marker);
                });
            });
        }
    }

    return {viewModel: MainMap, template: templateMarkup};

});