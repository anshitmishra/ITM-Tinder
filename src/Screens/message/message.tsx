import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, Image, FlatList } from 'react-native';
import { NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
import { Dimensions } from 'react-native';
import List from '../../apis/list';
import AlertMessage from '../utils/alert';
import Icon from "react-native-vector-icons/AntDesign"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon2 from "react-native-vector-icons/Feather"
import socket from '../utils/socket';

const windowHeight = Dimensions.get('window').height;
const messageMiddleHeight = windowHeight - 140;




const HeaderMessage = (props: any) => {
  return (
    <>
      <View style={styles.HeaderHolder}>
        <Pressable onPress={() => { props?.navigation.goBack() }}><Icon name="arrowleft" size={20} />
        </Pressable>
        <View >
          <Image source={{ uri: props?.profile ? props?.profile : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }} style={styles.HeaderHolderImage} />
        </View>
        <View style={styles.HeaderHolderName}>
          <Text style={styles.HeaderHolderNameText}>{props?.name}</Text>
        </View>
      </View>
    </>
  )
}

const renderItem = (props: any) => {
  return (
    <>
      {props?.item?.messageSide == 'l' ?
        <View style={styles.MessageHolderLeft} key={props.index}>
          <Text style={styles.MessageTextLeft}>{props?.item?.chat}</Text>
        </View> : <View style={styles.MessageHolderRight} key={props?.index}>
          <Text style={styles.MessageTextRight}>{props?.item?.chat}</Text>
        </View>}
    </>
  )

}

const MessageMiddle = (props: any) => {
  let listViewRef: any;
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'anshit misha this is not good now make it good design sure. this should be more attractive',
      messageSide: "l"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'anshit misha this is not good now make it good design sure. this should be more attractive',
      messageSide: "r"
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'anshit misha this is not good now make it good design sure. this should be more attractive',
      messageSide: "l"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'anshit misha this is not good now make it good design sure. this should be more attractive',
      messageSide: "r"
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'anshit misha this is not good now make it good design sure. this should be more attractive',
      messageSide: "l"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'anshit misha this is not good now make it good design sure. this should be more attractive',
      messageSide: "r"
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'anshit misha this is not good now make it good design sure. this should be more attractive',
      messageSide: "l"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'anshit misha this is not good now make it good design sure. this should be more attractive',
      messageSide: "r"
    },
  ];
  const ApiLinks = List();

  const [data, setData] = React.useState<any>([]);
  const [load, setLoad] = React.useState<any>(false);
  const getData = async () => {
    const datas = await AsyncStorage.getItem("auth");
    const payload = {
      receivedby: props?.token,
      token: datas,
      page: 1
    }

    ApiLinks.ChatList(payload).then((data: any) => {
      console.log(data);
      
      if (load == false) {
        setLoad(true)
      }
      if (data.status == true) {
        setData(data?.data)
        console.log(data?.data);

        listViewRef.scrollToEnd({ animated: true });
      } else {
      }
    }).catch((err) => {
    });
  }

  const myEventHandler:any = React.useCallback((socketData:any) => {
    setData((data) => [...data,socketData]);
  });
  
  React.useEffect(() => {
    socket.on('oneMessage', myEventHandler);
    return () => socket.off('oneMessage', myEventHandler);
  }, []);

  React.useEffect(() => {
    getData();
  }, [load])

  return (
    <>
      {data ? <FlatList
        data={data ? data : DATA}
        renderItem={({ item, index }: any) => (
          renderItem({ item, index })
        )}
        keyExtractor={(item: any, index: any) => index}
        style={styles.MessageHolder}
        contentContainerStyle={{ paddingBottom: 50 }}
        ref={(ref) => {
          listViewRef = ref;
        }}
      >
      </FlatList> : ""}

    </>
  )
}


