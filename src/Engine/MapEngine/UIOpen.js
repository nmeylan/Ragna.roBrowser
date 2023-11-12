/**
 * Engine/MapEngine/UIOpen.js
 *
 * Manage some UI open when requested by server
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
/**
 * Engine/MapEngine/UIOpen.js
 *
 * Manage some UI open when requested by server
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
'use strict';

import Configs from 'Core/Configs';
import Network from 'Network/NetworkManager';
import PACKET from 'Network/PacketStructure';
import PACKETVER from 'Network/PacketVerManager';

/**
 * Load dependencies
 */
import PACKET from 'Network/PacketStructure';


/**
 * Received data and request to open a specific UI
 *
 * @param {object} pkt - PACKET.ZC.UI_OPEN
 */
function onUIOpen(pkt) {
    // Opens an UI window of the given type and initializes it with the given data
    // 0AE2 <type>.B <data>.L
    // type:
    //    0x0 = BANK_UI
    //    0x1 = STYLIST_UI
    //    0x2 = CAPTCHA_UI
    //    0x3 = MACRO_UI
    //    0x4 = UI_UNUSED
    //    0x5 = TIPBOX_UI
    //    0x6 = RENEWQUEST_UI
    //    0x7 = ATTENDANCE_UI

    switch (pkt.ui_type) {
        case 7:
            if (Configs.get('enableCheckAttendance') && PACKETVER.value >= 20180307) {
                var CheckAttendance = require('UI/Components/CheckAttendance/CheckAttendance');
                CheckAttendance.prepare();
                CheckAttendance.setData(pkt.data);
                CheckAttendance.cleanUI();
                CheckAttendance.append();
                CheckAttendance.ui.show();
                CheckAttendance.ui.focus();
            }
            break;
        default:
            console.log(`[PACKET.ZC.UI_OPEN] not implemented (${pkt.ui_type})`);
    }
}

export default function MainEngine() {
    Network.hookPacket(PACKET.ZC.UI_OPEN, onUIOpen);
}