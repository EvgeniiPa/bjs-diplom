"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = function (data) {
  ApiConnector.login(data, (property) => {
    if (property.success == true) {
      location.reload();
    } else {
      this.setLoginErrorMessage(property.error);
    }
  });
};

userForm.registerFormCallback = function (data) {
  ApiConnector.register(data, (property) => {
    if (property.success == true) {
      location.reload();
    } else {
      this.setLoginErrorMessage(property.error);
    }
  });
};
