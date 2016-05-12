/**
 * Created by Timothy on 11/24/2015.
 */
sprwApp.controller('sparrowController', function($scope, $timeout, authServices, userServices, artistService, userDataServices, $location, $cookies, $state, playerService, playlistServices, dataService){
    $scope.loading = false;
    $scope.genreShow = false;
    $scope.locationShow = false;
    $scope.releaseDateShow = false;
    $scope.popularityShow = false;
    $scope.filterShow = false;
    $scope.filtering = false;
    $scope.saveFilterFormShow = false;
    $scope.selectFilterShow = false;

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
    $scope.clearFilter = function(){
       $scope.player.playlist = player.clearFilter();
    };
    $scope.hideSpecificFilter = function(){
        closeAllFilters();
    };

    $scope.message = "";
    var player = {};
    $scope.player = player = playerService;
    $scope.followed = userDataServices;
    $scope.common = dataService;

    $scope.goLogin = function(){
        $state.go('login')
    };
    $scope.goDiscover = function(){
        
        $state.go('discover');
    };
    $scope.goRegister = function(){
        $state.go('register');
    };
    $scope.goArtist = function(){
        $state.go('artist');
    };
    // $scope.goArtistProfile = function(id){
    //     $location.path('/artist/' + id);
    // };
    // $scope.goArtistAdmin = function(id){
    //     $location.path('/mymusic/' + id);
    // };
    $scope.logout = function(){
        $cookies.remove('user_info');
    };
    $scope.like = function(trackId){
        var userData = authServices.getUserData();
        var userInfo = userServices.getUserArtistsList();
        var pop = {
            "token":userData.token,
            "userEmail":userData.userEmail,
            "criteria": "like",
            "trackId": trackId
        };
        playlistServices.trackPopularity(pop).then(function(data){
            userInfo.likedTrackIds.push(trackId);
        })
    };
    $scope.applyGenreFilter = function(){
        $scope.player.playlist = player.filterPlaylist();
        console.log("filtered playlist: " + JSON.stringify($scope.player.playlist));
    };
    $scope.applySelectedFilter = function(filter){
        player.currentFilter = JSON.parse(filter);
        $scope.player.playlist = player.filterPlaylist();
    };

    $scope.saveFilter = function(filter){
        var userData = authServices.getUserData();
        var currentFilter = player.getCurrentFilter();
        var request = {
            name: filter.name,
            userEmail: userData.userEmail,
            token: userData.token,
            filter: JSON.stringify(currentFilter)
        };
        userServices.saveFilter(request).then(function(data){
            request.filterId = data;
            $scope.player.filters.push(request);
            $scope.filter.name = "";
            closeAllFilters();
        });
    };

    artistService.getGenres().then(function(data){
       $scope.common.genres = data;
    });
    artistService.getCommonData().then(function(data){
        $scope.common = data;
        $scope.common.steps = (data.max / 20);
        console.log("common: " + JSON.stringify($scope.common));
        data.genres.forEach(function(genre){
            genre.selected = true;
            $scope.player.currentFilter.genres.push(genre);
        });
        $scope.player.currentFilter.min = data.min;
        $scope.player.currentFilter.max = data.max;
        $scope.player.currentFilter.startDate = convertTDate(data.startDate);
        $scope.player.currentFilter.endDate = convertTDate(data.endDate);

        console.log("common data: " + JSON.stringify(player.currentFilter));
    });

    $scope.$watch('player.currentFilter',function(){
        console.log("pop: " + player.currentFilter.popIndex);
        player.filterPlaylist();
    });

    console.log("SPARROW: " );
    console.log($scope);
});
