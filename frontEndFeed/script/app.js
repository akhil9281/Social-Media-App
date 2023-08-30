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
        templateUrl: 'views/getPosts.html',
        controller: 'getPostController'
    })
    .when('/comments', {
        templateUrl: 'views/getComments.html'/* ,
        controller: 'getCommentsController' */
    })
    .when('/like', {
        templateUrl: 'views/getLike.html',
        controller: 'feedController'
    })
    .otherwise({
        redirectTo: '/home'
    })

}])