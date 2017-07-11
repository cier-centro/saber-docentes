cont_angular.controller('selectDbasCTRL', ['$scope', '$stateParams', '$http', '$state', '$ionicPopup',
function ($scope, $stateParams, $http, $state, $ionicPopup) {
  $scope.data = {"grade": selected_level, "id_asignature": selected_asignare};
  $scope.header_data = {test:test_name,asignature:selected_asignare,level:selected_level}
  $scope.dbas = []

  $scope.goBack = function () {
    $state.go('select_test_type');
  }

  //esta funcion debe cagar los datos usando AJAX. tambien es posible usar el api de File de electron, sinemabrgo esto es mas sencillo y es compaible con ionic.
  $scope.getDbaData = function () {
    var url = "data/dbas/"+$scope.data.grade+$scope.data.id_asignature+".json";
    if(ionic.Platform.isAndroid()){
      url = "/android_asset/www/data/dbas/"+$scope.data.grade+$scope.data.id_asignature+".json";
    }

    $http.get(url).success(function(response){
      $scope.dbas = response;
      console.log(response)
    });
  };

  $scope.$on('$ionicView.enter', function () {
    $scope.getDbaData();
    $scope.$apply();
    selected_dbas = [];
  });

  //recorre todos los inputs de la pagina y anade el name a una lista.
  $scope.saveSelectedDbas = function () {
    var inputs = document.getElementById('dba_list').elements;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        console.log("AQUI: "+inputs[i].name)
        selected_dbas.push(inputs[i].name)
      }
    }

    if (selected_dbas.length == 0) {
      var alertPopup = $ionicPopup.alert({
        title: 'Seleccione dbas',
        template: 'Debe seleccionar dbas para poder continuar.'
      });
      return null;
    }
    $state.go("selectQuestions");
  };

  $scope.clearDbaList = function () {
    $scope.dbas = [];
  };

}]);
