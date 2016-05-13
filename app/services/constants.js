var localhost = 'http://localhost:33150/';
var localhostWebApi = 'http://localhost:33150/';
var azure = 'http://sparrowservice.azurewebsites.net/';
var arvixe = 'http://sparrowservices.com.jasmine.arvixe.com/';
var base = localhost;
var ext = 'v1/api/';

//methods
var get = 'GET';
var post = 'POST';
var put = 'PUT';
var del = 'DELETE';

//user apis
var user = 'User/User';
var follow = 'User/Follow';
var unfollow = 'User/Unfollow';
var userArtists = 'User/Artists';
var userEvents = 'User/Events';
var userBullitens = 'User/Bullitens';
var userFilters = 'User/Filter';

//playlist apis
var discover = 'Playlist/Discover';
var search = 'Playlist/Search';
var popular = 'Playlist/Popular';

//artist apis
var artist = 'Artist/Artist';
var album = 'Artist/Album';
var albumImage = 'Artist/AlbumImage';
var associate = 'Artist/Associate';
var createTrack = 'Artist/CreateTrack';
var track = 'Artist/Track';
var image = 'Artist/Image';
var artistEvent = 'Artist/Event';
var genre = 'Artist/Genre';
var common = 'Artist/Common';
var settings = 'Artist/Setting';
var bulliten = 'Artist/Bulliten';

//auth apis
var auth = 'Auth/AuthenticateUser';
var resetPassword = 'Auth/ResetPassword';
var forgotPassword = 'Auth/ForgotPassword';

//files
var imageBase = "https://sparrowmusic.blob.core.windows.net/images/";
var audioBase = "https://sparrowmusic.blob.core.windows.net/tracks/";

//template locations
var baseDialogTemplate = "app/partials/templates/";
var eventDialogTemplate = baseDialogTemplate + "events.html";
var imageDialogTempalte = baseDialogTemplate + "imageCropper.html";
var albumDialogTemplate = baseDialogTemplate + "album.html";
var trackDialogTemplate = baseDialogTemplate + "track.html";
var confirmDialogTemplate = baseDialogTemplate + "confirm.html";
var imageDialogTemplate = baseDialogTemplate + "imageCropper.html";
var bullitenDialogTemplate = baseDialogTemplate + "Bulliten.html";

//actions
var deleteAction = "delete";

//objects
var trackObject = "track";

//settings
var baseClass = "artist-profile-img-";
var baseClassBg = "artist-profile-bg-";
var baseImg = "img/logo-";

var yellowClass = baseClass + "yellow";
var redClass = baseClass + "red";
var blueClass = baseClass + "blue";
var purpleClass = baseClass + "purple";

var yellowClassBg = baseClassBg + "yellow";
var redClassBg = baseClassBg + "red";
var blueClassBg = baseClassBg + "blue";
var purpleClassBg = baseClassBg + "purple";

var yellowImg = baseImg + "yellow.png";
var redImg = baseImg + "red.png";
var blueImg = baseImg + "blue.png";
var purpleImg = baseImg + "purple.png";
