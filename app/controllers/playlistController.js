/**
 * Created by Timothy on 11/24/2015.
 */
sprwApp.controller('playlistController',function($scope, $state,$stateParams, playlistServices, playlist, userServices, userDataServices, authServices, dataService){
    $scope.follwed = userDataServices.followed;
    $scope.common = dataService.common;
    $scope.$parent.loading = false;

    console.log(JSON.stringify(playlist));
    $scope.$parent.player.playlist = playlist;


    //$scope.$parent.player.play();
    console.log($scope);
    //initial calls
    var userData = authServices.getUserData();
    if(userData === undefined) {
        $state.go("login");
    }

    $scope.play = function(item){
        $scope.$parent.player.play(item);
    };

    $scope.isLiked = function(trackId){
        var liked = false;
        $scope.$parent.followed.likedTrackIds.forEach(function(data){
            if(trackId === data)
            {
                liked = true;
            }
        });

        return liked;
    };

    userServices.getUserArtists(userData.userEmail).then(function(data){
        $scope.$parent.message = "Loading Playlist";
        userServices.setUserData(data);
        $scope.$parent.followed = data;
    });

    userServices.getFilters(userData.userEmail, userData.token).then(function(data){
        $scope.$parent.player.filters = data;
    });


});

