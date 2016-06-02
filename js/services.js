'use strict';
propertyApp.service('PropertySearchService', ['$http', function ($http) {
    return {getProperty: getProperty};

    function getProperty() {
        return $http.get('propertyes/propertyes.json');
    }
}]);