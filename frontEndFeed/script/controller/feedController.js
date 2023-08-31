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
    

    $scope.init = function() {
        $scope.getMostLikedPost();
        $scope.getMostDiscussedQuestion();
        $scope.getQuote();

        if (!$scope.isLoading) {
            $scope.isLoading = true;
            $scope.feedLoadNumber = 0;

            posts = feedService.getPosts($scope.feedLoadNumber)
                .then( function(value) {
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
            $scope.postUserName = "";
            $scope.postData = "";    
        }
        
    }

    $scope.getMostLikedPost = function() {
        $scope.mostLikedPost = {};
        feedService.getMostLikedPost()
        .then(function(value) {
            console.log("mostLikedPost - ", value.data[0]);
            $scope.mostLikedPost = value.data[0];            
        })
    };

    $scope.getMostDiscussedQuestion = function() {
        $scope.mostDiscussedQuestion = {};
        feedService.getMostDiscussedQuestion()
        .then(function(value) {
            console.log("mostDiscussedPost - ", value.data[0]);
            $scope.mostDiscussedQuestion = value.data[0];            
        })
    };

    $scope.getQuote = function() {
        $scope.quote = {};
        feedService.getQuote()
            .then(function(value) {
                console.log("Quote is - ", value);
                $scope.quote = value[0];
            })
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
// ALL POST CRUD

    //ADD Posts
    $scope.addPost = function(postType) {
        let newPost = {
            userName: $scope.postUserName,
            postType: postType,
            postData: $scope.postData
        };
        feedService.addPost(newPost)
            .then(function(newPost) {
                console.log("new Post successfully added - " + newPost);
                $scope.init();
            })
            .catch(function(error) {
                throw new Error("Failed to create new Post");
            })
    }

    //DELETE Post
    $scope.deletePost = function(post) {
        feedService.deletePost(post)
            .then(function() {
                console.log("post deleted successfully");
                $scope.init();
            })
            .catch(function(error) {
                throw new Error("Error in deleting the post");
            })
    }


// ALL Comments CRUD

    //READ Comments
    $scope.getComments = function(postID) {
        $scope.comments = [];
        feedService.getComments(postID)
            .then( function(commentsData) {
                $scope.comments.concat(commentsData);
                return comments;
            })
            .catch(function(error) {
                throw new Error("Failed to get comments for the post!" + error);
            });
    }

    //Create Comments
    $scope.createComment = function(newComment, postID) {

        feedService.createComment(newComment, createComment)
            .then(function(responseData) {
                console.log("Comment successfully created for post - " + responseData.data.postId);
                $scope.getComments(responseData.data.postId);
            })
            .catch(function(error) {
                throw new Error("Failed to create New Comment!" + error);
            });
    }

// ALL Comments CRUD

    //Create LIKE
    $scope.likePost = function(postID, userName) {

        feedService.likePost(postID, userName)
            .then(function(postID) {
                $scope.getLikes(postID);
            })
            .catch(function (error) {
                throw new Error("Failed to likes the Post - " + error);
            });
    }

    $scope.getLikes = function(postID) {
        feedService.numOfLikes(postID)
            .then(function(num) {
                $scope.numLikes = num;
            })
            .catch(function (error) {
                throw new Error("Failed to get likes for the post!" + error);
            });
    }

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
                
    };

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