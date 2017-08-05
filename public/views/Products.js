app.controller('producsController', ['UserService', '$location', '$window','$scope','$http',
    function(UserService, $location, $window,$scope,$http) {
        let self = this;
        self.currentPage = 0;
        self.pageSize = 5;
        self.products = [];
        self.recommandedProducts = [];
        self.orderby='productName';

        $http.get(connectionString+'getAllProducts').then(function(response) {
            self.products=response.data;
            $http.get(connectionString+'getAllCategorys').then(function(response2) {
                self.categotys=response2;
                for(var i = 0 ; i < self.products.length;i++){
                    for(var j = 0 ; j < self.categotys.data.length;j++){
                        var a=self.products[i];
                        var b=self.categotys.data[j];
                        var x = 1;
                        if (a.productCategoryId===b.categoryId){
                            self.products[i].categoryName=b.categoryName;
                        }
                    }
                }
            }).catch(function (e) {
                //$window.alert(e)
            })
        }).catch(function (e) {
            //$window.alert(e)
        })



        self.numberOfPages=function(){
            return Math.ceil(self.products.length/self.pageSize);
        }

        self.changeOrderBy = function () {
            $http.get(connectionString+'productSearchByCategory?productCategoryId='+self.orderby).then(function(response) {
                self.products=response;
            }).catch(function (e) {
              //  $window.alert(e)
            })
        }

    }]);
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});