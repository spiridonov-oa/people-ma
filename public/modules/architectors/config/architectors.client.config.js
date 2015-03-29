'use strict';

// Configuring the Articles module
angular.module('architectors').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Architectors', 'architectors', 'dropdown', '/architectors(/create)?');
		Menus.addSubMenuItem('topbar', 'architectors', 'List Architectors', 'architectors');
		Menus.addSubMenuItem('topbar', 'architectors', 'New Architector', 'architectors/create');
	}
]);