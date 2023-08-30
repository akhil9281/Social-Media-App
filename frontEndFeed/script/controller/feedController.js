angular.module("feedApp")
.controller('feedController',['feedService', '$scope', function(feedService, $scope) {

    $scope.feed = [];
    $scope.isLoading = false;
    $scope.feedLoadNumber = 0;
    $scope.morePosts = true;
    $scope.zeroPost = false;

    $scope.init = function() {
        if (!$scope.isLoading) {
            $scope.isLoading = true;
            $scope.feedLoadNumber = 0;

            posts = feedService.getPosts($scope.feedLoadNumber)
                .then( function(value) {
                    console.log("inside controller");
                    $scope.feedLoadNumber = $scope.feedLoadNumber+1;
                    console.log("AK", $scope.feedLoadNumber);
                                        
                    $scope.feed = [];
                    $scope.feed = value.data[0];
                    
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
                
        }
    }

    $scope.loadMorePosts = function() {
        if (!$scope.isLoading) {
            $scope.isLoading = true;
            
            feedService.feedService.getPosts($scope.feedLoadNumber)
                .then(function(posts) {
                    $scope.feedLoadNumber++;
                    if (posts.data[0].length === 0) {
                        feedService.noMorePosts();
                    }
                    else {
                        $scope.morePosts = true;
                        $scope.feed.concat(posts.data[0]);
                    }
                    $scope.isLoading = false;
                })
                .catch(function(error) {
                    throw new Error("Failed to get more Posts");
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
    $scope.addPost = function(newPost) {
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

// ALL Questions CRUD

    //ADD Questions
    /* $scope.addQuestion = function(newQuestion) {
        $scope.addPost(newQuestion);
        /* feedService.addQuestion(newQuestion)
            .then(function(newQuestion) {
                console.log("new Question successfully added - " + newQuestion);
                $scope.initQuestion();
            })
            .catch(function(error) {
                throw new Error("Failed to create new Question");
            }) 
    }

    //DELETE Question
    $scope.deleteQuestion = function(question) {
        $scope.deletePost(question)
        /* feedService.deleteQuestion(question)
            .then(function() {
                console.log("Question deleted successfully");
                $scope.init();
            })
            .catch(function(error) {
                throw new Error("Error in deleting the Question");
            })
    } */

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
                
    }

}]);