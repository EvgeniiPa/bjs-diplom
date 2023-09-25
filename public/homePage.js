//Выход из личного кабинета

let logoutButton = new LogoutButton();

logoutButton.action = function () {
  ApiConnector.logout((result) => {
    if (result) {
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
    if (result) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(result.data);
    }
  });
}

setInterval(exchangeRates, 60000);

//Операции с деньгами

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (result) => {
    if (result) {
      ProfileWidget.showProfile(data.data);
      moneyManager.setMessage(result);
    }
    moneyManager.setMessage(result);
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (result) => {
    if (result) {
      ProfileWidget.showProfile(data.data);
      moneyManager.setMessage(result);
    }
    moneyManager.setMessage(result);
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (result) => {
    console.log(data);
    if (result) {
      ProfileWidget.showProfile(data);
      moneyManager.setMessage(result.success);
    }
    moneyManager.setMessage(result.success);
  });
};

//Работа с избранным

let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((result) => {
  if (result) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(result.data);
    moneyManager.updateUsersList(result.data);
  }
});

favoritesWidget.addUserCallback = function (date) {
  ApiConnector.addUserToFavorites(date, (result) => {
    if (result) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(result.data);
      moneyManager.updateUsersList(result.data);
    }
    favoritesWidget.setMessage(result.error);
  });
};

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (result) => {
    console.log(result);
    if (result) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(result.data);
      moneyManager.updateUsersList(result.data);
      favoritesWidget.setMessage();
    }
    favoritesWidget.setMessage(result.error);
  });
};

/* 
Не получается вывести в консоль или в отладке посомтреть сообщение об ошибке или успехе. Выдает ошибку в файле
Apiconector.js
*/
