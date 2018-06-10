define(['favorites', 'knockout', 'text!./side-list.html'], function (fav, ko, templateMarkup) {

    function SideList(params) {
        var self = this;
        this.message = ko.observable('Hello from the side-list component!');
        this.shopList = params.shopList;
        this.favoritesList = params.favoritesList;
        this.showRickFavoritesOnly = ko.observable(params.showRickFavoritesOnly);
        console.log(this.showRickFavoritesOnly());

        this.displayRickFavorietesOnly = function(){
            if(self.showRickFavoritesOnly() == true){
                self.showRickFavoritesOnly(false);
            }else{
                self.showRickFavoritesOnly(true);
            }
        }

    }


    return {viewModel: SideList, template: templateMarkup};

});
