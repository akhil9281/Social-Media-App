angular.module("feedApp")
.controller("getLikeController", ['feedService', '$scope', function(feedService, $scope) {

    $scope.userLikedfeed = [];
    $scope.isLoading = false;
    $scope.zeroPost = false;

    $scope.init = function() {

    };

    $scope.getPostsLikedByUser = function(userName) {
        $scope.isLoading = true;
        feedService.likesByUser(userName)
        .then(function(value) {
            $scope.userLikedfeed = [];
            $scope.userLikedfeed = value.data[0];
            $scope.isLoading = false;
            if (value.length == 0) {
                $scope.zeroPost = true;
            }
            else {
                $scope.zeroPost = false;
            }
        })
    };

}])