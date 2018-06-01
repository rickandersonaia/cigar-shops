define(['knockout', 'text!./card-view.html'], function(ko, templateMarkup) {

  function CardView(params) {
    this.message = ko.observable('Hello from the card-view component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CardView.prototype.dispose = function() { };

  return { viewModel: CardView, template: templateMarkup };

});
