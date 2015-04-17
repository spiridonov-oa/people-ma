'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('admin-menu', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('admin-menu', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('admin-menu', 'articles', 'New Article', 'articles/create');*/
	}
]);
