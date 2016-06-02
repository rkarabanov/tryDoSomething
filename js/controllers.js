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

            //console.log(data.response.lister_url|changeURL);
            for (let k in $routeParams) {
                $scope.propertyId = k;
                break;
            }
            PropertySearchService.getProperty().success(function (data) {
                $scope.property = data.response.listings.reduce(function (res, cur) {
                    return strIndexOf(cur.lister_url, $scope.propertyId) ? cur : res;
                }, null);
                $scope.doFavor = function () {
                    let button = document.getElementsByClassName('glyphicon')[0];
                    if (button.className === "glyphicon glyphicon-star") {
                        localStorage.removeItem($scope.propertyId);
                        button.className = "glyphicon glyphicon-star-empty";
                        console.log("glyphicon-star -> glyphicon-star-empty");
                    }
                    else {
                        button.className = "glyphicon glyphicon-star";
                        localStorage.setItem($scope.propertyId, $scope.propertyId);
                        console.log("glyphicon-star <- glyphicon-star-empty");
                    }
                };
                (function () {
                    let lsLen = localStorage.length;
                    if (lsLen > 0) {
                        for (let i = 0; i < lsLen; i++) {
                            if (strIndexOf(localStorage.key(i), $scope.propertyId)) {
                                $scope.doFavor();
                                break;
                            }
                        }
                    }
                })();


            });
        }])
    .controller('FavorCtrl', ['$scope', 'PropertySearchService',
        function ($scope, PropertySearchService) {
            PropertySearchService.getProperty().success(function (data) {

                $scope.propertyes = data.response.listings;
                $scope.fPropertyes = [];
                let lsLen = localStorage.length;
                if (lsLen > 0) {
                    //console.log(lsLen+ " "+ $scope.propertyes.length);
                    for (let i = 0; i < lsLen; i++) {
                        for (let j = 0; j < $scope.propertyes.length; j++) {
                            console.log($scope.propertyes[j].lister_url + " " + localStorage.key(i));
                            if (strIndexOf($scope.propertyes[j].lister_url, localStorage.key(i))) {
                                $scope.fPropertyes.push($scope.propertyes[j]);
                            }
                        }

                    }
                }
            });
        }])


;
