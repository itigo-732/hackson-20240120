import storage from './Storage';

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