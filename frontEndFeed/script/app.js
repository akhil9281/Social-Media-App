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
    .when('/posts', {
        templateUrl: 'views/getUserPosts.html',
        controller: 'getUserPostController'
    })
    .when('/questions', {
        templateUrl: 'views/getUserQuestions.html',
        controller: 'getUserQuestionController'
    })
    .when('/likes', {
        templateUrl: 'views/getLike.html',
        controller: 'getLikeController'
    })
    .otherwise({
        redirectTo: '/feed'
    })

}])