sprwApp.factory('audio', function ($document) {
    var audio = $document[0].createElement('audio');
    return audio;
});