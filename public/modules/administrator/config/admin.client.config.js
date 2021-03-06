'use strict';

// Configuring the Articles module
angular.module('admin').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('admin-menu', 'Home', 'admin', 'dropdown', '/admin');
        Menus.addMenuItem('admin-menu', 'Projects', 'adminProjects', 'dropdown', '/admin/projects');
        Menus.addMenuItem('admin-menu', 'Concepts', 'adminConcepts', 'dropdown', '/admin/concepts');
        Menus.addMenuItem('admin-menu', 'People', 'adminPeople', 'dropdown', '/admin/people');
        Menus.addMenuItem('admin-menu', 'News', 'adminArticles', 'dropdown', '/admin/articles');
	}
]);
