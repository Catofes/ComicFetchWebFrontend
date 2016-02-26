/**
 * Created by herbertqiao on 1/31/16.
 */

angular.module('ComicFetch_Web')
    .factory('APIService', function ($resource) {
        return $resource('api/:resource/:id', {id: '@id'},
            {
                Comics: {method: 'GET', params: {resource: 'comics'}, isArray: true},
                getComic: {method: 'GET', params: {resource: 'comic'}, isArray: false},

                Watch: {method: 'POST', params: {resource: 'watch'}, isArray: false}
            });
    });