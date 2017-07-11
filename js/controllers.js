//Deficinion de variables gobales, accesibles desde cualquier lugar de la aplicacion.
var selected_dbas = [];
var max_questions = 0;
var user_name = "";
var test_name = "";
var questions_data = {};
var selected_questions = [];
var current_question = 0;
var user_answers = {};
var selected_level= 0;
var selected_asignare = "Y";
var selected_option = "";

//funcion para cambar el orden de los elementos de una rreglo, se usa en las preguntas t en sus posibles respuestas.
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

var cont_angular = angular.module('app.controllers', [])
