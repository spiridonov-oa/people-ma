'use strict';

angular.module('core').directive('stateClass', ['$state', '$rootScope', function ($state, $rootScope) {

    function animation (element, fromState, toState) {
        var state = '';
        var animationTime = 1000;
        var $body = jQuery(element);
        var $circle = $body.find('.circle');
        var states = {
            projects: 'projects',
            home: 'home'
        };

        var vw = jQuery(window).width()/100;
        var vh = jQuery(window).height()/100;

        if (fromState.name) {
            state += fromState.name + '-';
        }
        state += toState.name;

        switch(toState.name) {
            case states.home:
                homeAnimation(fromState);
                break;
            case states.projects:
                projectsAnimation(fromState);
                break;
        }

        function homeAnimation (prevState) {
            if (prevState.name == states.projects && prevState.name == states.projects) {
                $circle.animate({
                    right: '58%'
                }, animationTime/2).animate({
                    bottom: '0'
                }, animationTime/2);
            } else {
                $circle.animate({
                    right: '58%',
                    bottom: '0'
                }, animationTime);
            }

            var $homePage = $body.find('.' + states.name + '-page');
            $homePage.css('left', 0);
            $homePage.animate({
                left: '100%'
            }, animationTime);
            console.log('homeAnimation');

        }

        function projectsAnimation (prevState){
            if (prevState.name === states.home) {
                $circle.animate({
                    bottom: '60%'
                }, animationTime/2).animate({
                    right: '10%'
                }, animationTime/2);
            } else {
                $circle.animate({
                    bottom: '60%',
                    right: '10%'
                }, animationTime);
            }

            var $projectsPage = $body.find('.' + states.projects + '-page');
            $projectsPage.css('opacity', 0);
            $projectsPage.animate({
                opacity: 1
            }, animationTime * 3);
            console.log('projectsAnimation');


        }

        function resizeWindow() {
            var screenWidth = window.outerWidth();
            var screenHeight = window.outerHeight();
            if (screenWidth / screenHeight > 2) {
                $body.width(screenWidth / 2);
            }
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
