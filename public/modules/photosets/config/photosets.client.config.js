'use strict';

// Configuring the Articles module
angular.module('photosets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin-menu', 'Photos', 'photosets', 'dropdown', '/photosets(/create)?');
		Menus.addSubMenuItem('admin-menu', 'photosets', 'List Photos', 'photosets');
		Menus.addSubMenuItem('admin-menu', 'photosets', 'New Photo', 'photosets/create');
	}
]);
