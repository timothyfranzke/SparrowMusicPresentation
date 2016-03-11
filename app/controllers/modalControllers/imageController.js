sprwApp.controller('imageController', function($scope, $mdDialog, trackingId){
    $scope.image = "";
    $scope.imageSelectShow = true;
    $scope.imageCropShow = false;
    $scope.imageCropResultShow = false;

    $scope.$watch('cropper.sourceImage', function(newVal, oldVal){
        console.log("new val" + newVal);
        console.log("old val" + oldVal);
        if (newVal != undefined)
        {
            $scope.imageSelectShow = false;
            $scope.imageCropShow = true;
            $scope.imageCropResultShow = false;
        }
    });

    $scope.goImageSelect = function(){
        $scope.imageSelectShow = true;
        $scope.imageCropShow = false;
        $scope.imageCropResultShow = false;
    };

    $scope.goImageCrop = function(){
        $scope.imageSelectShow = false;
        $scope.imageCropShow = true;
        $scope.imageCropResultShow = false;
    };

    $scope.goImageCropResult = function(){
        $scope.imageSelectShow = false;
        $scope.imageCropShow = false;
        $scope.imageCropResultShow = true;
    };

    $scope.createImage = function(image){
        $mdDialog.hide(image);
    };

    $scope.cancel = function(){
        $mdDialog.cancel();
    };

});