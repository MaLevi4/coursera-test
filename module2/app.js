(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService']
    function ToBuyController (ShoppingListCheckOffService) {
        this.elementsList = ShoppingListCheckOffService.getToBuy();
        this.buyItem = function (index) {
            ShoppingListCheckOffService.moveToBought(index);
        };
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.elementsList = ShoppingListCheckOffService.getAlreadyBought();
    }


    function ShoppingListCheckOffService() {
        let toBuyList = [{name: "Apple", quantity: 10}, {name: "Bananas", quantity: 99}, {name: "Salt", quantity: 1},
            {name: "Bread", quantity: 2}, {name: "Milk", quantity: 5}];
        let alreadyBoughtList = [];

        this.getToBuy = function () {
          return toBuyList;
        };
        this.getAlreadyBought = function () {
          return alreadyBoughtList;
        };
        this.moveToBought = function (index) {
            let elementObject = toBuyList[index];
            toBuyList.splice(index, 1);
            alreadyBoughtList.push(elementObject);
        }

    }
})();
