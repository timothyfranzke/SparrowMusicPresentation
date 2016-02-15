/**
 * Created by Timothy on 12/1/2015.
 */
sprwApp.controller('artistProfileController', function($scope, authServices, artistService, userServices, userDataServices, $stateParams){
    var userData = {};
    $scope.settings = {};

    //scope models
    $scope.selectedArtist = {};
    $scope.selectedArtist.albums = [];
    $scope.selectedAlbum = {};
    $scope.selectedAlbum.tracks = [];

    //methods
    $scope.selectAlbum = function(index){
        console.log("index: " + index);
        console.log($scope.selectedAlbum);
        $scope.selectedAlbum = $scope.selectedArtist.albums[index];
        $scope.isAlbumSelected = true;
        console.log($scope.selectedAlbum);
    };

    $scope.play = function(index){

        if ($scope.$parent.player.current.albumId != $scope.selectedAlbum.albumId)
        {
            $scope.$parent.player.clearPlaylist();
            $scope.selectedAlbum.tracks.forEach(function(track){
                $scope.$parent.player.addPlaylist(track);
            });
        }
        console.log("playlist: " + JSON.stringify($scope.$parent.player.playlist));
        $scope.$parent.player.index = index;
        $scope.$parent.player.play($scope.selectedAlbum.tracks[index]);

        console.log(JSON.stringify(track));
    };

    $scope.followArtist = function(){

        var model = {
            userEmail: userData.userEmail,
            token: userData.token,
            artistId: $scope.selectedArtist.artistId
        };
        userServices.followArtist(model).then(function(data){
            $scope.$parent.followed = data;
        });
    };

    $scope.unFollowArtist = function(){
        var model = {
            userEmail: userData.userEmail,
            token: userData.token,
            artistId: $scope.selectedArtist.artistId
        };
        userServices.unFollowArtist(model).then(function(data){
            $scope.$parent.followed = data;
        });
    };

    $scope.isFollowing = function(){
        var follow = false;
        $scope.followed.artistIds.forEach(function(id){
            if (id === $scope.selectedAlbum.artistId)
            {
                follow = true;
            }
        });
        return follow;
    };

    //intital calls
    userData = authServices.getUserData();
    if(userData.token === undefined || userData.userEmail === undefined)
    {
        $scope.$parent.goLogin();
    }

    if ($stateParams === undefined){
        $scope.showErrorMessage = true;
    }
    else{
        artistService.getArtist($stateParams.id).then(function(data){
            $scope.selectedArtist = data;
            $scope.isArtistSelected = true;

            $scope.selectedArtist.events.forEach(function(event){
                var eDate = new Date(Date.parse(event.eventDate));
                var day = -1;
                var month = -1;
                if (eDate.getDate().toString().length > 1)
                {
                    day = eDate.getDate();
                }
                else
                {
                    day = "0" + eDate.getDate();
                }
                if (eDate.getMonth().toString().length > 1)
                {
                    month = eDate.getMonth() + 1;
                }
                else
                {
                    month = "0" + eDate.getMonth() + 1;
                }
                event.eventDate = month + "/" + day + "/" + eDate.getFullYear();
            });
            $scope.selectedArtist.events.sort(function(a,b){
                var aDate = new Date(Date.parse(a.eventDate));
                var bDate = new Date(Date.parse(b.eventDate));
                return aDate > bDate;
            });
            $scope.selectedArtist.imageURL = imageBase + $stateParams.id + "/0.jpg";
            $scope.settings =JSON.parse(data.settings);

            data.albums.forEach(function(album){
                if(album.hasImage){
                    album.imageURL = imageBase + $stateParams.id + "/" + album.albumId + "/0.jpg";
                }
                else{
                    album.imageURL = "img/default.jpg";
                }
                console.log(JSON.stringify(album));
            });
            if (data.albums.length > 0){
                $scope.isAlbumSelected = true;
                $scope.selectedAlbum = data.albums[0];
                $scope.hasAlbums = true;
            }
            else{
                $scope.hasAlbums = false;
            }
        });
    }
});