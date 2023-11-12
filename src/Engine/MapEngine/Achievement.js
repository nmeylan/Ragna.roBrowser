/**
 * Engine/MapEngine/Achievement.js
 *
 * Manage Achievement packets and UI
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * Engine/MapEngine/Achievement.js
 *
 * Manage Achievement packets and UI
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Load dependencies
 */
import Network  from '/src/Network/NetworkManager';

import PACKET  from '/src/Network/PacketStructure';

function onAllAchievementList(pkt){
    
}

function onAchievementUpdate(pkt){
    
}

function onRequestAchievementRewardACK(pkt){
    
}

export default function MainEngine()
{
    Network.hookPacket( PACKET.ZC.ALL_ACH_LIST,           onAllAchievementList );
    Network.hookPacket( PACKET.ZC.ACH_UPDATE,             onAchievementUpdate );
    Network.hookPacket( PACKET.ZC.REQ_ACH_REWARD_ACK,     onRequestAchievementRewardACK );
}