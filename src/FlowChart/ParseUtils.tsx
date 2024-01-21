import {AlarmButton} from '../Alarm/AlarmButton';

type jsonNodeType = {
  [key: string]: string | number | boolean;
};

type jsonObjectType = {
  nodes: jsonNodeType[];
};

type switchIndexListType = {
  name: string;
  color: string;
  toIndex: number;
};

// パースメソッド
export const parseJson = (json: jsonObject): FlowChartNode[] => {
  let nodeList = json.nodes;
  let objList: FlowChartNode[] = [];
  for (let i = 0; i < nodeList.length; i++) {
    objList.push(new FlowChartNode(i, nodeList[i]));
  }
  for (let i = 0; i < objList.length; i++) {
    objList[i].nextNode = objList[objList[i].nextIndex];
  }
  return objList;
};

export class FlowChartNode {
  public index: number;
  public type: string;
  public nextIndex: number;
  public nextNode: FlowChartNode;

  // standardTimer type attr
  public pausable: boolean;
  public skippable: boolean;
  public awaitUntilStop: boolean;

  // forLoop type attr
  public loopNumber: number;
  public loopIndexList: number[];

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
    this.switchIndexList = [];
    if ('switchIndexList' in jsonNode) {
      let list = jsonNode.switchIndexList;
      for (let i = 0; list.length; i++) {
        let ab = new AlarmButton(i);
        ab.name = list[i].name;
        ab.color = list[i].color;
        this.switchIndexList.push(ab);
      }
    }
  }
}
