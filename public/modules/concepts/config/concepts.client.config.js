'use strict';

// Configuring the Articles module
angular.module('concepts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('admin-menu', 'Concepts', 'concepts', 'dropdown', '/concepts(/create)?');
		Menus.addSubMenuItem('admin-menu', 'concepts', 'List Concepts', 'concepts');
		Menus.addSubMenuItem('admin-menu', 'concepts', 'New Concept', 'concepts/create');*/
	}
]);
