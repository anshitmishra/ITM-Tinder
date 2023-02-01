import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"
import Icon2 from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native';
import List from '../../apis/list';
import AlertMessage from '../utils/alert';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";

interface HomeProps {
    navigation: any,
    data: any,
    token:string,
    HandleData: Function
}


const HomeMain = (props: HomeProps) => {
    const ApiLinks = List();


    const [data, setData] = React.useState<any>()
    const navigation = useNavigation<any>();
    const goToMessageScreen = (data: string) => {
        navigation.navigate('ProfileView', {
            'token': props?.token,
        });
    };

    const [alertDisplay, setAlertDisplay] = React.useState<boolean>(false);
    const [alertType, setAlertType] = React.useState<string>("")
    const [alertMessage, setAlertMessage] = React.useState<string>("")
    const setAlertDisplayHolder = (data: boolean) => {
        setAlertDisplay(data)
    }
    const [loading, setLoading] = React.useState<boolean>(false)
    const [userData, setuserData] = React.useState<string | null>("")

    const sentReqData = (profileToken: string) => {
        setLoading(true)
        // const data = await AsyncStorage.getItem("auth");
        setuserData(data)
        const payload = {
            token: props?.token,
            receivToken: profileToken
        }
        console.log(payload);
        ApiLinks.sent(payload).then((data: any) => {
            if (data.status == true) {
                setData(data?.data)
                console.log(data?.data);
                props.HandleData()
            } else {
                setLoading(false)
                setAlertDisplayHolder(true)
                setAlertType("error")
                setAlertMessage(data.message)
            }
        }).catch((err) => {
            setLoading(false)
            setAlertDisplayHolder(true)
            setAlertType("error")
            setAlertMessage(err.message)
        });
    }


    const deleteReqData = (profileToken: string) => {
        setLoading(true)
        // const data = await AsyncStorage.getItem("auth");
        setuserData(data)
        const payload = {
            token: props?.token,
            receivToken: profileToken
        }
        console.log(payload);

        ApiLinks.deleteReq(payload).then((data: any) => {
            if (data.status == true) {
                setData(data?.data)
                console.log(data?.data);
                props.HandleData()

            } else {
                setLoading(false)
                setAlertDisplayHolder(true)
                setAlertType("error")
                setAlertMessage(data.message)
            }
        }).catch((err) => {
            setLoading(false)
            setAlertDisplayHolder(true)
            setAlertType("error")
            setAlertMessage(err.message)
        });
    }
    React.useEffect(() => {
        console.log(data);
    }, [])
    return (
        <>
            <View style={styles.MainContainer} >
                <View style={styles.MainContainerTop} >
                    <View style={[styles.Card, styles.elevation]} >
                        <Image style={styles.CardImage} source={{ uri: props?.data?.profile ? props?.data?.profile : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }} />
                        <View style={styles.CardDetails} >
                            <Text style={styles.CardDetailsName} numberOfLines={1}>{props?.data?.name}</Text>
                            <Text style={{ fontSize: 14, color: "white" }} numberOfLines={1}>{props?.data?.college}</Text>
                            <Text style={styles.CardDetailsDesc} numberOfLines={2}>{props?.data?.description}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.MainContainerBottom} >
                    <Pressable style={[styles.MainContainerBottonClose, styles.elevation]} onPress={() => { deleteReqData(props?.data?.uid) }}><Icon name='times' size={30} color={"#ed2939"} /></Pressable>
                    <Pressable style={[styles.MainContainerBottonEye, styles.elevation]} onPress={() => { goToMessageScreen(props?.data?.uid) }}><Icon name='eye' size={30} color={"royalblue"} /></Pressable>
                    <Pressable style={[styles.MainContainerBottonHeart, styles.elevation]} onPress={() => { sentReqData(props?.data?.uid) }}><Icon name='heart' size={30} color={"#90EE90"} /></Pressable>
                </View>
            </View>
            <AlertMessage type={alertType} message={alertMessage} display={setAlertDisplayHolder} displayCon={alertDisplay} />

        </>
    )
}



const Home = (props: any) => {

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
    const token = props.route.params.token;
    
    const [alertDisplay, setAlertDisplay] = React.useState<boolean>(false);
    const [alertType, setAlertType] = React.useState<string>("")
    const [alertMessage, setAlertMessage] = React.useState<string>("")
    const setAlertDisplayHolder = (data: boolean) => {
        setAlertDisplay(data)
    }
    const [loading, setLoading] = React.useState<boolean>(false)
    const [userData, setuserData] = React.useState<string | null>("")

    const ApiLinks = List();

    const [data, setData] = React.useState<any>();
    const getData = () => {
        setLoading(true)
        // const data = await AsyncStorage.getItem("auth");
        setuserData(data)
        const payload = {
            token: token
        }
        axios.post("https://itm.comradehub.com/api/home",payload).then((data: any) => {
            console.log(data?.data?.data);

            if (data?.data?.status == true) {
                setData(data?.data?.data)
                console.log(data?.data?.data,"ASD");
            } else {
                setLoading(false)
                setAlertDisplayHolder(true)
                setAlertType("error")
                setAlertMessage(data.message)
            }
        }).catch((err) => {
            setLoading(false)
            setAlertDisplayHolder(true)
            setAlertType("error")
            setAlertMessage(err.message)
        });
    }

    React.useEffect(() => {
        getData();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <HomeMain navigation={props.navigation} token={token} data={data} HandleData={getData} />
            </View>
            <View style={styles.containerBottom}>
                <View style={[styles.containerBottomHolder, styles.elevation]}>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={getData}><Icon2 name="home" size={35}></Icon2></Pressable>
                    </View>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => { NavigationHandler("profile") }}><Icon name="user-circle" size={25}></Icon></Pressable>
                    </View>
                    <View style={styles.containerBottomHolderItem}>
                        <Pressable onPress={() => { NavigationHandler("info") }}><Icon2 name="info" size={25}></Icon2></Pressable>
                    </View>
                </View>
            </View>
            <AlertMessage type={alertType} message={alertMessage} display={setAlertDisplayHolder} displayCon={alertDisplay} />

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
    MainContainerBottonEye: {
        position: "absolute",
        top: 15,
        width: 60,
        height: 60,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        alignSelf: "center"
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
    CardDetails: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "auto",
        maxHeight: 100,
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: "rgba(0,0,0,.20)"
    },
    CardDetailsName: {
        position: "relative",
        width: "100%",
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        marginTop: 10,
        marginBottom: 5,
        textTransform: "capitalize"

    },
    CardDetailsDesc: {
        position: "relative",
        width: "100%",
        fontSize: 14,
        fontWeight: "500",
        color: "white",
        textTransform: "capitalize"
    }
});
