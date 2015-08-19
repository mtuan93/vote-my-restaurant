myApp.controller('RegistrationController',
    function($scope, $firebase, $location, $rootScope, $timeout, FIREBASE_URL, Authentication) {
        // Required - set to true on submission
        $scope.isSubmitting = null;
        // Required - set to 'success' or 'error' on success/failure
        $scope.result = null;

        // Optional
        $scope.options = {
            buttonSubmittingIcon: 'fa fa-spinner',
            // buttonSubmittingText: 'Logging in',
            // buttonSuccessText: 'Logging in',
            animationCompleteTime: '2000',
            iconPosition: 'left'
            // buttonErrorText: 'Not Verified'
        };

        if ($location.$$path === '/login') {
            $scope.options.buttonDefaultText = 'Login';
        } else if ($location.$$path === '/register') {
            $scope.options.buttonDefaultText = 'Register';
        } 

        $scope.register = function() {
            $scope.options.buttonSubmittingText = "Registering";
            $scope.options.buttonSuccessText = "Registered";
            $scope.options.animationCompleteTime = '2000';
            angular.element(document.querySelector('.form-signin')).removeClass('has-error');
            $scope.isSubmitting = true;
            Authentication.register($scope.user)
            .then(function() {
                $scope.login();
            });
        }; //register

        $scope.login = function() {
            $scope.options.buttonSubmittingText = "Logging in";
            if($location.$$path === '/login') {
                $scope.options.buttonSuccessText = "Logged in";
                $scope.options.buttonErrorText = "Wrong Information";
            } else if ($location.$$path === '/register') {
                $scope.options.buttonSuccessText = "Registered";
                $scope.options.buttonErrorText = "Account Already Exists";
            }
            $scope.isSubmitting = true;
            Authentication.login($scope.user)
            .then(function () {
                $scope.options.animationCompleteTime = '2000';
                angular.element(document.querySelector('.form-signin')).removeClass('has-error');
                $scope.result = 'success';
            })
            .then(function() {
                $timeout(function() {
                    $location.path('/post');
                }, 1500);
            })
            .catch(function(err) {
                $scope.options.animationCompleteTime = '500';
                angular.element(document.querySelector('.form-signin')).addClass('has-error');
                $scope.result = 'error';
            })
        };

        $rootScope.logout = function() {
            debugger;
            Authentication.logout();
            $rootScope.currentUser = '';
            $location.path('/login');
        }; //logout
    });