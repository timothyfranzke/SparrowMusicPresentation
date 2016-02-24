/**
 * Created by Timothy.Franzke on 1/6/2016.
 */
sprwApp.controller('playerController',function($scope, $timeout, $cookies, $state, $mdBottomSheet, $mdToast, $mdSidenav, $log, artistService, playlistServices, userDataServices, userServices, playerService, authServices, playlist){
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
    $scope.toggleRight = buildToggler('right');

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

    $scope.follwed = userDataServices.followed;
    $scope.loading = false;
    $scope.player = playerService;
    playlist.forEach(function(item){
        item.setting = JSON.parse(item.setting);
    });
    $scope.player.playlist = playlist;
    $scope.player.ogPlaylist = playlist;
    $scope.player.current = playlist[0];
    $scope.player.play(playlist[0]);
    //$scope.currentTime = $scope.player.currentTime();
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
    $scope.showFilterBottom = function(){
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
    }

    $scope.logout = function(){
        $cookies.remove("user_info");
        $state.go("login");
    };

    userServices.getUserArtists(userData.userEmail).then(function(data){
        $scope.message = "Loading Playlist";
        userServices.setUserData(data);
        $scope.followed = data;
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
            $scope.player.currentFilter.genres.push(genre);
        });
        $scope.player.currentFilter.min = data.min;
        $scope.player.currentFilter.max = data.max;
        $scope.player.currentFilter.startDate = convertTDate(data.startDate);
        $scope.player.currentFilter.endDate = convertTDate(data.endDate);

    });
});