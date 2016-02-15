sprwApp.controller('artistFormController', function($scope, $state, $mdDialog, artistService, authServices){
    var userData = authServices.getUserData();

    if(userData.token === undefined || userData.userEmail === undefined) {
        $state.go("login");
    }

    $scope.createArtist = function(artist){
        $scope.isCreatingArtist = false;
        artist.token = userData.token;
        artist.userEmail = userData.userEmail;

        artistService.createArtist(artist).then(function(data){
            $state.go("mymusic",{id:data});
        })

    };

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
});