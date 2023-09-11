//Выход из личного кабинета

let logoutButton = new LogoutButton();

logoutButton.action = function () {
  ApiConnector.logout((result) => {
    if (result) {
      location.reload();
    }
  });

  //Получение информации о пользователе

  ApiConnector.current((data) => {
    if (data) {
      ProfileWidget.showProfile(data);
    }
  });
};

//Получение текущих курсов валюты

let ratesBoard = new RatesBoard();

function exchangeRates() {
  let bodyBoard = RatesBoard.tableBody;

  ApiConnector.getStocks((result) => {
    if (result) {
      RatesBoard.clearTable();
      RatesBoard.fillTable(bodyBoard);
    }
  });
}

let startBoard = setInterval(exchangeRates(), 60000);

startBoard();

//Операции с деньгами

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (result) => {
    if (result) {
      ProfileWidget.showProfile(data);
      FavoritesWidget.setMessage(isSuccess, "Успешно"); //нужно ли менять что то в аргументах метода?
    }

    FavoritesWidget.setMessage(isSuccess, "Ошибка");
  });
}

//Остановился на пункте 3 части Операции с деьгами. 
