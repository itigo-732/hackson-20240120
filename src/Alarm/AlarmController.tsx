import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
    View,
    TouchableNativeFeedback,
    Text,
    StyleSheet,
    Button,
    Animated,
    Alert,
} from 'react-native';

import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { AlarmButton } from './AlarmButton';
import { Spacer } from './Spacer';
import { Styles } from './Styles';

type AlarmProp = PropsWithChildren<{
    duration: int,
    skippable: bool,
    pausable: bool,
    buttonList: AlarmButton[],
}>;

export const AlarmController = ({
        onComplete,
        onStart,
        children,
        navigation,
        buttonList = [],
    }: AlarmProp) => {

    const [controlState, setControlState] = useState({
        pausable: false,
        skippable: false,
    });

    const [playerState, setPlayerState] = useState({
        playing: true,
        duration: 0,
    });

    const [nodeState, setNodeState] = useState({});

    const timeUpAlert = () => {
        Alert.alert('time up');
    }

    const onExit = () => {
        navigation.navigate("TimerList");
    }

    const onButtonPress = (index: int) => {
        Alert.alert(String(index))
    }

    const togglePlayState = () => {
        let ps = playerState;
        ps.playing = !ps.playing;
        setPlayerState(ps);
        Alert.alert('stop' + String(playState));
    }

    return (
        <View style={Styles.container} >
        <Spacer size={50} />
        <View style={Styles.counter}>
            <CountdownCircleTimer
                isPlaying={playerState.playing}
                duration={playerState.duration}
                colors={["#004777", "#F7B801", "#A30000"]}
                onComplete={() => {
                    timeUpAlert()
                    if(onComplete) onComplete()
                    return [false, 10] // タイマーのループをするかどうか
                }}
                style={Styles.circleTimer}
                size={300}
            >
                {(info) => {    // 「※1 childrenについて」にて補足
                    const { remainingTime, animatedColor } = info // animatedColorはTimePropsに存在しないが取得可能
                    //this.beforeAlert(remainingTime)
                    return (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={Styles.countDownText}>残り時間</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Animated.Text style={{ color: animatedColor, ...Styles.countDownNumber }}>
                                    {Math.floor((remainingTime % 3600) / 60)}
                                </Animated.Text>
                                <Text style={Styles.countDownText}>分</Text>
                                <Animated.Text style={{ color: animatedColor, ...Styles.countDownNumber }}>
                                    {remainingTime % 60}
                                </Animated.Text>
                                <Text style={Styles.countDownText}>秒</Text>
                            </View>
                        </View>
                    )
                } }
            </CountdownCircleTimer>
        </View>
        <View style={Styles.buttonArea}>
            <Spacer size={40} />
            {buttonList.map((button) => (
                <View>
                    <Button
                        key={button.index}
                        style={Styles.button}
                        title={button.name}
                        onPress={onButtonPress(button.index)}
                    />
                    <Spacer size={15} />
                </View>
            ))}

                <View>
                    <Button
                        key="103"
                        style={Styles.button}
                        title="タイマーをスキップ"
                        color="darkgreen"
                        onClick
                        disabled={!controlState.skippable}
                    />
                    <Spacer size={15} />
                </View>


                <View>
                    <Button
                        key="102"
                        style={Styles.button}
                        title={playerState.playing ? "タイマーを一時停止" : "タイマーを再開"}
                        color="darkgreen"
                        onPress={togglePlayState}
                        disabled={!controlState.pausable}
                    />
                    <Spacer size={15} />
                </View>

            <View>
                <Button
                    key="101"
                    style={Styles.button}
                    title="終了する"
                    color="red"
                    onPress={() => onExit()}
                />
                <Spacer size={30} />
            </View>
        </View>
        </View>
    );
};

export default AlarmController;