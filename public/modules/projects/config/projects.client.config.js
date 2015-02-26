'use strict';

// Configuring the Articles module
angular.module('projects').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenuItem('mainmenu', 'Projects', 'projects', 'dropdown', '/projects', true, null, 1);
        Menus.addSubMenuItem('mainmenu', 'projects', 'New Project', '/projects/create', '/projects/create', false,1);
		/*Menus.addMenuItem('n', 'Projects', 'projects', 'dropdown', '/projects(/create)?');
		Menus.addSubMenuItem('n', 'projects', 'List Projects', 'projects');
		Menus.addSubMenuItem('n', 'projects', 'New Project', 'projects/create');*/
	}
]);