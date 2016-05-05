sprwApp.controller('filterController', function($scope, playerService, playlistServices){
    $scope.player = playerService;
    $scope.playlist = playlistServices;
    $scope.distances = [50,100,200,500,'Any'];
    $scope.selectedFilter = {};
    $scope.filterDisplayGenres = [];
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
        $scope.playlist.currentFilter.genres.forEach(function(genre){
            genre.selected = false;
            $scope.filterDisplayGenres.push(genre);
        });
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
    $scope.selectGenre = function(id, playlist)
    {
        var i = 0;
        var resetSelected = true;
        $scope.playlist.currentFilter.genres.forEach(function(genre){
            if(genre.selected === undefined)
            {
                resetSelected = false;
            }
            else {
                if(!genre.selected)
                    resetSelected = false;
            }
        });
        if (resetSelected)
        {
            $scope.playlist.currentFilter.genres.forEach(function(genre){
                genre.selected = false;
            });
        }
        $scope.playlist.currentFilter.genres[id].selected = true;
        $scope.filterDisplayGenres.forEach(function(item){
            if (item.genreId === id){
                $scope.filterDisplayGenres.splice(i, 1);
            }
            i++;
        });
        //console.log("current filter: " + JSON.stringify($scope.playlist.currentFilter));
        $scope.playlist.filter();
    };
    $scope.resetFilter = function(){
        $scope.filterDisplayGenres = [];
        $scope.playlist.currentFilter.genres.forEach(function(genre){
            genre.selected = true;
            $scope.filterDisplayGenres.push(genre);
        });
        $scope.playlist.resetFilter();
    }
});