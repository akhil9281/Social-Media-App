angular.module("feedApp")
.controller("getUserQuestionController", ['feedService', '$scope', function(feedService, $scope) {

    $scope.userPostFeed = [];
    $scope.isLoading = false;
    $scope.zeroPost = false;

    $scope.init = function() {

    };

    $scope.getPostsByUser = function(userName) {
        $scope.isLoading = true;
        feedService.getQuestionsByUser(userName)
        .then(function(value) {
            $scope.userPostFeed = [];
            $scope.userPostFeed = value.data[0];
            $scope.isLoading = false;
            if (value.data[0].length == 0) {
                $scope.zeroPost = true;
            }
            else {
                $scope.zeroPost = false;
            }
        })
    }

}])