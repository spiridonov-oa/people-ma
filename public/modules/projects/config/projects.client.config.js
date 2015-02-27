'use strict';

// Configuring the Articles module
angular.module('projects').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('mainmenu', 'Projects', 'projects', 'dropdown', '/projects(/create)?');
		Menus.addSubMenuItem('mainmenu', 'projects', 'List Projects', 'projects');
		Menus.addSubMenuItem('mainmenu', 'projects', 'New Project', 'projects/create');
	}
]);