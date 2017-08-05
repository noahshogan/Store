app.controller('loginController', ['UserService','CookieService', '$location', '$window','$scope','ngDialog',
    function(UserService,CookieService, $location, $window,$scope,ngDialog) {
        let self = this;
        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    CookieService.saveCookie(self.user)
                    $window.alert('You are logged in');
                    $location.path('/');
                    $scope.$apply();
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('log-in has failed');
                })
            }
        };
        self.recoverPassWord= function () {
            ngDialog.open({ template: 'views/recover.html', className: 'ngdialog-theme-default',controller:'recoverController'});
        };

    }]);
//-------------------------------------------------------------------------------------------------------------------
