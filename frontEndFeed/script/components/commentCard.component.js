angular.module("feedApp")
    .directive("commentCard", [function() {
        return {
            restrict: "E",
            scope: {
                comment: "=",
                commentList: "="
            },
            templateUrl: "./commentCard.component.html",

            controller: ["$scope", "feedService", function($scope, feedService) {

                console.log("AAA");
                
                $scope.errorFlag = false;
                $scope.loadingComment = false;
                $scope.like = {};

                $scope.updateComment = function(editedComment) {
                    if (editedComment.userName != comment.createdBy) {
                        console.error("Given username doesn't match with the username of the CommentMaker");
                        alert("Wrong username, unautherized to edit");
                        return;
                    }
                    editedComment.commentId = $scope.comment.id;
                    feedService.updateComment($scope.comment.id, editedComment.commentData)
                        .then(function(value) {
                            $scope.comment.body = value.body;
                        })
                };

                $scope.delete = function() {
                    feedService.deleteComment($scope.comment.id)
                    .then(function(value) {
                        alert("Successfully deleted Comment");
                    })
                };





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                $scope.start = function() {
                    console.log("in postCard init");
                    $scope.getLikes();
                    $scope.getComments();
                };

                $scope.getComments = function() {
                    console.log("in postCard getComments");
                    $scope.commentList = [];
                    $scope.comment.userName = "";
                    $scope.comment.commentData = "";
                    feedService.getComments($scope.post.id)
                        .then(function(value) {
                            $scope.commentList = value;
                        });
                    $scope.loadingComment = false;
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
                    feedService.likePost(like);
                    $scope.countOfLikes = feedService.numOfLikes($scope.post.id).data[0];
                };

                $scope.makeComment = function(comment) {
                    console.log("in postCard makeComment");
                    $scope.loadingComment = true;
                    feedService.createComment(comment, $scope.post.id);
                    $scope.getComments($scope.post.id);
                };

                $scope.delete = function() {
                    console.log("in postCard delete");
                    feedService.deletePost($scope.post.id);
                };

                $scope.reloadComments = function() {
                    setTimeout($scope.getComments(), 7000);
                }
                
            }]
        };
    }]);