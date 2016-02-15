/**

 * Created by Timothy on 11/24/2015.

 */

sprwApp.controller('artistController', function($scope, $state, artistService, authServices, artists,$mdMedia, $mdDialog){
    var userData = {};

    //scope bool variables
    $scope.hasAssociatedArtists = false;
    $scope.hasAlbums = false;
    $scope.hasTracks = false;
    $scope.isArtistSelected = false;
    $scope.isAlbumSelected = false;
    $scope.isCreatingArtist = false;
    $scope.isUpdatingArtist = false;
    $scope.isCreateingArtistImage = false;
    $scope.isCreatingAlbum = false;
    $scope.isUpdatingAlbum = false;
    $scope.isCreatingTrack = false;
    $scope.isCreatingEvent = false;

    //scope models
    $scope.associatedArtists = [];
    $scope.selectedArtistId = -1;
    $scope.selectedArtist = {};
    $scope.selectedArtist.albums = [];
    $scope.selectedAlbum = {};
    $scope.selectedAlbum.tracks = [];
    $scope.selectedArtistList = [];
    $scope.genres = [];

    //cropper variables
    $scope.cropper = {};
    $scope.cropper.sourceImage = null;
    $scope.cropper.croppedImage   = null;
    $scope.bounds = {};
    $scope.bounds.left = 0;
    $scope.bounds.right = 0;
    $scope.bounds.top = 0;
    $scope.bounds.bottom = 0;

    //methods
    $scope.showAdvanced = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'artistFormController',
            templateUrl: 'app/partials/templates/artistForm/artistForm.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

    $scope.$watch("selectedArtistId", function(newVal, oldVal){
        if (newVal != -1)
        {
            $state.go('player.artistProfileAdmin',{'id':newVal});
        }
    });

    $scope.showCreateArtist = function(){
        $scope.isCreatingArtist = true;
    };

    $scope.selectArtist = function(id){
       $state.go("mymusic",{"id" : id});
        artistService.getArtist(id).then(function(data){
            $scope.selectedArtist = data;
            $scope.isArtistSelected = true;
            if (data.albums.length > 0){
                $scope.isAlbumSelected = true;
                $scope.selectedAlbum = data.Albums[0];
            }
        });
    };

    $scope.createArtist = function(artist){
        $scope.isCreatingArtist = false;
        artist.token = userData.token;
        artist.userEmail = userData.userEmail;

        artistService.createArtist(artist).then(function(data){
           $state.go("mymusic",{id:data});
        })

    };
    $scope.likekkk = function(){
        alert("click");
    };
    $scope.openArtist = function () {
        $state.go('modalTest.create');
        console.log("opening artist modal");
        //var modalInstance = $uibModal.open({
        //    animation: true,
        //    templateUrl: 'app/partials/templates/artistForm/artistForm.html',
        //    controller: 'artistFormController',
        //    resolve: {
        //        items: function () {
        //            return 1;
        //        },
        //        modify: function () {
        //            return 1;
        //        }
        //    }
        //});
    }
    //initial calls

    userData = authServices.getUserData();

    if(userData.token === undefined || userData.userEmail === undefined) {
        $state.go("login");
    }

    console.log(JSON.stringify(artists));
    if(artists.length > 0)
    {
        $scope.hasAssociatedArtists = true;
        $scope.associatedArtists = artists;
        console.log("setting artists");
    }

    console.log("going for artist controller");

});

