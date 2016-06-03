'use strict';

controllers
    
    .controller('StartCtrl', ['$scope', 'PropertySearchService',
    function ($scope, PropertySearchService) {
        PropertySearchService.getProperty().success(function (data) {
            $scope.faves = "Faves " + (PropertySearchService.getLengthLocalStorage() - PropertySearchService.getCountRequest());
            $scope.searchList = PropertySearchService.getSearchList();
        });
    }])

    .controller('ErrorCtrl', ['$scope', 'PropertySearchService',
        function ($scope, PropertySearchService) {
            PropertySearchService.getProperty().success(function (data) {
                $scope.faves = "Faves " + (PropertySearchService.getLengthLocalStorage() - PropertySearchService.getCountRequest());
                $scope.propertyes = data.response.listings;
            });
        }])

    .controller('PropertySearchCtrl', ['$scope', '$location', '$routeParams', 'PropertySearchService',
        function ($scope, $location, $routeParams, PropertySearchService) {
            PropertySearchService.getProperty().success(function (data) {
                $scope.faves = "Faves " + (PropertySearchService.getLengthLocalStorage() - PropertySearchService.getCountRequest());
                $scope.propertyes = data.response.listings;
                $scope.request = PropertySearchService.getRequest();
                $scope.findPropertyes = PropertySearchService.getFindPropertyes($scope.propertyes, $scope.request);
                if ($scope.findPropertyes.length > 0) {
                    PropertySearchService.saveRequest($scope.request, $scope.findPropertyes.length);
                }
                else {
                    document.location.href = '#/errorPage';
                }
            });

        }])

    .controller('PropertyOneCtrl', ['$scope', '$http', '$location', '$routeParams', 'PropertySearchService',
        function ($scope, $http, $location, $routeParams, PropertySearchService) {


            $scope.propertyId = PropertySearchService.getPropertyId();

            $scope.isFavorite = PropertySearchService.isFavoriteProperty($scope.propertyId);
            PropertySearchService.getProperty().success(function (data) {
                $scope.property = data.response.listings.reduce(function (res, cur) {
                    return strIndexOf(cur.lister_url, $scope.propertyId) ? cur : res;
                }, null);
                PropertySearchService.isFavoriteProperty($scope.propertyId);
                $scope.createFavoriteProperty = function () {
                    return PropertySearchService.createFavoriteProperty($scope.propertyId);
                };
                $scope.deleteFavoriteProperty = function () {
                    return PropertySearchService.deleteFavoriteProperty($scope.propertyId);
                };


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
