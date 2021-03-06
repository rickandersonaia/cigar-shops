define(['knockout', 'text!./yelp-details.html'], function (ko, templateMarkup) {

    function YelpDetails(params) {
        var self = this;

        this.message = ko.observable('Hello from the yelp-details component!');

        this.shopDetails = params.shopDetails;

        this.yelpBusinessDetails = ko.observableArray();

        this.yelp = ko.computed(function () {
            var token = "Bearer 3GqU27VJpj8SyeDWHhJD5hjVlP8ejE7rWOANDIkMC00ZGqPmZA91w1oRo5hPH3Z951SiI8H7Wtoao-2MGZ8S8L-zLLZVyAM-8foykgftXZ60sdZCm0ahprgEty4TW3Yx";
            var yelpSearchUrl = "https://api.yelp.com/v3/businesses/search";
            var corsAnywhereUrl = "https://cors-anywhere.herokuapp.com";
            var nameParam = self.shopDetails().name;
            var locationParam = self.shopDetails().formatted_address;
            var requestObj = {
                url: corsAnywhereUrl + '/' + yelpSearchUrl,
                data: {term: nameParam, location: locationParam},
                headers: {Authorization: token},
                error: function (jqXHR, textStatus, errorThrown) {
                    // console.log('Ajax error, jqXHR = ', jqXHR, ', textStatus = ', textStatus, ', errorThrown = ', errorThrown)
                    self.yelpBusinessDetails({error: "Data not available"});
                }
            };
            $.ajax(requestObj)
                .done(function (response) {
                    if(Array.isArray(response.businesses) && response.total > 0){

                        self.yelpBusinessDetails( response.businesses[0]);
                    }
                    else{
                        self.yelpBusinessDetails({error: "Data not available"});
                    }
                });
        }, this).extend({ deferred: true });

        // this.shopYelpId = ko.observable(self.yelpBusinessDetails.id);
    }

    return {viewModel: YelpDetails, template: templateMarkup};

});
