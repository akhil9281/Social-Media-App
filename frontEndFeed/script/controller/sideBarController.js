angular.module("feedApp")
.controller("sideBarController", ["$scope", "feedService", function($scope, feedService) {

    $scope.mostLikedPost = {};
    $scope.mostDiscussedQuestion = {};

    $scope.init = function() {
        $scope.getMostLikedPost();
        $scope.getMostDiscussedQuestion();
    };

    $scope.getMostLikedPost = function() {
        $scope.mostLikedPost = {};
        feedService.getMostLikedPost()
        .then(function(value) {
            console.log("mostLikedPost - ", $scope.value.data[0]);
            $scope.mostLikedPost = value.data[0];            
        })
    };

    $scope.getMostDiscussedQuestion = function() {
        $scope.mostDiscussedQuestion = {};
        feedService.getMostDiscussedQuestion()
        .then(function(value) {
            console.log("mostDiscussedPost - ", $scope.value.data[0]);
            $scope.mostDiscussedQuestion = value.data[0];            
        })
    };
}])