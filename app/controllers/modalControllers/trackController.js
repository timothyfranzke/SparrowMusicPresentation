sprwApp.controller('trackController', function($scope, FileUploader, $mdDialog, album, artistId, authServices){
    $scope.album = album.albumName;
    var userData = authServices.getUserData();
    var uploader = $scope.uploader = new FileUploader({
        removeAfterUpload: true
    });
    var tracks = [];
    $scope.trackSelectShow = true;
    $scope.trackUploadShow = false;
    $scope.trackConfirmShow = false;

    $scope.goTrackSelect = function(){
        $scope.trackSelectShow = true;
        $scope.trackUploadShow = false;
        $scope.trackConfirmShow = false;
    };

    $scope.goUploadTrack = function(){
        $scope.trackSelectShow = false;
        $scope.trackUploadShow = true;
        $scope.trackConfirmShow = false;
    };

    $scope.goConfirmTracks = function(){
        $scope.trackSelectShow = false;
        $scope.trackUploadShow = false;
        $scope.trackConfirmShow = true;
    };

    $scope.uploadAll = function(){
        uploader.queue.forEach(function(item){
            item.url = base + "v1/api/Artist/CreateTrack?albumId=" + album.albumId + "&artistId=" + artistId + "&email=" + userData.userEmail + "&token=" + userData.token + "&trackName=" + item.file.name;
            item.upload();
        })
    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem');
        var newTrack = {
            trackId:response,
            trackName:fileItem.file.name
        };
        tracks.push(newTrack);
    };
    uploader.onAfterAddingFile = function(){
        $scope.trackSelectShow = false;
        $scope.trackUploadShow = true;
        $scope.trackConfirmShow = false;
    };
    uploader.onCompleteAll = function() {
        $scope.trackSelectShow = false;
        $scope.trackUploadShow = false;
        $scope.trackConfirmShow = true;
    };
    $scope.close = function(){
        $mdDialog.hide(tracks);
    };
    $scope.cancel = function(){
        $mdDialog.cancel();
    }
});