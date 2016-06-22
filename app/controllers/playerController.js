/**
 * Created by Timothy.Franzke on 1/6/2016.
 */
sprwApp.controller('playerController',function($scope, $timeout, $cookies, $state, $stateParams, $filter, $mdBottomSheet, $mdToast, $mdSidenav, $mdMedia, $mdDialog, $log, artistService, trackServices, playlistServices, userDataServices, userServices, playerService, authServices, metaData, artists){
    var artistId = $scope.artistId = -1;
    $scope.isBulliten = true;
    var showToast = function(message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .position("top right")
                .hideDelay(3000)

        );
    };
    var createBulliten = function(bullitenData){
        console.log(bullitenData);
        var bullitenModel = {};
        bullitenModel.userEmail = userData.userEmail;
        bullitenModel.token = userData.token;
        bullitenModel.artistId = artistId;
        bullitenModel.bulliten = bullitenData;
        $scope.loading = true;
        
        artistService.createBulliten(bullitenModel).then(function(data){
            $scope.loading = false;
            showToast("Bulliten created successfully");
        })
    };

    var clearUserBullitens = function(){
        $scope.followed.bulliten = [];
    };
    $scope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            switch($state.current.name){
                case 'player.artistProfile':
                    var isLiked = false;
                    artistId = parseInt(toParams.id);
                    for(var i in $scope.followed.artistIds)
                    {
                        if (parseInt(toParams.id) === parseInt($scope.followed.artistIds[i]))
                        {
                            isLiked = true;
                            break;
                        }
                    }
                    //console.log("followed: " + $scope.followed.artistIds.indexOf(toParams.id));
                    if (isLiked)
                    {
                        $scope.statePlayer = false;
                        $scope.stateArtistFavorite = false;
                        $scope.stateArtistUnFavorite = true;
                        $scope.stateArtistBulliten = false;
                    }
                    else{
                        $scope.statePlayer = false;
                        $scope.stateArtistFavorite = true;
                        $scope.stateArtistUnFavorite = false;
                        $scope.stateArtistBulliten = false;
                    }

                    break;
                case 'player.artistProfileAdmin':
                    artistId = parseInt(toParams.id);
                    $scope.statePlayer = false;
                    $scope.stateArtistFavorite = false;
                    $scope.stateArtistUnFavorite = false;
                    $scope.stateArtistBulliten = true;
                    break;
                default :
                    console.log($state);
                    $scope.statePlayer = true;
                    $scope.stateArtistFavorite = false;
                    $scope.stateArtistUnFavorite = false;
                    $scope.stateArtistBulliten = false;
                    break;
            }
        }
    );
    $scope.statePlayer = true;
    $scope.stateArtistFavorite = false;
    $scope.stateArtistUnFavorite = false;
    if(artists.length > 0)
    {
        $scope.hasAssociatedArtists = true;
        $scope.associatedArtists = artists;
        console.log("setting artists");
    }
    function debounce(func, wait, context) {
        
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    console.log(68);
    function buildDelayedToggler(navID) {
        return debounce(function() {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }
    function buildToggler(navID) {
        return function() {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildDelayedToggler('right');

    var events = {
        id:1,
        name:"Events",
        selected:false
    };
    var discover = {
        id:2,
        name:"Discover",
        selected:false
    };
    var mymusic = {
        id:3,
        name:"My Music",
        selected:false
    };
    var falseWindows = function(){
        events.selected = false;
        discover.selected = false;
        mymusic.selected = false;
    };
    console.log(111);
    $scope.follwed = userDataServices.followed;
    $scope.loading = false;
    $scope.player = playerService;
    $scope.playlist = playlistServices;
    $scope.playlist.playlistId = metaData.playlistID;
    $scope.playlist.pages = metaData.totalPages;

    $scope.common = {};
    $scope.genreShow = false;
    $scope.locationShow = false;
    $scope.releaseDateShow = false;
    $scope.popularityShow = false;
    $scope.filterShow = false;
    $scope.filtering = false;
    $scope.saveFilterFormShow = false;
    $scope.selectFilterShow = false;
    $scope.searched = false;
    $scope.results = [];
    $scope.windows = [];
    $scope.window = [];

    discover.selected = true;
    $scope.window.push(events);
    $scope.window.push(discover);
    $scope.window.push(mymusic);

    $scope.currentlyShowingAFilter = false;
    $scope.selectedFilter = {};


    var showSaveFilter = function(){
        console.log("showSaveFilter()");
        if (!$scope.filterSelected)
        {
            console.log("Not currently showing filter : showSaveFilter()");
            $scope.saveFilterShow = true;
            $scope.selectingFilter = false;
            $scope.currentlyShowingAFilter = true;
        }
    };

    $scope.filter = {
        content: 'Hello, World!',
        templateUrl: 'app/partials/templates/filters.html',
        title: 'Filters'
    };

    $scope.showFilters = function(){
        console.log("showFilters()");
        var time = Date.now();

        if ((time - $scope.selectingFilter) < 1500){
            $scope.filterSelected = true;
            if($scope.currentlyShowingAFilter)
            {
                hideFilters();
                $scope.currentlyShowingAFilter = false;
            }
            else{
                console.log("Not currently showing filter : showFilters()");
                $scope.saveFilterShow = false;
                $scope.filterShow = true;
                $scope.currentlyShowingAFilter = true;
            }
        }
    };
    $scope.selectFilter = function(){
        $scope.filterSelected = false;
        $scope.selectingFilter = Date.now();
        $timeout(showSaveFilter, 1500);
    };
    var hideFilters = function(){
        closeAllFilters();
        $scope.filterShow = false;
        $scope.saveFilterShow =false;
    };
    var closeAllFilters = function(){
        $scope.genreShow = false;
        $scope.locationShow = false;
        $scope.releaseDateShow = false;
        $scope.popularityShow = false;
        $scope.saveFilterFormShow = false;
        $scope.selectFilterShow = false;
    };
    $scope.showGenres = function(){
        closeAllFilters();
        $scope.genreShow = true;
    };
    $scope.showLocation = function(){
        closeAllFilters();
        $scope.locationShow = true;
    };
    $scope.showReleaseDate = function(){
        closeAllFilters();
        $scope.releaseDateShow = true;
    };
    $scope.showPopularity = function(){
        console.log("showPopularity");
        closeAllFilters();
        $scope.popularityShow = true;
    };
    $scope.showSave = function(){
        closeAllFilters();
        $scope.saveFilterFormShow = true;
    };
    $scope.showSelect = function(){
        closeAllFilters();
        $scope.selectFilterShow = true;
    };
    $scope.hideSpecificFilter = function(){
        closeAllFilters();
    };
    $scope.select = function(item)
    {
        var pop = {
            "criteria": "select",
            "trackId": item.trackId,
            "userEmail" : authServices.getUserData().userEmail
        };
        trackServices.trackPopularity(pop);
        $scope.player.play(item);
    };
    $scope.next = function(){
        var pop = {
            "criteria": "skip",
            "trackId": current.trackId,
            "userEmail" : authServices.getUserData().userEmail
        };
        trackServices.trackPopularity(pop);
        $scope.player.next();
    };
    $scope.showFilterBottom = function(){
        console.log("filter clicked");
        $mdBottomSheet.show({
            templateUrl: 'app/partials/templates/filters.html',
                clickOutsideToClose: true,
            controller: 'filterController'
        }).then(function(clickedItem) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(clickedItem['name'] + ' clicked!')
                    .position('top right')
                    .hideDelay(1500)
            );
        });
    }
    //initial calls
    var userData = authServices.getUserData();
    if(userData === undefined) {
        $state.go("login");
    }

    $scope.isLiked = function(trackId){
        var liked = false;
        $scope.followed.likedTrackIds.forEach(function(data){
            if(trackId === data)
            {
                liked = true;
            }
        });

        return liked;
    };
    console.log(256);
    $scope.go = function(id){
        switch (id){
            case 1:
                $scope.window = [];
                falseWindows();
                events.selected = true;
                $scope.window.push(mymusic);
                $scope.window.push(events);
                $scope.window.push(discover);
                $state.go("player.events");
                break;
            case 2:
                $scope.window = [];
                falseWindows();
                discover.selected = true;
                $scope.window.push(events);
                $scope.window.push(discover);
                $scope.window.push(mymusic);
                $state.go("player.discover");
                break;
            case 3:
                $scope.window = [];
                falseWindows();
                mymusic.selected = true;
                $scope.window.push(discover);
                $scope.window.push(mymusic);
                $scope.window.push(events);
                $state.go("player.createArtist");
                break;
        }
    };
    $scope.showArtistBulliten = function(ev){
        dialogSettings.templateUrl = bullitenDialogTemplate;
        dialogSettings.targetEvent = ev;
        dialogSettings.controller = "dialogController";

        $mdDialog.show(dialogSettings)
            .then(function(bulliten) {
                createBulliten(bulliten);
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    $scope.showUserBulliten = function(ev){
        dialogSettings.templateUrl = userBullitenDialogTemplate;
        dialogSettings.targetEvent = ev;
        dialogSettings.controller = "dialogController";
        dialogSettings.locals = { params: $scope.followed.bulliten }

        $mdDialog.show(dialogSettings)
            .then(function(bulliten) {
                console.log("clear");
                clearUserBullitens();
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    $scope.followArtist = function(){

        var model = {
            userEmail: userData.userEmail,
            token: userData.token,
            artistId: artistId
        };
        userServices.followArtist(model).then(function(data){
            $scope.statePlayer = false;
            $scope.stateArtistFavorite = false;
            $scope.stateArtistUnFavorite = true;
            $scope.followed = data;
        });
    };

    $scope.unFollowArtist = function(){
        var model = {
            userEmail: userData.userEmail,
            token: userData.token,
            artistId: artistId
        };
        userServices.unFollowArtist(model).then(function(data){
            $scope.statePlayer = false;
            $scope.stateArtistFavorite = true;
            $scope.stateArtistUnFavorite = false;
            $scope.followed = data;

        });
    };
    console.log(318);
    $scope.logout = function(){
        $cookies.remove("user_info");
        $state.go("login");
    };

    userServices.getUserArtists(userData.userEmail).then(function(data){
        $scope.message = "Loading Playlist";
        userServices.setUserData(data);
        for(var i in data.events){
            data.events[i].eventDate = convertTDate(data.events[i].eventDate);
        }
        $scope.followed = data;
        console.log($scope);
    });

    userServices.getFilters(userData.userEmail, userData.token).then(function(data){
        $scope.player.filters = data;
    });

    artistService.getGenres().then(function(data){
        $scope.common.genres = data;
    });
    artistService.getCommonData().then(function(data){
        $scope.common = data;
        $scope.common.steps = (data.max / 20);
        data.genres.forEach(function(genre){
            genre.selected = true;
            $scope.playlist.currentFilter.genres.push(genre);
        });
        $scope.playlist.currentFilter.min = data.min;
        $scope.playlist.currentFilter.max = data.max;
        $scope.playlist.currentFilter.popularity = data.max;
        $scope.playlist.currentFilter.startDate = convertTDate(data.startDate);
        $scope.playlist.currentFilter.endDate = convertTDate(data.endDate);
        $scope.playlist.ogFilter = JSON.parse(JSON.stringify($scope.playlist.currentFilter));
    });
    console.log(355);
    var fillPlaylist = function(){
        playlistServices.getDiscoverPlaylist().then(function(data){
            data.forEach(function(item){
                item.isVisible = true;
            });
            $scope.playlist.playlist.push.apply($scope.playlist.playlist, data);
            $scope.player.current = $scope.playlist.playlist[0];

            if (playlistServices.currentPage <= playlistServices.pages && playlistServices.currentPage < 6)
                fillPlaylist();
        })
    };
    $scope.nextPage = function(){
       playlistServices.getDiscoverPlaylist().then(function(data){
            data.forEach(function(item){
                item.isVisible = true;
            });
            $scope.playlist.playlist.push.apply($scope.playlist.playlist, data);
            $scope.playlist.filter();
        })
    };
    fillPlaylist();

    console.log(381);
});
