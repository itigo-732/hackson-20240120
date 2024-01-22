export const StandardTimer = ({
    duration = 30,
    autoStep = false,
    pausable = true,
    skippable = true,
    nextIndex = -1,
    x = 0,
    y = 0,
} : {
    duration?: int,
    autoStep?: bool,
    pausable?: bool,
    skippable?: bool,
    nextIndex?: int,
}) => {
    return {
        "type": "standardTimer",
        duration,
        autoStep,
        pausable,
        skippable,
        nextIndex,
    };
}

export const ForLoop = ({
    nextIndex = -1,
    loopNumber = 300,
    loopStartIndex,
    x = 0,
    y = 0,
}) => {
    return {
        "type": "forLoop",
        loopNumber,
        loopStartIndex,
        nextIndex,
    };
}

export const ButtonSwitch = ({
    nextIndex = -1,
    switchIndexList,
    autoStep = true,
    x = 0,
    y = 0,
}) => {
    return {
        "type": "buttonSwitch",
        switchIndexList,
        autoStep,
        nextIndex,
    };
}

export const DummyNode = ({
    nextIndex = -1,
    x = 0,
    y = 0,
}) => {
    return {
        "type": "dummyNode",
        nextIndex,
    };
}

export const EndNode = ({
    x = 0,
    y = 0,
}) => {
    return {"type": "endNode"};
}

export const SButton = ({
    name,
    color,
    toIndex,
}) => {
    return {name, color, toIndex};
}

export const Indexer = (array, setNextIndexAuto = true) => {
    let res = [];
    for(let i=0; i<array.length; i++) {
        let data = array[i];
        data.key = i;
        data.index = i;
//         console.log("[Node.Indexer] " + JSON.stringify(data));
        if(setNextIndexAuto && data.nextIndex == -1)
            data.nextIndex = i + 1;

        res.push(data);

    }
    return res;
}

const dj = [
{"type": "standardTimer", "duration": 30, "autoStep": true, "pausable": true, "skippable": true, "nextIndex": 1 },
{"type": "forLoop", "loopNumber": 5, "loopStartIndex": 2, "nextIndex": 5 },
{"type": "buttonSwitch", "autoStep": false, "switchIndexList": [{"name":"赤", "color":"red", "toIndex":3},{"name":"青", "color":"blue", "toIndex": 4}]},
{"type": "dummyNode", "nextIndex": 4},
{"type": "dummyNode", "nextIndex": 1},
{"type": "endNode" }
]
// ↓ 等価
export const dj2 = Indexer([
    StandardTimer({duration: 30}),
    ForLoop({nextIndex: 5, loopNumber: 5, loopStartIndex: 2}),
    ButtonSwitch({
        autoStep: false,
        switchIndexList: [
            SButton({toIndex: 3, name: "赤", color: "red"}),
            SButton({toIndex: 4, name: "青", color: "blue"}),
        ]
    }),
    DummyNode({}),
    DummyNode({nextIndex: 1}),
    EndNode({}),
]);