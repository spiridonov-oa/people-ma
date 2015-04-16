'use strict';

angular.module('admin').directive('adminMenu', ['Menus', '$state',
    function (Menus, $state) {
        return {
            restrict: 'AE',
            templateUrl: 'modules/administrator/directives/admin-menu.view.html',
            link: function (scope) {
                scope.adminMenu = {};
                scope.adminMenu = Menus.getMenu('admin-menu');
                scope.adminMenu.active = $state.current.name;
            }
    };
}]);
