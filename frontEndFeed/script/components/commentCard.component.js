angular.module("feedApp")
    .directive("commentCard", [function() {
        return {
            restrict: "E",
            scope: {
                comment: "=",
                commentList: "="
            },
            templateUrl: "script/components/commentCard.component.html",

            controller: ["$scope", "feedService", function($scope, feedService) {

                $scope.errorFlag = false;
                $scope.loadingComment = false;
                $scope.like = {};
                $scope.editCommentData = "";

                $scope.updateComment = function(editedCommentData) {
                        $scope.showEditForm = false;
                        feedService.updateComment($scope.comment.id, editedCommentData)
                            .then(function(value) {
                                $scope.comment.body = value.body;
                            })
                };

                $scope.deleteComment = function() {
                    feedService.deleteComment($scope.comment.id)
                    .then(function(value) {
                        $scope.$parent.getComments();
                        alert("Successfully deleted Comment");
                    })
                };

                $scope.edit = function() {
                    console.log("inside log");
                    if (feedService.getLoggedUserName() === $scope.comment.createdBy) {
                        $scope.showEditForm = true;
                    }
                    else {
                        alert("Unauthorised to update comment");
                    }
                }





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