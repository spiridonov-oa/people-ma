'use strict';

// Configuring the Articles module
angular.module('about-us').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenuItem('mainmenu', 'About Us', 'about-us', 'left-margin', '/about-us', true, null, 3);
	}
]);