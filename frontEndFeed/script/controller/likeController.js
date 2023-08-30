angular.module("feedApp")
.controller("getLikeController", ['feedService', '$scope', '$route', function(feedService, $scope, $route) {

    $scope.feed = [];
    $scope.isLoading = false;
    $scope.feedLoadNumber = 0;
    $scope.morePosts = true;
    $scope.zeroPost = false;

    $scope.init = function() {

    }

    $scope.search = function(userName) {
        $scope.isLoading = true;
        feedService.likesByUser(userName)
        .then(function(value) {
            $scope.feed = value;
            $scope.isLoading = false;
            if (value.length == 0) {
                zeroPost = true;
            }
            else {
                zeroPost = false;
            }
        })
    }

}])