'use strict';

// Configuring the Articles module
angular.module('about').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('mainmenu', 'About Us', 'about', 'left-margin', '/about-us', true, null, 3);
    }
]);
