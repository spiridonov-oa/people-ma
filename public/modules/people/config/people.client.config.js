'use strict';

// Configuring the Articles module
angular.module('people').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('mainmenu', 'People', 'people', 'item', '/people', true, null, 4);
	}
]);