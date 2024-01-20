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