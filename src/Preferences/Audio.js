/**
 * Preferences/Audio.js
 *
 * Audio preferences
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * Preferences/Audio.js
 *
 * Audio preferences
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
import Preferences  from '/src/Core/Preferences';

'use strict';


export default Preferences.get( 'Audio', {

    BGM:   {
        play:   true,
        volume: 0.5
    },

    Sound: {
        play:   true,
        volume: 0.5
    }

}, 1.0 );