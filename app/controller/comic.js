/**
 * Created by herbertqiao on 2/26/16.
 */

angular.module('ComicFetch_Web')
    .controller('ComicCtrl',
        function ($scope, APIService, StoreService, $routeParams) {
            var refreshComic = function () {
                var sortComit = function (chapters) {
                    var chapters_dict = {};
                    var chapters_end;
                    var chapters_start;
                    for (i = 0; i < chapters.length; i++) {
                        chapter = chapters[i];
                        chapter.before = [];
                        if (chapter.next == null)
                            chapters_end = chapter.chapter;
                        chapters_dict[chapter.chapter] = chapter;
                    }
                    for (i = 0; i < chapters.length; i++) {
                        chapter = chapters[i];
                        if (chapter.next != null)
                            chapters_dict[chapter.next].before.append(chapter.chapter);
                    }
                    while (true) {
                        chapter = chapters[chapters_end];
                        if (chapter.before.length == 0) {
                            chapters_start = chapter.chapter;
                            break;
                        }
                        else if (chapter.before.length == 1) {
                            chapters_end = chapter.before[0];
                        }
                        else {
                            for (j = 0; j < chapter.before.length; j++) {
                                if (chapters_dict[chapter.before[j]].before.length > 0) {
                                    chapters_end = chapter.before[j];
                                    break;
                                }
                            }
                        }
                    }
                    chapters_end = chapters_start;
                    var order = 0;
                    chapters[chapters_end].before = null;
                    while (chapters_end != null) {
                        chapter = chapters[chapters_end];
                        chapter["order"] = ++order;
                        chapter["mobi_size"] = (chapter_end["mobi_size"] / 1024. / 1024.).toFixed(2);
                        result.push(chapter)
                        chapters_end = chapter.next;
                        if (chapters_end != null)
                            chapters[chapters_end].before = chapter.chapter;
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