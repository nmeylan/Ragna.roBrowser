/**
 * Controls/ScreenShot.js
 *
 * ScreenShot Manager
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * Controls/ScreenShot.js
 *
 * ScreenShot Manager
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Dependencies
 */
import Client from 'Core/Client';

import jQuery from 'Utils/jquery';
import html2canvas from 'Utils/html2canvas';
import KEYS from 'Controls/KeyEventHandler';
import ChatBox from 'UI/Components/ChatBox/ChatBox';


/**
 * Key Listener
 */
jQuery(window).keydown(function( event )
{
    if (KEYS.ALT && event.which === KEYS.P) {
        ScreenShot.take();
        event.stopImmediatePropagation();
        return false;
    }

    return true;
});


/**
 * Initiate methods
 */
var ScreenShot = {};


/**
 * Take a ScreenShot
 */
ScreenShot.take = function takeScreenShot()
{
    if (!ChatBox.ui) {
        return; //UI not loaded yet, cant display screenshot
    }

    html2canvas( [document.body], {
        onrendered: this.process
    });
};


/**
 * Process ScreenShot
 *
 * @param {canvasElement} canvas
 */
ScreenShot.process = function processScreenShot(canvas)
{
    var context, date, timezone;
    var x, y;

    // Create a date to add to canvas
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    localISOTime = localISOTime.replace('T', ' ');
    timezone = (new Date().getTimezoneOffset() / 60);
    date     = localISOTime + ' (GMT ' + (timezone > 0 ? '-' : '+') + Math.abs(timezone).toString() + ')'; //GMT

    context = canvas.getContext('2d');

    // Input the timestamp on screenshot
    context.fillStyle   = 'white';
    context.strokeStyle = 'black';

    x = 20;
    y = canvas.height - 5;

    context.font = 'bold 16px Arial';
    context.fillText(date, x, y);
    context.strokeText(date, x, y);
    
    // Get and draw src_logo to canvas
    Client.loadFile( 'data/texture/scr_logo.bmp', function(url) {
        var img = new Image();
        img.src = url;
        img.onload = function() {
            x = canvas.width  - img.width - 20;
            y = canvas.height - img.height - 5;
            context.drawImage(img, x, y);
            ScreenShot.display(canvas, date);
        };
    }, function(){
        ScreenShot.display(canvas, date);
    });
};


/**
 * Display the ScreenShot, this method is ment to be replaced by plugins if wanted.
 *
 * @param {canvasElement} canvas
 * @param {string} date
 */
ScreenShot.display = function displayScreenShot(canvas, date) {
    var binary, data, url;
    var i, count;

    // We decode the base64 to get the binary of the png
    binary = atob( canvas.toDataURL('image/png').replace(/^data[^,]+,/,'') );
    count  = binary.length;
    data   = new Uint8Array(count);

    // We store the content in a buffer
    for (i = 0; i < count; ++i) {
        data[i] = binary.charCodeAt(i);
    }

    // We create a local image with the buffer
    url = window.URL.createObjectURL(new Blob([data], {type: 'image/png'}));

    ChatBox.addText('Screenshot ' + date + ' can be saved by <a style="color:#F88" download="ScreenShot (' + date.replace('/', '-') + ').png" href="'+ url +'" target="_blank">clicking here</a>.', ChatBox.TYPE.PUBLIC, ChatBox.FILTER.PUBLIC_LOG, null, true);
};


export default ScreenShot;