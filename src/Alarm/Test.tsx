import { AlarmView } from './AlarmView';
import { AlarmButton } from './AlarmButton';

let duration = 30;

let b1 = new AlarmButton(0);
let b2 = new AlarmButton(1);
b1.name = "Test Button 1";
b2.name = "Test Button 2";

let ds = [b1, b2];
const App = () => {
    return (
        <AlarmView duration={duration} buttonList={ds} skippable={true} pausable={true} />
    );
};

export default App;