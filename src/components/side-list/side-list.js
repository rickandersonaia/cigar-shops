define(['knockout', 'text!./side-list.html'], function (ko, templateMarkup) {

    function SideList(params) {
        var self = this;
        this.message = ko.observable('Hello from the side-list component!');
        this.shopList = ko.observableArray([]);

    }


    return {viewModel: SideList, template: templateMarkup};

});
