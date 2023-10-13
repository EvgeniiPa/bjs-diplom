//Выход из личного кабинета

let logoutButton = new LogoutButton();

logoutButton.action = function () {
  ApiConnector.logout((result) => {
    if (result.success) {
      location.reload();
    }
  });
};

//Получение информации о пользователе

ApiConnector.current((data) => {
  if (data) {
    ProfileWidget.showProfile(data.data);
  }
});

//Получение текущих курсов валюты

let ratesBoard = new RatesBoard();

function exchangeRates() {
  ApiConnector.getStocks((result) => {
    if (result.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(result.data);
    }
  });
}

exchangeRates();
setInterval(exchangeRates, 60000);

//Операции с деньгами

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (result) => {
    if (result.success) {
      ProfileWidget.showProfile(result.data);
      moneyManager.setMessage(result.success, "успешно");
    } else {
      moneyManager.setMessage(result.success, result.error);
      console.log(result.error);
    }
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (result) => {
    if (result.success) {
      ProfileWidget.showProfile(result.data);
      moneyManager.setMessage(result.success, "успешно");
    } else {
      moneyManager.setMessage(result.success, result.error);
    }
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (result) => {
    if (result.success) {
      ProfileWidget.showProfile(result.data);
      moneyManager.setMessage(result.success, "успешно");
    } else {
      moneyManager.setMessage(result.success, result.error);
    }
  });
};

//Работа с избранным

let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((result) => {
  if (result.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(result.data);
    moneyManager.updateUsersList(result.data);
  }
});

favoritesWidget.addUserCallback = function (date) {
  ApiConnector.addUserToFavorites(date, (result) => {
    if (result.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(result.data);
      moneyManager.updateUsersList(result.data);
    } else {
      favoritesWidget.setMessage(result.success, result.error);
    }
  });
};

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (result) => {
    if (result.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(result.data);
      moneyManager.updateUsersList(result.data);
      favoritesWidget.setMessage(result.success, "успешно");
    } else {
      favoritesWidget.setMessage(result.error);
    }
  });
};

/* 
Не получается вывести в консоль или в отладке посомтреть сообщение об ошибке или успехе. Выдает ошибку в файле
Apiconector.js
*/
