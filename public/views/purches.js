app.controller('purchaseController', ['UserService', '$location', '$window','$scope','ngDialog','$http',
    function(UserService, $location, $window,$scope,ngDialog,$http) {
        let self = this;
        self.userService=UserService;
        self.Buy = function () {
            let obj = {};
            obj.userId = UserService.User[0].id;
            obj.amountOfMony = UserService.totalPrice;
            obj.creditNum = self.creditNum;
            obj.items = UserService.Cart;
            obj.date= self.dateSelected;

            $http.post(connectionString+'newPurchase',obj).then(function (res) {
                if (res.status==200){
                    UserService.Cart=[];
                    UserService.totalPrice=0;
                    $window.alert("good good");
                }else{
                    $window.alert("bad bad");
                }
            })
        }
    }]);

//-------------------------------------------------------------------------------------------------------------------
