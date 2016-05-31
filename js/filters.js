propertyApp.filter('changeURL',function () {
    return function (input) {
        console.log(input.split('http://www.nestoria.co.uk/detail/')[0]);
        return input.split('http://www.nestoria.co.uk/detail/')[1];
    }
});