/**
 * Created by Timothy on 11/25/2015.
 */

window.Cropper;
function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById("artistImage");
    imgtag.title = selectedFile.name;

    reader.onload = function(event) {
        imgtag.src = event.target.result;
    };
    reader.onloadend = function(){
        var image = document.getElementById('artistImage');
        var cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            crop: function(data) {
                console.log(data.x);
                console.log(data.y);
                console.log(data.width);
                console.log(data.height);
                console.log(data.rotate);
                console.log(data.scaleX);
                console.log(data.scaleY);
            },
            modal: true
        });
    };

    reader.readAsDataURL(selectedFile);

}

var convertTDate = function(date){
    var firstDash = date.indexOf("-");
    var secondDash = date.indexOf("-");
    var tIndex = date.indexOf("-");

    var year = date.substr(0,firstDash);
    var month = date.substr(firstDash,secondDash);
    var day = date.substr(secondDash,tIndex);

    return new Date(month + "/" + day + "/" + year);
};

var themes = {
    yellow : {
        "border" :"artist-profile-img-yellow",
        "bg":"artist-profile-bg-yellow",
        "img" : "img/logo-yellow.png"
    },
    red: {
        "border" :"artist-profile-img-red",
        "bg":"artist-profile-bg-red",
        "img" : "img/logo-red.png"
    },
    purple : {
        "border" :"artist-profile-img-purple",
        "bg":"artist-profile-bg-purple",
        "img" : "img/logo-purple.png"
    },
    blue : {
        "border" :"artist-profile-img-blue",
        "bg":"artist-profile-bg-blue",
        "img" : "img/logo-blue.png"
    }
};

var copyArray = function(arry1, arry2)
{
    console.log("copyArray : " + JSON.stringify(arry1));
    arry1.forEach(function(item){
        arry2.push(item);
    });
};

$(function() {
    $('nav#menu').mmenu({
        extensions	: [ 'effect-slide-menu', 'pageshadow' ],
        searchfield	: true,
        counters	: true,
        navbar 		: {
            title		: 'Advanced menu'
        },
        navbars		: [
            {
                position	: 'top',
                content		: [ 'searchfield' ]
            }, {
                position	: 'top',
                content		: [
                    'prev',
                    'title',
                    'close'
                ]
            }, {
                position	: 'bottom',
                content		: [
                    '<a href="http://mmenu.frebsite.nl/wordpress-plugin.html" target="_blank">WordPress plugin</a>'
                ]
            }
        ]
    });
});


