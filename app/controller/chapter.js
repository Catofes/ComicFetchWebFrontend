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
                    $scope.chapter.if_next = true;
                    for (i = 0; i < $scope.comic.pic.length; i++) {
                        if ($scope.chapter.name == $scope.comic.pic[i].chapter) {
                            $scope.chapter.info = $scope.comic.pic[i];
                            if (i + 1 < $scope.comic.pic.length)
                                $scope.chapter.next = $scope.comic.pic[i + 1].chapter;
                            else {
                                $scope.chapter.next = null;
                                $scope.chapter.if_next = false;
                            }
                            break;
                        }
                    }
                    for (i = 0; i < $scope.chapter.info.pic_num; i++) {
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