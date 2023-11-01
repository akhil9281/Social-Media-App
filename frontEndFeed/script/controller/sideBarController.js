angular.module("feedApp")
.controller("sideBarController", ["$scope", "feedService", function($scope, feedService) {

    $scope.mostLikedPost = {};
    $scope.mostDiscussedQuestion = {};
    $scope.quote = {};

    $scope.init = function() {
        $scope.getMostLikedPost();
        $scope.getMostDiscussedQuestion();
        $scope.getQuote();
        $scope.getLoggedUser();
    };

    $scope.getMostLikedPost = function() {
        $scope.mostLikedPost = {};
        feedService.getMostLikedPost()
        .then(function(value) {
            console.log("mostLikedPost - ", value.data[0]);
            $scope.mostLikedPost = value.data[0];            
        })
    };

    $scope.getMostDiscussedQuestion = function() {
        $scope.mostDiscussedQuestion = {};
        feedService.getMostDiscussedQuestion()
        .then(function(value) {
            console.log("mostDiscussedPost - ", value.data[0]);
            $scope.mostDiscussedQuestion = value.data[0];            
        })
    };

    $scope.getQuote = function() {
        $scope.quote = {};
        feedService.getQuote()
            .then(function(value) {
                console.log("Quote is - ", value);
                $scope.quote = value[0];
            })
    };

    $scope.getLoggedUser = function() {
        $scope.currentLoggedUser = "";
        $scope.currentLoggedUser = feedService.getLoggedUserName()
        console.log("sideBarController - getLoggedUser", currentLoggedUser);
            
    };

}])