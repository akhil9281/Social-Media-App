angular.module("feedApp")
.controller("getUserPostController", ['feedService', '$scope', function(feedService, $scope) {

    $scope.userPostFeed = [];
    $scope.isLoading = false;
    $scope.zeroPost = false;

    $scope.init = function() {

    }

    $scope.getPostsByUser = function(userName) {
        $scope.isLoading = true;
        feedService.getPostsByUser(userName)
        .then(function(value) {
            $scope.userPostFeed = [];
            $scope.userPostFeed = value.data[0];
            $scope.isLoading = false;
            if (value.data.length == 0) {
                zeroPost = true;
            }
            else {
                zeroPost = false;
            }
        })
    }

}])