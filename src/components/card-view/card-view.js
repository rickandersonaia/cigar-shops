define(['knockout', 'jquery',  'jquery.bootstrap', 'text!./card-view.html'], function (ko, $, bs, templateMarkup) {

    var Shop = function (data) {
        this.name = ko.observable(data.name);
        this.address = ko.observable(data.address);
        this.hours = ko.observableArray(data.hours);
        this.rating = ko.observable(data.rating);
        this.images = ko.observableArray(data.images);
    };

    function CardView(params) {
        var self = this;

        this.message = ko.observable('Hello from the card-view component!');
        this.shopList = params.shopList;
    }


    return {viewModel: CardView, template: templateMarkup};

});
