'use strict';

controllers
    
    .controller('StartCtrl', ['$scope', 'PropertySearchService','localStorageService',
    function ($scope, PropertySearchService,localStorageService) {
        PropertySearchService.getProperty().success(function (data) {
            $scope.faves = "Faves " + (localStorageService.getLengthLocalStorage() - localStorageService.getCountRequest());
            $scope.searchList = localStorageService.getSearchList();
        });
    }])

    .controller('ErrorCtrl', ['$scope', 'PropertySearchService','localStorageService',
        function ($scope, PropertySearchService,localStorageService) {
            PropertySearchService.getProperty().success(function (data) {
                $scope.faves = "Faves " + (localStorageService.getLengthLocalStorage() - localStorageService.getCountRequest());
                $scope.propertyes = data.response.listings;
            });
        }])

    .controller('PropertySearchCtrl', ['$scope', '$location', '$routeParams', 'PropertySearchService','localStorageService',
        function ($scope, $location, $routeParams, PropertySearchService,localStorageService) {
            PropertySearchService.getProperty().success(function (data) {
                $scope.faves = "Faves " + (localStorageService.getLengthLocalStorage() - localStorageService.getCountRequest());
                let propertyes = data.response.listings;
                let request = PropertySearchService.getRequest();
                $scope.findPropertyes = PropertySearchService.getFindPropertyes(propertyes, request);
                if ($scope.findPropertyes.length > 0) {
                    localStorageService.saveRequest(request, $scope.findPropertyes.length);
                }
                else {
                    document.location.href = '#/errorPage';
                }
            });

        }])

    .controller('PropertyOneCtrl', ['$scope', '$http', '$location', '$routeParams', 'PropertySearchService','localStorageService',
        function ($scope, $http, $location, $routeParams, PropertySearchService,localStorageService) {

            $scope.createFavoriteProperty = function () {
                return localStorageService.createFavoriteProperty($scope.propertyId);
            };
            $scope.deleteFavoriteProperty = function () {
                return localStorageService.deleteFavoriteProperty($scope.propertyId);
            };

            $scope.propertyId = PropertySearchService.getPropertyId();

            $scope.isFavorite = localStorageService.isFavoriteProperty($scope.propertyId);
            PropertySearchService.getProperty().success(function (data) {
                $scope.property = data.response.listings.reduce(function (res, cur) {
                    return strIndexOf(cur.lister_url, $scope.propertyId) ? cur : res;
                }, null);
                localStorageService.isFavoriteProperty($scope.propertyId);



            });
        }])

    .controller('FavorCtrl', ['$scope', 'PropertySearchService','localStorageService',
        function ($scope, PropertySearchService, localStorageService) {
            PropertySearchService.getProperty().success(function (data) {
                $scope.propertyes = data.response.listings;
                $scope.fPropertyes = localStorageService.getFavoritePropertyes($scope.propertyes);


            });
        }])


;
