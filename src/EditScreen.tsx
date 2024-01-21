import React, {  useState, useEffect, useRef  } from 'react';
import {
    StyleSheet,
    View,
    Linking,
    StyleProp,
    TextStyle,
    ViewStyle,
    Alert
} from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native-elements';
import Canvas from 'react-native-canvas';

let ctx;

function OnTouch() {
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 100, 100);
}

function OnMove() {
}

function OnTouchEnd() {
}

const EditScreen = props => {

    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ctx = ref.current.getContext('2d');
            ctx.fillStyle = 'red';
            ctx.fillRect(20, 20, 100, 100);
        }
    }, [ref]);

    return (
        <SafeAreaProvider>
            <HeaderRNE
                //style={}がなぜか適用されないので直接色指定
                backgroundColor='#91CCF2'
                leftComponent={
                    <TouchableOpacity
                        /*-------------------------------------------------------------------------------------------------------
                        変更を保存する処理を書く
                        -------------------------------------------------------------------------------------------------------*/
                        onPress={() => props.navigation.navigate('TimerList')}>

                        <Image
                            style={styles.headerIcon}
                            source={require('../img/BackIcon.png')}
                        />
                    </TouchableOpacity>
                }
                centerComponent={{ text: props.route.params.message, style: styles.heading }}
            />
            <View                 
                onTouchStart={() => OnTouch()}
                onTouchMove={() =>OnMove()}
                onTouchEnd={() =>OnTouchEnd()}>
                <Canvas ref={ref} style={styles.canvas}/>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    //繰り返し
                    onPress={() => props.navigation.navigate('TimerList')}>

                    <Image
                        style={styles.footerIcon}
                        source={require('../img/ForIcon.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    //タイマー
                    onPress={() => props.navigation.navigate('TimerList')}>

                    <Image
                        style={styles.footerIcon}
                        source={require('../img/TimerIcon.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    //分岐
                    onPress={() => props.navigation.navigate('TimerList')}>

                    <Image
                        style={styles.footerIcon}
                        source={require('../img/IfIcon.png')}
                    />
                </TouchableOpacity>
            </View>

        </SafeAreaProvider>
    );
};
export default EditScreen;

const styles = StyleSheet.create({
    heading: {
        color: '#225A7A',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerIcon: {
        width: 22,
        height: 22,
    },
    canvas: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    footer: {
        height: 47,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#91CCF2',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    footerIcon: {
        width: 35,
        height: 35,
    }
});