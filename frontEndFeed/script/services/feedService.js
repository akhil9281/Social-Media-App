angular.module("feedApp").service("feedService", ["$http","$rootScope", function ($http,$rootScope) {

    let baseUrl = "http://localhost:8080/feed";

    return {

        getNum: function() {
            var num = Math.floor(Math.random() * 100);
            return num;
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
                        alert("An error occurred while making the request.");
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
                        alert("An error occurred while making the request.");
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
                        alert("An error occurred while making the request.");
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
                    console.log("inside getComments service");
                    console.log(response.data.data[0]);
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
                        alert("An error occurred while making the request.");
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
                        alert("An error occurred while making the request.");
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
                        alert("An error occurred while making the request.");
                    }
                })
        },

        deleteComment: function(commentId) {
            return $http
                .delete(baseUrl + "/deleteComment/" + commentId)
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
                        alert("An error occurred while making the request.");
                    }
                });
        },

        likePost: function(like) {
            return $http
                .post(baseUrl + "url", {
                    params: {
                        postID: like.postId,
                        userName: like.userName
                    }
                })
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
                        alert("An error occurred while making the request.");
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
                        alert("An error occurred while making the request.");
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
                    console.log("inside likesByUser in service");
                    
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
                        alert("An error occurred while making the request.");
                    }
                });
        },


    }
}]);