/**
 * UI/Components/PlayerEquipment/PlayerEquipment.js
 *
 * Other player's Equipment window
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 */
/**
 * UI/Components/PlayerEquipment/PlayerEquipment.js
 *
 * Other player's Equipment window
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 */
'use strict';


/**
 * Dependencies
 */
import DB from 'DB/DBManager';

import Renderer from 'Renderer/Renderer';
import Camera from 'Renderer/Camera';
import SpriteRenderer from 'Renderer/SpriteRenderer';
import UIManager from 'UI/UIManager';
import UIComponent from 'UI/UIComponent';
import Equipment from 'UI/Components/Equipment/Equipment';
import jQuery from 'Utils/jquery';


/**
 * Create Component
 */
var PlayerEquipment = Equipment.clone('PlayerEquipment');

export default UIManager.addComponent(PlayerEquipment);