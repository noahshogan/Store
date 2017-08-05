/**
 * Created by Hasidi on 18/06/2017.
 */

let app = angular.module('myApp', ['ngRoute', 'LocalStorageModule','ngDialog']);
var connectionString = "http://localhost:4000/"

//-------------------------------------------------------------------------------------------------------------------
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('node_angular_App');
});
//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService','$location','$http', function (UserService,$location,$http) {
    let vm = this;
    vm.greeting = 'Have a nice dayyyyyyyy';
    vm.userService = UserService;

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
        p.quantity=q;
        UserService.Cart.push(p);
        window.alert("Auccessfully added "+q+" "+p.productName+" to the cart");
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
    $locationProvider.html5Mode(true);
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
        .otherwise({redirect: '/',
        });
}]);
//-------------------------------------------------------------------------------------------------------------------
