function Contact(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.address-type").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}

$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                '<div class="form-group">' +
                                  '<input type="text" class="form-control address-type" placeholder="Home, Work, etc">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<input type="text" class="form-control new-street" placeholder="Street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<input type="text" class="form-control new-city" placeholder="City">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<input type="text" class="form-control new-state" placeholder="state">' +
                                '</div>' +
                              '</div>');
  });


  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedType = $(this).find("input.address-type").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();

      var newAddress = { addressType: inputtedType, street: inputtedStreet, city: inputtedCity, state: inputtedState };
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");


    $(".contact").last().click(function() {
      $("#show-contact").show();

      $("#show-contact h2").text(newContact.firstName + " " + newContact.lastName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#addresses").text("");

      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.addressType + ": " + address.street + ", " + address.city + ", " + address.state + "</li>");
      });
    });

    resetFields();

  });
});
