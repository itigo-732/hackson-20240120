import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        backgroundColor: '#91CCF2',
    },
    headerIcon: {
        width: 25,
        height: 25,
    },
    headerButtonText: {
        marginBottom: -10,
        width: 110,
        height: 35,
        fontSize: 20,
        fontWeight: "bold",
    },
    rightHeaderButtonText: {
        marginBottom: -10,
        width: 110,
        height: 35,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'right',
    },
    leftHeaderButtonText: {
        marginBottom: -10,
        width: 110,
        height: 35,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'left',
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

    textInputEditor: {
        fontSize: 20,
    }
});
