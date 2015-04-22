'use strict';

angular.module('core').directive('mainmenu', ['Menus',
    function (Menus) {
        return {
            restrict: 'AE',
            templateUrl: 'modules/core/directives/template/mainmenu.view.html',
            link: function (scope) {
                scope.menu = Menus.getMenu('mainmenu');
                scope.menuItemSize = Math.floor(12 / scope.menu.length);
        }
    };
}]);
