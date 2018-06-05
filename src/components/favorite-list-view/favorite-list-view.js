define(['knockout', 'ls-change', 'text!./favorite-list-view.html'], function (ko, lsc, templateMarkup) {


    function FavoriteListView(params) {
        var self = this;

        this.message = ko.observable('Hello from the favorite-list-view component!');
        this.favoriteStores = ko.observableArray();
        this.favoritesExist = ko.observable(false);
        this.favoritesList = params.favoritesList;

        for (favorite of self.favoritesList()) {
            var request = {placeId: favorite};

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, function (result, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var photos = result.photos;
                    if (photos) {
                        var imageUrl = photos[0].getUrl({maxWidth: 200, maxHeight: 200});
                        result.imageUrl = imageUrl;
                    }
                    self.favoritesExist(true);
                    self.favoriteStores.push(result);

                }
            });
        }
    }


    return {viewModel: FavoriteListView, template: templateMarkup};

});
