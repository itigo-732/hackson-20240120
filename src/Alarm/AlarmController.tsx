import React, { useState, useEffect } from 'react';
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
import { loadTimerLogic, saveTimerLogic } from '../Storage/AlarmManager';

import { AlarmButton } from './AlarmButton';
import { Spacer } from './Spacer';
import { Styles } from './Styles';

import { dummyJson } from '../FlowChart/Test';

type AlarmProp = PropsWithChildren<{
    duration: int,
    skippable: bool,
    pausable: bool,
    buttonList: AlarmButton[],
}>;

export const AlarmController = ({
        children,
        navigation,
        route,
        buttonList = [],
    }: AlarmProp) => {

    const [controlState, setControlState] = useState({
        pausable: true,
        skippable: true,
    });

    const [playerState, setPlayerState] = useState({
        playing: true,
        duration: 30,
    });

    const [nodeList, setNodeList] = useState([]);

    const [nodeState, setNodeState] = useState();

    const timeUpAlert = () => {
        Alert.alert('time up');
    }

    const onExit = () => {
        navigation.navigate("TimerList");
    }

    const onNodeButtonPress = (index: int) => {
        Alert.alert(String(index))
    }

    const testMethod = () => {
//         Alert.alert("test: " + JSON.stringify(nodeList));
        console.log(JSON.stringify(nodeList));
    }

    const togglePlayState = () => {
        let ps = {
            duration: playerState.duration,
            playing: !playerState.playing,
        };
        setPlayerState(ps);
    }

    const initialize = async () => {
        console.log(JSON.stringify(dummyJson.nodes));
        await saveTimerLogic(route.params.timerName, dummyJson.nodes);

        let data = await loadTimerLogic(route.params.timerName);
        console.log(data);
        setNodeList(data);
        if(nodeList.length > 0)
            setNodeState(nodeList[1]);
    }

    const forward = () => {
        if(!nodeState)
            return;
        console.log(nodeState.index);
        if(nodeState.type == "endNode")
            return;
        setNodeState(nodeState.nextNode);
    }

    // 初期化時
    useEffect(() => {
        //initialize();
    }, []);

    useEffect(() => {
        forward();
    }, [nodeState]);

    return (
        <View style={Styles.container} >
        <Spacer size={50} />
        <View style={Styles.counter}>
            <Text style={Styles.timerName}>
                {route.params.timerName}
            </Text>
            <Spacer size={14} />
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
                        onPress={onNodeButtonPress(button.index)}
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
                        onPress={testMethod}
//                         disabled={!controlState.skippable}
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