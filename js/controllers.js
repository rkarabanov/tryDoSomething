'use strict';


propertyApp.controller('PropertySearchCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('propertyes/propertyes.json').success(function (data) {
            console.log(data);
            $scope.propertyes = data.response.listings;
        })
    }])
    .controller('PropertyOneCtrl', ['$scope', '$http', '$location','$routeParams',
        function ($scope, $http, $location, $routeParams) {
            
                console.log(data.response.lister_url|changeURL);
                $scope.propertyId =  $routeParams.propertyId ;
            
        }])
;
