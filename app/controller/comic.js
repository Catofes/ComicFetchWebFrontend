/**
 * Created by herbertqiao on 2/26/16.
 */

angular.module('ComicFetch_Web')
    .controller('ComicCtrl',
        function ($scope, APIService, StoreService, $routeParams) {
            var refreshComic = function () {
                return APIService.getComic({'id': $routeParams['id']}).$promise
                    .then(function (data) {
                        $scope.comic = data;
                        StoreService.Comic[data['id']] = data;
                    }, function (reason) {
                        console.log(reason)
                    })

            };
            $scope.listPromise = refreshComic();
        });