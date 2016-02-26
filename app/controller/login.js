/**
 * Created by herbertqiao on 1/19/16.
 */

angular.module('ComicFetch_Web')
    .controller('LoginCtrl',
        function ($scope, $routeParams) {
            $scope.login_failed = false;
            $scope.error_message = ""
            $scope.login = function () {
                username = $scope.user.username;
                password = $scope.user.password;
                username_reg = new RegExp("^\\w{3,64}$");
                password_reg = new RegExp("^\\w{1,64}$");
                if (!username_reg.test(username)) {
                    $scope.login_failed = true;
                    $scope.error_message = "用户名不合法。"
                    return false;
                } else {

                }

            }
        });

