/**
 * Created by Timothy.Franzke on 12/18/2015.
 */

sprwApp.filter('inArray', function() {
    return function(array, value) {
        return array.indexOf(value) !== -1;
    };
});