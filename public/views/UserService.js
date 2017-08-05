//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http','CookieService', function($http,CookieService) {
    let service = {};
    service.isLoggedIn = false;
    service.Cart = [];
    service.User = null;
    //service.recommandedProducts=[];
    service.totalPrice=0;
    service.login = function(user) {
        return new Promise(function (resolve, reject) {
            $http.post(connectionString+'login', user).then(function(response) {
                if(response.data.ans){
                    service.User=response.data.User;
                    CookieService.saveCookie(service.User);
                    service.isLoggedIn = true;
                    resolve(response.data)
                    $http.post(connectionString+'recommendedForUser',service.User).then(function(response2) {
                        service.recommandedProducts=response2.data;
                            $http.get(connectionString+'getCartByUserId?userId='+service.User[0].id).then(function(response3) {
                            service.Cart = response3.data;
                                var vals = service.Cart.map(function(a) {return a.productId;});
                            $http.post(connectionString+'getListOfProductsById',vals).then(function (res5) {
                                service.Cart=res5.data;
                                //quantity
                                for(var i=0;i<response3.data.length;i++){
                                    service.Cart[i].quantity=response3.data[i].quantity;
                                    service.totalPrice+=service.Cart[i].productPrice*service.Cart[i].quantity;
                                }
                            })
                        }).catch(function (e) {
                            //$window.alert(e)
                        })
                    }).catch(function (e) {
                        //$window.alert(e)
                    })
                }
                else{
                    reject();
                }
            }).catch(function (e) {
                reject(e);
            })
        })
    };
    service.signUp = function(user) {
        return new Promise(function (resolve, reject) {
            $http.post(connectionString+'createNewUser', user).then(function(response) {
                if(response.status==200){
                    resolve()
                }
                else{
                    reject(error);
                }
            }).catch(function (e) {
                reject(e);
            })
        })
    };
    service.addToCart= function(p,q,uid) {
        return new Promise(function (resolve, reject) {
            let obj={};
            obj.userId=uid;
            obj.productId=p.productId;
            obj.quantity=q;
            $http.post(connectionString+'addToCart', obj).then(function(response) {
                if(response.status==200){
                    p.quantity=q;
                    var found =false;
                    for(var i=0;i<service.Cart.length;i++){
                        if(service.Cart[i].productId==p.productId){
                            found=true;
                            service.Cart[i].quantity+=parseInt(q);
                        }
                    }
                    if(!found){
                        service.Cart.push(p);
                    }
                    service.totalPrice +=p.productPrice*q ;
                    resolve(response.status);
                }
                else{
                    reject(error);
                }
            }).catch(function (e) {
                reject(e);
            })
        })
    };
    service.removeFromCart = function (p) {
        return new Promise(function (resolve, reject) {
            let obj={};
            obj.userId=service.User[0].id;
            obj.productId=p.productId;
            $http.post(connectionString+'removeFromCart', obj).then(function(response) {
                if(response.status==200){
                    var index=-1;
                    for(var i=0;i<service.Cart.length;i++){
                        if(service.Cart[i].productId==p.productId){
                             index = i;
                             break
                        }
                    }

                    if (index > -1) {
                        service.totalPrice-=service.Cart[index].quantity*service.Cart[index].productPrice;
                        service.Cart.splice(index, 1);
                    }
                    resolve(response.status);
                }else{
                    reject(response.status);
                }
            })
        })
    }
    return service;
}]);
