/**
 * UI/Components/WinPopup/Winpopup.js
 *
 * Popup windows
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * UI/Components/WinPopup/Winpopup.js
 *
 * Popup windows
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Dependencies
 */
import Renderer  from '/src/Renderer/Renderer';

import UIManager  from '/src/UI/UIManager';
import UIComponent  from '/src/UI/UIComponent';
import htmlText  from './WinPopup.html';
import cssText  from './WinPopup.css';


/**
 * Create Component
 */
var WinPopup = new UIComponent( 'WinPopup', htmlText, cssText );


/**
 * Initialize popup
 */
WinPopup.init = function init()
{
    this.ui.css({
        top:  (Renderer.height-120) / 1.5 - 120,
        left: (Renderer.width -280) / 2.0,
        zIndex: 100
    });
};


export default UIManager.addComponent(WinPopup);