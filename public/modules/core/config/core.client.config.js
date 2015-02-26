'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenu('mainmenu', true);

        Menus.addMenuItem('mainmenu', 'Concept', 'concept', 'dropdown', '/concept', true, null, 2);

        Menus.addMenuItem('mainmenu', 'About Us', 'about-us', 'left-margin', '/about', true, null, 3);

        Menus.addMenuItem('mainmenu', 'People', 'people', 'dropdown', '/people', true, null, 4);

        Menus.addMenuItem('mainmenu', 'News', 'news', 'dropdown', '/news', true, null, 5);
	}
]);