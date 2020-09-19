(function () {
    'use strict';

    angular.module('LaunchCheck', [])
        .controller('LaunchCheckController', LaunchCheckController);

    LaunchCheckController.$inject = ['$scope'];
    function LaunchCheckController($scope) {
        $scope.result = "";
        $scope.dishesString = "";
        $scope.textColorClass = "";
        $scope.formColorClass = "";
        $scope.check = function () {
            if ($scope.dishesString === "") {
                $scope.result = "Please enter data first";
                $scope.textColorClass = "text-danger";
                $scope.formColorClass = "is-invalid";
                return
            }
            let dishesCount = entriesCount($scope.dishesString.split(","));
            if (dishesCount <= 3) {
                $scope.result = "Enjoy!";
            }
            else {
                $scope.result = "Too much!";
            }
            $scope.textColorClass = "text-success";
            $scope.formColorClass = "is-valid";
        };
        function entriesCount (list) {
            let count = 0;
            for (let i = 0; i < list.length; i++) {
                if (list[i].trim() === "") {
                    continue
                }
                count += 1;
            }
            return count;
        }
    }

})();
