angular.module("feedApp").service("feedService", ["$http","$rootScope", function ($http,$rootScope) {

    let baseUrl = "http://localhost:8080/feed";

    return {

        getLoggedUserName : function() {
            return "AkhilK";
        },

        getQuote: function() {
            return $http
                .get("https://api.quotable.io/quotes/random?tags=technology|famous-quotes|character|courage|failure|future|history|leadership|mathematics|perseverance|power-quotes|science|success|wisdom", {
                    cache: false
                })
                .then(function(response) {
                    console.log("Found the QUOTE - ", response);
                    return response.data;
                })
                .catch(function(error) {
                    console.error("An error occurred while making the request.", error);
                     
                })
        },

        getPosts: function(feedLoadNumber) {
            return $http
                .get(baseUrl + "/allPosts", {
                    cache: false,
                    params: {
                        loadNumber: feedLoadNumber
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    console.log("successfully FOUND the Feed Data");
                    return response.data;
                    
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        getPostsByUser: function(username) {
            return $http
                .get(baseUrl + "/allPostsByUser", {
                    cache: false,
                    params: {
                        userName: username
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    console.log("successfully FOUND the Feed Data");
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        getQuestionsByUser: function(username) {
            return $http
                .get(baseUrl + "/allQuestionsByUser", {
                    cache: false,
                    params: {
                        userName: username
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    console.log("successfully FOUND the Feed Data");
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        addPost: function(post) {
            return $http
                .post(baseUrl + "/createPost?userName=" + post.userName + "&postType=" + post.postType + "&postData="+ post.postData)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        deletePost: function(postId) {
            return $http
                .delete(baseUrl + "/deletePost?postId=" + postId)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        getMostLikedPost: function() {
            return $http
                .get(baseUrl+ "/mostLikedPost", {
                    cache: false
                })
                .then(function(response) {
                    console.log("inside getMostLikedPost - ", response.data);
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        getMostDiscussedQuestion: function() {
            return $http
                .get(baseUrl+ "/mostDiscussedQuestion", {
                    cache: false
                })
                .then(function(response) {
                    console.log("inside getMostDiscussedQuestion - ", response.data);
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        getComments: function(postID) {
            return $http
                .get(baseUrl + "/allCommentsForPost", {
                    params: {
                        postId: postID
                    },
                    cache: false
                })
                .then(function(response) {
                    console.log("inside getComments service", response.data.data);
                    return response.data.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        createComment: function(newComment, postID) {
            return $http
                .post(baseUrl + "/createComment/" + postID + "?userName=" + newComment.userName + "&commentData=" + newComment.commentData)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                        console.error("Unable to get Comments due to Internal Error", error);
                        alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        updateComment: function(commentId, commentData) {
            return $http
                .put(baseUrl + "/updateComment/" + commentId, commentData)
                .then(function(response) {
                    console.log(response.data);
                    return response.data.data[0];
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                })
        },

        deleteComment: function(commentId) {
            return $http
                .delete(baseUrl + "/deleteComment/" + commentId)
                .then(function(response) {
                    return response;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        likePost: function(like) {
            return $http
                .post(baseUrl + "/createLike/" + like.postId, like.userName)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        numOfLikes: function(postID) {
            return $http
                .get(baseUrl + "/getLikes", {
                    params: {
                        postId: postID
                    },
                    cache: false
                })
                .then(function(response) {
                    console.log("inside numOfLikes in service");
                    
                    let data = response.data;
                    console.log(data.data);
                    return data.data[0];
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },

        likesByUser: function(userName) {
            return $http
                .get(baseUrl+ "/allLikesByUser", {
                    cache: false,
                    params: {
                        userName: userName
                    }
                })
                .then(function(response) {
                    console.log("inside likesByUser in service:", response.data);
                    return response.data;
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          console.error("Unable to get Comments due to Internal Error", error);
                          alert("Unable to get Comments due to Internal Error");
                        }
                        else if (error.response.status === 400) {
                            console.error("Bad Request, no such post exists");
                            alert("Bad Request, no such post exists");
                        }
                        else {
                            console.error("An error occurred while getting Comments", error);
                            alert("An error occurred while getting Comments");
                        }
                    } 
                    else if (error.request) {
                        console.error("No response received from the server.", error);
                        alert("No response received from the server.");
                    } 
                    else {
                        console.error("An error occurred while making the request.", error);
                         
                    }
                });
        },


    }
}]);