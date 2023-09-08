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

                                toastr.options = {
                                    "closeButton": true,
                                    "debug": false,
                                    "newestOnTop": true,
                                    "progressBar": true,
                                    "positionClass": "toast-top-right",
                                    "preventDuplicates": false,
                                    "onclick": null,
                                    "showDuration": "300",
                                    "hideDuration": "1000",
                                    "timeOut": "5000",
                                    "extendedTimeOut": "1000",
                                    "showEasing": "swing",
                                    "hideEasing": "linear",
                                    "showMethod": "fadeIn",
                                    "hideMethod": "fadeOut"
                                }
                                toastr["success"]("Successfully to updated the Comment", "AkhilK says - ");
                            })
                };

                $scope.deleteComment = function() {
                    if (feedService.getLoggedUserName() === $scope.comment.createdBy) {
                        feedService.deleteComment($scope.comment.id)
                        .then(function(value) {
                            toastr.options = {
                                "closeButton": true,
                                "debug": false,
                                "newestOnTop": true,
                                "progressBar": true,
                                "positionClass": "toast-top-right",
                                "preventDuplicates": false,
                                "onclick": null,
                                "showDuration": "300",
                                "hideDuration": "1000",
                                "timeOut": "5000",
                                "extendedTimeOut": "1000",
                                "showEasing": "swing",
                                "hideEasing": "linear",
                                "showMethod": "fadeIn",
                                "hideMethod": "fadeOut"
                              }
                            toastr["success"]("Successfully to deleted the Comment", "AkhilK says - ");
                            $scope.$parent.getComments();
                            console.log("Successfully deleted Comment");
                        })
                    }
                    else {
                        toastr.options = {
                            "closeButton": true,
                            "debug": false,
                            "newestOnTop": true,
                            "progressBar": true,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }
                          
                        toastr.error("Unauthorised to delete the Comment!", "AkhilK says - ");
                        console.log("Unauthorised to delete the comment");
                    }
                };

                $scope.edit = function() {
                    console.log("inside log");
                    if (feedService.getLoggedUserName() === $scope.comment.createdBy) {
                        $scope.showEditForm = true;
                    }
                    else {
                        toastr.options = {
                            "closeButton": true,
                            "debug": false,
                            "newestOnTop": true,
                            "progressBar": true,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }
                          
                        toastr.error("Unauthorised to update Comment!", "AkhilK says - ");
                        console.log("Unauthorised to update comment");
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