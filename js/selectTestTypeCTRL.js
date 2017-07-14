cont_angular.controller('selectTestTypeCTRL', ['$scope', '$stateParams', '$http', '$state', '$ionicPopup',
    function ($scope, $stateParams, $http, $state, $ionicPopup) {
        $scope.data = {"grade": "0", "id_asignature": "NA", max_questions: "0", option: "manual","test_name":""};
        $scope.dbas = []

        //revisa que el formulario este completo
        $scope.validateFields = function () {
          var hasError = false;
          if (typeof $scope.data.test_name == "undefined") {
            hasError = true;
          }
          if ($scope.data.id_asignature == "NA") {
            hasError = true;
          }
          if ($scope.data.grade == 0) {
            hasError = true;
          }
          if ($scope.data.max_questions == 0) {
            hasError = true;
          }
          if (hasError) {
            var alertPopup = $ionicPopup.alert({
                title: 'Datos faltantes',
                template: 'Debe llenar todos los campos para continuar'
            });
            return false;
          }
          return true;
        }

        //al seleccionar el tipo de prueba la variable $scope.data.option contiene el valor correspondiente a ese radio button
        $scope.executeOption = function(){
          if ($scope.validateFields()) {
            //se asignan valores a las variables globales incluidas en controllers.js
            test_name= $scope.data.test_name;
            selected_level= $scope.data.grade;
            selected_asignare = $scope.data.id_asignature
            max_questions= $scope.data.max_questions;
            selected_option = $scope.data.option;
            //si la opcion es manual se procede a seleccionar los dbas a mano
            if($scope.data.option=="manual"){
              $state.go("select_dba");
            } else{
              //si la opcion es random, entonces e sacan los datos de los dbas asociados a ese curso y materia.
              var url = "data/dbas/"+$scope.data.grade+$scope.data.id_asignature+".json";
    					if(ionic.Platform.isAndroid()){
    						url = "/android_asset/www/data/dbas/"+$scope.data.grade+$scope.data.id_asignature+".json";
    					}

    					$http.get(url).success(function(response){
    						var inputs = response;
                //se asignan todos los dba a la entrada de la prueba aleatoria. como si se selecionaran todos.
                for (var i = 0; i < inputs.length; i++) {
                    selected_dbas.push(inputs[i].id);
                }
    						var url = "data/questions.json";
    						if(ionic.Platform.isAndroid()){
    							url = "/android_asset/www/data/questions.json";
    						}
                //se cargan todas las preguntas de todos los dbas de esos cursos y materias seleccionados.
    						$http.get(url).success(function(response){
    							for (var o in selected_dbas){
    								if (response[selected_dbas[o]]){
    									$scope.dbas.push(response[selected_dbas[o]])
    								}
    							}
                  //se toman de manera aleatoria n preguntas , corregir con lo que hay en la aplicacion de estuduiantes en el controlador createQuestinary.js
    							for (var i in $scope.dbas) {
                      for (var j in $scope.dbas[i]["questions"]) {
                          if (selected_questions.length < max_questions) {
                              if (Math.random() > 0.5) {
                                  selected_questions.push($scope.dbas[i]["questions"][j].id);
                              }
                          }
                      }
                  }
                  //barajar el orden de las preguntas.
    							shuffle(selected_questions);
    							questions_data = $scope.dbas;
    							$state.go("show_test");
    						});
    					});
            }
          }
        }
    }]);
