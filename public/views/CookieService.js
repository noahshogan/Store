/**
 * Created by Lior on 6/19/2017.
 */



app.factory('CookieService',function () {

    var service ={};
    service.user = {};
    service.trygetCookie = function () {
        var u ={}
        u.userName="noCookie";
        if(document.cookie.length != 0) {
            var infoArray = document.cookie.split('=');
            u = JSON.parse(infoArray[1]);
        }
        return u;

    }

    service.saveCookie= function (userToSave) {
            var userString = JSON.stringify(userToSave);
            document.cookie = "cookieObj=" + userString+ '; max-age=' + (60*60*24*30);
    }

  return service;

})


function canculateDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    today = mm+'/'+dd+'/'+yyyy;
    return today;
}