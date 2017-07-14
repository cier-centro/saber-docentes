cont_angular.controller('showTestCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicModal', '$ionicScrollDelegate',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicModal, $ionicScrollDelegate) {
        $scope.header_data = {test:test_name,asignature:selected_asignare,level:selected_level}
        if (selected_questions.length == 0) {
            $state.go("dbasselection");
        }
        //busca las preguntas en el json
        $scope.findQuestion = function (id) {
            for (var k in questions_data) {
                for (var k2 in questions_data[k]["questions"]) {
                    if (questions_data[k]["questions"][k2].id == id) {
                        return questions_data[k]["questions"][k2]
                    }
                }
            }
        }

        //renderizar el canvas de los pdf de manera asincorna.
        var renderCanvas = function(){
          for(var q in user_answers){
            var que=user_answers[q].question
            if (que.file){
              if(que.file.endsWith(".pdf")){
                $scope.loadPDFAng(que.file, q)
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
            //tiene que estar la linea de mathjax 2 veces o sirve.
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            MathJax.Hub.Queue([renderCanvas, MathJax.Hub]);
        })

        $scope.loadPDFAng = function (file,group) {
          console.log("pdf_viewer_"+group)
          try{
            document.getElementById("pdf_viewer_"+group).style.display="block"
            loadFirstPagePDF("contents/"+file,"pdf_viewer_"+group);
            $ionicScrollDelegate.resize();
            }
            catch(e){
              console.log(e);
            }
        }

        $scope.resetvariablesAndGoBack = function () {
          //setea las variables gobales definidas en controllers.js
            selected_dbas = [];
            max_questions = 0;
            user_name = "";
            questions_data = {};
            selected_questions = [];
            current_question = 0;
            user_answers = {};
            $state.go('start')
        }

        //vuelve a la pantalla anterior dependiendo de la opcion seleccionada anteriormente
        $scope.backToQuestion = function () {
          if(selected_option=="manual"){
            selected_questions = [];
            $state.go('selectQuestions')
          }else{
            selected_dbas = [];
            max_questions = 0;
            user_name = "";
            questions_data = {};
            selected_questions = [];
            current_question = 0;
            user_answers = {};
            $state.go('select_test_type')
          }
        }
        //funcion de impresion de pdf utiulizando el api de electron.
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

        //guardar el archivo de texto plano
        //la estructura de este archivo de texto plano es:
        //nombre_de_prueba(salto de linea)
        //lista de codigos de pregutas separado por comas
        $scope.saveQuestionary = function () {
    			const electron= nodeRequire('electron').remote;
    			const fs = nodeRequire('fs');
          const dialog = electron.dialog;
          dialog.showSaveDialog({filters:[{name: 'Resultado prueba tipo saber', extensions: ['prueba']}]}, function (fileNames) {
            if (fileNames === undefined) return;
            let win = electron.BrowserWindow.getFocusedWindow();
            var contents = test_name+"\n";
            var codes=[];
            for(var q in user_answers){
              codes.push(user_answers[q].question.cod_question)
            }
            contents+=codes.join(",");
            fs.writeFile(fileNames, contents, function(err) {
              if(err) alert('genearte pdf error', err)
            })
          });

        };


        $scope.answerSheet=function(){
          $state.go("show_answer_sheet")
        }
    }])
