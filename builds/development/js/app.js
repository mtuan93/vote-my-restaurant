var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'appControllers', 'jp.ng-bs-animated-button'])
    .constant('FIREBASE_URL', 'https://vote-my-restaurant.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(['$rootScope', '$location',
    function($rootScope, $location) {
        $rootScope.$on('$routeChangeError',
            function(event, next, previous, error) {
                if (error === 'AUTH_REQUIRED') {
                    $location.path('/login');
                    $rootScope.path = '/login';
                }
            });

        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if ($rootScope.currentUser) { // if user already logged in
                $rootScope.path = '/dashboard';
                if(next.templateUrl === 'views/login.html' || 
                next.templateUrl === 'views/register.html') { // redirect to posting.html if logged in
                    $location.path('/dashboard');
                }
            } else { // if user is not logged in
                if (next.templateUrl === 'views/register.html') {
                    $location.path("/register");
                    $rootScope.path = '/register';
                } else if (next.templateUrl === 'views/login.html') {
                    $location.path("/login");
                    $rootScope.path = '/login';
                } else {
                    $rootScope.path = '/dashboard';
                }
            }
        });
    }
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        }).
        when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
        }).
        otherwise({
            redirectTo: '/dashboard'
        });
    }
]);
