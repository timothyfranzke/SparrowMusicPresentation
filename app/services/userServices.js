/**
 * Created by Timothy on 11/22/2015.
 */

sprwApp.factory('userServices',function(baseService){
    var userInfo = [];
    var userArtistsList = {};
    return {
        createUser: function(userData){
            return baseService.POST(user, userData);
        },
        updateUser: function(id, userData){
            return baseService.PUT(user, id, userData);
        },
        getUserArtists: function(email){
            var query = "?email=" + email;
            return baseService.GET(userArtists, query)
        },
        getUserEvents: function(email){
            var query = "?email=" + email;
            return baseService.GET(userEvents, query);
        },
        getUserBullitens: function(email){
            var query = "?email=" + email;
            return baseService.GET(userBullitens, query);
        },
        followArtist: function(userData){
            return baseService.POST(follow, userData);
        },
        unFollowArtist: function(userData){
            return baseService.POST(unfollow, userData);
        },
        getUserArtistsList: function(){
            return userArtistsList;
        },
        setUserData: function(model){
            userArtistsList = model;
        },
        getFilters: function(email, token){
            var query = "?useremail=" + email + "&token=" + token;
            return baseService.GET(userFilters, query)
        },
        saveFilter: function(filterData){
            return baseService.POST(userFilters, filterData);
        }
    }
});
