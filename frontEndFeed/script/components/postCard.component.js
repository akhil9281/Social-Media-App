angular.module("feedApp")
    .directive("postCard", [function() {
        return {
            restrict: "E",
            scope: {
                post: "=",
                postList: "="
            },
            templateUrl: "script/components/postCard.component.html",

            controller: ["$scope", "feedService", function($scope, feedService) {

                $scope.commentList = [];
                $scope.countOfLikes = 0;
                $scope.showLikeForm = false; 
                $scope.showComments = false;
                $scope.loadingComment = false;
                $scope.comment = {};

                $scope.start = function() {
                    console.log("in postCard init");
                    setTimeout(function() {
                        $scope.getLikes();
                        $scope.getComments();
                    }, 2000);                    
                    console.log("start - commetlist", $scope.commentList);
                };

                $scope.likeClicked = function() {
                    $scope.showComments = false; 
                    $scope.showLikeForm = !$scope.showLikeForm; 
                    
                }

                $scope.commentClicked = function() {
                    console.log("Comment button clicked");
                    $scope.showLikeForm = false; 
                    $scope.showComments = !$scope.showComments;
                    console.log($scope.showComments);
                    $scope.getComments();
                }

                $scope.getComments = function() {
                    console.log("in postCard getComments");
                    $scope.commentList = [];
                    $scope.comment.userName = "";
                    $scope.comment.commentData = "";
                    feedService.getComments($scope.post.id)
                        .then(function(value) {
                            console.log("postCarController-getComments:", value);
                            $scope.commentList = value;
                            return $scope.commentList;
                        });
                    $scope.loadingComment = false;
                    return $scope.commentList;
                };

                $scope.getLikes = function() {
                    console.log("in postCard getLikes");
                    feedService.numOfLikes($scope.post.id)
                        .then(function(value) {
                            $scope.countOfLikes = value;
                        });
                };

                $scope.likePost = function(like) {
                    console.log("in postCard likePost");
                    feedService.likePost(like)
                        .then(function(value) {
                            console.log("Successfylly liked - " + $scope.post.id);
                            $scope.likeClicked();
                            $scope.getLikes();
                    });
                    
                };

                $scope.makeComment = function(newComment) {
                    console.log("in postCard makeComment");
                    $scope.loadingComment = true;
                    feedService.createComment(newComment, $scope.post.id)
                        .then(function(value) {
                            console.log("response of makeComment", value);
                            $scope.getComments();
                        });
                    
                };

                $scope.delete = function() {
                    console.log("in postCard delete");
                    feedService.deletePost($scope.post.id);
                };
                
            }]
        };
    }]);