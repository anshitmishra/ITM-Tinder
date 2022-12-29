import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"
import Icon2 from "react-native-vector-icons/AntDesign"

interface HomeProps {
    navigation: any
}


const HomeMain = (props:HomeProps) => {
    const NavigationHandler = (location: string) => {
        if (location === "view") {
            props.navigation.navigate("ProfileView")
        }
    }
    return (
        <>
            <View style={styles.MainContainer} >
                <View style={styles.MainContainerTop} >
                    <View style={[styles.Card, styles.elevation]} >
                        <Image style={styles.CardImage} source={require("../../../assets/developer.jpg")} />
                        <View style={styles.CardDetails} >
                            <Text style={styles.CardDetailsName} numberOfLines={1}>Anshit mishra</Text>
                            <Text style={styles.CardDetailsDesc} numberOfLines={2}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia blanditiis officiis alias ullam animi, libero porro, perferendis expedita vel ipsam nisi ratione eligendi accusantium totam optio possimus fugit consequuntur est.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.MainContainerBottom} >
                    <Pressable style={[styles.MainContainerBottonClose, styles.elevation]}><Icon name='times' size={30} color={"#ed2939"} /></Pressable>
                    <Pressable style={[styles.MainContainerBottonEye, styles.elevation]} onPress={() => {NavigationHandler("view")}}><Icon name='eye' size={30} color={"royalblue"} /></Pressable>
                    <Pressable style={[styles.MainContainerBottonHeart, styles.elevation]}><Icon name='heart' size={30} color={"#90EE90"} /></Pressable>
                </View>
            </View>
        </>
    )
}



const Home = (props: HomeProps) => {

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
            <View style={styles.containerTop}>
                <HomeMain navigation={props.navigation}/>
            </View>
            <View style={styles.containerBottom}>
                <View style={[styles.containerBottomHolder, styles.elevation]}>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => { NavigationHandler("home") }}><Icon2 name="home" size={35}></Icon2></Pressable>
                    </View>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => { NavigationHandler("profile") }}><Icon name="user-circle" size={25}></Icon></Pressable>
                    </View>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => { NavigationHandler("info") }}><Icon2 name="info" size={25}></Icon2></Pressable>
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
    MainContainer: {
        position: "relative",
        width: "100%",
        height: "100%",
        padding: 20,
        backgroundColor: "#fff",
    },
    MainContainerTop: {
        position: "relative",
        width: "100%",
        height: "80%",
    },
    MainContainerBottom: {
        position: "relative",
        width: "100%",
        height: "20%",
        paddingHorizontal: 20,
        display: "flex",
        justifyContent: "center",
    },
    MainContainerBottonClose: {
        position: "absolute",
        left: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    MainContainerBottonHeart: {
        position: "absolute",
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    MainContainerBottonEye:{
        position: "absolute",
        top:15,
        width: 60,
        height: 60,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        alignSelf:"center"
    },
    elevation: {
        shadowOffset: { width: -10, height: 10 },
        shadowColor: '#000',
        elevation: 10,
    },


    // card

    Card: {
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 10,
        backgroundColor: "#fff",
        overflow: 'hidden',
    },
    CardImage: {
        position: "relative",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    CardDetails:{
        position: "absolute",
        bottom:0,
        left:0,
        width:"100%",
        height:"auto",
        maxHeight:100,
        padding:10,
        paddingHorizontal:20,
        backgroundColor:"rgba(0,0,0,.10)"
    },
    CardDetailsName :{ 
        position: "relative",
        width: "100%",
        fontSize:18,
        fontWeight:"600",
        color:"white",
        marginVertical:10,
        textTransform:"capitalize"
        
    },
    CardDetailsDesc:{ 
        position: "relative",
        width: "100%",
        fontSize:14,
        fontWeight:"500",
        color:"white",
        textTransform:"capitalize"
    }
});
