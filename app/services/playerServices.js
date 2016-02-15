sprwApp.factory('playerService', function (audio, $rootScope, trackServices) {
    var player,
        index = 0,
        playlist = [],
        ogPlaylist = [],
        filters = [],
        currentFilter = {
            genres:[],
            popularity:-1,
            location:-1,
            startDate:'',
            endDate:''
        },
        paused = false,
        current = {
            artistName:"",
            artistId: 0,
            albumId: 0,
            trackId: 0,
            trackName: ""
        },
        image = "";

    player = {
        filters: filters,

        playlist: playlist,

        ogPlaylist: ogPlaylist,

        current: current,

        currentFilter: currentFilter,

        playing: false,

        play: function (item) {
            if (!this.playlist.length) return;

            if (angular.isDefined(item)) current = item;

            if (!paused) {
                audio.src = audioBase + current.artistId + '/' + current.albumId + "/" + current.trackId + "/" + current.trackId + ".mp3";
            }

            audio.play();
            player.playing = true;
            paused = false;
        },

        pause: function () {
            if (player.playing) {
                audio.pause();
                player.playing = false;
                paused = true;
            }
        },

        next: function () {
            var pop = {
                "criteria": "skip",
                "trackId": current.trackId
            };
            trackServices.trackPopularity(pop);
            if (!this.playlist.length) return;
            paused = false;
            if (index < this.playlist.length - 1) {
                index++;
            } else {
                index = 0;
            }
            current = this.playlist[index];
            if (player.playing) player.play();
        },
        image : function(){
            return imageBase + current.artistId + '/' + current.albumId + "/0.jpg";
        },
        artistName : function(){
            return current.artistName;
        },
        trackName : function(){
            return current.trackName;
        },
        clearPlaylist: function(){
            this.playlist = [];
        },
        time : audio.currentTime
        ,
        addPlaylist: function(item){
            if (playlist.indexOf(item) != -1)
                return;

            playlist.push(item);
            ogPlaylist.push(item);
            if (playlist.length == 1) {
                current = playlist[0];
            }
        },
        filterPlaylist: function(){
            console.log("current filter: "+ JSON.stringify(currentFilter));
            console.log("current playlist: " + JSON.stringify(this.playlist));
            console.log("ogPlaylist: " + JSON.stringify(this.ogPlaylist));
            playlist = [];
            this.ogPlaylist.forEach(function(data){
                var filterGenre = false;
                var filterItem = true;
                if (currentFilter.endDate !== undefined && currentFilter.startDate !== undefined)
                {
                    if (currentFilter.endDate < currentFilter.startDate)
                    {
                        filterItem = (convertTDate(data.releaseDate) <= currentFilter.startDate && convertTDate(data.releaseDate) >= currentFilter.endDate);
                    }
                }
                if (filterItem)
                {
                    filterItem = (data.popIndex <= currentFilter.max);
                    if (filterItem){
                        var containsGenre = false;
                        currentFilter.genres.forEach(function(genreObject)
                        {

                            if(genreObject.selected)
                            {
                                if (data.genres.indexOf(genreObject.genreId) > -1)
                                {
                                    containsGenre = true
                                }
                            }
                        });
                        if (containsGenre)
                        {
                            filterItem = true;
                        }
                        else{
                            filterItem = false;
                        }
                        if (filterItem){
                            playlist.push(data);
                        }
                    }
                }
            });
            this.playlist = playlist;
        },
        clearFilter: function(){
            this.playlist = this.ogPlaylist;
        },
        saveFilter: function(name, filter){
            newFilter = {
                name: name,
                settings: filter
            };
            filters.push(newFilter);
        },
        getCurrentFilter: function(){
            return currentFilter;
        }
    };
    audio.addEventListener('ended', function () {
        var pop = {
            "criteria": "playthrough",
            "trackId": player.current.trackId
        };
        trackServices.trackPopularity(pop);
        $rootScope.$apply(player.next);
    }, false);

    return player;
});