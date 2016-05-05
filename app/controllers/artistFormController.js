sprwApp.controller('artistFormController', function($scope, $state, $mdDialog, artistService, authServices){
    var userData = authServices.getUserData();
    $scope.artist = {};
    $scope.artist.setting = {};
    $scope.artist.setting.theme = {};
    $scope.artistNameShow = true;
    $scope.artistThemeShow = false;
    $scope.artistImageSelectShow = false;
    $scope.artistImageCropShow = false;
    $scope.artistNoImageConfirmShow = true;
    $scope.artistImageCropResultShow = false;
    $scope.artistFinalizeShow = false;

    var themes = $scope.themes = [
        {color: "Red", theme: { "border" : redClass, "bg" : redClassBg, "img" : redImg }},
        {color: "Blue", theme: { "border" : blueClass, "bg" : blueClassBg, "img" : blueImg }},
        {color: "Yellow", theme:{ "border" : yellowClass, "bg" : yellowClassBg, "img" : yellowImg }},
        {color: "Purple", theme:{ "border" : purpleClass, "bg" : purpleClassBg, "img" : purpleImg }}
    ];

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
    };
    var goArtistImageSelect = $scope.goArtistImageSelect = function(){
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
        if($scope.artist.image == undefined){
            $scope.artist.setting.hasImage = false;
        }
        else{
            $scope.artist.setting.hasImage = true;
        }
        console.log($scope);
        $scope.artistNameShow = false;
        $scope.artistThemeShow = false;
        $scope.artistImageSelectShow = false;
        $scope.artistImageCropShow = false;
        $scope.artistNoImageConfirmShow = false;
        $scope.artistImageCropResultShow = false;
        $scope.artistFinalizeShow = true;
    }
    // $scope.createArtist = function(artist){
    //     $scope.isCreatingArtist = false;
    //     artist.token = userData.token;
    //     artist.userEmail = userData.userEmail;
    //
    //     artistService.createArtist(artist).then(function(data){
    //         $state.go("mymusic",{id:data});
    //     })
    //
    // };
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

    var setTheme = $scope.setTheme = function(theme){
        $scope.artist.setting.theme = theme;
        //console.log($scope);
        goArtistImageSelect();
    };
    $scope.randomSelectTheme = function(){
        var index = Math.floor((Math.random() * 4));
        var selectedTheme = themes[index].theme;
        setTheme(selectedTheme);
    };

    $scope.createArtist = function(artist) {
        console.log("artists: " + JSON.stringify(artist));
        $mdDialog.hide(artist);
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
});