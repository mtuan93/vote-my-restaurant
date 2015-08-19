myApp.controller('DashboardController',
    function($scope, $firebase, $firebaseAuth, $location, $rootScope, $timeout, FIREBASE_URL, Authentication) {

        //Handle checkin button
        $scope.isSubmitting = null;
        $scope.result = null;
        $scope.options = {};
        $scope.options.buttonDefaultText = "Add your restaurant";
        $scope.options.buttonSubmittingIcon = 'fa fa-spinner';
        $scope.options.buttonSuccessText = 'Added';
        
        var restaurant = new Firebase(FIREBASE_URL + '/restaurant/');
        $scope.allRes = $firebase(restaurant).$asArray();

        $scope.addRestaurant = function() {
            if($scope.restaurant === undefined || $scope.restaurant.name === '' || $scope.restaurant.url === '') return;
            var ref = new Firebase(FIREBASE_URL + '/restaurant');
            var restaurantInfo = $firebase(ref);
            var restaurantObject = restaurantInfo.$asObject();
            $scope.isSubmitting = true;
            $timeout(function() {
                $scope.result = 'success';
            }, 1000)
                .then(function() {
                    $timeout(function() {
                        restaurantInfo.$push({
                            name: $scope.restaurant.name,
                            url: $scope.restaurant.url,
                            listVote: [$rootScope.currentUser.name]
                        });
                        $scope.restaurant.name = '';
                        $scope.restaurant.url = '';
                    }, 1000);
                });
        }; // add a restaurant

        $scope.voteUp = function (restaurant) {
            var resRef = new Firebase(FIREBASE_URL + '/restaurant/' + restaurant.$id);
            var listOfVoteUsers = restaurant.listVote;
            var currentUserID = $rootScope.currentUser.name;
            if (listOfVoteUsers.indexOf(currentUserID) === -1) {
                listOfVoteUsers.push(currentUserID);
            }
            $firebase(resRef).$update({
                listVote: listOfVoteUsers 
            });
        }

        $scope.notYetVote = function (restaurant) {
            var listOfVoteUsers = restaurant.listVote;
            if(listOfVoteUsers) return listOfVoteUsers.indexOf($scope.currentUser.name) === -1;
            return true;
        }
    });