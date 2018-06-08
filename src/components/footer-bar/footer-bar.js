define(['knockout', 'text!./footer-bar.html'], function(ko, templateMarkup) {

  function FooterBar(params) {
    this.message = ko.observable('Hello from the footer-bar component!');
    this.year = ko.observable((new Date()).getFullYear());
  }


  return { viewModel: FooterBar, template: templateMarkup };

});
