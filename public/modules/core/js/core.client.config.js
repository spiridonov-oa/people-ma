'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenuItem('mainmenu', 'Concept', 'concept', 'dropdown', '/concept', true, null, 2);

        Menus.addMenuItem('mainmenu', 'News', 'news', 'dropdown', '/news', true, null, 5);
	}
]);