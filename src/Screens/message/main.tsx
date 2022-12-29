import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';

interface MessageMainProps {
    navigation: any
}

const MessageCard = ({navigation}:any) => {
    return (
        <>
            <Pressable onPress={() => {navigation.navigate("MessagePage")}}>
                <View style={styles.containerMessage} >
                    <View style={styles.containerMessageImage}>

                    </View>

                    <View style={styles.containerMessageName}>
                        <Text style={styles.containerMessageNameText}>Anshit mishra</Text>
                        <Text style={styles.containerMessageTimeText}>2 min ago</Text>
                    </View>
                </View>
            </Pressable>
        </>
    )
}


const MessageMain = (props: MessageMainProps) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.containerHolder}>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>
                <MessageCard navigation={props.navigation}/>

            </ScrollView>
        </View>
    );
};

export default MessageMain;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
        paddingBottom: 10,
        backgroundColor: "white"
    },
    containerHolder: {
        position: "relative",
        width: "100%",
        height: "100%",
        padding: 10,
        backgroundColor: "white"
    },
    containerMessage: {
        position: "relative",
        width: "100%",
        borderBottomWidth: .5,
        borderBottomColor: "#777",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    containerMessageImage: {
        position: "relative",
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
        backgroundColor: "#eee"
    },
    containerMessageName: {
        position: "relative",
        width: "auto",
        maxWidth: "50%",
    },
    containerMessageNameText: {
        position: "relative",
        fontSize: 16,
        fontWeight: "600",
        color: "#444"
    },
    containerMessageTimeText: {
        position: "relative",
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
        opacity: .6
    }
});
