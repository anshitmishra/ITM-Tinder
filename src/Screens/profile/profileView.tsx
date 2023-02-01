import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable, Linking, Image } from 'react-native';
import List from '../../apis/list';
import AlertMessage from '../utils/alert';
import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/FontAwesome5"
import { useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
interface ProfileViewProps { }

const ProfileView = (props: ProfileViewProps) => {
  const route = useRoute<any>();
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
    const data = route?.params?.token;
    setuserData(data)
    const payload = {
      token: data
    }
    ApiLinks.MainProfile(payload).then((data: any) => {
      console.log(data);

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
    getData();
  }, [])
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerHolder}>
          <View style={styles.containerHolderCover}>
            {/* <Image source={{ uri: data?.cover ? data?.cover : "https://s3.amazonaws.com/popco/images/services/starter-page/img-placeholder.jpg" }} style={styles.containerHolderCoverImage} /> */}
            <FastImage
              style={styles.containerHolderCoverImage}
              source={{
                uri: `${data?.cover ? data?.cover : "https://s3.amazonaws.com/popco/images/services/starter-page/img-placeholder.jpg" }`,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.containerHolderProfile}>
              {/* <Image source={{ uri: data?.profile ? data?.profile : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }} style={styles.containerHolderProfileImage} /> */}
              <FastImage
              style={styles.containerHolderCoverImage}
              source={{
                uri: `${data?.profile ? data?.profile : "https://s3.amazonaws.com/popco/images/services/starter-page/img-placeholder.jpg" }`,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            </View>
          </View>
          <View style={styles.containerHolderName}>
            <Text style={styles.containerHolderNameText}>{data?.name}</Text>

          </View>
        </View>
        <View style={styles.containerHolderDec}>
          <Text style={styles.containerHolderDecHeading}>About me</Text>
          <Text style={styles.containerHolderDecText}>{data?.description ? data?.description : "this app is developed by anshit mishra"}</Text>
        </View>
        <View style={styles.containerHolderSocial}>
          {data?.insta ? <Pressable onPress={() => Linking.openURL(`${data?.insta ? data?.insta : "instagram.com"}`)}><Icon name='instagram' size={25}></Icon></Pressable> : ""}
          {data?.snap ? <Pressable onPress={() => Linking.openURL(`${data?.insta ? data?.insta : "snapchat.com"}`)}><Icon2 name='snapchat' size={25}></Icon2></Pressable> : ""}
          {data?.twitter ? <Pressable onPress={() => Linking.openURL(`${data?.insta ? data?.insta : "twitter.com"}`)}><Icon name='twitter' size={25}></Icon></Pressable> : ""}
        </View>
        <View style={styles.containerHolderPhoto}>
          <Text style={styles.containerHolderPhotoHeading}>Photos</Text>
          <View style={styles.containerHolderPhotoContainer}>
            {data?.images.map((image: any, index: any) => {
              return (
                <View key={index} style={styles.containerHolderPhotoContainerItem}>
                  <Image source={{ uri: image.image }} style={styles.containerHolderPhotoContainerItemImage} />
                
                
                </View>
              )
            })}

          </View>
        </View>
      </View>
      <AlertMessage type={alertType} message={alertMessage} display={setAlertDisplayHolder} displayCon={alertDisplay} />

    </ScrollView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    backgroundColor: "white"
  },
  containerHolder: {
    position: "relative",
    width: "100%",
    height: 250,
    paddingVertical: 10,
  },
  containerHolderCover: {
    position: "relative",
    width: "100%",
    height: 150,
    display: "flex",
    borderRadius: 10,
    backgroundColor: "#f5f5f5"
  },
  containerHolderProfile: {
    position: "absolute",
    bottom: -75,
    left: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#eee"
  },
  containerHolderProfileImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    borderRadius: 75,
    resizeMode: "cover"
  },
  containerHolderCoverImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover"
  },
  containerHolderName: {
    position: "absolute",
    top: 170,
    right: 10,
    width: "45%",
  },
  containerHolderNameText: {
    fontSize: 19,
    fontWeight: "500",
    textTransform: "capitalize",
    color: "#444"
  },
  containerHolderDec: {
    position: "relative",
    width: "100%",
    padding: 10
  },
  containerHolderSocial: {
    position: "relative",
    width: "50%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  containerHolderDecHeading: {
    position: "relative",
    width: "100%",
    fontSize: 17,
    fontWeight: "600",
    color: "#444"
  },
  containerHolderDecText: {
    position: "relative",
    width: "70%",
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 10,
    color: "#777"
  },
  containerHolderPhoto: {
    position: "relative",
    width: "100%",
  },
  containerHolderPhotoHeading: {
    position: "relative",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: "700",
    fontSize: 17,
    borderBottomWidth: .6,
    borderBottomColor: "#777",
    color: "#444"
  },
  containerHolderPhotoContainer: {
    position: "relative",
    width: "100%",
    marginVertical: 10,
    padding: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center"
  },
  containerHolderPhotoContainerItem: {
    position: "relative",
    width: "31%",
    maxWidth: 120,
    height: 140,
    margin: "1%",
    backgroundColor: "#f1f1f1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  containerHolderPhotoContainerItemImage: {
    position: "relative",
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  }
});
