/**
 * Created by Timothy on 12/20/2015.
 */
sprwApp.factory('dataService', function(){
    var common = {};
    common = {
        genres: [],
        max: -1,
        min: -1,
        startDate:'',
        endDate:''
    };

    return common;
});