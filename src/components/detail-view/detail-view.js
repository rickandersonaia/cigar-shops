define(['knockout', 'text!./detail-view.html'], function (ko, templateMarkup) {

    function DetailView(params) {
        var self = this;
        // Default place data stands in for incomplete async request
        var defaultPlaceData = {
            address_components: [],
            adr_address: '<span class="street-address">530 S Indian Canyon Dr</span>, <span class="locality">Palm Springs</span>, <span class="region">CA</span> <span class="postal-code">92264-7436</span>, <span class="country-name">USA</span>',
            formatted_address: "530 S Indian Canyon Dr, Palm Springs, CA 92264, USA",
            formatted_phone_number: "(760) 325-0554",
            geometry: [],
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
            id: "5b0f320e5ee445e1f4524bbbf22cb9fdbd0e84cd",
            international_phone_number: "+1 760-325-0554",
            name: "Cigar Imports",
            opening_hours: [],
            photos: [{
                height: 3456,
                html_attributions: '',
                photo_reference: "CmRaAAAA01SoM8ATlmgnMNRdCmh9cTPqhWJ1QxiFsVAn6TYqTg…NXi1KrNLVQqI5syuc5bGhSiXqzKMkoLwi4S5NBiiSMwi9RJ4A",
                width: 5184
            }],
            place_id: "ChIJd3_fxAkb24ARTj6xQle0YsA",
            rating: 4.8,
            reference: "CmRSAAAAYYbDDygDpvj_xiCPbWMOGzir4uZ7MDF5ZHFBROdG3trLd__rs0Rw_S_vGsZ3_JSN06w3iTWbZOaylYfYq3aDSWmBFIJ_KXTY85WJOPnbJ7jGJK2AmGz_k0AshXANjEdmEhCzPHl8BmiUoSwOgXSBmtueGhS68bKy7Mm3_PMQE2HPZyHKMfkfxA",
            reviews: [],
            scope: "GOOGLE",
            types: ["store", "point_of_interest", "establishment"],
            url: "https://maps.google.com/?cid=13862840889873874510",
            utc_offset: -420,
            vicinity: "530 South Indian Canyon Drive, Palm Springs"
        };

        this.message = ko.observable('Hello from the detail-view component!');
        this.shopDetails = params.shopDetails;

        this.placeData = ko.computed(function () {
            return self.shopDetails() ? getPlaceData(self.shopDetails().place_id) : defaultPlaceData;

        }, this).extend({deferred: true});


        // Google API to retrieve place data that contains photo_references
        function getPlaceData(placeId) {
            if (placeId) {
                var shopData = $.getJSON("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="
                    + placeId + "&key=AIzaSyAY3wpSr2TwInnZ5Am8o-rqmsKj1avw_Rs", function (data) {
                    console.log('Successfully retrieved shop data');
                });

                shopData.done(function (data) {
                    return data.result;

                });

                // Do this upon failure to read of JSON file
                shopData.fail(function () {
                    console.log('Failed to retrieve place data');
                    return defaultPlaceData;

                });
            }
        }

    }

    return {viewModel: DetailView, template: templateMarkup};

});
