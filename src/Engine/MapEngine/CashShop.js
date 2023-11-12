/**
 * Engine/MapEngine/CashShop.js
 *
 * Manage Trade packets and UI
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * Engine/MapEngine/CashShop.js
 *
 * Manage Trade packets and UI
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';


/**
 * Load dependencies
 */
import Network from 'Network/NetworkManager';

import PACKET from 'Network/PacketStructure';
import CashShop from 'UI/Components/CashShop/CashShop';

function onOpenCashShop(pkt){
    CashShop.readPoints(pkt.cashPoints, pkt.kafraPoints, pkt.tab);
}

function onOpenReqCashShopItemList(pkt){
    CashShop.readCashShopItems(pkt);
}

function onSuccessCashShopBuyList(pkt){
    CashShop.setSuccessCashShopUpdate(pkt);
}

export default function MainEngine()
{
    Network.hookPacket( PACKET.ZC.SE_CASHSHOP_OPEN2,           onOpenCashShop );
    Network.hookPacket( PACKET.ZC.ACK_SCHEDULER_CASHITEM,      onOpenReqCashShopItemList );
    Network.hookPacket( PACKET.ZC.SE_PC_BUY_CASHITEM_RESULT,      onSuccessCashShopBuyList );
}