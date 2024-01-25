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
import {
    StandardTimer,
    ForLoop,
    ButtonSwitchNode,
    DummyNode,
    EndNode,
    UserButtonNode,
    InitializeNode,
    dj3,
} from '../FlowChart/Node';
import { parseLines } from '../FlowChart/ParseUtils';

type AlarmProp = PropsWithChildren<{
}>;

export const AlarmController = ({
    children,
    navigation,
    route,
}: AlarmProp) => {

    // state object
    const [controlState, setControlState] = useState({
        pausable: true,
        skippable: true,
    });

    const [playerState, setPlayerState] = useState({
        playing: false,
        duration: 0,
    });

//    let onTimerComplete = () => {};
//    const [initialized, setInitialized] = useState(false);
    // 初期化完了までロック
    const [nodeMutex, setNodeMutex] = useState(false);
    const sleep = msec => new Promise(r => setTimeout(r, msec));
//    const awaitUntilInit = () => new Promise(async (resolve) => {
//        while(!initialized) {
//            console.log('init now...' + String(initialized));
//            await sleep(100);
//        }
//        resolve();
//    });


    const [nodeList, setNodeList] = useState([]);
//    let nodeListReplica = [];
//    const setNodeList = list => {
//        nodeListReplica = list
//        setNodeListInternal(list);
//    };
    const [nodeState, setNodeState] = useState(InitializeNode({nextIndex: 0}));

    const [clockKey, setClockKey] = useState(0);
    const [buttonList, setButtonList] = useState([]);

    // trigger function
    // タイマー終了時のアラート
    const timeUpAlert = () => {
//         Alert.alert('time up');
    }

    const onEndTimer = () => {
        console.log('[App] Timer end')
        // タイマー終了処理
        // duration=0で常にタイマーを起動可能な状態にしておく
        timeUpAlert();
        setClockKey(clockKey + 1);
        setTimer(0, false);

        // forward()を呼び出し
        setNodeState(nodeList[nodeState.nextIndex]);
        setNodeMutex(false);
        // コールバック呼び出し
//        onTimerComplete();
        return [true, 0]; // タイマーのループをするかどうか
    }

    // 終了ボタンが押されたとき
    const onExit = () => {
        navigation.navigate("TimerList");
    }

    // ユーザ定義のボタンが押されたとき
    const onNodeButtonPress = (nextNode: int) => {
//        Alert.alert(String(index))
//        console.log(nodeState);
//        let nextNodeIndex = nodeState.switchIndexList[index].nextIndex;
        setButtonList([]);
        setNodeState(nextNode);
        setNodeMutex(false);
    }

    // テスト用
    const testMethod = () => {
//         Alert.alert("test: " + JSON.stringify(nodeList));
//        console.log('[App] test parser: ' + JSON.stringify(parseLines("timer duration=12 autoStep\ntimer duration=30 nextIndex=12")));
//        console.log(JSON.stringify(nodeList));
        setNodeMutex(false);
        setNodeState(nodeList[0]);
    }


    // タイマーセット
    const setTimer = (duration: int, playing: bool = true) => {
        setPlayerState({duration, playing});
    }

    // 画面初期化時
    const initialize = async () => {
        await saveTimerLogic(route.params.timerName, dj3);
        let data = await loadTimerLogic(route.params.timerName);
        setNodeList(data);
        if(nodeList.length > 0)
            setNodeState(nodeList[0]);
//        console.log(JSON.stringify(data));
        // 初期化時なぜかnodeListが空配列になる
        // nodeListがuseEffectのdependenciesに入っていなかったから更新されなかった
        console.log('[App] nodeList loaded: ' + JSON.stringify(nodeList));
//        console.log('[App] nodeListR loaded: ' + JSON.stringify(nodeListReplica));
        setNodeMutex(false);
    }

    // forward step
    const forward = async () => {
//        await awaitUntilInit();
//        console.log('[App] init end');
        // Mutex設定時
        if(nodeMutex)
            return;

        // 初回起動時
        if(nodeState.type == "initializeNode") {
//            setNodeState(nodeListReplica[nodeState.nextIndex]);
            await initialize();
            return;
        }

        console.log('[App] node forward: ' + JSON.stringify(nodeState));
        // nodeState未設定時
        if(!nodeState)
            return;

        // endNode
        if(nodeState.type == "endNode") {
            setNodeMutex(true);
            return;
        }

        // standardTimer
        if(nodeState.type == "standardTimer") {
            // タイマーをセットして開始
            setTimer(nodeState.duration, true);
            setNodeMutex(true);
            return;
        }

        // forLoop
        if(nodeState.type == "forLoop") {
            let count = nodeList[nodeState.index].count;
            if(!count)
                count = 0;
            if(count < nodeState.loopNumber) {
                console.log('[App] loop count: ' + (count + 1))
                nodeList[nodeState.index].count = count + 1;
                setNodeState(nodeList[nodeState.loopStartIndex]);
                return;
            }
            console.log('[App] loop finished');
        }

        // ButtonSwitchNode
        if(nodeState.type == "ButtonSwitchNode") {
            let bList = [];
            console.log(nodeState);
            for(let i=0; i<nodeState.switchIndexList.length; i++) {
                bList.push(nodeList[nodeState.switchIndexList[i]]);
            }
            console.log(bList);
            setButtonList(bList);
            setNodeMutex(true);
            return;
        }

        // forward node
        setNodeState(nodeList[nodeState.nextIndex]);
    }

    // 初期化時
//    useEffect(() => {
////        console.log('[App] nodeList initialized');
////        initialize();
//    }, []);

    // 初期化、nodeState変更時
    useEffect(() => {
        forward();
    }, [nodeState, nodeList]);

    return (
        <View style={Styles.safeAreaContainer} >
        <Spacer size={50} />
        <View style={Styles.counter}>
            <Text style={Styles.timerName}>
                {route.params.timerName}
            </Text>
            <Spacer size={14} />
            <CountdownCircleTimer
                key={clockKey}
                isPlaying={playerState.playing}
                duration={playerState.duration}
                colors={["#004777", "#F7B801", "#A30000"]}
                onComplete={() => onEndTimer()}
                style={Styles.circleTimer}
                size={300}
            >
                {(info) => {    // 「※1 childrenについて」にて補足
                    const { remainingTime, animatedColor } = info // animatedColorはTimePropsに存在しないが取得可能
                    //this.beforeAlert(remainingTime)
                    return (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{...Styles.countDownText, ...Styles.baseTextColor}}>残り時間</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Animated.Text style={{ color: animatedColor, ...Styles.countDownNumber, ...Styles.baseTextColor }}>
                                    {Math.floor((remainingTime % 3600) / 60)}
                                </Animated.Text>
                                <Text style={{...Styles.countDownText, ...Styles.baseTextColor}}>分</Text>
                                <Animated.Text style={{ color: animatedColor, ...Styles.countDownNumber, ...Styles.baseTextColor }}>
                                    {remainingTime % 60}
                                </Animated.Text>
                                <Text style={{...Styles.countDownText, ...Styles.baseTextColor}}>秒</Text>
                            </View>
                        </View>
                    )
                } }
            </CountdownCircleTimer>
        </View>
        <View style={Styles.buttonArea}>
            <Spacer size={40} />
            {buttonList.map(button => (
                <View key={button.index} >
                    <Button
                        key={button.index}
                        style={Styles.button}
                        title={button.name}
                        onPress={() => onNodeButtonPress(button)}
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
                        onPress={() => setTimer(setPlayerState(playerState.duration, !playerState.playing))}
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