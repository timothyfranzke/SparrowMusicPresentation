sprwApp.controller("dialogController", function($scope, $mdDialog, params){
    $scope.params = params;
    $scope.create = function(item){
        $mdDialog.hide(item);
    };

    $scope.cancel = function(){
        $mdDialog.cancel();
    };
});