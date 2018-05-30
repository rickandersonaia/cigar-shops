define(['knockout', 'text!./test.html'], function (ko, templateMarkup) {

    function Test(params) {
        this.message = ko.observable('Hello from the test component!');
        this.cityList = ko.observableArray();

        $.getJSON("components/test/main-map-model.json", this.cityList);

        var map;
        var service;
        var infowindow;

        var ps = new google.maps.LatLng(33.7667, -116.3592);
        console.log(ps);
        map = new google.maps.Map(document.getElementById('test-map'), {
            center: ps,
            zoom: 9
        });

        var request = {
            location: ps,
            radius: '50000',
            query: 'cigar store'
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
        infoWindow = new google.maps.InfoWindow();


        function callback(results, status) {
            console.log(status);
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    console.log(place);
                    addMarker(place);
                }
            }
        }

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



        console.log(this.cityList());
    }


    return {viewModel: Test, template: templateMarkup};

});
