var app = angular.module('myApp', []);

app.controller('myController', function($scope,$http) {
    $http.get("datos.json")
    .then(function(response) {
        alert(response.data);
    });
    $scope.names=[
        {'firstName':'Oscar','lastName':'Castellanos'},
        {'firstName':'Diego','lastName':'Perez'},
    ];
    
    $scope.modifyField = {};
    $scope.showField = {};
    
    var hiddenField = function () {
        $scope.hiddenField();
    }
    
    $scope.hiddenField = function(){
        for (var i = 0, length = $scope.names.length; i < length; i++) {
            $scope.modifyField[i] = true;
            $scope.showField[i] = false;
        }
    };
    
    hiddenField();
    
    $scope.addItem = function() {
         $scope.names.push({'firstName':$scope.firstName,'lastName':$scope.lastName});
         hiddenField();
    };
    
    $scope.removeItem = function(x) {
         $scope.names.splice(x,1);
    };
    
    $scope.modifyTable = function(x){
       $scope.modifyField[x] = false;
       $scope.showField[x] = true;
    };
    
    $scope.updateItem = function(x,model){
       $scope.modifyField[x] = true;
       $scope.showField[x] = false;
       $scope.names[x] = angular.copy(model);
   };
    
});
