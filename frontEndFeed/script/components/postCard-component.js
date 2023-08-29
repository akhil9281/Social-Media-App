angular.module("feedApp")
    .directive("postCard", [function() {
        return {
            restrict: "E",
            scope: {
                data: "="
                // Two-way binding for the data attribute
            },
            templateUrl: "script/components/postCard.html",

            controller: ["$scope", "feedService", function(feedService, $scope) {

                $scope.commentList = [];
                $scope.countOfLikes = 0;
                $scope.errorFlag = false;
                $scope.showLikeUsername = false;
                $scope.showComments = false;
                $scope.loadingComment = false;

                /* $scope.init = function() {
                    console.log("in postCard init");
                    
                    
                }; */

                $scope.getComments = function() {
                    console.log("in postCard getComments");
                    $scope.commentList = feedService.getComments(data.id)[0];
                    $scope.loadingComment = false;
                };

                $scope.getLikes = function() {
                    console.log("in postCard getLikes");
                    $scope.countOfLikes = feedService.numOfLikes(data.id);
                };

                $scope.likePost = function(like) {
                    console.log("in postCard likePost");
                    feedService.likePost(like);
                };

                $scope.makeComment = function(comment) {
                    console.log("in postCard makeComment");
                    feedService.createComment(comment, data.id);
                    $scope.getComments(data.id);
                };


                
            }]
        };
    }]);