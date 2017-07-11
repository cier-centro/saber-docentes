cont_angular.controller('showAnswerSheetCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicModal', '$ionicScrollDelegate',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicModal, $ionicScrollDelegate) {


        $scope.findQuestion = function (id) {
            for (var k in questions_data) {
                for (var k2 in questions_data[k]["questions"]) {
                    if (questions_data[k]["questions"][k2].id == id) {
                        return questions_data[k]["questions"][k2]
                    }
                }
            }
        }

        $scope.$on('$ionicView.enter', function () {
            user_answers=[]
            for(var q in selected_questions){
              var que=$scope.findQuestion(selected_questions[q])
              user_answers.push({"question": que})
            }
            $scope.questions = user_answers;
            $scope.infoquestions = questions_data;
            $scope.name = user_name;
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        })

        $scope.goBack=function(){
          $state.go("show_test")
        }


        $scope.Print = function () {
          $ionicScrollDelegate.scrollTop();
    			const electron= nodeRequire('electron').remote;
    			const fs = nodeRequire('fs');
          const dialog = electron.dialog;
          dialog.showSaveDialog({filters:[{name: 'Resultado prueba tipo saber', extensions: ['pdf']}]}, function (fileNames) {
            if (fileNames === undefined) return;
            let win = electron.BrowserWindow.getFocusedWindow();
      			console.log(win)
            win.webContents.printToPDF({
  		           landscape: false
  		      }, function(err, data) {
              var dist = fileNames;
              console.log(dist)
              fs.writeFile(dist, data, function(err) {
                if(err) alert('genearte pdf error', err)
              })
            })
          });

        };
    }])
