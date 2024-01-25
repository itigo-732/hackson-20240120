import {
    StandardTimer,
    ForLoop,
    ButtonSwitchNode,
    DummyNode,
    EndNode,
    UserButtonNode,
} from './Node';

export const parseLines = (text: string) => {
    return text.split(/[;]\s*/)
        .map(line => parseLine(line))
        .filter(Boolean);
}

const parseLine = (line: string) => {
    const tokens = line.split(/[\s\n]/);
    const op = tokens.shift();
    const args = Object.fromEntries(
        tokens
            .filter(a => a != '')
            .map(a => a.split('='))
            .map(d => d.length == 1 ? [d[0], "true"] : d)
    );
    console.debug('[parseLine] op: ' + op + ' => ' + JSON.stringify(args));

    // 空白行
    if(op === undefined)
        return false;

    // コメント
    if(line.startsWith('#') || line.startsWith('//'))
        return false;

    // timer => standardTimer
    if(op == 'timer')
        return StandardTimer(args);

    // for => forLoop
    if(op == 'for')
        return ForLoop(args);

    // switch => buttonSwitchNode
    if(op == 'switch')
        return ButtonSwitchNode(args);

    // button => userButtonNode
    if(op == 'button')
        return UserButtonNode(args);

    // nop => dummyNode
    if(op == 'nop')
        return DummyNode(args);

    // end => endNode
    if(op == 'end')
        return EndNode(args);

    return false;
};

export const convertNodes = (nodes, formatMode = true) => {
    return nodes
        .map(node => convertNode(node, formatMode))
//        .map(line => formatMode ? [line, ''] : line)
//        .flat()
        .join(formatMode ? '\n\n': '\n');
}

const convertNode = (node, formatMode) => {
    const args = Object.entries(node)
    const argsText = (formatMode ? '\n' : '') + args
        .filter(arg => !(formatMode && ['x', 'y', 'key', 'index'].includes(arg[0])))
        .filter(arg => !(formatMode && [0, false].includes(arg[1])))
        .filter(arg => arg[0] !== 'type')
        .map(arg => arg[1] === true ? arg[0] : arg[0] + "=" + arg[1])
        .filter(Boolean)
        .map(argText => formatMode ? '    ' + argText : argText)
        .join(formatMode ? '\n' : ' ');

    if(node.type == "standardTimer")
        return 'timer ' + argsText + ';';

    if(node.type == "forLoop")
        return 'for ' + argsText + ';';

    if(node.type == "dummyNode")
        return 'nop ' + argsText + ';';

    if(node.type == "userButtonNode")
        return 'button ' + argsText + ';';

    if(node.type == "dummyNode")
        return 'nop ' + argsText + ';';

    if(node.type == "buttonSwitchNode")
        return 'switch ' + argsText + ';';

    if(node.type == "endNode")
            return 'end ' + argsText + ';';

    return '### parse error ###;';
}
//const dt = "timer duration=300, autoStep="
//
//import { AlarmButton } from '../Alarm/AlarmButton';
//
//type jsonNodeType = {
//    [key:string]: string | int | bool,
//}
//
//type jsonObjectType = {
//    nodes: jsonNodeType[],
//}
//
//type switchIndexListType = {
//    name: string,
//    color: string,
//    toIndex: int,
//}
//
//// パースメソッド
//export const parseJson = (json: jsonObject): FlowChartNode[] => {
//    let nodeList = json.nodes;
//    let objList: FlowChartNode[] = [];
//    for(let i = 0; i < nodeList.length; i++) {
//        objList.push(new FlowChartNode(i, nodeList[i]));
//    }
//    for(let i = 0; i < objList.length; i++) {
//        objList[i].nextNode = objList[objList[i].nextIndex];
//    }
//    return objList;
//}
//
//export class FlowChartNode{
//    public index: int;
//    public type: string;
//    public nextIndex: int;
//    public nextNode: FlowChartNode;
//
//    // standardTimer type attr
//    public pausable: bool;
//    public skippable: bool;
//    public awaitUntilStop: bool;
//
//    // forLoop type attr
//    public loopNumber: int;
//    public loopIndexList: int[];
//
//    // ButtonSwitchNode type attr
//    public switchIndexList: switchIndexListType;
//
//    constructor(i: int, jsonNode: jsonNodeType) {
//        this.index = i;
//        this.type = jsonNode.type;
//        this.nextIndex = jsonNode.nextIndex;
//        this.pausable = jsonNode.pausable;
//        this.skippable = jsonNode.skippable;
//        this.loopNumber = jsonNode.loopNumber;
//        this.loopIndexList = jsonNode.loopIndexList;
//        this.switchIndexList = [];
//        if('switchIndexList' in jsonNode){
//            let list = jsonNode.switchIndexList;
//            for(let i=0; i<list.length; i++){
//                let ab = new AlarmButton(i);
//                ab.name = list[i].name;
//                ab.color = list[i].color;
//                this.switchIndexList.push(ab);
//            }
//        }
//    }
//
//
//}