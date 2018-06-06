define(['knockout', 'text!./favorite-view.html'], function (ko, templateMarkup) {

    function FavoriteView(params) {
        var self = this;

        this.message = ko.observable('Hello from the favorite-view component!');
        this.shopDetails = params.shopDetails;
        this.favoritesList = params.favoritesList;

        var ignoreList = localStorage.getItem('cigarStoreIgnoreList')
            ? JSON.parse(localStorage.getItem('cigarStoreIgnoreList')) : [];

        this.addToFavorites = function () {
            if(self.favoritesList().indexOf(self.shopDetails().place_id) < 0){
                self.favoritesList().push(self.shopDetails().place_id);
                localStorage.setItem('cigarStoreFavoritesList', JSON.stringify(self.favoritesList()));
                $('.nav-tabs a[href="#cards"]').tab('show');
                window.location.reload();
            }
        };

        this.addToIgnore = function () {
            ignoreList.push(self.shopDetails().place_id);
            localStorage.setItem('cigarStoreIgnoreList', JSON.stringify(ignoreList));
            window.location.reload();
        };
    }


    return {viewModel: FavoriteView, template: templateMarkup};

});
