propertyApp.filter('changeURL',function () {
    return function (input) {
        return input.split('http://www.nestoria.co.uk/detail/')[1];
    }
});