import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
    View,
    TouchableNativeFeedback,
    Text,
    StyleSheet,
    Button,
    Animated,
    Alert,
    TextInput,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { Image } from 'react-native-elements';
import { loadTimerLogic, saveTimerLogic } from '../Storage/AlarmManager';
import { parseLines, convertNodes } from '../FlowChart/ParseUtils';
import { Indexer } from '../FlowChart/Node';

import { Spacer } from './Spacer';
import { styles } from '../Style';
import { Styles } from './Styles';
import ThemeColor from '../Theme';

type AlarmProp = PropsWithChildren<{
}>;

export const AlarmTextEditor = ({
    children,
    navigation,
    route,
}: AlarmProp) => {
    const [codeText, setCodeText] = useState();
    const [codeChanged, setCodeChanged] = useState(false);

    const onChangeText = (text) => {
        setCodeText(text);
        setCodeChanged(true);
    }

    const onBackButtonPress = () => {
//        console.log(codeChanged);
        if(codeChanged)
            Alert.alert(
                '警告',
                '変更が保存されていません\n保存しますか？',
                [
                    {text: 'キャンセル', onPress: () => {}},
                    {text: '保存', onPress: async () => {
                        await saveTimerLogic(route.params.timerName, Indexer(parseLines(codeText)));
                        navigation.navigate("TimerList");
                    }},
                    {text: '破棄', onPress: () => navigation.navigate("TimerList")},
                ]
            );
        else
            navigation.navigate("TimerList");
    }

    const onSaveButtonPress = async () => {
        console.log(parseLines(codeText));
        await saveTimerLogic(route.params.timerName, Indexer(parseLines(codeText)));
        setCodeChanged(false);
        Alert.alert('保存しました');
    }

    const initialize = async () => {
        const data = await loadTimerLogic(route.params.timerName);
        setCodeText(convertNodes(data));
    }

    useEffect(() => {
        initialize();
    }, [])
    return (
        <SafeAreaView>
            <HeaderRNE
                //style={}がなぜか適用されないので直接色指定
                backgroundColor='#91CCF2'
                leftComponent={
                    <TouchableOpacity
                        onPress={() => onBackButtonPress()}
                    >
                        <Text style={styles.headerButtonText}>
                            ＜ 戻る
                        </Text>
                    </TouchableOpacity>
                }

                rightComponent={
                    <TouchableOpacity
                        /*-------------------------------------------------------------------------------------------------------
                        タイマー新規作成の処理を書く
                        -------------------------------------------------------------------------------------------------------*/
                        onPress={() => onSaveButtonPress()}>

                        <Text style={styles.rightHeaderButtonText}>
                            保存
                        </Text>
                    </TouchableOpacity>
                }
            />
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <TextInput
                    style={styles.textInputEditor}
                    multiline={true}
                    scrollEnabled={true}
                    textAlignVertical='top'
                    onChangeText={text => onChangeText(text)}
                    placeholder="コードを入力…"
                    value={codeText}
                />
                <Spacer size={100} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default AlarmTextEditor;