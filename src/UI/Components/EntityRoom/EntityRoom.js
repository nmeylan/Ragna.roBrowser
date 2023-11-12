/**
 * UI/Components/EntityRoom/EntityRoom.js
 *
 * Entity room (chat room, shop room, ...)
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * UI/Components/EntityRoom/EntityRoom.js
 *
 * Entity room (chat room, shop room, ...)
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Dependencies
 */
import UIManager  from '/src/UI/UIManager';

import UIComponent  from '/src/UI/UIComponent';
import htmlText  from './EntityRoom.html';
import cssText  from './EntityRoom.css';


/**
 * Createcomponent
 */
var EntityRoom = new UIComponent( 'EntityRoom', htmlText, cssText );


/**
 * @var {boolean} do not focus this UI
 */
EntityRoom.needFocus = false;


/**
 * Once in HTML, focus the input
 */
EntityRoom.onAppend = function onAppend()
{
    this.ui.find('button').dblclick(function(){
        if (this.onEnter) {
            this.onEnter();
        }
    }.bind(this));

    // Avoid player to move to the cell
    this.ui.mousedown(function(){
        return false;
    });

    this.ui.css('zIndex', 45);
};


/**
 * Remove data from UI
 */
EntityRoom.onRemove = function onRemove()
{
    this.ui.find('button').unbind();
};


/**
 * Define title and icons
 *
 * @param {string} title
 * @param {string} url - icon url
 */
EntityRoom.setTitle = function setTitle( title, url )
{
    this.ui.find('button').css('backgroundImage', 'url('+ url +')');
    this.ui.find('.title, .overlay').text(title);
};


/**
 * function to define
 */
EntityRoom.onEnter = function onEnter(){};


export default UIManager.addComponent(EntityRoom);