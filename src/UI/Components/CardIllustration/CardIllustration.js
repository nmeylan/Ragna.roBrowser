/**
 * UI/Components/CardIllustration/CardIllustration.js
 *
 * Card image
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * UI/Components/CardIllustration/CardIllustration.js
 *
 * Card image
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Dependencies
 */
import DB from 'DB/DBManager';

import Client from 'Core/Client';
import UIManager from 'UI/UIManager';
import UIComponent from 'UI/UIComponent';
import htmlText from 'text!./CardIllustration.html';
import cssText from 'text!./CardIllustration.css';


/**
 * Create Component
 */
var CardIllustration = new UIComponent( 'CardIllustration', htmlText, cssText );


/**
 * Initialize events
 */
CardIllustration.init = function init()
{
    this.ui.find('.close').click(this.remove.bind(this));
    this.draggable();
};


/**
 * Show image
 *
 * @param {object} item
 */
CardIllustration.setCard = function setCard( item )
{
    this.ui.find('.titlebar .text').text( item.identifiedDisplayName );
    this.ui.find('.content').css('backgroundImage', 'none' );

    Client.loadFile( DB.INTERFACE_PATH + 'cardbmp/' + item.illustResourcesName + '.bmp', function(data){
        this.ui.find('.content').css('backgroundImage', 'url('+data+')' );
    }.bind(this));
};


export default UIManager.addComponent(CardIllustration);