define(['knockout', 'text!./test.html'], function(ko, templateMarkup) {

  function Test(params) {
    this.message = ko.observable('Hello from the test component!');
    this.cityList = ko.observableArray();

    $.getJSON("components/test/main-map-model.json", this.cityList);

    console.log(this.cityList());
  }



  return { viewModel: Test, template: templateMarkup };

});
