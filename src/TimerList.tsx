import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
    Alert,
    ScrollView,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { Image } from 'react-native-elements';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import storage from './Storage/Storage';
import { addTimer, deleteTimerList } from './Storage/AlarmManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

// deleteTimerList();

const TimerList = props => {
    const [TimerNameList, setTimerNameList] = useState(false);
    const [dialogState, setDialogState] = useState(false);

    const onAddTimer = async () => {
        setDialogState(true);
    };

    const onEditTimer = (item) => {
        props.navigation.navigate('EditScreen', {message: item});
    }

    const onExecTimer = (item) => {
        props.navigation.navigate('AlarmScreen', {message: item});
    }

    const sendAddInput = async (text: string) => {
        if(TimerNameList.includes(text)) {
            Alert.alert(text + "は既に使われています。\n別の名前にしてください。");
            return;
        }
        setDialogState(false);
        await addTimer(text);
        await updateState();
    }

    const closeDialog = () => {
        setDialogState(false);
//         Alert.alert("close");
    }

    const updateState = async () => {
        await storage.load({
            key: 'TimerNameList'
        }).then(raw => {
            if(raw) {
                let list = JSON.parse(raw);
                console.log(raw);
                setTimerNameList(list.data);
            } else {
                setTimerNameList([]);
            }
        }).catch(e => {
            setTimerNameList([]);
        });
    };
    useEffect(() => {
        if(!TimerNameList)
            updateState();
    }, [TimerNameList, dialogState]);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderRNE
                //style={}がなぜか適用されないので直接色指定
                backgroundColor='#91CCF2'

                rightComponent={
                    <TouchableOpacity
                        /*-------------------------------------------------------------------------------------------------------
                        タイマー新規作成の処理を書く
                        -------------------------------------------------------------------------------------------------------*/
                        onPress={() => onAddTimer()}>
                        
                        <Image
                            style={styles.headerIcon}
                            source={require('../img/PlusIcon.png')}
                        />
                    </TouchableOpacity>
                }
            />
            <FlatList
                style={styles.flatList}

                /*-------------------------------------------------------------------------------------------------------
                JSONから読み込む処理を書く
                -------------------------------------------------------------------------------------------------------*/
                data={TimerNameList}

                keyExtractor={item => item}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listContainer}>
                            <Text style={styles.timerTitle}>{item}</Text>
                            <View style={styles.listIcons}>
                                <TouchableOpacity
                                    onPress={() => onEditTimer(item)}>
                                    <Image
                                        style={styles.listIconImg}
                                        source={require('../img/EditIcon.png')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    /*-------------------------------------------------------------------------------------------------------
                                    タイマースタートの処理を書く
                                    -------------------------------------------------------------------------------------------------------*/
                                    onPress={() => onExecTimer(item)}>
                                    <Image
                                        style={styles.listIconImg}
                                        source={require('../img/PlayIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />
            <DialogInput isDialogVisible={dialogState}
                        title={"新規作成"}
                        message={"タイマーの名前を入力してください。"}
                        hintInput ={"タイマー名"}
                        submitInput={ (inputText) => {sendAddInput(inputText)} }
                        closeDialog={ () => closeDialog() }>
            </DialogInput>
        </SafeAreaView>
    );
};

export default TimerList;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#91CCF2', 
    },
    headerIcon: {
        width: 25,
        height: 25,
    },
    container: {
    },
    flatList: {
        padding: "5%",
        paddingTop: 0,
        marginBottom: 50,
    },
    listContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    timerTitle: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'left',
    },
    listIcons:{
        flexDirection: 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    listIconImg:{
        width: 30,
        height: 30,
        marginLeft : 10,
    },
});
