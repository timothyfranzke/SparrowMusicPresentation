sprwApp.controller("dialogController", function($scope, $mdDialog){
    $scope.create = function(item){
        $mdDialog.hide(item);
    };

    $scope.cancel = function(){
        $mdDialog.cancel();
    };
});