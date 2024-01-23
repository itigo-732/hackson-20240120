import {
    StandardTimer,
    ForLoop,
    ButtonSwitchNode,
    DummyNode,
    EndNode,
} from './Node';

export const parseLines = (text: string) => {
    return text.split("\n")
        .map(line => parseLine(line))
        .filter(Boolean);
}

export const parseLine = (line: string) => {
    const tokens = line.split(' ');
    const op = tokens.shift();
    const args = Object.fromEntries(
        tokens
            .map(a => a.split('='))
            .map(d => d.length == 1 ? [d[0], "true"] : d)
    );
    console.log('[parseLine] line: ' + JSON.stringify(args));

    // 空白行
    if(op === undefined)
        return false;

    // コメント
    if(line.startsWith('#') || line.startsWith('//'))
        return false;

    // timer => standardTimer
    if(op == 'timer') {
        return StandardTimer(args);
    }
}

const dt = "timer duration=300, autoStep="

import { AlarmButton } from '../Alarm/AlarmButton';

type jsonNodeType = {
    [key:string]: string | int | bool,
}

type jsonObjectType = {
    nodes: jsonNodeType[],
}

type switchIndexListType = {
    name: string,
    color: string,
    toIndex: int,
}

// パースメソッド
export const parseJson = (json: jsonObject): FlowChartNode[] => {
    let nodeList = json.nodes;
    let objList: FlowChartNode[] = [];
    for(let i = 0; i < nodeList.length; i++) {
        objList.push(new FlowChartNode(i, nodeList[i]));
    }
    for(let i = 0; i < objList.length; i++) {
        objList[i].nextNode = objList[objList[i].nextIndex];
    }
    return objList;
}

export class FlowChartNode{
    public index: int;
    public type: string;
    public nextIndex: int;
    public nextNode: FlowChartNode;

    // standardTimer type attr
    public pausable: bool;
    public skippable: bool;
    public awaitUntilStop: bool;

    // forLoop type attr
    public loopNumber: int;
    public loopIndexList: int[];

    // ButtonSwitchNode type attr
    public switchIndexList: switchIndexListType;

    constructor(i: int, jsonNode: jsonNodeType) {
        this.index = i;
        this.type = jsonNode.type;
        this.nextIndex = jsonNode.nextIndex;
        this.pausable = jsonNode.pausable;
        this.skippable = jsonNode.skippable;
        this.loopNumber = jsonNode.loopNumber;
        this.loopIndexList = jsonNode.loopIndexList;
        this.switchIndexList = [];
        if('switchIndexList' in jsonNode){
            let list = jsonNode.switchIndexList;
            for(let i=0; i<list.length; i++){
                let ab = new AlarmButton(i);
                ab.name = list[i].name;
                ab.color = list[i].color;
                this.switchIndexList.push(ab);
            }
        }
    }


}