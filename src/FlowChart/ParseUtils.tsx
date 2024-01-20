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
    // forLoop type attr
    public loopNumber: int;
    public loopIndexList: int[];
    // buttonSwitch type attr
    public switchIndexList: switchIndexListType;
    constructor(i: int, jsonNode: jsonNodeType) {
        this.index = i;
        this.type = jsonNode.type;
        this.nextIndex = jsonNode.nextIndex;
        this.pausable = jsonNode.pausable;
        this.skippable = jsonNode.skippable;
        this.loopNumber = jsonNode.loopNumber;
        this.loopIndexList = jsonNode.loopIndexList;
        this.switchIndexList = jsonNode.switchIndexList;
    }


}