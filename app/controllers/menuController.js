sprwApp.controller('menuController', function($scope, $state,$mdDialog, $mdMedia, playlistServices, artistService, authServices){
    var userData = authServices.getUserData();

    var createArtist = function(artistData){
        console.log("create artist");
        var artist = {};
        artist.token = userData.token;
        artist.userEmail = userData.userEmail;
        artist.name = artistData.name;
        artist.postalCode = artistData.postalCode;
        artist.setting = JSON.stringify(artistData.setting);

        artistService.createArtist(artist).then(function(data){
            if (artistData.image !== undefined){
                createArtistImage(artistData.image, data)
            }
            else {
                $state.go("player.artistProfile", {id:data});
            }
        })
    };
    var createArtistImage = function(img, artistId){
        var time = Math.floor(Date.now() / 1000);
        var artistImage = {};
        artistImage.image64 = img;
        artistImage.userEmail = userData.userEmail;
        artistImage.token = userData.token;
        artistImage.artistId = artistId;
        artistImage.trackingId = artistId;

        artistService.createArtistImage(artistImage).then(function(data){

            $state.go("player.artistProfile", {id:artistId});
        });
    };

    $scope.close = function () {
        //$mdSideNav('left').close()
        //    .then(function () {
        //        $log.debug("close LEFT is done");
        //    });
    };
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
                createArtist(answer);
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
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
    $scope.$watch("selectedArtistId", function(newVal, oldVal){
        console.log("SELECTED ARTISTID NEW: " + newVal + "OLD: " + oldVal);
        if (newVal != -1 && newVal != undefined)
        {
            $state.go('player.artistProfileAdmin',{'id':newVal});
        }
    });
    $scope.goArtist = function(artistId){
        $scope.$parent.toggleRight();
       $state.go("player.artistProfile", {id:artistId});
    };
    $scope.goDiscover = function(){
        $scope.$parent.toggleRight();
        $state.go("player.discover");
    };
    $scope.goMyMusic = function(){
        $scope.$parent.toggleRight();
        $state.go("player.createArtist");
    };
    $scope.goEvents = function(){
        $scope.$parent.toggleRight();
        $state.go("player.events");
    };
});