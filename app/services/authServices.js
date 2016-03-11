sprwApp.factory('authServices',function(baseService, $cookies){
    var testEmail = "timothyfranzke@gmail.com";
    var testToken = "68cdb36ad829dcfa4a908d71793263c978ed05d9ce826d1ce083e4804a506bcf";
    var testData = {
        token: "68cdb36ad829dcfa4a908d71793263c978ed05d9ce826d1ce083e4804a506bcf",
        userEmail: "timothyfranzke@gmail.com"
    };
    var userData = {};

    return {
        authUser: function (authData) {
            return baseService.POST(auth, authData);
        },
        resetPassword: function(passwordData) {
            return baseService.POST(resetPassword, passwordData)  ;
        },
        forgotPassword: function(emailData) {
            console.log(JSON.stringify(emailData));
            return baseService.POST(forgotPassword, emailData);
        },
        getUserData: function(){
            if (userData.token === undefined)
            {
                userData = $cookies.getObject('user_info');
            }
            return userData;
        },
        setUserData: function(email, token){
            userData = {};
            userData.token = token;
            userData.userEmail = email;
            $cookies.putObject('user_info', userData);
        }
    }
});
