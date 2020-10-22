(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        let ctrl = this;

        ctrl.found = [];
        ctrl.searchTerm = "";
        ctrl.showErrorMessage = false;
        ctrl.NarrowDown = function () {
            ctrl.showErrorMessage = false;
            ctrl.found = [];

            if (ctrl.searchTerm === "") {
                ctrl.showErrorMessage = true;
            }
            else {
                let promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
                promise.then(function (result) {
                    ctrl.found = result;
                    if (result.length == 0) {
                        ctrl.showErrorMessage = true;
                    }
                });
            }
        };

        ctrl.RemoveItem = function (index) {
            console.log(index);
            console.log(ctrl.found[index]);
            ctrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {

        this.getMatchedMenuItems = function (searchTerm) {
            let httpPromise = $http({
                url: "https://davids-restaurant.herokuapp.com/menu_items.json",
                method: "GET"
            });

            let secondPromise = httpPromise.then(function (result) {
                let menu = result.data['menu_items'];
                // console.log(menu);
                let filtered = [];

                for (let item of menu) {
                    // console.log(item);
                    if (item['description'].includes(searchTerm)) filtered.push(item);
                }

                return filtered;
            });

            return secondPromise;
        }
    }

    function foundItemsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'foundListTemplate.html',
            scope: {
                foundList : '<',
                onRemove: '&'
            }
        }
    }



})();
