import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"
import Icon2 from "react-native-vector-icons/AntDesign"

interface HomeProps {
    navigation:any
 }

const Home = (props: HomeProps) => {

    const NavigationHandler = (location:string) => {
        if(location === "home"){
            props.navigation.navigate("Home")
        }else if(location === "profile"){
            props.navigation.navigate("Profile")
        }else if(location === "notification"){
            props.navigation.navigate("Home")
        }else if(location === "info"){
            props.navigation.navigate("Info")
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                
            </View>
            <View style={styles.containerBottom}>
                <View style={styles.containerBottomHolder}>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => {NavigationHandler("home")}}><Icon2 name="home" size={35}></Icon2></Pressable>
                    </View>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => {NavigationHandler("profile")}}><Icon name="user-circle" size={25}></Icon></Pressable>
                    </View>
                    {/* <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => {NavigationHandler("notification")}}><Icon2 name="bells" size={25}></Icon2></Pressable>
                    </View> */}
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => {NavigationHandler("info")}}><Icon2 name="info" size={25}></Icon2></Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    containerTop: {
        position: "relative",
        width: "100%",
        height: "100%",
        paddingBottom: 70,
        backgroundColor:"red"
    },
    containerBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    containerBottomHolder: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    containerBottomHolderItem: {
        position: "relative",
        width: 50,
        height: 50,
        marginHorizontal: 10,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor:"black"
    }
});
