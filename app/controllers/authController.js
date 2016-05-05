sprwApp.controller('authController', function($scope,$stateParams, $cookies, $state, authServices){
    console.log("auth controller");
    $scope.showFailedMessage = false;
    $scope.reset = {};
    $scope.login = function(creds){
        $scope.$parent.loading = true;
       authServices.authUser(creds).then(function(data){
           authServices.setUserData(creds.email, data.token);
           $scope.$parent.loading = false;
           
           $state.go('player.discover');
       }, function(status){
           $scope.$parent.loading = false;
           $scope.showFailedMessage = true;
       })
    };
    $scope.resetPassword = function(reset){
        console.log("reset password");
        $scope.$parent.loading = true;
        reset.email = $stateParams.email;
        reset.token = $stateParams.token;
        console.log("reset: "+ JSON.stringify(reset));
        authServices.resetPassword(reset).then(function(data){
            authServices.setUserData(reset.email, data);
            $scope.$parent.loading = false;
            $state.go('player.discover');
        }, function(status){
            $scope.$parent.loading = false;
            $scope.showFailedMessage = true;
        })
    };
    $scope.forgotPassword = function(email){
        $scope.$parent.loading = true;
        var userEmail = {
            'email': email
        };
        authServices.forgotPassword(userEmail).then(function(userEmail){
            $scope.$parent.loading = false;
            $state.go("sentEmail");
        })
    };




//navigator.geolocation.getCurrentPosition(showPosition);
//    function showPosition(position){
//        var lat = position.coords.latitude;
//        var long = position.coords.longitude;
//        var from = new google.maps.LatLng(lat,(long * -1));
//        var to = new google.maps.LatLng(39.75, 104.87);
//        var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
//
//        console.log(from);
//        console.log(to);
//        console.log(dist/1609.34);
//    }

});
