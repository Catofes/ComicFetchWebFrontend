/**
 * Created by herbertqiao on 2/26/16.
 */

angular.module('ComicFetch_Web')
    .controller('ComicCtrl',
        function ($scope, APIService, StoreService, $routeParams) {
            var refreshComic = function () {
                var sortComit = function (chapters) {
                    chapters_dict = {};
                    chapter_end = null;
                    result = [];
                    for (i = 0; i < len(chapters); i++) {
                        chapter = chapters[i];
                        if (chapter['next'] == null)
                            chapter_end = chapter;
                        chapters_dict[chapter['chapter']] = chapter
                    }
                    for (i = 0; i < len(chapters); i++) {
                        chapter = chapters[i];
                        if (chapters_dict[chapter['next']] != null)
                            chapters_dict[chapter['next']]['before'] = chapter;
                    }
                    while (chapter_end['before'] != null)
                        chapter_end = chapter_end['before'];
                    while (chapter_end['next'] != null) {
                        result.push(chapter_end);
                        chapter_end = chapter_end['next'];
                    }
                    return result;
                };
                return APIService.getComic({'id': $routeParams['id']}).$promise
                    .then(function (data) {
                        $scope.comic = data;
                        $scope.comic['pic'] = sortComit($scope.comic['pic']);
                        StoreService.Comic[data['id']] = data;
                    }, function (reason) {
                        console.log(reason)
                    })

            };
            $scope.listPromise = refreshComic();
        }
    );