const MessageBottom = (props: any) => {
  const [message, setMessage] = React.useState<string>("")
  const sendMessage = async (msg: string) => {
    const datas = await AsyncStorage.getItem("auth");

    if (datas !== null) {
      const payload = {
        token: datas,
        reciverToken: props?.token,
        message: msg
      }
      socket.emit("message", payload);
    }
  }
  return (
    <>
      <View style={styles.MessageBotttom}>
        <View style={styles.MessageBotttomHolder}>
          <View style={styles.MessageBotttomHolderInput}>
            <TextInput style={styles.MessageBotttomInput} placeholder={"message"} multiline={true}
              numberOfLines={4} keyboardType={"default"} value={message} onChangeText={setMessage} />
          </View>
          <Pressable style={styles.MessageBotttomHolderButton} onPress={() => { sendMessage(message) }}>
            <Text style={styles.MessageBotttomHolderButtonText}>
              <Icon2 name="send" size={25} />
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}

interface MessagePageProps {
  route: any,
  navigation: any
}
const MessagePage = (props: MessagePageProps) => {
  const ApiLinks = List();

  const [token, setToken] = React.useState("");
  const [name, setName] = React.useState("");
  const [profile, setProfile] = React.useState("");
  React.useEffect(() => {
    if (props?.route.params?.token) {
      setToken(props?.route.params?.token)
      setProfile(props?.route.params?.profile)
      setName(props?.route.params?.name)
    }
  }, [props?.route.params?.token]);
  const [alertDisplay, setAlertDisplay] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<string>("")
  const [alertMessage, setAlertMessage] = React.useState<string>("")
  const setAlertDisplayHolder = (data: boolean) => {
    setAlertDisplay(data)
  }
  const [loading, setLoading] = React.useState<boolean>(false)
  const [userData, setuserData] = React.useState<string | null>("")



  return (

    <View style={{ flex: 1, paddingTop: StatusBarManager.HEIGHT, }}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <HeaderMessage token={token} profile={profile} name={name} navigation={props?.navigation} />
        </View>
        <View style={styles.containerMiddle}>
          <MessageMiddle token={token} />
        </View>
        <View style={styles.containerBottom}>
          <MessageBottom token={token} navigation={props?.navigation} />
        </View>
      </View>
      <AlertMessage type={alertType} message={alertMessage} display={setAlertDisplayHolder} displayCon={alertDisplay} />

    </View>
  );
};

export default MessagePage;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  containerHeader: {
    position: "relative",
    width: "100%",
    height: 70,
    backgroundColor: "#fff"
  },
  containerMiddle: {
    position: "relative",
    width: "100%",
    height: messageMiddleHeight,
    backgroundColor: "#f6f6f6"
  },
  containerBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
  },
  // header
  HeaderHolder: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  HeaderHolderImage: {
    position: "relative",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    backgroundColor: "#999"
  },
  HeaderHolderName: {
    position: "relative",
    width: "auto",
  },
  HeaderHolderNameText: {
    fontSize: 17,
    fontWeight: "600",
  },
  // message holder
  MessageHolder: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  MessageHolderLeft: {
    position: "relative",
    width: "auto",
    maxWidth: "60%",
    height: "auto",
    padding: 10,
    marginVertical: 5,
    marginLeft: 10,
    borderTopLeftRadius: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  MessageTextLeft: {
    position: "relative",
    fontSize: 15,
    fontWeight: "600",
    color: "#222"
  },
  MessageHolderRight: {
    position: "relative",
    width: "auto",
    maxWidth: "60%",
    height: "auto",
    padding: 10,
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: "#444",
    borderRadius: 5,
    borderTopRightRadius: 0,
    display: "flex",
    alignSelf: "flex-end"
  },
  MessageTextRight: {
    position: "relative",
    fontSize: 15,
    fontWeight: "600",
    color: "#fff"
  },


  // message Bottom
  MessageBotttom: {
    position: "relative",
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: "#fff"
  },
  MessageBotttomHolder: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  MessageBotttomHolderInput: {
    position: "relative",
    width: "80%",
    backgroundColor: "#f3f3f3",
    borderRadius: 20,
  },
  MessageBotttomInput: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    fontWeight: "500"
  },
  MessageBotttomHolderButton: {
    position: "relative",
    width: 50,
    height: 50,
    backgroundColor: "royalblue",
    borderRadius: 25,
    marginHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  MessageBotttomHolderButtonText: {
    position: "relative",
    color: "white"
  }
});
