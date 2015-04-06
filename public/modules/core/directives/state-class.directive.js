'use strict';

angular.module('core').directive('stateClass', ['$state', '$rootScope', function ($state, $rootScope) {

    function animation (element, fromState, toState) {
        var state = '';
        var animationTime = 1000;
        if (fromState.name) {
            state += fromState.name + '-';
        }
        state += toState.name;

        switch(state) {
            case 'home':
                homeAnimation(fromState);
                break;

        }

        function homeAnimation () {
            element.css('opacity', 0);
            jQuery(element).animate({
                opacity: 1
            }, animationTime);
            console.log('homeAnimation');
        }
    }

    function link (scope, element, attrs) {
        function stateChangeStartHandler (e, toState, toParams, fromState, fromParams) {
            scope.body = scope.body || {};
            scope.body.class = '';

            if(fromState.name) {
                scope.body.class = ' from-' + fromState.name + ' ';
            }

            scope.body.class += toState.name + ' ';
            //console.log('scope.body.class: ' + scope.body.class);
            animation(element, fromState, toState);
        }

        $rootScope.$on('$stateChangeStart', stateChangeStartHandler);
    }

    return {
        restrict: 'AE',
        link: link
    };
}]);
