'use strict';
var propertyApp=angular.module('propertyApp',['ngRoute']);

propertyApp
.config(['$routeProvider','$locationProvider',function ($routeProvide, $locationProvide) {
    $routeProvide
        .when('/',{
            templateUrl:'templates/startPage.html',
            controller:'PropertySearchCtrl'
        })
        .when('/errorPage',{
            templateUrl:'templates/error_state.html',
            controller:'PropertySearchCtrl'
        })
        .when('/listedPage',{
            templateUrl:'templates/listed_locations.html',
            controller:'PropertySearchCtrl'
        })
        .when('/:propertyId',{
            templateUrl:'templates/one_property.html',
            controller:'PropertyOneCtrl'
        })
        .otherwise({
            redirectTo:'/'
        });
}]);