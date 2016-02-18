sprwApp.controller('filterController', function($scope, playerService){
    $scope.player = playerService;
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
        $scope.player.currentFilter.genres.forEach(function(genre){
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
    $scope.selectGenre = function(id)
    {
        $scope.player.currentFilter.genres[id].selected = true;
        $scope.filterDisplayGenres.splice(id, 1);
        console.log(JSON.stringify($scope.filterDisplayGenres));
        $scope.player.filterPlaylist();
    }
});