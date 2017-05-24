cont_angular.controller('startPageCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicScrollDelegate',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicScrollDelegate) {
        $scope.buildTest=function(){
          $state.go("dbasselection")
        }

    }]);
