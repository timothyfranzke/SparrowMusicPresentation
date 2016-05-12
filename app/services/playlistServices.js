/**
 * Created by Timothy on 11/24/2015.
 */
sprwApp.factory('playlistServices', function(baseService){

    return {
        playlistId:0,
        pages:0,
        currentPage:1,
        playlist:[],
        ogPlaylist:[],
        currentFilter:{
            genres:[],
            popularity:-1,
            location:-1,
            startDate:'',
            endDate:''
        },
        ogFilter:{},

        getDiscvoerPlaylistMetaData: function(){
            var query = "?page=null&playlistid=null";
            return baseService.GET(discover,query);
        },
        getDiscoverPlaylist: function(){
            if (this.currentPage <= this.pages)
            {
                var query = "?page=" + this.currentPage + "&playlistID=" + this.playlistId;
                this.currentPage++;
                return baseService.GET(discover,query);
            }
        },
        search: function(searchData){
            var query = "?name="+searchData;
            return baseService.GET(search, query);
        },
        trackPopularity: function(trackPopularityData){
            return baseService.POST(popular, trackPopularityData);
        },
        rest:function(){
            this.playlist = [];
        },
        filter: function(){
            var canFilter = false;
            //console.log("playlist after: " + JSON.stringify(playlist));

            var holder = [];
            var i = 0;
            var pop = this.currentFilter.popularity;
            var genres = this.currentFilter.genres;
            var startDate = this.currentFilter.startDate;
            var endDate = this.currentFilter.endDate;
            var location = this.currentFilter.location;

            for(var index in this.playlist){
                var record = this.playlist  [index];
                //console.log("record pop index: " + JSON.stringify(record));
                //console.log("filter pop index: " + pop);
                if (record.popIndex <= pop)
                {
                    canFilter = true;
                }
                if (canFilter)
                {
                    var genreFound = false;
                    genres.forEach(function(genreObject)
                    {
                        if(genreObject.selected)
                        {
                            if (record.genres.indexOf(genreObject.genreId) > -1)
                            {
                                genreFound = true;
                            }
                        }
                    });
                    canFilter = genreFound;
                }
                if (canFilter && false)
                {
                    if (endDate < startDate)
                    {
                        if (convertTDate(record.releaseDate) <= startDate && convertTDate(record.releaseDate) >= endDate){
                            canFilter = true;
                        }
                        else{
                            canFilter = false;
                        }
                    }
                }
                if (canFilter)
                {
                    record.isVisible = true;
                }
                else{
                    record.isVisible = false;
                }
            }
        },
        resetFilter : function(){
            var i = 0;
            for(var index in this.playlist){
                var record = this.playlist[index];
                record.isVisible = true;
            }
        }
    }
});
