'use strict';

// Configuring the Articles module
angular.module('architectors').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin-menu', 'Architectors', 'architectors', 'dropdown', '/architectors(/create)?');
		Menus.addSubMenuItem('admin-menu', 'architectors', 'List Architectors', 'architectors');
		Menus.addSubMenuItem('admin-menu', 'architectors', 'New Architector', 'architectors/create');
	}
]);
