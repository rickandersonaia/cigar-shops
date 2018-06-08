define(['ignore', 'knockout', 'text!./main-map.html'], function (ig, ko, templateMarkup) {
    var City = function (data) {
        this.id = ko.observable(data.id);
        this.name = ko.observable(data.name);
        this.lat = ko.observable(data.lat);
        this.lng = ko.observable(data.lng);
        this.zoom = ko.observable(data.zoom);
    };

    var Place = function (data) {
        this.placeId = ko.observable(data.place_id);
        this.placeName = ko.observable(data.name);
    };

    function MainMap(params) {
        var self = this;
        var service;
        this.cityList = ko.observableArray();
        this.currentCity = ko.observableArray();
        this.currentShop = ko.observableArray();
        this.message = ko.observable();
        this.shopList = ko.observableArray();
        this.shopResult = ko.observableArray();
        this.shopPhotos = ko.observableArray();
        this.shopPhoto = ko.observable();
        this.favoritesList = ko.observableArray(localStorage.getItem('cigarStoreFavoritesList')
            ? JSON.parse(localStorage.getItem('cigarStoreFavoritesList')) : []);

        // cityData is the initial JSON data (model) that contains the parameters of the 3
        // cities in question.  Here we read the JSON file and set observables based on
        // success or failure

        var cityData = $.getJSON("main-map-model.json", function (data) {
            // console.log('Successfully read city data from JSON file');
        });

        // Do this on successful reading of JSON file
        cityData.done(function (data) {
            for (element in data) {
                self.cityList.push(new City(data[element]));
            }

            self.currentCity(self.cityList()[0]);
            self.message(self.currentCity().name() + " Cigar Stores");

            city = new google.maps.LatLng(self.currentCity().lat(), self.currentCity().lng());
            self.currentCityMap(city, self.currentCity().zoom());
        });

        // Do this upon failure to read of JSON file
        cityData.fail(function () {
            console.log('Failed to read city data from JSON file');
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
            $('.nav-tabs a[href="#map"]').tab('show');
        };

        this.setCurrentShop = function (selected) {
            self.currentShop(selected);

            // this function is called from multiple locations and selected returns different types of objects
            // the test below determines which type of object so it can set the right type of request.

            if (selected.hasOwnProperty('place_id')) {
                var request = {placeId: selected.place_id};
            } else {
                var request = {placeId: self.currentShop().placeId()};
            }

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, function (result, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    self.shopResult(result);
                    self.getShopPhotos(result);

                    $('.nav-tabs a[href="#store-detail"]').tab('show');

                    console.log(result);
                }
            });

        };

        this.getShopPhotos = function (place) {
            var photos = place.photos;
            if (!photos) {
                return;
            }
            self.shopPhoto(photos[0].getUrl({maxWidth: 640}));
            var index;
            for (index = 0; index < photos.length; index++) {
                shopPhoto = photos[index].getUrl({maxWidth: 640});
                self.shopPhotos.push(shopPhoto);
            }
        }

        this.currentCityMap = function (city, zoomVal) {
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
            service.textSearch(request, self.placesServiceCalback);
            infoWindow = new google.maps.InfoWindow();
        };


        this.placesServiceCalback = function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {

                var goodResults = [];
                var ignoreList = localStorage.getItem('cigarStoreIgnoreList')
                    ? JSON.parse(localStorage.getItem('cigarStoreIgnoreList')) : [];

                for (var i = 0; i < results.length; i++) {
                    if (ignoreList.includes(results[i].place_id) || rickIgnoreList.includes(results[i].place_id)) {
                        continue;
                    }
                    var place = results[i];
                    self.addMarker(place);
                    goodResults.push(results[i]);
                }

                self.shopList(self.createShopList(goodResults));
            }
        };


        this.createShopList = function (placesResults) {
            shopList = [];
            for (place in placesResults) {
                shopList.push(new Place(placesResults[place]));
            }
            return shopList;
        };


        this.addMarker = function (place) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function () {
                var request = {placeId: place.place_id};

                service.getDetails(request, function (result, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        console.error(status);
                        return;
                    }

                    self.shopResult(result);

                    if (result.opening_hours.open_now) {
                        var open = '<span class="open">Open Now</span>'
                    } else {
                        var open = '<span class="closed">Closed</span>'
                    }

                    var content = '<p class="info-window-title"><b>' + result.name + '</b></p>' +
                        '<p>' + result.vicinity + '</p>' +
                        '<p>' + result.formatted_phone_number + '</p>' +
                        '<p> Rating: ' + result.rating + ' of 5</p>' +
                        '<p class="info-window-footer">' + open + '<button class="btn btn-primary" id="more-details">More details</button></p>';

                    infoWindow.setContent(content);

                    infoWindow.open(map, marker);

                    $('#more-details').click( function (){
                        $('.nav-tabs a[href="#store-detail"]').tab('show');
                    });
                });
            });
        };

        this.addToFavoritesList = function (selected) {
            console.log('clicked');
            console.log(selected);
            // self.favoritesList.push(selected.place_id);
        }
    }


    return {viewModel: MainMap, template: templateMarkup};

});