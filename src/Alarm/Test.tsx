import {AlarmController} from './AlarmController';
import {AlarmButton} from './AlarmButton';

let duration = 30;

let b1 = new AlarmButton(0);
let b2 = new AlarmButton(1);
let b3 = new AlarmButton(2);
b1.name = 'Test Button 1';
b2.name = 'Test Button 2';
b3.name = 'Test Button 3';

let ds = [b1, b2, b3];
const App = () => {
  return (
    <AlarmController
      duration={duration}
      buttonList={ds}
      skippable={true}
      pausable={true}
    />
  );
};

export default App;
