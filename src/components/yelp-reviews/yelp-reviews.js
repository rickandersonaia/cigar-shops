define(['knockout', 'text!./yelp-reviews.html'], function(ko, templateMarkup) {

  function YelpReviews(params) {
    this.message = ko.observable('Hello from the yelp-reviews component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  YelpReviews.prototype.dispose = function() { };

  return { viewModel: YelpReviews, template: templateMarkup };

});
