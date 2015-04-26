'use strict';

angular.module('admin').controller('AdminArticlesController', ['$scope', '$state', 'Authentication', '$location', 'AdminDataFactory', 'AdminArticles',
    function($scope, $state, Authentication, $location, AdminDataFactory, AdminArticles) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.isAuthorised = $scope.authentication.user && $scope.authentication.user._id;

        if (!$scope.isAuthorised) {
            $location.path('/signin');
            return;
        }

        var options = {
            unitId: $state.current.articleId,
            unitUrl: '/admin/articles',
            unitPath: '#!/admin/articles',
            service: AdminArticles
        };

        var articlesFactory = new AdminDataFactory(options);

        $scope.article = $scope.article || {};
        $scope.article.isNew = !$state.params.articleId;
        $scope.article.data = {
            title: '',
            content: '',
            enable: true,
            order: ''
        };
        $scope.article.id = $state.params.articleId;
        $scope.article.getRequestParams = {articleId: $state.params.articleId};
        $scope.article.parentPath = '#!/admin/articles';

        $scope.article.submit = function () {
            if ($scope.article.isNew) {
                articlesFactory.create($scope.article, $scope.article.data);
            } else {
                articlesFactory.update($scope.article);
            }
        };

        $scope.article.find = function () {
            articlesFactory.find($scope.article);
        };

        $scope.article.findOne = function () {
            articlesFactory.findOne($scope.article, $scope.article.getRequestParams);
        };

        if (!$scope.article.isNew) {
            $scope.article.findOne();
        }

        if (!$scope.article.list || $scope.article.list.length < 1) {
            $scope.article.find();
        }

        $scope.article.chooseOne = function (id) {

        }

    }
]);
