sprwApp.controller("albumDialogController", function($scope,$mdDialog, FileUploader, album){
    if(album != undefined)
    {
        $scope.album = album;
    }
   $scope.albumNameShow = true;
    $scope.albumImageSelectShow = false;
    $scope.albumImageCropShow = false;
    $scope.albumImageCropResultShow = false;
    $scope.albumTracksShow = false;
    $scope.showFinalizeAlbum = false;

    var uploader = $scope.uploader = new FileUploader({
        url: "http://localhost:33150/v1/api/Artist/CreateTrack?id=0&albumId=1028&artistId=1017&email=timothyfranzke@gmail.com&token=f6fb5929f438ea62dc0309425935487374b2bbb5fae1f6e3c84cfc3c14015f23&trackName=Totally&description=undefined",
        removeAfterUpload: true
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    $scope.uploadAll = function(){
        uploader.queue.forEach(function(item){
            item.url = base + "v1/api/Artist/CreateTrack?albumId=" + $scope.selectedAlbum.albumId + "&artistId=" + $scope.selectedArtist.artistId + "&email=" + userData.userEmail + "&token=" + userData.token + "&trackName=" + item.file.name;
            item.upload();
            //console.log(JSON.stringify(item));
        })
    }
    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
    };
    uploader.onProgressAll = function(progress) {

    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem');
        var newTrack = {
            trackId:response,
            trackName:fileItem.file.name
        };
        $scope.selectedAlbum.tracks.push(newTrack);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    $scope.create = function(item){
        $mdDialog.hide(item);
    };

    $scope.cancel = function(){
        $mdDialog.cancel();
    };

    $scope.goAlbumName = function(){
        $scope.albumNameShow = true;
        $scope.albumImageSelectShow = false;
        $scope.albumImageCropShow = false;
        $scope.albumImageCropResultShow = false;
        $scope.albumTracksShow = false;
        $scope.showFinalizeAlbum = false;
    };

    $scope.goAlbumTrack = function(){
        $scope.albumNameShow = false;
        $scope.albumImageSelectShow = false;
        $scope.albumImageCropShow = false;
        $scope.albumImageCropResultShow = false;
        $scope.albumTracksShow = true;
        $scope.showFinalizeAlbum = false;
    };
    $scope.goAlbumImageSelect = function(){
        $scope.albumNameShow = false;
        $scope.albumImageSelectShow = true;
        $scope.albumImageCropShow = false;
        $scope.albumImageCropResultShow = false;
        $scope.albumTracksShow = false;
        $scope.showFinalizeAlbum = false;
    };
    $scope.goAlbumImageCrop = function(){
        $scope.albumNameShow = false;
        $scope.albumImageSelectShow = false;
        $scope.albumImageCropShow = true;
        $scope.albumImageCropResultShow = false;
        $scope.albumTracksShow = false;
        $scope.showFinalizeAlbum = false;
    };
    $scope.goAlbumImageCropResult = function(){
        $scope.albumNameShow = false;
        $scope.albumImageSelectShow = false;
        $scope.albumImageCropShow = false;
        $scope.albumImageCropResultShow = true;
        $scope.albumTracksShow = false;
        $scope.showFinalizeAlbum = false;
    };
    $scope.goAlbumFinalize = function(){
        $scope.albumNameShow = false;
        $scope.albumImageSelectShow = false;
        $scope.albumImageCropShow = false;
        $scope.albumImageCropResultShow = false;
        $scope.albumTracksShow = false;
        $scope.showFinalizeAlbum = true;
    };

    $scope.$watch('cropper.sourceImage', function(newVal, oldVal){
        console.log("new val" + newVal);
        console.log("old val" + oldVal);
        if (newVal != undefined)
        {
            $scope.albumNameShow = false;
            $scope.albumImageSelectShow = false;
            $scope.albumImageCropShow = true;
            $scope.albumImageCropResultShow = false;
            $scope.albumTracksShow = false;
            $scope.showFinalizeAlbum = false;
        }
    });

    $scope.createAlbum = function(album){
        $mdDialog.hide(album);
    };

    $scope.cancel = function(){
        $mdDialog.cancel();
    }
});