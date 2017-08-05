app.controller('SignUpController', ['UserService', '$location', '$window','$scope','$http',
    function(UserService, $location, $window,$scope,$http) {
        let self = this;
        self.countries={};
        var request = new XMLHttpRequest();
        request.open('GET', 'countries.xml', false);
        request.send();
        var xml = request.responseXML;
        self.countries = xml.getElementsByTagName("Name");

        $http.get(connectionString+'getAllCategorys').then(function(response) {
            self.categotys=response;
        }).catch(function (e) {
            $window.alert(e)
        })


        self.signUp = function(valid) {
            if (valid) {
                UserService.signUp(self.user).then(function (success) {
                    $window.alert('You signed Up please log in :)');
                    $location.path('/login');
                    $scope.$apply();
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('sign Up has failed');
                })
            }
        };

        self.chackPassValid = function () {
            var x = self.user.password;
            self.passWordmsg=[];
            self.passWordmsgBoll = false;
            if(x.length<5){
                self.passWordmsg.push("passwors must be longer then 5 letters \n");
                self.passWordmsgBoll=true;
            }
            if(x.length>10){
                self.passWordmsg.push("passwors must be less then 10 letters \n");
                self.passWordmsgBoll=true;
            }
            if(!(x.match(/[a-z]/i))){
                self.passWordmsg.push("passwors must contain alphabet letters \n");
                self.passWordmsgBoll=true;
            }
            if(!(x.match(/\d+/g))){
                self.passWordmsg.push("passwors must contain number \n");
                self.passWordmsgBoll=true;
            }


        }

    }]);
