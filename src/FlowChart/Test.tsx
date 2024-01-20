let dummyJson = {"nodes": [
{"type": "standardTimer", "time": 300, "awaitUntilStop": true,"pausable": true, "skippable": true, "nextIndex": 1 },
{"type": "forLoop", "loopNumber": 5, "loopIndexList": [3, 4], "nextIndex": 5 },
{"type": "buttonSwitch", "switchIndexList": [{"name":"赤", "color":"red", "toIndex":3},{"color":"青", "color":"blue", "toIndex": 4}]},
{"type": "dummyNode", "nextIndex": 4},
{"type": "dummyNode", "nextIndex": 5},
{"type": "endNode" }
]};

import{
    Alert,
} from 'react-native';

import {
    parseJson,
    FlowChartNode,
} from './ParseUtils';


// parseJson()にjsonを渡してパースします
let res: FlowChartNode[] = parseJson(dummyJson);

// 返り値の扱いなど
const n = 0;
Alert.alert(String(res[n].type) + " -> " + String(res[n].nextNode.type));

const firstButton = res[2].switchIndexList[0];
Alert.alert(String(firstButton.name + "-> color:" + firstButton.color));

// usage
// res[0].type
//       .nextIndex
//       .nextNode