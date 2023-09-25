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

}]);

myApp.filter("timeFilter", function() {
    return function(timestamp) {
        let postTime = new Date(timestamp).getTime();
        let presentTime = new Date().getTime();
        console.log("time", presentTime, postTime);

        let diffInSeconds = Math.floor((presentTime - postTime)/1000)

        if (diffInSeconds < 5) {
            return "Just now";
        }
        
        var interval = Math.floor(diffInSeconds / 31536000);
        if (interval === 1) {
            return "1 Year Ago";
        }

        if (interval >= 1) {
            return interval + " Years Ago";
        }

        interval = Math.floor(diffInSeconds / 2592000);
        if (interval === 1) {
            return "1 Month Ago";
        }
        if (interval > 1) {
            return interval + " Months Ago";
        }

        interval = Math.floor(diffInSeconds / 604800);
        if (interval === 1) {
            return "1 Week Ago";
        }
        if (interval >= 1) {
            return interval + " Weeks Ago";
        }

        interval = Math.floor(diffInSeconds / 86400);
        if (interval === 1) {
            return "1 Day Ago";
        }
        if (interval >= 1) {
            return interval + " Days Ago";
        }

        interval = Math.floor(diffInSeconds / 3600);
        if (interval === 1) {
            return "1 Hour Ago";
        }
        if (interval >= 1) {
            return interval + " Hours Ago";
        }

        interval = Math.floor(diffInSeconds / 60);
        if (interval === 1) {
            return "1 Minute Ago";
        }
        if (interval >= 1) {
            return interval + " Minutes Ago";
        }

        return Math.floor(diffInSeconds) + " diffInSeconds Ago";
    };
})