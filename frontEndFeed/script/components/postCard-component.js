angular.module("feedApp")
    .directive("postCard", [function() {
        return {
            restrict: "E",
            scope: {
                post: "=",
                postList: "="
                // Two-way binding for the data attribute
            },
            templateUrl: "script/components/postCard.html",

            controller: ["$scope", "feedService", function($scope, feedService) {

                $scope.commentList = [];
                $scope.countOfLikes = 0;
                $scope.showLikeUsername = false;
                $scope.showComments = false;
                $scope.loadingComment = false;
                $scope.comment = {};
                $scope.like = {};

                $scope.start = function() {
                    console.log("in postCard init");
                    $scope.getLikes();
                    $scope.getComments();
                    console.log("start - commetlist", $scope.commentList);
                };

                $scope.getComments = function() {
                    console.log("in postCard getComments");
                    $scope.commentList = [];
                    $scope.comment.userName = "";
                    $scope.comment.commentData = "";
                    feedService.getComments($scope.post.id)
                        .then(function(value) {
                            console.log("pcgc", value);
                            $scope.commentList = (value);
                            return $scope.commentList;
                        });
                    $scope.loadingComment = false;
                    return $scope.commentList;
                };

                $scope.getLikes = function() {
                    console.log("in postCard getLikes");
                    $scope.showLikeUsername = true;
                    feedService.numOfLikes($scope.post.id)
                        .then(function(value) {
                            $scope.countOfLikes = value;
                        });
                };

                $scope.likePost = function(like) {
                    console.log("in postCard likePost");
                    feedService.likePost(like);
                    $scope.countOfLikes = feedService.numOfLikes($scope.post.id).data[0];
                };

                $scope.makeComment = function(newComment) {
                    console.log("in postCard makeComment");
                    $scope.loadingComment = true;
                    feedService.createComment(newComment, $scope.post.id);
                    $scope.getComments();
                };

                $scope.delete = function() {
                    console.log("in postCard delete");
                    feedService.deletePost($scope.post.id);
                };

                /* $scope.reloadComments = function() {
                    setTimeout($scope.getComments(), 7000);
                } */
                
            }]
        };
    }]);