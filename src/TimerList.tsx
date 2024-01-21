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
import { Image } from 'react-native-elements';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import storage from './Storage/Storage';
import { addTimer, getTimerList } from './Storage/AlarmManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerList = props => {
    const [TimerNameList, setTimerNameList] = useState();

    const onAddTimer = async () => {
        await addTimer("test" + String(Math.floor(Math.random() * 10000)));
        await updateState();
    };

    const onEditTimer = (item) => {
        props.navigation.navigate('EditScreen', {message: item});
    }

    const onExecTimer = (item) => {
        props.navigation.navigate('AlarmScreen', {message: item});
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
            Alert.alert(String(e));
        });
    };
    useEffect(() => {
        if(!TimerNameList)
            updateState();
    }, [TimerNameList]);

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
