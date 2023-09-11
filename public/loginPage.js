"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = function (data) {
  ApiConnector.login(data, (property) => {
    console.log(property);

    if (property.success == true) {
      location.reload();
    } else {
      throw new Error("Ошибка авторизации.");
    }
  });
};

userForm.registerFormCallback = function (data) {
  ApiConnector.login(data, (property) => {
    console.log(property);

    if (property.success == true) {
      location.reload();
    } else {
      throw new Error("Ошибка регистрации.");
    }
  });
};
