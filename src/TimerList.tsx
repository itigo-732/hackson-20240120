import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import { Image } from 'react-native-elements';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TimerNameList = ["name0","name1","name2","name3","name4","name5","name6","name7","name8","name9","name10","name11","name12","name13","name14","name15",];

const TimerList = props => {
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
                        onPress={() => props.navigation.navigate('TimerList')}>
                        
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
                                    onPress={() => props.navigation.navigate('EditScreen',{message:item})}>
                                    <Image
                                        style={styles.listIconImg}
                                        source={require('../img/EditIcon.png')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    /*-------------------------------------------------------------------------------------------------------
                                    タイマースタートの処理を書く
                                    -------------------------------------------------------------------------------------------------------*/
                                    onPress={() => props.navigation.navigate('TimerList')}>
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
