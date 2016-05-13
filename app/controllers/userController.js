sprwApp.controller('userController', function($scope, $cookies, $state, userServices, authServices){
    $scope.passwordsMatch = true;
    $scope.checkKey = function($event){
        console.log($event)
    };
    $scope.passwordCheck = function(pw, cPw)
    {
        console.log("checking pw");
        if(pw === cPw || !cPw)
            $scope.passwordsMatch = true;
        else
            $scope.passwordsMatch = false;
    };
    $scope.register = function(userModel){
        $scope.$parent.loading = true;
        userServices.createUser(userModel).then(function(data){
            authServices.setUserData(userModel.email, data.token);
            $scope.$parent.loading = false;
            $state.go('player.discover');
        })
    }
});