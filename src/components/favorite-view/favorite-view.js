define(['knockout', 'text!./favorite-view.html'], function (ko, templateMarkup) {

    function FavoriteView(params) {
        var self = this;

        this.message = ko.observable('Hello from the favorite-view component!');
        this.shopDetails = params.shopDetails;

        var favoritesList = localStorage.getItem('cigarStoreFavoritesList')
            ? JSON.parse(localStorage.getItem('cigarStoreFavoritesList')) : [];

        var ignoreList = localStorage.getItem('cigarStoreIgnoreList')
            ? JSON.parse(localStorage.getItem('cigarStoreIgnoreList')) : [];

        this.addToFavorites = function () {
            favoritesList.push(self.shopDetails().place_id);
            localStorage.setItem('cigarStoreFavoritesList', JSON.stringify(favoritesList))
        }

        this.addToIgnore = function () {
            ignoreList.push(self.shopDetails().place_id);
            localStorage.setItem('cigarStoreIgnoreList', JSON.stringify(ignoreList))
        }
    }


    return {viewModel: FavoriteView, template: templateMarkup};

});
