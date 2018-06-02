define(['knockout', 'text!./detail-view.html'], function (ko, templateMarkup) {

    function DetailView(params) {
        var self = this;

        this.message = ko.observable('Hello from the detail-view component!');
        this.shopDetails = params.shopDetails;
    }


    return {viewModel: DetailView, template: templateMarkup};

});
