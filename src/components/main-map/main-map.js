define(['knockout', 'text!./main-map.html'], function (ko, templateMarkup) {


    function MainMap(params) {
        var self = this;

        self.cityList = ko.observableArray([]);
        self.message = ko.observable();

        var mapData = $.getJSON("components/main-map/main-map-model.json", function (data) {
            self.cityList(data);
            console.log('success');
        });

        mapData.done( function (data) {
            var acity = ChooseCity(data);

            self.message(data[acity].name);

            city = new google.maps.LatLng(data[acity].lat, data[acity].lng);
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
        })
    }

    function ChooseCity(data){
        return 'la';
    }


    return {viewModel: MainMap, template: templateMarkup};

});