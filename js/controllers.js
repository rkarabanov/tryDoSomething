'use strict';
var propertyApp=angular.module('propertyApp',['ngRoute','ngResource']);

propertyApp.controller('PropertySearchCtrl',['$scope','$http', '$location',
    function ($scope, $http, $location) {
        $scope.phones=Phone.query();

    }]);