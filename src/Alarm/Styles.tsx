import {View, TouchableNativeFeedback, Text, StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
    container: {
//         alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 16,
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
    }

});