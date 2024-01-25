import { View, TouchableNativeFeedback, Text, StyleSheet, Platform, StatusBar } from 'react-native';

export const Styles = StyleSheet.create({
    baseTextColor: {
        color: "black",
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 16,
    },

    safeAreaContainer: {
        flex: 1,
        flexDirection: 'column',
//        marginHorizontal: 16,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

    timerName: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    // counter
    counter: {
        flex: 3,
        alignItems: 'center',
    },

    countDownText: {
        fontSize: 40,
    },

    countDownNumber: {
        fontSize: 50,
    },

    buttonsArea: {
        flex: 4,
    },

    button: {
        margin: 16,
        width: 'lg',
        fontSize: 30,
    },
    remainingTime: {
        fontSize: 46,
    },

    circleTimer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // editor


});