/**
 * Created by Timothy on 12/12/2015.
 */
sprwApp.factory('userDataServices', function(){
    var followed = {};

    followed = {
        artistIds:[],
        events:[],
        bullitens:[],
        likedTrackIds:[]
    };

    return followed;
});
