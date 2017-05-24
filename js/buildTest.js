cont_angular.controller('constructTestCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicPopup',
    function ($scope, $stateParams, $http, $state, $ionicPopup) {
        $scope.data = {"grade": "0", "id_asignature": "NA", max_questions: "5", option: "manual","test_name":""};
        $scope.nextBTNText = "Seleccionar DBAS"
    }]);
