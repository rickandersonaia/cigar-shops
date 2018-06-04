define(['knockout', 'extenders', 'text!./image-from-google.html'], function (ko, ext, templateMarkup) {

    function ImageFromGoogle(params) {

        var self = this;
        var defaultPhoto = "whoops";

        this.message = ko.observable('Hello from the image-from-google component!');
        this.placeData = ko.observableArray(params.placeData);

        this.image = ko.computed(function () {
            if(this.placeData().photos){
                console.log(self.placeData());
                return getImage(self.placeData().photos[0].photo_reference);
            }else{
                return defaultPhoto;
            }

        }, this);

        function getImage(photo_reference) {
            var imageData = $.getJSON("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="
                + photo_reference + "&key=AIzaSyAY3wpSr2TwInnZ5Am8o-rqmsKj1avw_Rs", function (image) {
                console.log('Successfully retrieved image data');
            });

            imageData.done(function (image) {
                console.log(image);
                return image;
            });

            imageData.done(function (image) {
                console.log('There was no image');
            });
        }


    }

    ko.options.deferUpdates = true;

    return {viewModel: ImageFromGoogle, template: templateMarkup};

});
