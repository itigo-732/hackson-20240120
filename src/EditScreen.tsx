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
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

let ctx;

class node{
    pos:{x:float, y:float};
    type: int;
    time: int;
    sizeMagni: float;
    nextNode: node[];

    constructor(pos:{x, y}, type, time, nextNode) {
        this.pos = pos;
        this.type = type;
        this.time = time;
        this.nextNode = nextNode
    }

    private DrawType0(s, pos, w = 150, h = 50){
        ctx.beginPath();
        ctx.rect( pos.x, pos.y, w, h);
        ctx.strokeStyle = '#91CCF2';
        ctx.lineWidth = 4;
        ctx.stroke();


        ctx.font = "25px serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(s, pos.x + w / 2, pos.y + h / 2, w);
        ctx.closePath();
    }

    private DrawType1(s, pos, w = 150, h = 50, r = 10) {
        ctx.beginPath();
        ctx.moveTo(pos.x + r, pos.y);
        ctx.lineTo(pos.x + w - r, pos.y);
        ctx.arc(pos.x + w - r, pos.y + r, r, Math.PI * (3/2), 0, false);
        ctx.lineTo(pos.x + w, pos.y + h - r);
        ctx.arc(pos.x + w - r, pos.y + h - r, r, 0, Math.PI * (1/2), false);
        ctx.lineTo(pos.x + r, pos.y + h);       
        ctx.arc(pos.x + r, pos.y + h - r, r, Math.PI * (1/2), Math.PI, false);
        ctx.lineTo(pos.x, pos.y + r);
        ctx.arc(pos.x + r, pos.y + r, r, Math.PI, Math.PI * (3/2), false);
        ctx.strokeStyle = '#91CCF2';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.font = "25px serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(s, pos.x + w / 2, pos.y + h / 2, w);
        ctx.closePath();
    }

    private DrawType2(pos, w = 150, h = 50){
        ctx.beginPath();
        ctx.moveTo(pos.x + w / 2, pos.y);
        ctx.lineTo(pos.x + w, pos.y + h / 2);
        ctx.lineTo(pos.x + w / 2, pos.y + h);
        ctx.lineTo(pos.x, pos.y + h / 2);
        ctx.lineTo(pos.x + w / 2, pos.y);
        ctx.strokeStyle = '#91CCF2';
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    private DrawNextNodePath(sPos, gPos, sw = 150, sh = 50, gw = 150, gh = 50){
        ctx.beginPath();
        ctx.moveTo(sPos.x + sw / 2, sPos.y + sh);
        ctx.lineTo(gPos.x + gw / 2, gPos.y);
        ctx.strokeStyle = '#225A7A';
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    public GetPos(){
        return this.pos;
    }

    public DrawObj() {
        switch (this.type){
            case 0:
                this.DrawType0(String(this.time),this.pos);
                if(this.nextNode.length == 1)this.DrawNextNodePath(this.pos, this.nextNode[0].GetPos());
                break;
            case 1:
                this.DrawType1(String(this.time),this.pos);
                break;
            case 2:
                this.DrawType2(this.pos);
                break;
            default:
                break;
        }
    }
}

function OnTouch() {
    let test3 = new node({x:0.0, y:110.0}, 0, 0, []);
    let test2 = new node({x:200.0, y:100.0}, 0, 100, [test3]);
    let test = new node({x:50.0, y:50.0}, 0, 100, [test2]);
    test.DrawObj();
    test2.DrawObj();
    test3.DrawObj();
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
            <View style={styles.canvasWrapper}           
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
    canvasWrapper:{
        flex: 1,
        backgroundColor: 'blue',
    },
    canvas: {
        flex: 1,
        backgroundColor: 'white',
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