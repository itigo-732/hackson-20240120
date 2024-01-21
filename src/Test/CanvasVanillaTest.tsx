import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "black",
            previousX: "",
            previousY: "",
            currentX: "",
            currentY: "",
            drawFlag: false,
        };
        this.canvas = React.createRef();
        this.onTouch = this.onTouch.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.clear = this.clear.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.canvas.current.getContext('2d');
        this.canvas.current.width = 300;  //キャンバスの横幅
        this.canvas.current.height = 300; //キャンバスの高さ
        ctx.strokeStyle = 'rgb(00, 00, 00)'; //枠線の色は黒
        ctx.strokeRect(0, 0, 300, 300);
    }

    //画面がタッチされたときに実行
    onTouch(e) {
        this.setState({ drawFlag: true });  //フラグをオンにする
        this.setState({ previousX: e.nativeEvent.locationX });
        this.setState({ previousY: e.nativeEvent.locationY });
    }

    //タッチした状態で指を動かしたときに実行
    onMove(e) {
        if (!this.state.drawFlag) return;  //フラグがオフのときは実行しない
        const ctx = this.canvas.current.getContext('2d');
        ctx.beginPath();

        if (this.state.currentX === '') {

            this.setState({ currentX: this.state.previousX });
            this.setState({ currentY: this.state.previousY });

        } else {
            this.setState({ previousX: e.nativeEvent.locationX });
            this.setState({ previousY: e.nativeEvent.locationY });
            ctx.moveTo(this.state.previousX, this.state.previousY);
        }

        ctx.lineTo(this.state.currentX, this.state.currentY);
        ctx.lineCap = "round";
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.state.color;
        ctx.stroke();
        ctx.closePath();

        this.setState({ currentX: this.state.previousX });
        this.setState({ currentY: this.state.previousY });
    }

    //指を画面から離したときに実行
    onTouchEnd() {
        this.setState({ drawFlag: false }); //フラグをオフにする
        this.setState({ previousX: '' });
        this.setState({ previousY: '' });
        this.setState({ currentX: '' });
        this.setState({ currentY: '' });
    }

    //キャンバスを白紙にする
    clear() {
        const ctx = this.canvas.current.getContext('2d');
        this.canvas.current.width = 300;  //キャンバスの横幅
        this.canvas.current.height = 300; //キャンバスの高さ
        ctx.strokeStyle = 'rgb(00, 00, 00)'; //枠線の色は黒
        ctx.strokeRect(0, 0, 300, 300);
    }

    //ペンの色を変える
    changeColor() {
        this.setState({ color: "red" })
    }

    render() {
        return (
            <View style={{ top: 20 }} >
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text>ペイント</Text>
                    <View
                        style={{ width: 300, height: 300 }}
                        onTouchStart={this.onTouch}
                        onTouchMove={this.onMove}
                        onTouchEnd={this.onTouchEnd}>
                        <Canvas ref={this.canvas} />
                    </View>
                    <Text></Text>
                    <Text>パレット</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', width: 300 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.black} onPress={() => this.setState({ color: "black" })} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.red} onPress={() => this.setState({ color: "red" })} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.green} onPress={() => this.setState({ color: "green" })} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.yellow} onPress={() => this.setState({ color: "yellow" })} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.blue} onPress={() => this.setState({ color: "blue" })} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.clear} onPress={this.clear} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

//スタイルシート
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    black: {
        backgroundColor: 'black',
        height: 40,
        width: 40
    },
    red: {
        backgroundColor: 'red',
        height: 40,
        width: 40
    },
    green: {
        backgroundColor: 'green',
        height: 40,
        width: 40
    },
    yellow: {
        backgroundColor: 'yellow',
        height: 40,
        width: 40
    },
    blue: {
        backgroundColor: 'blue',
        height: 40,
        width: 40
    },
    clear: {
        height: 40,
        width: 40,
        borderColor: "black",
        borderWidth: 1
    },
});