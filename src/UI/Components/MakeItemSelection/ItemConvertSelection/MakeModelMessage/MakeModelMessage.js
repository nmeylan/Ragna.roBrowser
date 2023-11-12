/**
 * UI/Components/MakeItemSelection/ItemConvertSelection/MakeModelMessage/MakeModelMessage.js
 *
 * MakeModelMessage windows
 *
 * @author Francisco Wallison
 */
/**
 * UI/Components/MakeItemSelection/ItemConvertSelection/MakeModelMessage/MakeModelMessage.js
 *
 * MakeModelMessage windows
 *
 * @author Francisco Wallison
 */
'use strict';


/**
 * Dependencies
 */
import Renderer from 'Renderer/Renderer';

import UIManager from 'UI/UIManager';
import UIComponent from 'UI/UIComponent';
import htmlText from 'text!./MakeModelMessage.html';
import cssText from 'text!./MakeModelMessage.css';
var getModule   = require;

/**
 * Create MakeModelMessage namespace
 */
var MakeModelMessage = new UIComponent( 'MakeModelMessage', htmlText, cssText );

/**
 * Initialize UI
 */
MakeModelMessage.init = function init()
{
    // Show at center.
    this.ui.css({
        top:  (Renderer.height- 200)/2,
        left: (Renderer.width - 200)/2
    });

    this.ui.find('.ok').on('click',onSendMaterial); 
    this.ui.find('.cancel').on('click',onClose);

    this.draggable(this.ui.find('.titlebar'));
};

function onSendMaterial(event){
    event.stopImmediatePropagation();
    getModule('UI/Components/MakeItemSelection/ItemConvertSelection/ConvertItems')
        .validItemSend(true);

}

function onClose(event){
    event.stopImmediatePropagation();
    getModule('UI/Components/MakeItemSelection/ItemConvertSelection/ConvertItems')
        .validItemSend(false);
}

export default UIManager.addComponent(MakeModelMessage);