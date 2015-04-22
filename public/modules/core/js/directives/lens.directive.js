'use strict';
/*
angular.module('core').directive('lens', ['$state', '$rootScope', function ($state, $rootScope) {

    var lens = (function () {
        var items, wrappedItem, jQelement;

        function init (element) {
            jQelement = $(element);
            items = jQelement.find('li a span');
            prepareItems(items);
        }

        function prepareItems (items) {
            items.each(function (element) {
                splitStringBySymbols(element.text())
            });
        }

        function splitStringBySymbols (str) {
            for (var i = 0, len = str.length; i < len; i++) {
                wrappedItem += wrapSymbolsInSpan(str[i]);
                console.log(wrappedItem);
            }
        }

        function wrapSymbolsInSpan (symbol) {
            return '<span>' + symbol + '</span>';
        }

        return {
            init: init
        }
    }());

    function link (scope, element, attrs) {
        $( document ).ready(lens.init(element));
    }

    return {
        restrict: 'AE',
        link: link
    };
}]);
      */
