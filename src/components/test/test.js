define(['knockout', 'jquery', 'text!./test.html'], function (ko, $, templateMarkup) {


    function Test(params) {
        var self = this;

        this.placeId = params.shopId;
        this.name = ko.observable();
        this.address = ko.observable();
        this.hours = ko.observableArray();
        this.rating = ko.observable();
        this.images = ko.observableArray();

        // var request = {placeId: self.placeId()};
        //
        // service = new google.maps.places.PlacesService(map);
        // service.getDetails(request, function (result, status) {
        //     if (status !== google.maps.places.PlacesServiceStatus.OK) {
        //         console.error(status);
        //         return;
        //     }
        //     self.name(result.name);
        //     self.address(result.vicinity);
        //     self.hours(result.opening_hours);
        //     self.rating(result.rating);
        //     self.images(result.photos);
        //
        // });
    }

    return {viewModel: Test, template: templateMarkup};

});
