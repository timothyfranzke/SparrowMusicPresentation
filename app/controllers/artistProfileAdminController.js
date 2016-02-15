/**
 * Created by Timothy on 11/24/2015.
 */
sprwApp.controller('artistProfileAdminController', function($scope, $stateParams, $state, $uibModal, artistService, authServices, trackServices, FileUploader){

    console.log("artistProfileAdmin controller");
    //variables
    var userData = {};
    userData = authServices.getUserData();
    console.log("userdata: " + JSON.stringify(userData));
    if (userData.token === undefined)
        $state.go('login');
    //scope bool variables
    $scope.hasAssociatedArtists = false;
    $scope.hasAlbums = false;
    $scope.hasTracks = false;
    $scope.isArtistSelected = false;
    $scope.isAlbumSelected = false;
    $scope.isCreatingArtist = false;
    $scope.isUpdatingArtist = false;
    $scope.isCreateingArtistImage = false;
    $scope.isCreateingAlbumImage = false;
    $scope.isCreatingAlbum = false;
    $scope.isUpdatingAlbum = false;
    $scope.isCreatingTrack = false;
    $scope.isCreatingEvent = false;

    //scope models
    $scope.associatedArtists = [];
    $scope.selectedArtistId = -1;
    $scope.selectedArtist = {};
    $scope.selectedArtist.albums = [];
    $scope.selectedAlbum = {};
    $scope.selectedAlbum.tracks = [];
    $scope.selectedArtistList = [];
    $scope.genres = [];
    $scope.artistImage = "https://sparrowmusic.blob.core.windows.net/images/";

    //cropper variables
    $scope.cropper = {};
    $scope.cropper.sourceImage = null;
    $scope.cropper.croppedImage   = null;
    $scope.cropper.albumImage = null;
    $scope.bounds = {};
    $scope.bounds.left = 0;
    $scope.bounds.right = 0;
    $scope.bounds.top = 0;
    $scope.bounds.bottom = 0;

    //fileUploader
    var uploader = $scope.uploader = new FileUploader({
        url: "http://localhost:33150/v1/api/Artist/CreateTrack?id=0&albumId=1028&artistId=1017&email=timothyfranzke@gmail.com&token=f6fb5929f438ea62dc0309425935487374b2bbb5fae1f6e3c84cfc3c14015f23&trackName=Totally&description=undefined",
        removeAfterUpload: true
    });

    var createAlbum = function(album){
        $scope.$parent.loading = true;
        album.userEmail = userData.userEmail;
        album.token = userData.token;
        album.artistId = $scope.selectedArtist.artistId;
        $scope.isCreatingAlbum = false;

        artistService.createAlbum(album).then(function(data){
            $scope.$parent.loading = false;
            $scope.hasAlbums = true;
            var newAlbum = JSON.parse(JSON.stringify(album));
            newAlbum.albumId = data;
            newAlbum.tracks = [];
            newAlbum.releaseDate = convertTDate(newAlbum.releaseDate);
            $scope.selectedArtist.albums.push(newAlbum);
            $scope.selectedAlbum = newAlbum;
        })
    };

    var createArtistEvent = function(artistEvent){
        $scope.$parent.loading = true;
        var model = artistEvent;
        console.log("userData token:" + JSON.stringify(userData));
        artistEvent.token = userData.token;
        artistEvent.userEmail = userData.userEmail;
        artistEvent.artistId = $scope.selectedArtist.artistId;

        artistService.createEvent(artistEvent).then(function(data){
            $scope.$parent.loading = false;
            var i = 0;
            var events = [];
            var newEvent = JSON.parse(JSON.stringify(artistEvent));
            newEvent.eventId = data;
            $scope.selectedArtist.events.push(newEvent);
            if ( $scope.selectedArtist.events.length > 0)
            {
                $scope.selectedArtist.events.sort(function(a,b){
                    return new Date(Date.parse(a.eventDate)) > new Date(Date.parse(b.eventDate));
                })
            }
            artistEvent = {};
            $scope.isCreatingEvent = false;
        })
    };

    var createAlbumImage = function(img){
        var time = Math.floor(Date.now() / 1000);
        $scope.$parent.loading = true;
        var artistImage = {};
        artistImage.image64 = img;
        artistImage.userEmail = userData.userEmail;
        artistImage.token = userData.token;
        artistImage.artistId = $scope.selectedArtist.artistId;
        artistImage.trackingId = $scope.selectedAlbum.albumId;
        artistImage.albumId = $scope.selectedAlbum.albumId;

        artistService.createAlbumImage(artistImage).then(function(data){
            $scope.$parent.loading = false;
            $scope.isCreateingAlbumImage = false;
            $scope.selectedAlbum.hasImage = true;
            $scope.selectedAlbum.imageURL = imageBase + $stateParams.id + "/" + $scope.selectedAlbum.albumId +  "/0.jpg?" + time;
        });
    };

    var createArtistImage = function(img){
        var time = Math.floor(Date.now() / 1000);
        $scope.$parent.loading = true;
        var artistImage = {};
        artistImage.image64 = img;
        artistImage.userEmail = userData.userEmail;
        artistImage.token = userData.token;
        artistImage.artistId = $scope.selectedArtist.artistId;
        artistImage.trackingId = $scope.selectedArtist.artistId;

        artistService.createArtistImage(artistImage).then(function(data){
            $scope.$parent.loading = false;
            $scope.isCreateingArtistImage = false;
            $scope.selectedArtist.hasImage = true;
            $scope.selectedArtist.imageURL = imageBase + $stateParams.id + "/0.jpg?" + time;
        });
    };
    // FILTERS

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

    console.info('uploader', uploader);

    //methods
    $scope.animationsEnabled = true;

    $scope.openEvent = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'event.html',
            controller: 'modalController',
            size: size
        });
        modalInstance.result.then(function (event) {
            console.log("creating event" + JSON.stringify(event));
            createArtistEvent(event);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openAlbum = function (modify) {
        console.log(modify);
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'album.html',
            controller: 'modalController',
            resolve: {
                items: function(){
                    return $scope.selectedAlbum;
                },
                modify: function(){
                    return modify;
                }
            }
        });
        modalInstance.result.then(function (album) {
            if (modify === ("Create")){
                console.log("creating album" + JSON.stringify(album));
                createAlbum(album);
            }
            else{

            }
        }, function () {
            console.log("Modal dismissed");
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openAlbumImage = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'image.html',
            controller: 'modalImageController'
        });
        modalInstance.result.then(function (albumImage) {
            createAlbumImage(albumImage);
        }, function () {
            console.log("Modal dismissed");
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openArtistImage = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'image.html',
            controller: 'modalImageController'
        });
        modalInstance.result.then(function (albumImage) {
            createArtistImage(albumImage);
        }, function () {
            console.log("Modal dismissed");
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    $scope.cancelCreate = function(){
        $scope.isCreatingArtist = false;
        $scope.isCreatingAlbum = false;
        $scope.isCreatingTrack = false;
        $scope.isCreateingArtistImage = false;
        $scope.isUpdatingAlbum = false;
    };

    $scope.cancelAlbumImage = function(){
        $scope.isCreateingAlbumImage = false;
    };

    $scope.cancelArtistImage = function(){
        $scope.isCreateingArtistImage = false;
    };

    $scope.showUpdateArtist = function(){
        $scope.artist = $scope.selectedArtist;
        $scope.isUpdatingArtist = true;
    };

    $scope.showCreateArtistImage = function(){
        $scope.isCreateingArtistImage = true;
    };

    $scope.showCreateAlbumImage = function(){
        $scope.isCreateingAlbumImage = true;
    };

    $scope.showCreateAlbum = function(){
        $scope.album = {};
        $scope.isCreatingAlbum = true;
    };

    $scope.showUpdateAlbum = function(){
        $scope.isCreatingAlbum = true;
        $scope.album = $scope.selectedAlbum;
    };

    $scope.showCreateTrack = function(){
        $scope.isCreatingTrack = true;
    };

    $scope.showCreateEvent = function(){
        $scope.isCreatingEvent = true;
    };

    $scope.$watch("selectedGenre", function(newVal, oldVal){
        if(newVal !== undefined){
            var genreModel = {
                artistId : $scope.selectedArtist.artistId,
                genreId : newVal,
                userEmail: userData.userEmail,
                token: userData.token
            };
            artistService.addGenre(genreModel).then(function(data){
                console.log('genres: ' + JSON.stringify($scope.selectedArtist.genres));
                if ($scope.selectedArtist.genres === undefined || $scope.selectedArtist.genres === null)
                {
                    $scope.selectedArtist.genres = [];
                }
                $scope.genres.forEach(function(genre){
                    if (genre.genreId == newVal)
                    {
                        $scope.selectedArtist.genres.push(genre);
                    }
                })
            })
        }
    });

    $scope.selectArtist = function(id){
        artistService.getArtist(id).then(function(data){
            $scope.selectedArtist = data;
            alert($scope.selectedArtist.events.length);
            $scope.selectedArtist.events.forEach(function(event){
                var eDate = new Date(Date.parse(event.eventDate));
                alert(eDate);
                event.eventDate = new Date(Date.parse(event.eventDate));
            });
            $scope.isArtistSelected = true;
            if (data.albums.length > 0){
                $scope.isAlbumSelected = true;
                $scope.selectedAlbum = data.Albums[0];
            }
        });
    };

    $scope.selectAlbum = function(index){
        $scope.selectedAlbum = $scope.selectedArtist.albums[index];
        $scope.selectedAlbum.releaseDate = convertTDate($scope.selectedAlbum.releaseDate);
        $scope.isAlbumSelected = true;
        console.log($scope.selectedAlbum);
    };

    $scope.createArtist = function(artist){
        $scope.isCreatingArtist = false;
        artist.token = userData.token;
        artist.userEmail = userData.userEmail;

        artistService.createArtist(artist).then(function(data){
            var newArtist = JSON.parse(JSON.stringify(artist));
            newArtist.artistId = data;
            $scope.selectedArtist = newArtist;
            $scope.selectedArtist.albums = [];
            $scope.artistImage = imageBase + "/" + $stateParams.id + "/0.jpg?" + new Date().getTime();
        })
    };

    $scope.updateArtist = function(artist){

    };

    $scope.createAlbum = function(album){

    };

    $scope.updateAlbum = function(album){
        album.userEmail = userData.userEmail;
        album.token = userData.token;
        album.artistId = $scope.selectedArtist.artistId;
        $scope.isUpdatingAlbum = false;

        artistService.updateAlbum(album).then(function(data){
            $scope.selectedAlbum.albumName = album.albumName;
            $scope.selectedAlbum.releaseDate = album.releaseDate;
            $scope.selectedAlbum.albumId = album.albumId;
            $scope.selectedAlbum.description = album.description;
            album = {};
        });
    };

    $scope.createArtistImage = function(){

    };

    $scope.createAlbumImage = function(){

    };

    $scope.deleteEvent = function(index){
        artistService.deleteEvent($scope.selectedArtist.artistId, $scope.selectedArtist.events[index].eventId, userData.userEmail, userData.token).then(function(data){
            $scope.selectedArtist.events.splice(index, 1);
            alert("Event has been deleted");
        });
    };

    $scope.createArtistBulliten = function(artistBulliten){
        artistBulliten.token = userData.token;
        artistBulliten.userEmail = userData.userEmail;
        artistBulliten.artistId = $scope.selectedArtist.artistId;

        artistService.createArtistBulliten(artistBulliten).then(function(data){
            $scope.selectedArtist.Bulliten = artistBulliten;
        });
    };

    $scope.createTrack = function(){
        var file = $scope.myFile;
        trackServices.uploadFileToUrl(file, $scope.selectedAlbum.albumId, $scope.selectedArtist.artistId, userData.userEmail, userData.token, $scope.track.trackName).then(function(data){
            var newTrack = JSON.parse(JSON.stringify($scope.track));
            $scope.track ={};
            $scope.selectedAlbum.tracks.push(newTrack);
            $scope.isCreatingTrack = false;
        });
    };

    $scope.deleteTrack = function(track, index){
        console.log("Track: " + JSON.stringify(track));
        artistService.deleteTrack($scope.selectedArtist.artistId, track.trackId, userData.userEmail, userData.token).then(function(data){
            $scope.selectedAlbum.tracks.splice(index, 1);
            alert("Track has been deleted");
        });
    };

    $scope.addGenre = function(genre){
        console.log(JSON.stringify(genre));
        if ($scope.selectedArtist.genres === undefined)
        {
            $scope.selectedArtist.genres = [];
        }
        var genreModel = {
            artistId : $scope.selectedArtist.artistId,
            genreId : genre.genreId,
            userEmail: userData.userEmail,
            token: userData.token
        };
        artistService.addGenre(genreModel).then(function(data){
            if ($scope.selectedArtist.genres === undefined)
            {
                $scope.selectedArtist.genres = [];
            }
            $scope.genres.forEach(function(genre){
                if (genre.genreId == data)
                {
                    $scope.selectedArtist.genres.push(genre);
                }
            })

        })
    };

    $scope.deleteGenre = function(genre){
        artistService.deleteGenre($scope.selectedArtist.artistId, genre, userData.userEmail, userData.token).then(function(data){
            var i = 0;
            var temp = [];
            $scope.selectedArtist.genres.forEach(function(item){
                console.log(item.genreId + " : " + genre);
                if (item.genreId !== genre){
                    console.log("genre:" + JSON.stringify(item));
                    temp.push(item);
                }
            });
            $scope.selectedArtist.genres = [];
            $scope.selectedArtist.genres = temp;
        })
    };

    $scope.play = function(id){
        var item = {
            artistId: $scope.selectedArtist.artistId,
            albumId: $scope.selectedAlbum.albumId,
            trackId : id
        };
        $scope.$parent.player.playlist = [];

    };

    //debug methods
    $scope.alertSomething = function(item){
        alert(item);
        alert(JSON.stringify(item));
        console.log("debug item: " + item);
        console.log("debug JSON item: " + JSON.stringify(item));
    };

    //initial calls






    artistService.getAssociatedArtists(userData.userEmail, userData.token).then(function(data){
        if(data.length > 0){
            $scope.hasAssociatedArtists = true;
        }
        $scope.associatedArtists = data;
    });

    if ($stateParams === undefined){
        $scope.showErrorMessage = true;
    }
    else{
        artistService.getArtist($stateParams.id).then(function(data){
            $scope.selectedArtist = data;
            $scope.isArtistSelected = true;

            $scope.selectedArtist.events.forEach(function(event){
                var eDate = new Date(Date.parse(event.eventDate));
                var day = -1;
                var month = -1;
                if (eDate.getDate().toString().length > 1)
                {
                    day = eDate.getDate();
                }
                else
                {
                    day = "0" + eDate.getDate();
                }
                if (eDate.getMonth().toString().length > 1)
                {
                    month = eDate.getMonth() + 1;
                }
                else
                {
                    month = "0" + eDate.getMonth() + 1;
                }
                event.eventDate = month + "/" + day + "/" + eDate.getFullYear();
            });
            $scope.settings =JSON.parse(data.settings);
            $scope.selectedArtist.imageURL = imageBase + $stateParams.id + "/0.jpg";
            data.albums.forEach(function(album){
                if(album.hasImage){
                    album.imageURL = imageBase + $stateParams.id + "/" + album.albumId + "/0.jpg";
                }
                else{
                    album.imageURL = "img/default.jpg";
                }
                console.log(JSON.stringify(album));
            });
            if (data.albums.length > 0){
                $scope.isAlbumSelected = true;
                $scope.selectedAlbum = data.albums[0];
                $scope.hasAlbums = true;
            }
            else{
                $scope.hasAlbums = false;
            }
            $scope.selectedArtist.events.sort(function(a,b){
                var aDate = new Date(Date.parse(a.eventDate));
                var bDate = new Date(Date.parse(b.eventDate));
                return aDate > bDate;
            });
            $scope.artistImage = imageBase + "/" + $stateParams.id + "/0.jpg";
        });
    }

    artistService.getGenres().then(function(data){
        console.log(data);
        $scope.genres = data;
        console.log($scope);
    });

});

sprwApp.controller('modalController', function($scope, $uibModalInstance, items, modify){
    $scope.item = items;
    $scope.modify = modify;
    $scope.ok = function (model) {
        $uibModalInstance.close(model);
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    };
});

sprwApp.controller('modalImageController', function($scope, $uibModalInstance){
    $scope.cropper = {};
    $scope.cropper.sourceImage = null;
    $scope.cropper.croppedImage   = null;
    $scope.bounds = {};
    $scope.bounds.left = 0;
    $scope.bounds.right = 0;
    $scope.bounds.top = 0;
    $scope.bounds.bottom = 0;
    $scope.ok = function (model) {
        $uibModalInstance.close(model);
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    };
});
