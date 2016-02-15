/**
 * Created by Timothy on 11/24/2015.
 */
sprwApp.factory('playlistServices', function(baseService){
    return {
        getDiscoverPlaylist: function(){
            var query = "?page=1";
            return baseService.GET(discover,query);
        },
        search: function(searchData){
            var query = "?name="+searchData;
            return baseService.GET(search, query);
        },
        trackPopularity: function(trackPopularityData){
            return baseService.POST(popular, trackPopularityData);
        }
    }
});
