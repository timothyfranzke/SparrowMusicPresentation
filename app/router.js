sprwApp.config(function($urlRouterProvider, $stateProvider, $locationProvider){
    $stateProvider
        .state('login', {
            url:'/login',
            templateUrl:'app/partials/login.html',
            controller:'authController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/partials/register.html',
            controller:'userController'
        })
        .state('forgotPassword',{
            url:'/forgotPassword',
            templateUrl:'app/partials/forgotPassword.html',
            controller:'authController'
        })
        .state('sentEmail', {
            url:'/successEmail',
            template:"<p>An email has been sent to your account</p>"
        })
        .state('resetPassword',{
            url:'/resetPassword/:email/:token',
            templateUrl: 'app/partials/resetPassword.html',
            controller:'authController'
        })
        .state('player', {
            abstract: true,
            templateUrl: 'app/partials/player.html',
            controller: 'playerController',
            resolve: {
                metaData: function(playlistServices) {
                    return playlistServices.getDiscvoerPlaylistMetaData();
                },
                artists: function(artistService, authServices){
                    return artistService.getAssociatedArtists(authServices.getUserData().userEmail, authServices.getUserData().token);
                }
            }
        })
        .state('player.discover',{
            url:'/discover',
            templateUrl: 'app/partials/discover.html'
        })
        // .state('artistModal', {
        //     views:{
        //         "modal":{
        //             templateUrl:'app/partials/templates/artistForm/artistForm.html'
        //         },
        //         "create":{
        //             templateUrl:'app/partials/templates/artistFormCreate.html'
        //         }
        //     },
        //     abstract: true
        // })
        // .state('artistModal.create',{
        //     views:{
        //         "modal":{
        //             templateUrl:'app/partials/templates/artistForm/artistFormCreate.html'
        //         }
        //     }
        // })
        // .state('artistFormModal', {
        //     url:'/createArtist',
        //     onEnter: ['$uibModal', '$state', function($uibModal, $state) {
        //         console.log('Open modal');
        //         $uibModal.open({
        //             templateUrl: 'app/partials/templates/artistForm/artistForm.html',
        //             backdrop: true
        //         }).result.finally(function() {
        //                 $state.go('player.artistProfileAdmin');
        //             });
        //     }]
        // })
        // .state('artistFormModal.createArtist',{
        //     url:'/artist',
        //     controller:'artistFormController',
        //     templateUrl:'app/partials/templates/artistForm/artistFormCreate.html'
        // })
        // .state('artistFormModel.createTheme',{
        //     url:'/theme',
        //     controller:'artistFormController',
        //     templateUrl:'app/partials/templates/artistForm/artistFormTheme.html'
        // })
        // .state('artistFormModel.createImage',{
        //     url:'/image',
        //     controller:'artistFormController',
        //     templateUrl:'app/partials/templates/artistForm/artistFormImage.html'
        // })
        .state('player.events', {
            url:'/events',
            templateUrl: 'app/partials/events.html'
        })
        .state('player.artistProfile', {
            url: '/artist/:id',
            templateUrl: 'app/partials/artistProfile.html',
            controller: 'artistProfileController'
        })
        .state('player.artistProfileAdmin', {
            url: '/mymusic/:id',
            templateUrl: 'app/partials/artistProfileAdmin.html',
            controller: 'artistProfileAdminController'
        });
    $urlRouterProvider.otherwise('login');
        // .state('cropper', {
        //     url: '/cropper',
        //     templateUrl: 'app/partials/cropper.html'
        // })
        // .state('player.createArtist', {
        //     url:'/mymusic',
        //     templateUrl:'app/partials/artist.html',
        //     controller: 'artistController',
        //     resolve:{
        //         artists: function(artistService, authServices){
        //             return artistService.getAssociatedArtists(authServices.getUserData().userEmail, authServices.getUserData().token);
        //         }
        //     }
        // })
});
