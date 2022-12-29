import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
import { Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/Feather"
const windowHeight = Dimensions.get('window').height;
const messageMiddleHeight = windowHeight - 140;




const HeaderMessage = () => {
  return (
    <>
      <View style={styles.HeaderHolder}>
        <Pressable><Icon name="arrowleft" size={20} />
        </Pressable>
        <View style={styles.HeaderHolderImage}>
        </View>
        <View style={styles.HeaderHolderName}>
          <Text style={styles.HeaderHolderNameText}>Anshit mishra</Text>
        </View>
      </View>
    </>
  )
}

const renderItem = (props: any) => {
  return (
    <>
      {props.item.messageSide == 'l' ?
        <View style={styles.MessageHolderLeft} key={props.index}>
          <Text style={styles.MessageTextLeft}>{props.item.title}</Text>
        </View> : <View style={styles.MessageHolderRight} key={props.index}>
          <Text style={styles.MessageTextRight}>{props.item.title}</Text>
        </View>}
    </>
  )

}

const MessageMiddle = () => {
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

  React.useEffect(() => {
    listViewRef.scrollToEnd({ animated: true });
  }, [])

  return (
    <>
      <FlatList
        data={DATA}
        renderItem={({ item, index }: any) => (
          renderItem({ item, index })
        )}
        keyExtractor={(item: any, index: any) => index}
        style={styles.MessageHolder}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={(ref) => {
          listViewRef = ref;
        }}
      >
      </FlatList>
    </>
  )
}


const MessageBottom = () => {
  return (
    <>
      <View style={styles.MessageBotttom}>
        <View style={styles.MessageBotttomHolder}>
          <View style={styles.MessageBotttomHolderInput}>
            <TextInput style={styles.MessageBotttomInput} placeholder={"message"} multiline={true}
              numberOfLines={4} keyboardType={"default"} />
          </View>
          <Pressable style={styles.MessageBotttomHolderButton}>
            <Text style={styles.MessageBotttomHolderButtonText}>
              <Icon2 name="send" size={25} />
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}

interface MessagePageProps { }
const MessagePage = (props: MessagePageProps) => {
  return (

    <View style={{ flex: 1, paddingTop: StatusBarManager.HEIGHT, }}>

      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <HeaderMessage />
        </View>
        <View style={styles.containerMiddle}>
          <MessageMiddle />
        </View>
        <View style={styles.containerBottom}>
          <MessageBottom />
        </View>
      </View>
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
