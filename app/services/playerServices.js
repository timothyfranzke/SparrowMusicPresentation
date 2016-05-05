sprwApp.factory('playerService', function (audio, $rootScope, trackServices, playlistServices) {
    var player,
        index = 0,
        filter,
        filters = [],
        currentFilter = {
            genres:[],
            popularity:-1,
            location:-1,
            startDate:'',
            endDate:''
        },
        ogFilter = {},
        paused = false,
        playlist = [],
        ogPlaylist = [],
        playing = true,
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
        current: current,
        currentFilter: currentFilter,
        ogFilter: ogFilter,
        playing: playing,
        playlist:playlistServices.playlist,
        ogPlaylist:ogPlaylist,
        play: function (item) {
            if (!this.playlist.length) return;

            if (angular.isDefined(item)) current = item;
            console.log(player.playing);
            if (player.playing) {
                console.log("playing");
                audio.src = audioBase + current.artistId + '/' + current.albumId + "/" + current.trackId + "/" + current.trackId + ".mp3";
                console.log("Audio src: " + audio.src);
            }

            audio.play();
            player.playing = true;

        },
        pause: function () {
            if (player.playing) {
                audio.pause();
                player.playing = false;
            }
        },
        next: function () {
            var pop = {
                "criteria": "skip",
                "trackId": current.trackId
            };
            trackServices.trackPopularity(pop);
            if (!this.playlist.length) return;
            if (index < this.playlist.length - 1)
            {
                index++;
            }
            else
            {
                index = 0;
            }
            current = this.playlist[index];
            if (playing)
                this.play();
        },
        image : function(){
            if(current.setting.hasImage)
            {
                return imageBase + current.artistId + '/' + current.albumId + "/0.jpg";
            }
            else{
                return current.setting.theme.img;
            }

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
            if (this.playlist.indexOf(item) != -1)
                return;

            this.playlist.push(item);
            this.ogPlaylist.push(item);
            if (this.playlist.length == 1) {
                current = this.playlist[0];
            }
        },
        filter: function(){
            var canFilter = false;
            var temp = [];
            copyArray(this.ogPlaylist, temp);
            this.playlist = [];
            var holder = [];
            temp.forEach(function(record){
                if (record.popIndex <= currentFilter.popularity)
                {
                    canFilter = true;
                }
                if (canFilter)
                {
                    var genreFound = false;
                    currentFilter.genres.forEach(function(genreObject)
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
                    if (currentFilter.endDate < currentFilter.startDate)
                    {
                        if (convertTDate(record.releaseDate) <= currentFilter.startDate && convertTDate(record.releaseDate) >= currentFilter.endDate){
                            canFilter = true;
                        }
                        else{
                            canFilter = false;
                        }
                    }
                }
                if (canFilter)
                {
                    holder.push(record);
                }
            });
            this.playlist = holder;
        },
        clearFilter: function(){
            console.log("currentFilter: " + JSON.stringify(this.currentFilter));
            this.currentFilter = JSON.parse(JSON.stringify(this.ogFilter));
            console.log("currentFilter after: " + JSON.stringify(this.currentFilter));
            this.playlist = JSON.parse(JSON.stringify(this.ogPlaylist));
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
    filter = {
        byPopularity: function(){
            var temp = [];
            copyArray(playlist, temp);
            playlist = [];
            var holder = [];
            console.log("TEMP: " + JSON.stringify(temp));
            console.log("PLAYLIST: " + JSON.stringify(playlist));
            temp.forEach(function(record){
                if (record.popIndex <= currentFilter.popularity)
                {
                    canFilter = true;
                }
                if (canFilter)
                {
                    var genreFound = false;
                    currentFilter.genres.forEach(function(genreObject)
                    {
                        if(genreObject.selected)
                        {
                            if (data.genres.indexOf(genreObject.genreId) > -1)
                            {
                                genreFound = true;
                            }
                        }
                    });
                    canFilter = genreFound;
                }
                if (canFilter)
                {
                    if (currentFilter.endDate < currentFilter.startDate)
                    {
                        if (convertTDate(data.releaseDate) <= currentFilter.startDate && convertTDate(data.releaseDate) >= currentFilter.endDate){
                            canFilter = true;
                        }
                        else{
                            canFilter = false;
                        }
                    }
                }
                if (canFilter)
                {
                    holder.push(record);
                }
            });
            this.playlist = holder;
        },
        byReleaseDate: function(){
            var temp = [];
            copyArray(playlist, temp);
            playlist = [];
            temp.forEach(function(record)
            {
                if (currentFilter.endDate === undefined)
                    currentFilter.endDate = Date.now();
                if (currentFilter.startDate === undefined)
                    currentFilter.startDate = Date.now();
                if (currentFilter.endDate < currentFilter.startDate)
                {
                    if (convertTDate(data.releaseDate) <= currentFilter.startDate && convertTDate(data.releaseDate) >= currentFilter.endDate){
                        playlist.push(record);
                    }
                }
            })
        },
        byGenre: function(){
            var temp = [];
            copyArray(playlist, temp);
            playlist = [];
            temp.forEach(function(record)
            {
                var containsGenre = false;
                currentFilter.genres.forEach(function(genreObject)
                {
                    if(genreObject.selected)
                    {
                        if (data.genres.indexOf(genreObject.genreId) > -1)
                        {
                            playlist.push(record);
                        }
                    }
                });
            })
        },
        filterPlaylist: function(){
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

    };

    //audio events
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