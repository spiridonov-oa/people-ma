'use strict';

angular.module('core').directive('stateClass', ['$state', '$rootScope', function ($state, $rootScope) {

    function link (scope, element, attrs) {
        function stateChangeStartHandler (e, toState, toParams, fromState, fromParams) {
            scope.body = scope.body || {};

            if(fromState.name) {
                scope.body.class = fromState.name + '-' + toState.name + ' ' + toState.name;
            } else {
                scope.body.class =  toState.name;
            }

            //console.log('scope.body.class: ' + scope.body.class);
        }

        $rootScope.$on('$stateChangeStart', stateChangeStartHandler);
    }

    return {
        restrict: 'AE',
        link: link
    };
}]);
