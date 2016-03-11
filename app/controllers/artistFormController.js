sprwApp.controller('artistFormController', function($scope, $state, $mdDialog, artistService, authServices){
    var userData = authServices.getUserData();
    $scope.artist = {};
    $scope.artistNameShow = true;
    $scope.artistThemeShow = false;
    $scope.artistImageSelectShow = false;
    $scope.artistImageCropShow = false;
    $scope.artistNoImageConfirmShow = true;
    $scope.artistImageCropResultShow = false;
    $scope.artistFinalizeShow = false;

    $scope.themes = [
        {color: "Red", class:"sparrow-red"},
        {color: "Blue", class:"sparrow-blue"},
        {color: "Yellow", class:"sparrow-yellow"},
        {color: "Purple", class:"sparrow-purple"},
    ]

    if(userData.token === undefined || userData.userEmail === undefined) {
        $state.go("login");
    };

    $scope.goArtistTheme = function(){
        $scope.artistNameShow = false;
        $scope.artistThemeShow = true;
        $scope.artistImageSelectShow = false;
        $scope.artistImageCropShow = false;
        $scope.artistNoImageConfirmShow = true;
        $scope.artistImageCropResultShow = false;
        $scope.artistFinalizeShow = false;
    }
    $scope.goArtistImageSelect = function(){
        $scope.artistNameShow = false;
        $scope.artistThemeShow = false;
        $scope.artistImageSelectShow = true;
        $scope.artistImageCropShow = false;
        $scope.artistNoImageConfirmShow = true;
        $scope.artistImageCropResultShow = false;
        $scope.artistFinalizeShow = false;
    }
    $scope.goArtistImageCrop = function(){
        $scope.artistNameShow = false;
        $scope.artistThemeShow = false;
        $scope.artistImageSelectShow = false;
        $scope.artistImageCropShow = true;
        $scope.artistNoImageConfirmShow = false;
        $scope.artistImageCropResultShow = false;
        $scope.artistFinalizeShow = false;
    }
    $scope.goArtistNoImageConfirm = function(){
        $scope.artistNameShow = false;
        $scope.artistThemeShow = true;
        $scope.artistImageSelectShow = false;
        $scope.artistImageCropShow = false;
        $scope.artistNoImageConfirmShow = true;
        $scope.artistImageCropResultShow = false;
        $scope.artistFinalizeShow = false;
    }
    $scope.goImageCropResult = function(){
        $scope.artistNameShow = false;
        $scope.artistThemeShow = false;
        $scope.artistImageSelectShow = false;
        $scope.artistImageCropShow = false;
        $scope.artistNoImageConfirmShow = false;
        $scope.artistImageCropResultShow = true;
        $scope.artistFinalizeShow = false;
    }
    $scope.goArtistFinalize = function(){
        console.log($scope);
        $scope.artistNameShow = false;
        $scope.artistThemeShow = false;
        $scope.artistImageSelectShow = false;
        $scope.artistImageCropShow = false;
        $scope.artistNoImageConfirmShow = false;
        $scope.artistImageCropResultShow = false;
        $scope.artistFinalizeShow = true;
    }
    $scope.createArtist = function(artist){
        $scope.isCreatingArtist = false;
        artist.token = userData.token;
        artist.userEmail = userData.userEmail;

        artistService.createArtist(artist).then(function(data){
            $state.go("mymusic",{id:data});
        })

    };
    //
    $scope.$watch('artist.image', function(newVal, oldVal){
        console.log("new val" + newVal);
        console.log("old val" + oldVal);
        if (newVal != undefined)
        {
            $scope.artistNameShow = false;
            $scope.artistThemeShow = false;
            $scope.artistImageSelectShow = false;
            $scope.artistImageCropShow = true;
            $scope.artistNoImageConfirmShow = false;
            $scope.artistImageCropResultShow = false;
            $scope.artistFinalizeShow = false;
        }
    });

    $scope.createArtist = function(artist) {
        $mdDialog.hide(artist);
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
});