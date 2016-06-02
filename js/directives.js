'use strict';
propertyApp.directive('toggle',function () {

    return{
        restrict: 'A',
        scope: {
            toggle: "="
        },
        link: function($scope, element, attrs) {
            console.log(element);
            $scope.$watch("toggle", function(value) {
                element.toggleClass('glyphicon glyphicon-star-empty', value);
            });

            element.click(function() {
                $scope.$apply(function() {
                   $scope.toggle=!$scope.toggle;
                })
            })
        }
    }
});