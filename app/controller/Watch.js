/**
 * Created by herbertqiao on 1/19/16.
 */

angular.module('ComicFetch_Web')
    .controller('WatchCtrl',
        function ($scope, APIService) {
            $scope.watch_success = false;
            $scope.watch_failed = false;
            $scope.error_message = "";
            $scope.login = function () {
                $scope.watch_success = false;
                $scope.watch_failed = false;
                req = {};
                req['url'] = $scope.user.url;
                req['password'] = $scope.user.password;
                APIService.Watch(req).$promise
                    .then(function (data) {
                        $scope.watch_success = true;
                        $scope.error_message = "添加成功"
                    }, function (data) {
                        console.log(data);
                        $scope.watch_failed = true;
                        $scope.error_message = "添加失败" + data.data.title;
                    })
            };
        });

