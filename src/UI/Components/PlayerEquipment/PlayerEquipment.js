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
import DB  from '/src/DB/DBManager';

import Renderer  from '/src/Renderer/Renderer';
import Camera  from '/src/Renderer/Camera';
import SpriteRenderer  from '/src/Renderer/SpriteRenderer';
import UIManager  from '/src/UI/UIManager';
import UIComponent  from '/src/UI/UIComponent';
import Equipment  from '/src/UI/Components/Equipment/Equipment';
import jQuery  from '/src/Utils/jquery';


/**
 * Create Component
 */
var PlayerEquipment = Equipment.clone('PlayerEquipment');

export default UIManager.addComponent(PlayerEquipment);