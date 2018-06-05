define(['knockout', 'text!./favorite-list-view.html'], function (ko, templateMarkup) {


    function FavoriteListView(params) {
        var self = this;

        this.message = ko.observable('Hello from the favorite-list-view component!');
        this.favoriteStores = ko.observableArray();

        favoritesList = localStorage.getItem('cigarStoreFavoritesList')
            ? JSON.parse(localStorage.getItem('cigarStoreFavoritesList')) : [];

        for (index = 0; index < favoritesList.length; index++) {
            var request = {placeId: favoritesList[index]};

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

                    self.favoriteStores.push(result);

                }
            });
        }
    }


    return {viewModel: FavoriteListView, template: templateMarkup};

});
