sprwApp.controller("confirmDialogController", function($scope, $mdDialog, action, object){
    $scope.action = action;
    $scope.object = object;
    $scope.yes = function(){
        $mdDialog.hide();
    };

    $scope.no = function(){
        $mdDialog.cancel();
    };
});