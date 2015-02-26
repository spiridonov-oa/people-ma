'use strict';

angular.module('core').directive('circle',
    function () {
        return {
            restrict: 'AE',
            templateUrl: 'modules/core/directives/template/circle.view.html',
            link: function (scope) {
                //$(element).imageLens({ lensSize: 200 });
            }
    };
});