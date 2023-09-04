"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = function (data) {
  if (ApiConnector.login.find(data)) {
    userForm.loginFormCallback();
    location.reload();
    return ApiConnector.login;
  }

  throw new Error("такой пользователь не существует");
};
