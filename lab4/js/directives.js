'use strict';
propertyApp.directive('favoriteButton',function () {

    return{

        restrict: 'A',
        replace: false,
        scope: true,
        link: function($scope, element, attrs) {
           // console.log(element);


            $scope.toggleIcon = function() {
               // console.log(element);
                $scope.isFavorite=!$scope.isFavorite;
                
                if($scope.isFavorite){
                    $scope.createFavoriteProperty();
                }
                    else{
                    $scope.deleteFavoriteProperty();
                }
            }
        }
    }
});