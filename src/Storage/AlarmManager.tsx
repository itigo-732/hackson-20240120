import storage from './Storage';

export const getAlarmList = () => {
    storage.load({
        key: "alarmList",
    }).then(data => {
        // 読み込み成功時処理
        return data.data;
    }).catch(err => {
        // 読み込み失敗時処理
        return [];
    });
}

export const addAlarm = (name: string) => {
    let alarm = {name};
    let alarmListData = {"data": []};

    alarmListData.data = getAlarmList();
    alarmListData.data.push(alarm);
    storage.save({
        key: "alarmList",
        data: alarmListData,
    });
}

export const deleteAlarmByName = (name: string) => {
    let alarmList = getAlarmList();
    let newAlarmList = alarmList.filter(d => d.name !== name);

    storage.save({
        key: "alarmList",
        data: {"data": newAlarmList},
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