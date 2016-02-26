'use strict';

// Declare app level module which depends on views, and components
angular.module('ComicFetch_Web', [
    'ngRoute',
    'ngResource'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'viewer/login.html',
        controller: 'LoginCtrl'
    }).when('/', {
        templateUrl: 'viewer/list.html',
        controller: 'ListCtrl'
    }).when('/comic/:id', {
        templateUrl: 'viewer/comic.html',
        controller: 'ComicCtrl'
    }).when('/comic/:id/:chapter', {
        templateUrl: 'viewer/chapter.html',
        controller: 'ChapterCtrl'
    }).otherwise({redirectTo: '/'});
}]);
