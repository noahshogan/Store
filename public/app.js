



let app = angular.module('myApp', ['ngRoute', 'LocalStorageModule','ngDialog']);
var connectionString = "http://localhost:4000/"

//-------------------------------------------------------------------------------------------------------------------
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('node_angular_App');
});
//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService','CookieService','$location','$http','ngDialog','ProductService', function (UserService,CookieService,$location,$http,ngDialog,ProductService) {
    let vm = this;
    vm.showProduct = function () {
        ngDialog.open({ template: 'views/showProduct.html', className: 'ngdialog-theme-default',controller:'ProductModal'});
    };
    vm.userService = UserService;
    vm.Cart=UserService.Cart;
    vm.recommandedProducts=UserService.recommandedProducts;
    var ans = CookieService.trygetCookie();
    var u = {};
        if(ans[0].userName!="noCookie"){
            u.password=ans[0].pword;
            u.username=ans[0].username;
            UserService.login(u);
        }

    //vm.totalPrice=0;
    $http.get(connectionString+'getTop5').then(function(response) {
        vm.top5=response.data;
    }).catch(function (e) {
        $window.alert(e)
    })

    vm.logOff = function () {
        vm.userService.isLoggedIn=false;
        $location.path('/');
    }
    vm.addToCart = function (p,q) {
        if(p.instock<q){
            window.alert("there's only '"+p.instock+"' pieces left in stock")
        }
        else{
            UserService.addToCart(p,q,UserService.User[0].id).then(function (sucsees) {
                if (sucsees){
                    window.alert("successfully added "+q+" "+p.productName+" to the cart");
                }else {
                    window.alert("failed to add "+q+" "+p.productName+" to the cart");
                }
            })
        }
    }
    vm.removeFromCart=function(p){
        UserService.removeFromCart(p).then(function (sucsees) {
            if (sucsees){
                window.alert("successfully removed "+p.productName+" from the cart");
            }else {
                window.alert("failed to remove "+p.productName+" from the cart");
            }
        })
    }
    vm.openDialog = function (p) {
        ProductService.setP(p);
        vm.showProduct();

    }

}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('recoverController', ['UserService', '$location', '$window','$scope','$http',
    function(UserService, $location, $window,$scope,$http) {
        let self = this;

        self.recover = function(valid) {
            if (valid) {
                $http.get(connectionString+'recoverPassword?username='+$scope.username+'&ANSWER1='+$scope.ANSWER1+'&ANSWER2='+$scope.ANSWER2).then(function(response) {
                    if (response.status==200){
                        $window.alert(response.data)
                    }else{
                        $window.alert("no mach")
                    }
                }).catch(function (e) {
                    $window.alert("no mach")
                })
            }
        };
    }]);


//-------------------------------------------------------------------------------------------------------------------
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller : "mainController"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller : "loginController"
        })
        .when("/login/Recover", {
            templateUrl : "views/recover.html",
            controller: 'recoverController'
        })
        .when("/SignUp", {
            templateUrl : "views/SignUp.html",
            controller: 'SignUpController'
        })
        .when("/products", {
            templateUrl : "views/Products.html",
            controller: 'producsController'
        })
        .when("/Search", {
            templateUrl : "views/Search.html",
            controller: 'searchController'
        })
        .when("/Purchase", {
            templateUrl : "views/purches.html",
            controller: 'purchaseController'
        })
        .when("/HistoryOfPurchases", {
            templateUrl : "views/HistoryOfPurchases.html",
            controller: 'historyController'
        })
        .otherwise({redirect: '/',
        });
}]);
//-------------------------------------------------------------------------------------------------------------------
