sprwApp.controller('menuController', function($scope, $state, playlistServices){
    $scope.close = function () {
        //$mdSideNav('left').close()
        //    .then(function () {
        //        $log.debug("close LEFT is done");
        //    });
    };
    $scope.searchTerm = "";
    $scope.results = [];
    $scope.search = function(term){
        playlistServices.search(term).then(function(data){
            $scope.results = [];
            if (data.artists.length > 0)
            {
                $scope.searched = true;
            }
            else
            {
                $scope.searched = false;
            }
            $scope.results = data.artists;
        })
    };
    $scope.goDiscover = function(){
        $state.go("player.discover");
    };
    $scope.goMyMusic = function(){
        $state.go("player.createArtist");
    };
    $scope.goEvents = function(){
        $state.go("player.events");
    };
});