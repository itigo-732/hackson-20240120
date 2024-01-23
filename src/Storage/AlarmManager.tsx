import storage from './Storage';
const dummyJson = {"nodes": [
{"type": "standardTimer", "time": 300, "awaitUntilStop": true,"pausable": true, "skippable": true, "nextIndex": 1 },
{"type": "forLoop", "loopNumber": 5, "loopIndexList": [3, 4], "nextIndex": 5 },
{"type": "ButtonSwitchNode", "switchIndexList": [{"name":"赤", "color":"red", "toIndex":3},{"name":"青", "color":"blue", "toIndex": 4}]},
{"type": "dummyNode", "nextIndex": 4},
{"type": "dummyNode", "nextIndex": 5},
{"type": "endNode" }
]};

export const addTimer = async (name: string) => {
    try {
        await storage.load({
            key: 'TimerNameList'
        }).then(async raw => {
            let json = raw ? JSON.parse(raw) : {data: []};
            if(!(name in json.data))
                json.data.push(name);
            await storage.save({
                key: 'TimerNameList',
                data: JSON.stringify(json),
            });
        });
    } catch {
        await deleteTimerList();
        await addTimer(name);
    }
};

// do not use
export const getTimerList = async () => {
    try {
        await storage.load({
            key: 'TimerNameList'
        }).then(async raw => {
            let json = raw ? JSON.parse(raw) : {data: []};
            return json.data;
        });
    } catch {
        return [];
    }
};

export const deleteTimerList = async () => {
   let json = {data: []};
   await storage.save({
       key: 'TimerNameList',
       data: JSON.stringify(json),
   });
}

export const deleteTimer = async (name: string) => {
   await storage.load({
       key: 'TimerNameList'
   }).then(async raw => {
       let json = raw ? JSON.parse(raw) : {data: []};
       if(!(name in json.data))
           json.data = json.data.filter(d => d != name);
       await storage.save({
           key: 'TimerNameList',
           data: JSON.stringify(json),
       });
   });
};

export const loadTimerLogic = async (name: string) => {
    try {
        return await storage.load({
            key: 'TimerLogic-' + name
        }).then(async raw => {
            let json = JSON.parse(raw);
            return json;
        });
    } catch {
        return [];
    }
};

export const saveTimerLogic = async (name: string, json: JSON) => {
   await storage.save({
       key: 'TimerLogic-' + name,
       data: JSON.stringify(json),
   });
};