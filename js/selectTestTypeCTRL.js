cont_angular.controller('selectTestTypeCTRL', ['$scope', '$stateParams', '$http', '$state', '$ionicPopup',
    function ($scope, $stateParams, $http, $state, $ionicPopup) {
        $scope.data = {"grade": "0", "id_asignature": "NA", max_questions: "5", option: "manual","test_name":""};
        $scope.dbas = []

        $scope.executeOption = function(){
          test_name= $scope.data.test_name;
          selected_level= $scope.data.grade;
          selected_asignare = $scope.data.id_asignature
          max_questions= $scope.data.max_questions;
          if($scope.data.option=="manual"){
            $state.go("select_dba");
          } else{
            var url = "data/dbas/"+$scope.data.grade+$scope.data.id_asignature+".json";
  					if(ionic.Platform.isAndroid()){
  						url = "/android_asset/www/data/dbas/"+$scope.data.grade+$scope.data.id_asignature+".json";
  					}

  					$http.get(url).success(function(response){
  						var inputs = response;
              for (var i = 0; i < inputs.length; i++) {
                  selected_dbas.push(inputs[i].id);
              }
  						var url = "data/questions.json";
  						if(ionic.Platform.isAndroid()){
  							url = "/android_asset/www/data/questions.json";
  						}
  						$http.get(url).success(function(response){
  							console.log(selected_dbas)
  							console.log(response)
  							for (var o in selected_dbas){
  								console.log(o)
  								if (response[selected_dbas[o]]){
  									$scope.dbas.push(response[selected_dbas[o]])
  								}
  							}
  							for (var i in $scope.dbas) {
                    for (var j in $scope.dbas[i]["questions"]) {
                        if (selected_questions.length < max_questions) {
                            if (Math.random() > 0.5) {
                                selected_questions.push($scope.dbas[i]["questions"][j].id);
                            }
                        }
                    }
                }
  							shuffle(selected_questions);
  							questions_data = $scope.dbas;
  							$state.go("show_test");
  						});
  					});
          }
        }
    }]);
