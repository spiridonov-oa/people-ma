'use strict';

angular.module('core').directive('stateClass', ['$state', '$rootScope', function ($state, $rootScope) {

    var pageAnimator = {
        animate: function (element, fromState, toState) {
            this.page = toState.name;
            this.prevPage = fromState.name || null;
            this.animationTime = 1000;
            this.$body = jQuery(element);
            this.$circle = this.$body.find('.circle');
            this.pages = {
                projects: 'projects',
                home: 'home',
                concepts: 'concepts',
                about: 'about',
                people: 'people'
            };

            this.vw = jQuery(window).width()/100;
            this.vh = jQuery(window).height()/100;

            //this[this.page + 'Animate']();
            this.animateCircle();
        },

        homeAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
        },

        projectsAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
            var $projectsPage = this.$body.find('.' + this.pages.projects + '-page');
            var vw = this.vw;

            $projectsPage.css('opacity', 0);

           /* $projectsPage.animate({
                opacity: 1
            }, {
                duration: animationTime * 3,
                done: animateBg
            });*/

            function animateBg () {
                var img1 = $projectsPage.find('.projects-bg-top-img');
                var img2 = $projectsPage.find('.projects-bg-bottom-img');
                img1.height(50*vw).width(50*vw).addClass('animateBg');
                img2.height(50*vw).width(50*vw).addClass('animateBg');
            }

            console.log('projectsAnimate');
        },

        conceptAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
        },

        aboutAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
        },

        peopleAnimate: function () {
            var prevPage = this.prevPage;
            var animationTime = this.animationTime;
        },

        animateCircle: function (callback) {
            var $circle = this.$circle;
            var animationTime = this.animationTime;
            var vw = this.vw;
            var vh = this.vh;
            var callback = typeof callback === 'function' ? callback : function(){};
            $circle.stop();

            var getOptions = function (time) {
                time = time || animationTime;
                return {
                    duration: time,
                    done: callback
                }
            };

            //from Home to Projects
            if (this.page === this.pages.projects || this.page === this.pages.concepts) {
                if (this.prevPage === this.pages.home) {
                    $circle.animate({
                        bottom: '60%'
                    }, getOptions(animationTime/2))
                        .animate({
                        right: '10%'
                    }, getOptions(animationTime/2));
                } else {
                    $circle.animate({
                        bottom: '60%',
                        right: '10%',
                        height: '10em',
                        width: '10em'
                    }, getOptions());
                }
            }

            //from Projects to Home
            if (this.page === this.pages.home) {
                if (this.prevPage === this.pages.projects  || this.prevPage === this.pages.concepts) {
                    $circle.animate({
                        right: '52%'
                    }, getOptions(animationTime/2)).animate({
                        bottom: '8em'
                    }, getOptions(animationTime/2));
                } else {
                    $circle.animate({
                        right: '52%',
                        bottom: '8em',
                        height: '10em',
                        width: '10em'
                    }, getOptions());
                }
            }

            if (this.page === this.pages.about) {
                $circle.animate({
                    right: -3*vw + 'px',
                    bottom: -3*vw + 'px',
                    height: 40*vw + 'px',
                    width: 40*vw + 'px'
                }, getOptions());
            }

            if (this.page === this.pages.people) {
                $circle.animate({
                    right: 20*vw + 'px',
                    bottom: 60*vh + 'px',
                    height: 5 + 'px',
                    width: 5 + 'px'
                }, getOptions());
            }
        },

        resizeWindow: function () {
            var screenWidth = window.outerWidth();
            var screenHeight = window.outerHeight();
            if (screenWidth / screenHeight > 2) {
                this.$body.width(screenWidth / 2);
            }
        }
    };

    function link (scope, element, attrs) {
        function stateChangeStartHandler (e, toState, toParams, fromState, fromParams) {
            scope.body = scope.body || {};
            scope.body.class = '';

            if(fromState.name) {
                scope.body.class = ' from-' + fromState.name + ' ';
            }

            scope.body.class += toState.name + ' ';
            //console.log('scope.body.class: ' + scope.body.class);
            pageAnimator.animate(element, fromState, toState);

        }

       /* $animate.leave(element).then(function() {
            scope.$apply(function() {
                console.log(' $animate.leave');
            });
        });*/

        $rootScope.$on('$stateChangeStart', stateChangeStartHandler);

    }

    return {
        restrict: 'AE',
        link: link
    };
}])
    /*
    .animation('.view', function() {

        return {
            enter: function(element, done) {
                //run the animation here and call done when the animation is complete
                console.log('enter');

                element.addClass('long-animation');

                return function(cancelled) {
                    console.log('enter return');
                    //this (optional) function will be called when the animation
                    //completes or when the animation is cancelled (the cancelled
                    //flag will be set to true if cancelled).
                };
            },
            leave: function(element, done) {
                console.log('leave');

            },
            move: function(element, done) {
                console.log('move');
            }
        }
    });
*/
