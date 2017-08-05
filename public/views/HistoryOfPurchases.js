app.controller('historyController', ['UserService', '$location', '$window','$http','ngDialog',
    function(UserService, $location, $window,$http,ngDialog) {
        let self = this;
        $http.get(connectionString+'getAllPurchases?userId='+UserService.User[0].id).then(function (res) {
            self.history=res.data;
            for(var i = 0 ; i < self.history.length;i++){
                self.history[i].array=JSON.parse(self.history[i].items)
            }
        })

    }]);