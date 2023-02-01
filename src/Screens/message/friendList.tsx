import * as React from 'react';
import { Text, View, StyleSheet, Image, Pressable, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import List from '../../apis/list';
import AlertMessage from '../utils/alert';
import AsyncStorage from '@react-native-async-storage/async-storage'
import socket from '../utils/socket';

interface FriendListProps {
    navigation: any
}


const FriendRequestList = (props: any) => {
    const sendReq = async (recId: any, status: any) => {
        const datas = await AsyncStorage.getItem("auth");

        if (datas !== null) {
            const payload = {
                token: datas,
                reciverToken: recId,
                status: status
            }
            socket.emit("friend", payload);
        }
    }
    return (
        <>
            <View style={styles.RequestContainer} key={props?.key}>
                <Pressable onPress={() => {
                    props?.navigation.navigate('ProfileView', {
                        'token': props?.data?.uid,
                    });
                }}><Image style={styles.RequestContainerImage} source={{ uri: props?.data?.profile ? props?.data?.profile : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }} /></Pressable>
                    <View style={styles.RequestContainerDetails}>
                        <Text style={styles.RequestContainerDetailsName} numberOfLines={1}>{props?.data?.name}</Text>
                        <Text style={styles.RequestContainerDetailsInfo} numberOfLines={1}>{props?.data?.college}</Text>
                    </View>
                <View style={styles.RequestContainerButtons}>
                    <Pressable style={[styles.RequestContainerButtonsItem, styles.elevation]} onPress={() => { sendReq(props?.data?.uid, "1") }}>
                        <Icon name='heart' size={25} color={"#90EE90"} ></Icon>
                    </Pressable>
                    <Pressable style={[styles.RequestContainerButtonsItem, styles.elevation]} onPress={() => { sendReq(props?.data?.uid, "2") }}>
                        <Icon name='x' size={25} color={"#ed2939"}></Icon>
                    </Pressable>
                </View>
            </View>
        </>
    )
}


const FriendstList = (props: any) => {
    console.log(props, "Asdasd");

    return (
        <>
            <View style={styles.RequestContainer}>
                <Pressable onPress={() => {
                    props?.navigation.navigate('ProfileView', {
                        'token': props?.data?.uid,
                    });
                }}><Image style={styles.RequestContainerImage} source={{ uri: props?.data?.profile ? props?.data?.profile : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }} /></Pressable>
                    <View style={styles.RequestContainerDetails}>
                        <Text style={styles.RequestContainerDetailsName} numberOfLines={1}>{props?.data?.name}</Text>
                        <Text style={styles.RequestContainerDetailsInfo} numberOfLines={1}>{props?.data?.college}</Text>
                    </View>
                <View style={styles.RequestContainerButtons}>
                    <Pressable style={[styles.RequestContainerButtonsItem, styles.elevation]} onPress={() => { props?.navigation.navigate("MessagePage", { "token": `${props?.data?.uid}`, 'profile': props?.data?.profile, 'name': props?.data?.name }) }}>
                        <Icon name='message-square' size={25} color={"#000"} ></Icon>
                    </Pressable>
                </View>
            </View>
        </>
    )
}



const FriendList = (props: FriendListProps) => {

    const ApiLinks = List();

    const [alertDisplay, setAlertDisplay] = React.useState<boolean>(false);
    const [alertType, setAlertType] = React.useState<string>("")
    const [alertMessage, setAlertMessage] = React.useState<string>("")
    const setAlertDisplayHolder = (data: boolean) => {
        setAlertDisplay(data)
    }
    const [loading, setLoading] = React.useState<boolean>(false)
    const [userData, setuserData] = React.useState<string | null>("")
    const [dataFriends, setDataFriends] = React.useState<any>()
    const [dataRequest, setDataRequest] = React.useState<any>()

    const sentReqData = async () => {
        setLoading(true)
        const data = await AsyncStorage.getItem("auth");
        setuserData(data)
        const payload = {
            token: data,
        }
        ApiLinks.FriendsList(payload).then((data: any) => {
            if (data.status == true) {
                setDataFriends(data?.friends)
                setDataRequest(data?.requests)
                console.log(data);

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
        sentReqData()
    }, [])


    return (
        <View style={styles.container}>
            {/* request list */}
            {dataRequest?.length > 0 ? <View style={styles.containerRequest}>
                <Text style={styles.containerRequestHeading} numberOfLines={1}>Requests</Text>

                {dataRequest ? dataRequest?.map((value: any, index: any) => {
                    return (
                        <>
                            <FriendRequestList key={index} data={value} />
                        </>
                    )
                }) : ""}
            </View> : ""}

            {/* Friends list */}
            {dataFriends?.length > 0 ? <View style={styles.containerRequest}>
                <Text style={styles.containerRequestHeading} numberOfLines={1}>Fiends</Text>

                {dataFriends ? dataFriends?.map((value: any, index: any) => {
                    return (
                        <>
                            <FriendstList key={index} navigation={props?.navigation} data={value} />
                        </>
                    )
                }) : ""}
            </View> : ""}
            <AlertMessage type={alertType} message={alertMessage} display={setAlertDisplayHolder} displayCon={alertDisplay} />

        </View>
    );
};

export default FriendList;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
        padding: 10,
        backgroundColor: "white"
    },
    containerRequest: {
        position: "relative",
        width: "100%",
        padding: 5,
        marginVertical: 5
    },
    containerRequestHeading: {
        position: "relative",
        fontSize: 16,
        fontWeight: "600",
        marginVertical: 10,
    },
    RequestContainer: {
        position: "relative",
        width: "100%",
        height: "auto",
        padding: 10,
        paddingVertical: 15,
        borderBottomWidth: .4,
        borderBottomColor: "#999",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    RequestContainerImage: {
        position: "relative",
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 5,
        resizeMode: "cover"
    },
    RequestContainerDetails: {
        position: "relative",
        width: "auto",
        maxWidth: 250,
        height: "auto",
        marginLeft: 10,

    },
    RequestContainerDetailsName: {
        fontSize: 17,
        fontWeight: "600",
        color: "#444"
    },
    RequestContainerDetailsInfo: {
        fontSize: 14,
        fontWeight: "500",
        color: "#444"
    },
    RequestContainerButtons: {
        position: "absolute",
        right: 0,
        width: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    RequestContainerButtonsItem: {
        position: "relative",
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },

    elevation: {
        shadowOffset: { width: -10, height: 10 },
        shadowColor: 'rgba(0,0,0,.7)',
        elevation: 10,
    },

});
