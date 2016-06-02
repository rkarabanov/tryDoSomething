'use strict';

controllers.controller('PropertySearchCtrl', ['$scope', 'PropertySearchService',
    function ($scope, PropertySearchService) {
        PropertySearchService.getProperty().success(function (data) {
            $scope.faves = "Faves " + localStorage.length;
            $scope.propertyes = data.response.listings;
            let inputEl = document.getElementById('input');
            //console.log(inputEl);

            // $scope.goSearch = function () {
            //     console.log($scope.searchReqest);
            //     let request = $scope.searchReqest.toUpperCase().split(' ');
            //     $scope.searchPropertyes = [];
            //     let flag = true;
            //     for (let property in $scope.propertyes) {
            //         flag = true;
            //         for (let i in request) {
            //             if (flag && !strIndexOf(property.keywords.toUpperCase(), i)) {
            //                 flag = false;
            //             }
            //         }
            //         if (flag) {
            //             $scope.searchPropertyes.push(property);
            //         }
            //     }
            //     if( $scope.searchPropertyes.length==0){
            //         indow.location.href= "error_state.html"
            //     }
            //     else{
            //        
            //     }
            // };

        });
    }])
    .controller('PropertyOneCtrl', ['$scope', '$http', '$location', '$routeParams', 'PropertySearchService',
        function ($scope, $http, $location, $routeParams, PropertySearchService) {
            $scope.propertyId=PropertySearchService.getPropertyId();
            $scope.doFavor = function () {
                return PropertySearchService.doFavor($scope.propertyId);
            };
           
            PropertySearchService.getProperty().success(function (data) {
                $scope.property = data.response.listings.reduce(function (res, cur) {
                    return strIndexOf(cur.lister_url, $scope.propertyId) ? cur : res;
                }, null);
                PropertySearchService.isFavoriteProperty($scope.propertyId);
                


            });
        }])
    .controller('FavorCtrl', ['$scope', 'PropertySearchService',
        function ($scope, PropertySearchService) {
            PropertySearchService.getProperty().success(function (data) {

                $scope.propertyes = data.response.listings;
                $scope.fPropertyes = PropertySearchService.getFavoritePropertyes($scope.propertyes);

            });
        }])


;
