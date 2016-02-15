/**
 * Created by Timothy on 11/24/2015.
 */
sprwApp.factory('artistService', function(baseService){
   return {
       getArtist: function(id){
           var query = "/" + id;
           return baseService.GET(artist, query);
       },
       getAssociatedArtists: function(email, token){
           var query = "?email=" + email + "&token=" + token;
           return baseService.GET(artist, query);
       },
       createArtist: function(artistData){
           return baseService.POST(artist, artistData);
       },
       updateArtist: function(id, artistData){
           return baseService.POST(artist, id, artistData)
       },
       createAlbum: function(albumData) {
           return baseService.POST(album, albumData);
       },
       updateAlbum: function(albumData){
           return baseService.PUT(album, 0, albumData);
       },
       deleteAlbum: function(artistid, albumid, email, token){
           var query = "?artistId=" + artistid + "&albumId=" + albumid + "&email=" + email + "&token=" + token;
           return baseService.POST(album, query);
       },
       deleteTrack: function(artistid, trackId, email, token){
           var query = "?trackId=" + trackId + "&userEmail=" + email + "&token=" + token + "&artistId=" + artistid;
           return baseService.DELETE(track, query);
       },
       createAlbumImage: function(albumImageData){
           return baseService.POST(albumImage, albumImageData);
       },
       associateUser: function(associateData){
           return baseService.POST(associate, associateData);
       },
       createArtistImage: function(artistImageData){
           return baseService.POST(image, artistImageData);
       },
       createEvent: function(eventData){
           return baseService.POST(artistEvent, eventData);
       },
       deleteEvent: function(artistid, eventId, email, token){
           var query = "?eventId=" + eventId + "&userEmail=" + email + "&token=" + token + "&artistId=" + artistid;
           return baseService.DELETE(artistEvent, query);
       },
       getGenres: function(){
           return baseService.GET(genre,"");
       },
       addGenre: function(genreData){
           return baseService.POST(genre, genreData);
       },
       deleteGenre: function(artistId, genreId, email, token){
           var query = "?genreId=" + genreId + "&userEmail=" + email + "&token=" + token + "&artistId=" + artistId;
           return baseService.DELETE(genre,query);
       },
       getCommonData: function(){
           return baseService.GET(common,"");
       },
       createSetting: function(settingData){
           return baseService.POST(settings, settingData);
       },
       updateSetting: function(settingData){
           return baseService.PUT(settings, settingData);
       }
   }
});