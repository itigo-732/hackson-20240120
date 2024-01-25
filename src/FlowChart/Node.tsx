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
    x: int,
    y: int,
}) => {
    return {
        "type": "standardTimer",
        duration,
        autoStep,
        pausable,
        skippable,
        nextIndex,
        x,
        y,
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
        x,
        y,
    };
}

export const ButtonSwitchNode = ({
    nextIndex = -1,
    switchIndexList = [],
    autoStep = true,
    x = 0,
    y = 0,
}) => {
    return {
        "type": "buttonSwitchNode",
        switchIndexList,
        autoStep,
        nextIndex,
        x,
        y,
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
        x,
        y,
    };
}

// do not use
export const InitializeNode = ({
    nextIndex,
}) => {
    return {
        "type": "initializeNode",
        nextIndex,
    }
}

export const StartNode = ({
    nextIndex,
    x = 0,
    y = 0,
}) => {
    return {
        "type": "startNode",
        nextIndex,
        x,
        y,
    }
}

export const EndNode = ({
    x = 0,
    y = 0,
}) => {
    return {
        "type": "endNode",
        x,
        y,
    };
}

export const AlertNode = ({
    text = '',
    x = 0,
    y = 0,
    nextIndex = -1,
}) => {
    return {
        "type": "alertNode",
        text,
        nextIndex,
        x,
        y,
    }
}


// internal component

export const UserButtonNode = ({
    name,
    color,
    nextIndex = -1,
    x,
    y,
}) => {
    return {"type": "userButtonNode", name, color, nextIndex, x, y};
}


// utilities

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

dj = [
{"type": "standardTimer", "duration": 30, "autoStep": true, "pausable": true, "skippable": true, "nextIndex": 1 },
{"type": "forLoop", "loopNumber": 5, "loopStartIndex": 2, "nextIndex": 5 },
{"type": "ButtonSwitchNode", "autoStep": false, "switchIndexList": [{"name":"赤", "color":"red", "toIndex":3},{"name":"青", "color":"blue", "toIndex": 4}]},
{"type": "dummyNode", "nextIndex": 4},
{"type": "dummyNode", "nextIndex": 1},
{"type": "endNode" }
]
// ↓ 等価
const dj2 = Indexer([
    StandardTimer({duration: 5}),
    ForLoop({nextIndex: 5, loopNumber: 5, loopStartIndex: 2}),
    ButtonSwitchNode({
        autoStep: false,
        switchIndexList: Indexer([
            UserButtonNode({toIndex: 3, name: "赤", color: "red"}),
            UserButtonNode({toIndex: 4, name: "青", color: "blue"}),
        ])
    }),
    DummyNode({}),
    DummyNode({nextIndex: 1}),
    EndNode({}),
]);
// ↓ 改善
export const dj3 = Indexer([
    StandardTimer({duration: 5}), // 0
    ForLoop({nextIndex: 11, loopNumber: 2, loopStartIndex: 2}), // 1
    ButtonSwitchNode({ // 2
        autoStep: false,
        switchIndexList: [3,4],
    }),
    UserButtonNode({nextIndex: 5, name: "10秒追加", color: "red"}), // 3
    UserButtonNode({nextIndex: 8, name: "2秒追加", color: "blue"}), // 4
    DummyNode({}), // 5
    StandardTimer({duration: 10}), // 6
    DummyNode({nextIndex: 1}), // 7
    DummyNode({}), // 8
    StandardTimer({duration: 2}), // 9
    DummyNode({nextIndex: 1}), // 10
    EndNode({}), // 11
]);