/**
 * UI/Components/SoundOption/SoundOption.js
 *
 * Manage sound volume
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * UI/Components/SoundOption/SoundOption.js
 *
 * Manage sound volume
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Dependencies
 */
import Preferences  from '/src/Core/Preferences';

import AudioSettings  from '/src/Preferences/Audio';
import AudioManager  from '/src/Audio/BGM';
import SoundManager  from '/src/Audio/SoundManager';
import UIManager  from '/src/UI/UIManager';
import UIComponent  from '/src/UI/UIComponent';
import htmlText  from './SoundOption.html';
import cssText  from './SoundOption.css';


/**
 * Create Sound Settings Component
 */
var SoundOption = new UIComponent( 'SoundOption', htmlText, cssText );


/**
 * @var {Preferences} window option
 */
var _preferences=  Preferences.get('SoundOption', {
    x:    300,
    y:    300,
}, 1.0);


/**
 * Initialize UI
 */
SoundOption.init = function init()
{
    this.ui.find('.base').mousedown(stopPropagation);
    this.ui.find('.close').click(onClose);

    this.ui.find('.sound').change(onSoundVolumeUpdate);
    this.ui.find('.bgm').change(onBGMVolumeUpdate);

    this.ui.find('.sound_state').change(onToggleSound);
    this.ui.find('.bgm_state').change(onToggleBGM);

    this.draggable(this.ui.find('.titlebar'));
};



/**
 * When append the element to html
 * Execute elements in memory
 */
SoundOption.onAppend = function onAppend()
{
    this.ui.css({
        top:     _preferences.y,
        left:    _preferences.x
    });

    this.ui.find('.sound').val(AudioSettings.Sound.volume * 100);
    this.ui.find('.bgm').val( AudioSettings.BGM.volume * 100);
    this.ui.find('.sound_state')[0].checked = AudioSettings.Sound.play;
    this.ui.find('.bgm_state')[0].checked   = AudioSettings.BGM.play;
};


/**
 * Once remove, save preferences
 */
SoundOption.onRemove = function onRemove()
{
    _preferences.x    = parseInt(this.ui.css('left'), 10);
    _preferences.y    = parseInt(this.ui.css('top'), 10);
    _preferences.save();
};


/**
 * Stop event propagation
 */
function stopPropagation( event )
{
    event.stopImmediatePropagation();
    return false;
}


/**
 * Close the UI
 */
function onClose()
{
    SoundOption.remove();
}


/**
 * Update sound volume
 */
function onSoundVolumeUpdate()
{
    AudioSettings.Sound.volume = parseInt(this.value, 10) / 100;
    AudioSettings.save();

    SoundManager.setVolume( AudioSettings.Sound.volume );
}


/**
 * Toggle sound (on/off)
 */
function onToggleSound()
{
    var oldVolume            = AudioSettings.Sound.volume;
    AudioSettings.Sound.play = this.checked;

    if (AudioSettings.Sound.play) {
        SoundManager.setVolume(AudioSettings.Sound.volume);
    }
    else {
        SoundManager.setVolume(0);
        SoundManager.stop();
    }

    AudioSettings.Sound.volume = oldVolume; // setVolume modify the value, get it back
    AudioSettings.save();
}


/**
 * Update BGM volume
 */
function onBGMVolumeUpdate()
{
    AudioSettings.BGM.volume = parseInt(this.value, 10) / 100;
    AudioSettings.save();

    AudioManager.setVolume( AudioSettings.BGM.volume );
}


/**
 * Toggle BGM (on/off)
 */
function onToggleBGM()
{
    AudioSettings.BGM.play = this.checked;
    AudioSettings.save();

    if (AudioSettings.BGM.play) {
        AudioManager.play(AudioManager.filename);
    }
    else {
        AudioManager.stop();
    }
}


export default UIManager.addComponent(SoundOption);