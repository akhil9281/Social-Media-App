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
                    console.log("akhil");
                    console.log(response);
                    
                    if (response.status === 200) {
                        console.log("successfully FOUND the Feed Data");
                        return response.data;
                    }
                    else {
                        throw new Error("Failed to get the Feed!");
                    } 
                })
                .catch(function(error) {
                    console.log(error);
                    if (error.response) {
                        if (error.response.status === 404) {
                          alert("Comments not found.", "error");
                        } 
                        else if (error.response.status === 500) {
                          alert("An error occurred while fetching comments 500", error);
                        }
                    } 
                    else if (error.request) {
                        alert("No response received from the server.", error);
                    } 
                    else {
                        alert("An error occurred while making the request for init() method.", error);
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
                    console.log(error);
                    if (error.response) {
                        if (error.response.status === 500) {
                          alert("Unable to create Post due to Internal Error", "error");
                        }
                        else {
                          alert("An error occurred while creating Post", error);
                        }
                    } 
                    else if (error.request) {
                        alert("No response received from the server.", error);
                    } 
                    else {
                        alert("An error occurred while making the request.", "error");
                    }
                })
        },

        deletePost: function(postId) {
            return $http
                .delete(baseUrl + "/deletePost?postId=" + postId)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    console.log(error);
                    if (error.response) {
                        if (error.response.status === 500) {
                          alert("Unable to create Post due to Internal Error", "error");
                        }
                        else if (error.response.status === 400) {
                            alert("Bad Request, no such post exists");
                        }
                        else {
                          alert("An error occurred while creating Post", error);
                        }
                    } 
                    else if (error.request) {
                        alert("No response received from the server.", error);
                    } 
                    else {
                        alert("An error occurred while making the request.", error);
                    }
                })
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
                    console.log(response.data);
                    return response.data.data[0];
                })
                .catch(function(error) {
                    if (error.response) {
                        if (error.response.status === 500) {
                          alert("Unable to get Comments due to Internal Error", "error");
                        }
                        else if (error.response.status === 400) {
                            alert("Bad Request, no such post exists");
                        }
                        else {
                          alert("An error occurred while getting Comments", error);
                        }
                    } 
                    else if (error.request) {
                        alert("No response received from the server.", error);
                    } 
                    else {
                        alert("An error occurred while making the request.", error);
                    }
                })
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
                      alert("Unable to get Comments due to Internal Error", "error");
                    }
                    else if (error.response.status === 400) {
                        alert("Bad Request, no such post exists");
                    }
                    else {
                      alert("An error occurred while getting Comments", error);
                    }
                } 
                else if (error.request) {
                    alert("No response received from the server.", error);
                } 
                else {
                    alert("An error occurred while making the request.", error);
                }
            })
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
                          alert("Unable to get Comments due to Internal Error", "error");
                        }
                        else if (error.response.status === 400) {
                            alert("Bad Request, no such post exists");
                        }
                        else {
                          alert("An error occurred while getting Comments", error);
                        }
                    } 
                    else if (error.request) {
                        alert("No response received from the server.", error);
                    } 
                    else {
                        alert("An error occurred while making the request.", error);
                    }
                })
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
                          alert("Unable to get Comments due to Internal Error", "error");
                        }
                        else if (error.response.status === 400) {
                            alert("Bad Request, no such post exists");
                        }
                        else {
                          alert("An error occurred while getting Comments", error);
                        }
                    } 
                    else if (error.request) {
                        alert("No response received from the server.", error);
                    } 
                    else {
                        alert("An error occurred while making the request.", error);
                    }
                })
        }


    }
}]);