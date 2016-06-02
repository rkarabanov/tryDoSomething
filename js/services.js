'use strict';
propertyApp.service('PropertySearchService', ['$http', '$routeParams', function ($http, $routeParams) {
    return {
        getProperty: getProperty,
        getPropertyId: getPropertyId,
        doFavor: doFavor,
        getFavoritePropertyes: getFavoritePropertyes,
        isFavoriteProperty: isFavoriteProperty
    };

    function doFavor(propertyId) {
        let button = document.getElementsByClassName('glyphicon')[0];
        console.log(button);
        if (button.className === "glyphicon glyphicon-star") {
            localStorage.removeItem(propertyId);
            button.className = "glyphicon glyphicon-star-empty";
            console.log("glyphicon-star -> glyphicon-star-empty");
        }
        else {
            button.className = "glyphicon glyphicon-star";
            localStorage.setItem(propertyId, propertyId);
            console.log("glyphicon-star <- glyphicon-star-empty");
        }
    }

    function getPropertyId() {
        for (let k in $routeParams) {
            return k;
        }
    }

    function getProperty() {
        return $http.get('propertyes/propertyes.json');
    }

    function getFavoritePropertyes(propertyes) {
        let fPropertyes = [];
        let lsLen = localStorage.length;
        if (lsLen > 0) {
            //console.log(lsLen+ " "+ propertyes.length);
            for (let i = 0; i < lsLen; i++) {
                for (let j = 0; j < propertyes.length; j++) {
                    if (strIndexOf(propertyes[j].lister_url, localStorage.key(i))) {
                        fPropertyes.push(propertyes[j]);
                    }
                }

            }
        }
        return fPropertyes;
    }

    function isFavoriteProperty(propertyId) {

        let lsLen = localStorage.length;
        if (lsLen > 0) {
            for (let i = 0; i < lsLen; i++) {
                if (strIndexOf(localStorage.key(i), propertyId)) {
                    doFavor(propertyId);
                    break;
                }
            }
        }

    }
}]);