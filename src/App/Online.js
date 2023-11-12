/**
 * App/Online.js
 *
 * Start roBrowser
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
import GameEngine from '../Engine/GameEngine';
import Context from '../Core/Context';
import Plugins from '../Plugins/PluginManager';

// Equivalent code
'use strict';

Plugins.init();
GameEngine.init();

if (!Context.Is.APP) {
	window.onbeforeunload = function() {
		return 'Are you sure to exit roBrowser ?';
	};
}