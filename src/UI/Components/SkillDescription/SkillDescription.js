/**
 * UI/Components/SkillDescription/SkillDescription.js
 *
 * Skill Information
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * UI/Components/SkillDescription/SkillDescription.js
 *
 * Skill Information
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Dependencies
 */
import jQuery from 'Utils/jquery';

import SkillDB from 'DB/Skills/SkillDescription';
import Renderer from 'Renderer/Renderer';
import KEYS from 'Controls/KeyEventHandler';
import Mouse from 'Controls/MouseEventHandler';
import UIManager from 'UI/UIManager';
import UIComponent from 'UI/UIComponent';
import htmlText from 'text!./SkillDescription.html';
import cssText from 'text!./SkillDescription.css';


/**
 * Create Component
 */
var SkillDescription = new UIComponent( 'SkillDescription', htmlText, cssText );


/**
* SkillDescription unique id
*/
SkillDescription.uid = -1;


/**
 * Once append to the DOM
 */
SkillDescription.onKeyDown = function onKeyDown( event )
{
    if (event.which === KEYS.ESCAPE) {
        this.remove();
        event.stopImmediatePropagation();
        return false;
    }

    return true;
};


/**
 * Once append
 */
SkillDescription.onAppend = function onAppend()
{
    // Seems like "EscapeWindow" is execute first, push it before.
    var events = jQuery._data( window, 'events').keydown;
    events.unshift( events.pop() );
};


/**
 * Once removed
 */
SkillDescription.onRemove = function onRemove()
{
    this.uid = -1; // reset uid
};


/**
 * Initialize UI
 */
SkillDescription.init = function init()
{
    this.ui.find('.close').click(function(){
        this.remove();
    }.bind(this));

    this.draggable();
};


/**
 * Add content to the box
 *
 * @param {number} skill id
 */
SkillDescription.setSkill = function setSkill( id )
{
    this.uid = id;
    this.ui.find('.content').text(SkillDB[id] || '...');

    this.ui.css({
        top:  Math.min( Mouse.screen.y + 10, Renderer.height - this.ui.height()),
        left: Math.min( Mouse.screen.x + 10, Renderer.width - this.ui.width())
    });
};


export default UIManager.addComponent(SkillDescription);