define(['knockout', 'text!./side-list.html'], function (ko, templateMarkup) {

    function SideList(params) {
        var self = this;
        this.message = ko.observable('Hello from the side-list component!');
        this.shopList = params.shopList;
        this.currentShop = ko.observableArray();

        this.setCurrentShop = function (selected) {
            self.currentShop(selected);
            console.log(self.currentShop().placeName());
        };

    }


    return {viewModel: SideList, template: templateMarkup};

});