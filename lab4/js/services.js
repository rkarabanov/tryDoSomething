'use strict';
propertyApp.service('PropertySearchService', ['$http', '$routeParams', function ($http, $routeParams) {
    return {
        getProperty: getProperty,
        getPropertyId: getPropertyId,
        getRequest: getPropertyId,
        getFindPropertyes: getFindPropertyes
    };

    function getFindPropertyes(propertyes, request) {
        let findPropertyes = [];
        if(request===undefined){return findPropertyes;}
        let arr = request.split(' ');
        let flag = true;
        for (let i = 0; i < propertyes.length; i++) {
            flag = true;
            for (let j of arr) {
                if (!strIndexOf(propertyes[i].keywords, j)) {
                    flag = false;
                }
            }
            if (flag) {
                findPropertyes.push(propertyes[i]);
            }
        }
        return findPropertyes;
    }
    

    function getPropertyId() {
        for (let k in $routeParams) {
            return k;
        }
    }

    function getProperty() {
        return $http.get('propertyes/propertyes.json');
    }
    
}])


;