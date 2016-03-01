/**
 * Created by herbertqiao on 2/26/16.
 */

angular.module('ComicFetch_Web')
    .controller('ListCtrl',
        function ($scope, APIService) {

            var refreshComicList = function () {
                return APIService.Comics().$promise
                    .then(function (data) {
                        $scope.comics = data;
                        for (i = 0; i < data.length; i++) {
                            data[i]['update_time'] = new Date(data[i].update_time * 1000).toLocaleString();
                            data[i]["mobi_size"] = (data[i]["mobi_size"] / 1024. / 1024.).toFixed(2);
                        }
                    }, function (reason) {
                        console.log(reason)
                    })

            };
            $scope.listPromise = refreshComicList();
        });