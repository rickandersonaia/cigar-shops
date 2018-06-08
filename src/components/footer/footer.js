define(['knockout', 'text!./footer.html'], function(ko, templateMarkup) {

  function Footer(params) {
    this.message = ko.observable('Hello from the footer component!');
  }

  return { viewModel: Footer, template: templateMarkup };

});
