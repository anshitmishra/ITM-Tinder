import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Linking, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"
import Icon2 from "react-native-vector-icons/AntDesign"

interface InfoProps {
    navigation: any
}

const Info = (props: InfoProps) => {
    const NavigationHandler = (location: string) => {
        if (location === "home") {
            props.navigation.navigate("Home")
        } else if (location === "profile") {
            props.navigation.navigate("Profile")
        } else if (location === "notification") {
            props.navigation.navigate("Home")
        } else if (location === "info") {
            props.navigation.navigate("Info")
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.containerTop}>
                <Text style={styles.containerTopHeading}>About Developer</Text>
                <View style={styles.containerTopImageHolder}>
                    <View style={styles.containerTopImage}>
                        <Image style={styles.containerTopImageimg} source={require("../../../assets/developer.jpg")} />
                    </View>
                    <View style={styles.containerTopName}>
                        <Text style={styles.containerTopNameText}>Anshit mishra</Text>
                    </View>
                </View>

                {/* warning */}
                <View style={styles.containerTopDisclaimer}>
                    <Text style={styles.containerTopDisclaimerText}>
                        Hey everyone, I am an open-source developer. I have developed this app just for fun. In This, I develop a new algorithm called flames. for more details view my GitHub page. and this app is just for fun so please use this app carefully and we don't charge any money so don't pay on this app.
                    </Text>


                    <Text style={styles.containerTopDisclaimerSocialHeading}>follow me</Text>
                    <View style={styles.containerTopDisclaimerSocial}>
                        <Pressable style={styles.containerTopDisclaimerSocialItem} onPress={() => Linking.openURL('https://www.linkedin.com/in/anshit-mishra-172b33237')}><Icon name="linkedin" size={25}></Icon></Pressable>
                        <Pressable style={styles.containerTopDisclaimerSocialItem} onPress={() => Linking.openURL('https://twitter.com/Anshit_03')}><Icon name="twitter" size={25}></Icon></Pressable>
                        <Pressable style={styles.containerTopDisclaimerSocialItem} onPress={() => Linking.openURL('https://github.com/anshitmishra')}><Icon name="github" size={25}></Icon></Pressable>

                    </View>
                </View>
            </ScrollView>
            <View style={styles.containerBottom}>
                <View style={[styles.containerBottomHolder, styles.elevation]}>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => { NavigationHandler("home") }}><Icon2 name="home" size={25}></Icon2></Pressable>
                    </View>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => { NavigationHandler("profile") }}><Icon name="user-circle" size={25}></Icon></Pressable>
                    </View>
                    {/* <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => {NavigationHandler("notification")}}><Icon2 name="bells" size={25}></Icon2></Pressable>
                    </View> */}
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => { NavigationHandler("info") }}><Icon2 name="info" size={35}></Icon2></Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Info;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    containerTop: {
        position: "relative",
        width: "100%",
        height: "100%",
        padding: 10,
        paddingBottom: 70,
    },
    containerTopHeading: {
        position: "relative",
        width: "100%",
        height: "auto",
        padding: 5,
        marginVertical: 10,
        fontSize: 30,
        fontWeight: "600",
        textAlign: "center"
    },
    containerTopImageHolder: {
        position: "relative",
        width: "100%",
        marginVertical: 10,
        padding: 10
    },
    containerTopImage: {
        position: "relative",
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: "center",
        backgroundColor: "#eee",
        overflow: "hidden"
    },
    containerTopImageimg: {
        position: "relative",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    containerTopName: {
        position: "relative",
        width: "100%",
        height: "auto",
        marginVertical: 10
    },
    containerTopNameText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center"
    },
    containerTopDisclaimer: {
        position: "relative",
        width: "100%",
        height: "auto",
        padding: 20,
        marginVertical: 10,
        borderTopWidth: .7,
        borderTopColor: "#444"
    },
    containerTopDisclaimerText: {
        position: "relative",
        width: "100%",
        height: "auto",
        padding: 20,
        marginVertical: 10,
        fontSize: 16,
        fontWeight: "500",
        color: "#444"
    },
    containerTopDisclaimerSocialHeading: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600",
        textTransform: "capitalize",
        textDecorationLine: "underline"
    },
    containerTopDisclaimerSocial: {
        position: "relative",
        width: "auto",
        height: "auto",
        padding: 10,
        marginVertical: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerTopDisclaimerSocialItem: {
        marginHorizontal: 10,
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
    },
    elevation: {
        shadowColor: '#000',
        elevation: 10,
    },
});
