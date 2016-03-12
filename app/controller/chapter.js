/**
 * Created by herbertqiao on 2/26/16.
 */
angular.module('ComicFetch_Web')
    .controller('ChapterCtrl',
        function ($scope, APIService, StoreService, $routeParams) {
            var refreshComic = function () {
                var loadChapter = function () {
                    $scope.chapter = {};
                    $scope.chapter.pic = [];
                    $scope.chapter.name = $routeParams.chapter;
                    for (i = 0; i < $scope.comic.pic.length; i++) {
                        if ($scope.chapter.name == $scope.comic.pic[i].chapter) {
                            $scope.chapter.info = $scope.comic.pic[i];
                            break;
                        }
                    }
                    $scope.chapter.next = $scope.chapter.info['next'];
                    for (i = 0; i < $scope.chapter.info.pic; i++) {
                        $scope.chapter.pic[i] = {
                            'i': i + 1,
                            'url': "/picture/" + $scope.comic.comic.name + "/" + $scope.chapter.name + "/" + (i + 1) + ".jpg"
                        }
                    }
                    console.log($scope.chapter)
                };
                if (StoreService.Comic[$routeParams.id] == null) {
                    return APIService.getComic({'id': $routeParams['id']}).$promise
                        .then(function (data) {
                            $scope.comic = data;
                            StoreService.Comic[data['id']] = data;
                            loadChapter()
                        }, function (reason) {
                            console.log(reason)
                        })
                } else {
                    $scope.comic = StoreService.Comic[$routeParams.id];
                    loadChapter();
                    return null;
                }

            };
            $scope.listPromise = refreshComic();
        });