import storage from './Storage';
import { Alert } from 'react-native';

export const getAlarmNameList = () => {
    return storage.load({
        key: "alarmList",
    }).then(data => {
        // 読み込み成功時処理
//         Alert.alert(data);
        return data;
//         let nameList = JSON.parse(data);
//         return nameList;
    }).catch(err => {
        // 読み込み失敗時処理
        return [];
    });
}

export const addAlarm = (name: string) => {
    let alarmNameList = getAlarmNameList();
    //Alert.alert(alarmNameList);
    if(!alarmNameList) alarmNameList = '[]';
    alarmNameList = JSON.parse(alarmNameList);
//     if(!alarmNameList) alarmNameList = [];
    alarmNameList.push(name);
    storage.save({
        key: "alarmList",
        data: JSON.stringify(alarmNameList),
    });
}

export const deleteAlarmByName = (name: string) => {
    let alarmNameList = getAlarmNameList();
    alarmNameList = JSON.parse(alarmNameList);
    let newAlarmList = alarmNameList.filter(n => n != name);
    storage.save({
        key: "alarmList",
        data: JSON.stringify(newAlarmList),
    });
}

export const renameAlarmByName = (name: string, newName: string) => {
    let alarmList = getAlarmList();
    let newAlarmList = alarmList.map(d => {
        if(d.name === name) d.name = newName;
        return d;
    });

    storage.save({
        key: "alarmList",
        data: {"data": newAlarmList},
    });
}

export const getAlarmLogic = (name: string) => {
    storage.load({
        key: name,
    }).then(data => {
        // 読み込み成功時処理
        return data;
    }).catch(err => {
        // 読み込み失敗時処理
        return {};
    });
}

export const setAlarmLogic = (name: string, json: json) => {
    storage.save({
        key: name,
        data: json,
    });
}

export const addTimer = async (name: string) => {
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
};

// do not use
export const getTimerList = async () => {
   await storage.load({
       key: 'TimerNameList'
   }).then(async raw => {
       let json = raw ? JSON.parse(raw) : {data: []};
       return json.data;
   });
};

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
   await storage.load({
       key: 'TimerLogic_' + name
   }).then(async raw => {
       let json = raw ? JSON.parse(raw) : { name };
       return json
   });
};

export const saveTimerLogic = async (name: string, json: JSON) => {
   await storage.save({
       key: 'TimerLogic_' + name,
       data: JSON.stringify(json),
   });
};