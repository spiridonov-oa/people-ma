'use strict';

// Configuring the Articles module
angular.module('photosets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Photos', 'photosets', 'dropdown', '/photosets(/create)?');
		Menus.addSubMenuItem('topbar', 'photosets', 'List Photos', 'photosets');
		Menus.addSubMenuItem('topbar', 'photosets', 'New Photo', 'photosets/create');
	}
]);