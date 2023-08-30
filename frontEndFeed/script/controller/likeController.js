angular.module("feedApp")
.controller("getLikeController", ['feedService', '$scope', function(feedService, $scope) {

    $scope.feed = [];
    $scope.isLoading = false;
    $scope.feedLoadNumber = 0;
    $scope.morePosts = true;
    $scope.zeroPost = false;

    $scope.init = function() {

    }

    $scope.getPostsLikedByUser = function(userName) {
        $scope.isLoading = true;
        feedService.likesByUser(userName)
        .then(function(value) {
            $scope.feed = [];
            $scope.feed = value.data[0];
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