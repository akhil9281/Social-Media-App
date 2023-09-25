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
                $scope.countOfComments = 0;
                $scope.showLikeForm = false; 
                $scope.showComments = false;
                $scope.loadingComment = false;
                $scope.comment = {};
                $scope.newComment = {};
                $scope.optionsList = [];
                $scope.optionChosenId = null;
                $scope.loggedUserName = feedService.getLoggedUserName();
                $scope.isLikedByCurrentUser = false;

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

                $scope.start = function() {
                    console.log("postCard - init", $scope.post.id);
                    setTimeout(function() {
                        $scope.getLikes();
                        $scope.getComments();
                        $scope.isLikedByLoggedUser();
                        if ($scope.post.type === "Question") {
                            $scope.getPollOptions();
                        }
                    }, 2000);                    
                    console.log("start - commetlist", $scope.commentList);
                };

                $scope.commentClicked = function() {
                    $scope.showLikeForm = false; 
                    $scope.showComments = !$scope.showComments;
                    console.log($scope.showComments);
                    $scope.getComments();
                }

                $scope.getComments = function() {
                    $scope.loadingComment = true;
                    $scope.commentList = [];
                    $scope.newComment.userName = feedService.getLoggedUserName();
                    $scope.newComment.commentData = "";
                    feedService.getComments($scope.post.id)
                        .then(function(value) {
                            console.log("postCarController-getComments:", $scope.post.id, value);
                            $scope.commentList = value[0];
                            $scope.countOfComments = value[1];
                            $scope.loadingComment = false;
                        });
                };

                $scope.getLikes = function() {
                    console.log("postCard - getLikes", $scope.post.id);
                    feedService.numOfLikes($scope.post.id)
                        .then(function(value) {
                            $scope.countOfLikes = value;
                        });
                };

                $scope.isLikedByLoggedUser = function() {
                    feedService.isLikedByCurrentUser($scope.post.id, $scope.loggedUserName)
                        .then(function(value) {
                            $scope.isLikedByCurrentUser = value.data[0];
                        })
                }

                $scope.getPollOptions = function() {
                    feedService.getPolls($scope.post.id)
                        .then(function(value) {
                            console.log("postCard - getPollOptions", $scope.post.id, value);
                            $scope.optionsList = value[0];
                            $scope.numOfOptions = value[0].length;
                        });
                }

                $scope.selectOption = function(optionId, postId) {
                    if (postId != $scope.post.id) {
                        return;
                    }
                    $scope.optionChosenId = optionId;
                };
                  
                $scope.isSelected = function(optionId) {
                    return $scope.optionChosenId === optionId;
                };

                $scope.submitOption = function(postId) {
                    if ($scope.optionChosenId === null) {
                        toastr.warning("No option selected", "AkhilK says - ");
                        return;
                    }
                    if (postId != $scope.post.id) {
                        return;
                    }
                    else {

                        let optionSelectRequest = {
                            postId: $scope.post.id,
                            userName: $scope.loggedUserName,
                            optionId: $scope.optionChosenId
                        }
                        feedService.selectOption(optionSelectRequest)
                            .then(function(value) {
                                console.log("bbbbbb", value);
                                if (value.status === 200) {
                                    toastr.success("Successfully selected Option");
                                    $scope.getPollOptions();
                                }
                                else if (value.status === 500) {
                                    console.error("Internal Error, unable to select Option", value.data.data);
                                    toastr.error("Internal Error, unable to select Option", "AkhilK says - ");
                                }
                                else if (value.status === 400) {
                                    console.error("Bad Request, unable to select Option", value.data.data);
                                    toastr.error("Bad Request, unable to select Option", "AkhilK says - ");
                                }
                                else {
                                    console.error("An error occurred, unable to select Option", value);
                                    toastr.error("An error occurred, unable to select Option", "AkhilK says - ");
                                }
                            })
                    }
                }

                $scope.likePost = function(like) {
                    console.log("in postCard likePost");
                    like.userName = $scope.loggedUserName;
                    feedService.likePost(like)
                        .then(function(value) {
                            console.log("Successfylly liked - " + $scope.post.id);
                            /* $scope.likeClicked(); */
                            $scope.getLikes();
                            /* $document.getElementById('heart').style.display = "none"; */
                            /* $scope.document.getElementById('fill').style.display = "block"; */
                            angular.element(document.querySelector('#heart'))[0].style.display = 'none';
                            /* $scope.$document[0].querySelector('#heart') */
                    });
                    like.userName = "";
                    
                };

                $scope.likePostDirect = function(event) {
                    console.log("in postCard likePost");
                    let newLike = {
                        postId: $scope.post.id,
                        userName: $scope.loggedUserName
                    }
                    feedService.likePost(newLike)
                        .then(function(value) {
                            console.log("Successfylly liked - " + $scope.post.id);
                            /* $scope.likeClicked(); */
                            $scope.getLikes();
                            event.target.classList.add('fill');
                    });
                                        
                };

                $scope.makeComment = function(newComment) {
                    console.log("postCard - makeComment");
                    $scope.loadingComment = true;
                    newComment.userName = $scope.loggedUserName;
                    feedService.createComment(newComment, $scope.post.id)
                        .then(function(value) {
                            console.log("response of makeComment", $scope.post.id, value);
                            $scope.getComments();
                        });
                    
                };

                $scope.delete = function() {
                    if ($scope.post.createdBy === feedService.getLoggedUserName()) {
                        console.log("in postCard delete");
                        feedService.deletePost($scope.post.id)
                            .then(function(value) {
                                if (value.status === 200) {
                                    toastr["success"]("Successfully to deleted the Post", "AkhilK says - ");
                                    $scope.$parent.init();
                                }
                                else if (value.status === 500) {
                                    console.error("Internal Error, unable to delete Post", value);
                                    toastr.error("Internal Error, unable to delete Post", "AkhilK says - ");
                                }
                                else if (value.status === 400) {
                                    console.error("Bad Request, unable to delete Post", value.data);
                                    toastr.error("Bad Request, unable to delete Post", "AkhilK says - ");
                                }
                                else {
                                    console.error("An error occurred, unable to delete Post", value);
                                    toastr.error("An error occurred, unable to delete Post", "AkhilK says - ");
                                }
                            });
                    }
                    else {
                        toastr.error("Unaurthorised to delete Post!", "AkhilK says - ");
                        console.log("Unaurthorised to delete Post");
                    }
                };
                
            }]
        };
    }]);