/**
 * UI/Components/GraphicsOption/GraphicsOption.js
 *
 * Manage Graphics details
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * UI/Components/GraphicsOption/GraphicsOption.js
 *
 * Manage Graphics details
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Dependencies
 */
import FPS from 'UI/Components/FPS/FPS';

import Configs from 'Core/Configs';
import Context from 'Core/Context';
import Preferences from 'Core/Preferences';
import GraphicsSettings from 'Preferences/Graphics';
import Renderer from 'Renderer/Renderer';
import UIManager from 'UI/UIManager';
import UIComponent from 'UI/UIComponent';
import htmlText from 'text!./GraphicsOption.html';
import cssText from 'text!./GraphicsOption.css';


/**
 * Create Component
 */
var GraphicsOption = new UIComponent( 'GraphicsOption', htmlText, cssText );


/**
 * @var {Preferences} Graphics
 */
var _preferences = Preferences.get('GraphicsOption', {
    x:    300,
    y:    300
}, 1.1);


/**
 * Initialize UI
 */
GraphicsOption.init = function Init()
{
    this.ui.find('.base').mousedown(function(event) {
        event.stopImmediatePropagation();
        return false;
    });

    this.ui.find('.close').click(this.remove.bind(this));
    this.ui.find('.details').change(onUpdateQualityDetails);
    this.ui.find('.cursor').change(onToggleGameCursor);
    this.ui.find('.screensize').change(onUpdateScreenSize);
    this.ui.find('.fpslimit').change(onUpdateFPSLimit);
    this.ui.find('.fps').change(onToggleFPSDisplay);

    this.draggable(this.ui.find('.titlebar'));
};



/**
 * When append the element to html
 */
GraphicsOption.onAppend = function OnAppend()
{
    this.ui.css({
        top:  _preferences.y,
        left: _preferences.x,
    });

    this.ui.find('.details').val(GraphicsSettings.quality);
    this.ui.find('.screensize').val(GraphicsSettings.screensize);
    this.ui.find('.cursor').attr('checked', GraphicsSettings.cursor);
    this.ui.find('.fpslimit').val(GraphicsSettings.fpslimit);
    this.ui.find('.fps').attr('checked', FPS.ui.is(':visible'));
};


/**
 * Once remove, save preferences
 */
GraphicsOption.onRemove = function OnRemove()
{
    _preferences.x    = parseInt(this.ui.css('left'), 10);
    _preferences.y    = parseInt(this.ui.css('top'), 10);
    _preferences.save();
};


/**
 * Modify game details to perform faster
 */
function onUpdateQualityDetails()
{
    GraphicsSettings.quality = parseInt(this.value, 10);
    GraphicsSettings.save();

    Configs.set('quality', GraphicsSettings.quality);
    Renderer.resize();
}


/**
 * Toggle game cursor
 */
function onToggleGameCursor()
{
    GraphicsSettings.cursor = !!this.checked;
    GraphicsSettings.save();

    // Remove cursor image
    if (!GraphicsSettings.cursor) {
        document.body.style.cursor = 'default';
    }
}

/**
 * Update the fps limit
 */
function onUpdateFPSLimit()
{
    GraphicsSettings.fpslimit = parseInt( this.value, 10 );
    GraphicsSettings.save();

    if( Renderer.frameLimit > 0 ) {
        clearInterval( Renderer.updateId );
    }

    Renderer.frameLimit = GraphicsSettings.fpslimit;
    Renderer.rendering = false;
    Renderer.render( null );
}

/**
 * Toggle the fps display
 */
function onToggleFPSDisplay()
{
    FPS.toggle(!!this.checked);
}

/**
 * Resizing window size
 */
function onUpdateScreenSize()
{
    var isFullScreen = Context.isFullScreen();

    GraphicsSettings.screensize = this.value;
    GraphicsSettings.save();

    // FullScreen
    if (GraphicsSettings.screensize === 'full') {
        if (!isFullScreen) {
            Context.requestFullScreen();
        }
        return;
    }

    if (isFullScreen) {
        Context.cancelFullScreen();
    }

    // Resizing
    if (Context.Is.POPUP) {
        var size = GraphicsSettings.screensize.split('x');

        // Only resize/move if needed
        if (size[0] != window.innerWidth && size[1] != window.innerHeight) {
            window.resizeTo( size[0], size[1] );
            window.moveTo( (screen.availWidth - size[0]) / 2, (screen.availHeight - size[1]) / 2 );
        }
    }
}


export default UIManager.addComponent(GraphicsOption);