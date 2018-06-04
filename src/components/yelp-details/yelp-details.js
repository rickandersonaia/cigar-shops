define(['knockout', 'text!./yelp-details.html'], function (ko, templateMarkup) {

    function YelpDetails(params) {
        this.message = ko.observable('Hello from the yelp-details component!');

        this.shopDetails = params.shopDetails;
    }

    return {viewModel: YelpDetails, template: templateMarkup};

});
