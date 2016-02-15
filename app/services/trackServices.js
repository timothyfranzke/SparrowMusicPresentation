/**
 * Created by Timothy on 11/25/2015.
 */
sprwApp.factory('trackServices', function($http, $q, baseService){
    return{
        uploadFileToUrl : function(file, albumId, artistId, email, token, trackName){
            var defer = $q.defer();
            var fd = new FormData();
            var query = "?albumId=" + albumId + "&artistId=" + artistId + "&email=" + email + "&token=" + token + "&trackName=" + trackName;
            fd.append('file', file);
            $http.post(base + ext + createTrack + query, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data){
                defer.resolve(data);
            })
            .error(function(){
                    defer.reject();
            });
            return defer.promise;
        },
        trackPopularity: function(criteriaData){
            return baseService.POST(popular, criteriaData)
        }
    }
});
