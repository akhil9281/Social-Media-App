var myApp = angular.module("feedApp", ["ngRoute", "ngAnimate"]);

myApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

    
    $locationProvider.hashPrefix('');

    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html'
    })
    .when('/feed', {
        templateUrl: 'views/feed.html'/* ,
        controller: 'feedController' */
    })
    .when('/post', {
        templateUrl: 'views/getUserPosts.html',
        controller: 'getUserPostController'
    })
    .when('/like', {
        templateUrl: 'views/getLike.html',
        controller: 'getLikeController'
    })
    .otherwise({
        redirectTo: '/feed'
    })

}])