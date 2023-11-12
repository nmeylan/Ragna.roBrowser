/**
 * UI/Components/Vending/VendingModelMessage/VendingModelMessage.js
 *
 * VendingModelMessage windows
 *
 * @author Francisco Wallison
 */
/**
 * UI/Components/Vending/VendingModelMessage/VendingModelMessage.js
 *
 * VendingModelMessage windows
 *
 * @author Francisco Wallison
 */
'use strict';


/**
 * Dependencies
 */
import jQuery from 'Utils/jquery';

import DB from 'DB/DBManager';
import Preferences from 'Core/Preferences';
import Mouse from 'Controls/MouseEventHandler';
import Client from 'Core/Client';
import Renderer from 'Renderer/Renderer';
import UIManager from 'UI/UIManager';
import UIComponent from 'UI/UIComponent';
import InputBox from 'UI/Components/InputBox/InputBox';
import Inventory from 'UI/Components/Inventory/Inventory';
import htmlText from 'text!./VendingModelMessage.html';
import cssText from 'text!./VendingModelMessage.css';
var getModule   = require;

/**
 * Create VendingModelMessage namespace
 */
var VendingModelMessage = new UIComponent( 'VendingModelMessage', htmlText, cssText );

/**
 * Initialize UI
 */
VendingModelMessage.init = function init()
{
   // Show at center.
   this.ui.css({
       top:  (Renderer.height- 200)/2,
       left: (Renderer.width - 200)/2
   });

   this.ui.find('.ok').click(function(e){
       e.stopImmediatePropagation();
       VendingModelMessage.onRemove();
   });
   this.draggable(this.ui.find('.titlebar'));
};

VendingModelMessage.setInit = function setInit(numMessage)
{
    VendingModelMessage.append();
    VendingModelMessage.ui.show();
    let messageText = DB.getMessage(numMessage);
    VendingModelMessage.ui.find('.message').text(messageText);
}

VendingModelMessage.onRemove = function onRemove()
{
    if (this.ui == undefined)
        return;
  
    this.ui.hide()
}

export default UIManager.addComponent(VendingModelMessage);