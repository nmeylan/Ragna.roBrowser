/**
 * UI/Components/WinPrompt/WinPrompt.js
 *
 * Prompt window
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * UI/Components/WinPrompt/WinPrompt.js
 *
 * Prompt window
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

import UIManager from 'UI/UIManager';
import WinPopup from 'UI/Components/WinPopup';
import jQuery from 'Utils/jquery';


/**
 * Create Component
 */
var WinPrompt = WinPopup.clone('WinPrompt');


/**
 * Initialize popup
 */
WinPrompt.init = function init()
{
    this.ui.draggable();
};


/**
 * Ask for something
 *
 * @param {string} question to ask
 * @param {string} first button name
 * @param {string} second button name
 * @param {function} callback to execute once the first button is pressed
 * @param {function} callback to execute once the second button is pressed
 *
 */
WinPrompt.ask = function ask( text, btn_yes, btn_no, onYes, onNo )
{
    this.ui.find('.text').text(text);
    this.ui.find('.btns').empty().append(

        jQuery('<button/>').
            addClass('btn').
            data('background', DB.INTERFACE_PATH + 'btn_' + btn_yes + '.bmp').
            data('hover',      DB.INTERFACE_PATH + 'btn_' + btn_yes + '_a.bmp').
            data('down',       DB.INTERFACE_PATH + 'btn_' + btn_yes + '_b.bmp').
            each( this.parseHTML ).
            one('click',function(){
                WinPrompt.remove();
                if (onYes) {
                    onYes();
                }
            }),

        jQuery('<button/>').
            addClass('btn').
            data('background', DB.INTERFACE_PATH + 'btn_' + btn_no + '.bmp').
            data('hover',      DB.INTERFACE_PATH + 'btn_' + btn_no + '_a.bmp').
            data('down',       DB.INTERFACE_PATH + 'btn_' + btn_no + '_b.bmp').
            each( this.parseHTML ).
            one('click',function(){
                WinPrompt.remove();
                if (onNo) {
                    onNo();
                }
            })
    );

    // Parse
    this.append();
    this.ui.each( this.parseHTML ).find('*').each( this.parseHTML );
};


export default UIManager.addComponent(WinPrompt);