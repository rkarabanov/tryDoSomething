'use strict';
propertyApp.service('localStorageService', ['$http', '$routeParams', function ($http, $routeParams) {
    return {
        getSearchList: getSearchList,
        isFavoriteProperty: isFavoriteProperty,
        createFavoriteProperty: createFavoriteProperty,
        deleteFavoriteProperty: deleteFavoriteProperty,
        getCountRequest: getCountRequest,
        getLengthLocalStorage: getLengthLocalStorage,
        saveRequest: saveRequest,
        getFavoritePropertyes:getFavoritePropertyes
    };


    function saveRequest(request ,lenght) {
        localStorage.setItem("Search #" + (getCountRequest() + 1) + " (" + lenght + ")", request);
    }

    function getLengthLocalStorage() {
        return localStorage.length;
    }

    function getCountRequest() {
        let count = 0;
        for (let i in localStorage) {
            if (strIndexOf(i, "Search")) {
                count++;
            }
        }
        return count;
    }

    function createFavoriteProperty(propertyId) {
        localStorage.setItem(propertyId, propertyId);
    }

    function deleteFavoriteProperty(propertyId) {
        localStorage.removeItem(propertyId);
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
        let lsLen = getLengthLocalStorage();
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

    function getSearchList() {
        let searchList = [];
        let lsLen = getLengthLocalStorage();

        if (lsLen > 0) {
            for (let i = 0; i < lsLen; i++) {
                if (strIndexOf(localStorage.key(i),"Search #")) {
                    let obj={key:localStorage.key(i),value:localStorage.getItem(localStorage.key(i))};
                    searchList.push(obj);
                }
            }
        }
        return searchList;
    }

    function isFavoriteProperty(propertyId) {
        // console.log(localStorage);
        let lsLen = getLengthLocalStorage();
        if (lsLen > 0) {
            for (let i = 0; i < lsLen; i++) {
                if (strIndexOf(localStorage.key(i), propertyId)) {
                    return true;
                }
            }
        }
        return false;
    }
}]);