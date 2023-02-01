import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable,Image } from 'react-native';
import List from '../../apis/list';
import AlertMessage from '../utils/alert';
import AsyncStorage from '@react-native-async-storage/async-storage'
interface MessageMainProps {
    navigation: any
}
interface MessageMainListProps {
    navigation: any,
    data: any,
    key:any
}
const MessageCard = (props: MessageMainListProps) => {

    return (
        <>
            <Pressable key={props?.key} onPress={() => { props?.navigation.navigate("MessagePage",{"token":`${props?.data?.uid}`,'profile':props?.data?.profile,'name':props?.data?.name}) }}>
                <View style={styles.containerMessage} >
                    <View style={styles.containerMessageImage}>
                        <Image source={{ uri: props?.data?.profile ? props?.data?.profile :  "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"  }} style={styles.containerHolderCoverImage} />
                    </View>

                    <View style={styles.containerMessageName}>
                        <Text style={styles.containerMessageNameText}>{props?.data?.name}</Text>
                        <Text style={styles.containerMessageTimeText} numberOfLines={1}>{props?.data?.msg ? props?.data?.msg : ""}</Text>
                    </View>
                </View>
            </Pressable>
        </>
    )
}


const MessageMain = (props: MessageMainProps) => {
    const ApiLinks = List();
    const [alertDisplay, setAlertDisplay] = React.useState<boolean>(false);
    const [alertType, setAlertType] = React.useState<string>("")
    const [alertMessage, setAlertMessage] = React.useState<string>("")
    const setAlertDisplayHolder = (data: boolean) => {
        setAlertDisplay(data)
    }
    const [loading, setLoading] = React.useState<boolean>(false)
    const [userData, setuserData] = React.useState<string | null>("")
    const [data, setData] = React.useState<any>()

    const GetList = async () => {
        setLoading(true)
        const data = await AsyncStorage.getItem("auth");
        setuserData(data)
        const payload = {
            token: data,
        }

        ApiLinks.MessageList(payload).then((data: any) => {
            console.log(data)
            if (data.status == true) {
                setData(data?.data)
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
        GetList();
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView style={styles.containerHolder}>
                {data?.map((value: any, index: any) => {
                    return (
                        <>
                            <MessageCard key={index} navigation={props.navigation} data={value} />
                        </>
                    )
                })}
            </ScrollView>
            <AlertMessage type={alertType} message={alertMessage} display={setAlertDisplayHolder} displayCon={alertDisplay} />

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
    containerHolderCoverImage: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 60,
        borderRadius: 30,
        resizeMode: "cover"
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
