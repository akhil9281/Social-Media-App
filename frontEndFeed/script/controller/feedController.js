angular.module("feedApp")
.controller('feedController',['feedService', '$scope', '$window', function(feedService, $scope, $window) {

    $scope.feed = [];
    $scope.isLoading = false;
    $scope.feedLoadNumber = 0;
    $scope.morePosts = true;
    $scope.zeroPost = false;
    $scope.mostLikedPost = {};
    $scope.mostDiscussedQuestion = {};
    $scope.quote = {};

    $scope.postType = "Post";
    $scope.showPostTypeForm = false;
    $scope.showQuesTypeForm = false;
    $scope.showPollForm = false;
    $scope.showTemplates = true;
    $scope.templateChosen = null;
    $scope.showAddPollOption = false;
    $scope.showPlusPoll = true;
    $scope.optionsList = [];
    
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

    $scope.init = function() {
        if (!$scope.isLoading) {
            $scope.isLoading = true;
            $scope.feedLoadNumber = 0;

            posts = feedService.getPosts($scope.feedLoadNumber)
                .then(function(value) {
                    console.log("feedController - INIT");
                    $scope.feedLoadNumber = $scope.feedLoadNumber+1;
                    console.log($scope.feedLoadNumber);
                                        
                    $scope.feed = [];
                    $scope.feed = value.data[0];
                    
                    console.log($scope.feed);
                    $scope.zeroPost = false;
                    $scope.isLoading = false;

                    if ($scope.feed.length === 0) {
                        $scope.noPosts();
                    }                
                    return value;
                })
                .catch(function(error) {
                    throw new Error("Failed to getAll post");
                });
            $scope.postUserName = feedService.getLoggedUserName();
            console.log("AAAAAAAAAAA", $scope.postUserName);
            $scope.postData = "";    
        }
        
    }


    $scope.loadMorePosts = function() {
        if (!$scope.isLoading) {
            $scope.isLoading = true;
            
            feedService.getPosts($scope.feedLoadNumber)
                .then(function(value) {
                    $scope.feedLoadNumber++;
                    if (value.data[0].length == 0) {
                        $scope.noMorePosts();
                    }
                    else {
                        $scope.morePosts = true;
                        angular.extend($scope.feed, $scope.feed.concat(value.data[0]));
                    }
                    $scope.isLoading = false;
                })
                .catch(function(error) {
                    $scope.noMorePosts();
                });
        }
    }

    $scope.noPosts = function() {
        $scope.zeroPost = true;
    }

    $scope.noMorePosts = function() {
        $scope.morePosts = false;
    }

    $scope.reset = function() {
        $scope.postData = ''; 
        $scope.templateChosen = null; 
        $scope.showPlusPoll = true;
        $scope.showPollForm = false;
    }

    $scope.addPollClicked = function() {
        $scope.showPollForm = true;
        $scope.showPlusPoll = false;
    }

    $scope.questionClicked = function() {
        $scope.postType = "Question";
        $scope.showPostTypeForm = false;
        $scope.showQuesTypeForm = !$scope.showQuesTypeForm;
    }

    $scope.postClicked = function() {
        $scope.postType = "Post";
        $scope.showPostTypeForm = !$scope.showPostTypeForm;
        $scope.showQuesTypeForm = false;
    }

    $scope.templateClicked = function() {
        if ($scope.templateChosen === "TrueFalse") {
            $scope.optionsList = ["True", "False"];
            $scope.showAddPollOption = false;
        }

        else if ($scope.templateChosen === "RatingByFive") {
            $scope.optionsList = ["1", "2", "3", "4", "5"];
            $scope.showAddPollOption = true;
        }

        else {
            $scope.showAddPollOption = true;
            $scope.optionsList = [""];
        }

        setTimeout(function() {
            $scope.showTemplates = true;
        }, 100);
    }

    $scope.addNewOption = function() {
        $scope.optionsList.push("New Option");
        /* $scope.templateClicked(); */
    }

// ALL POST CRUD

    //ADD Posts
    $scope.addToFeed = function() {
        if ($scope.postType === "Question") {
            let newQuestion = {
                createdBy: $scope.postUserName,
                /* postType: postType, */
                quesBody: $scope.postData,
                optionsList: $scope.optionsList
            };
            if ($scope.optionsList.length === 1) {
                toastr.error("Can't create new Question with a single option", "AkhilK says - ");
            }
            feedService.addQuestion(newQuestion)
                .then(function(value) {
                    if (value.status === 200) {
                        console.log("new Post successfully added - " + value);
                        toastr["success"]("Successfully created new Question", "AkhilK says - ");
                        $scope.init();
                    }
                    else if (value.status === 500) {
                        console.error("Internal Error, unable to create new Question", value.data.data);
                        toastr.error("Internal Error, unable to create new Question", "AkhilK says - ");
                    }
                    else if (value.status === 400) {
                        console.error("Bad Request, unable to create new Question", value.data.data);
                        toastr.error("Bad Request, unable to create new Question", "AkhilK says - ");
                    }
                    else {
                        console.error("An error occurred, unable to create new Question", error);
                        toastr.error("An error occurred, unable to create new Question", "AkhilK says - ");
                    }
                })
                .catch(function(error) {
                    throw console.log("Failed to create new Question", error);
                })
        }

        else {
            let newPost = {
                userName: $scope.postUserName,
                postType: $scope.postType,
                postData: $scope.postData
            };
            feedService.addPost(newPost)
                .then(function(value) {
                    if (value.status === 200){
                        console.log("new Post successfully added - " + value);
                        toastr["success"]("Successfully created new Post", "AkhilK says - ");
                        $scope.init();
                    }
                    else if (value.status === 500) {
                        console.error("Internal Error, unable to create new Post", value.data.data);
                        toastr.error("Internal Error, unable to create new Post", "AkhilK says - ");
                    }
                    else if (value.status === 400) {
                        console.error("Bad Request, unable to create new Post", value.data.data);
                        toastr.error("Bad Request, unable to create new Post", "AkhilK says - ");
                    }
                    else {
                        console.error("An error occurred, unable to create new Post", error);
                        toastr.error("An error occurred, unable to create new Post", "AkhilK says - ");
                    }
                })
                .catch(function(error) {
                    throw new Error("Failed to create new Post", error);
                })
            }
            $scope.reset();
            $scope.showPostTypeForm = false;
            $scope.showQuesTypeForm = false;
    }

    //DELETE Post
    /* $scope.deletePost = function(post) {
        feedService.deletePost(post)
            .then(function(value) {
                    if (value.status === 200){
                        console.log("Post successfully deleted - " + value);
                        toastr["success"]("Successfully deleted Post", "AkhilK says - ");
                        $scope.init();
                    }
                    else if (value.status === 500) {
                        console.error("Internal Error, unable to delete Post", value.data.data);
                        toastr.error("Internal Error, unable to delete Post", "AkhilK says - ");
                    }
                    else if (value.status === 400) {
                        console.error("Bad Request, unable to delete Post", value.data.data);
                        toastr.error("Bad Request, unable to delete Post", "AkhilK says - ");
                    }
                    else {
                        console.error("An error occurred, unable to delete Post", error);
                        toastr.error("An error occurred, unable to delete Post", "AkhilK says - ");
                    }
                })
                .catch(function(error) {
                    throw new Error("Failed to delete Post", error);
                })
            
    } */


// ALL Comments CRUD

    //READ Comments
    /* $scope.getComments = function(postID) {
        $scope.comments = [];
        feedService.getComments(postID)
            .then( function(commentsData) {
                $scope.comments.concat(commentsData);
                return comments;
            })
            .catch(function(error) {
                throw new Error("Failed to get comments for the post!" + error);
            });
    } */

    //Create Comments
    /* $scope.createComment = function(newComment, postID) {

        feedService.createComment(newComment, createComment)
            .then(function(responseData) {
                console.log("Comment successfully created for post - " + responseData.data.postId);
                $scope.getComments(responseData.data.postId);
            })
            .catch(function(error) {
                throw new Error("Failed to create New Comment!" + error);
            });
    } */

// ALL Comments CRUD

    //Create LIKE
    /* $scope.likePost = function(postID, userName) {

        feedService.likePost(postID, userName)
            .then(function(postID) {
                $scope.getLikes(postID);
            })
            .catch(function (error) {
                throw new Error("Failed to likes the Post - " + error);
            });
    } */

    /* $scope.getLikes = function(postID) {
        feedService.numOfLikes(postID)
            .then(function(num) {
                $scope.numLikes = num;
            })
            .catch(function (error) {
                throw new Error("Failed to get likes for the post!" + error);
            });
    } */
/* 
    $scope.getPostsLikedByUser = function(userName) {
        $scope.isLoading = true;
        feedService.likesByUser(userName)
            .then(function(value) {
                $scope.feed = [];
                    $scope.feed = value.data[0];
                    console.log("inside controller");
                    console.log($scope.feed);
                    if ($scope.feed.length === 0) {
                        $scope.noPosts();
                    }
                    $scope.zeroPost = false;
                    $scope.isLoading = false;
                    return value;
                })
                .catch(function(error) {
                    throw new Error("Failed to getAll post");
                });
                
    }; */

    $scope.checkScroll = function() {
        var windowHeight = 'innerHeight' in $window ? $window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body, html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        var windowBottom = windowHeight + $window.pageYOffset;

        if (windowBottom >= docHeight) {
            $scope.loadMorePosts();
        }
    };

    // Attach the checkScroll function to the 'scroll' event
    angular.element($window).on('scroll', $scope.checkScroll);

    // Remove the event listener when the controller is destroyed
    $scope.$on('$destroy', function() {
        angular.element($window).off('scroll', $scope.checkScroll);
    });

}]);