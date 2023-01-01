import * as React from 'react';
import { Text, View, Platform, StyleSheet, TextInput, ScrollView, Pressable, Button, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import List from '../../apis/list';
import AlertMessage from '../utils/alert';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/AntDesign"

interface ProfileEditProps { }

const ProfileEdit = (props: ProfileEditProps) => {
  const [alertDisplay, setAlertDisplay] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<string>("")
  const [alertMessage, setAlertMessage] = React.useState<string>("")
  const setAlertDisplayHolder = (data: boolean) => {
    setAlertDisplay(data)
  }
  const [loading, setLoading] = React.useState<boolean>(false)
  const [userData, setuserData] = React.useState<string | null>("")

  const ApiLinks = List();

  const [email, setEmail] = React.useState<string>("")
  const [named, setName] = React.useState<string>("")
  const [profile, setProfile] = React.useState<string>("")
  const [cover, setCover] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")
  const [college, setCollege] = React.useState<string>("")
  const [gender, setGender] = React.useState<string>("")
  const [intrested, setIntrested] = React.useState<string>("")
  const [insta, setInsta] = React.useState<string>("")
  const [snap, setSnap] = React.useState<string>("")
  const [twitter, setTwitter] = React.useState<string>("")

  const [value, setValue] = React.useState<string>("");
  const [items, setItems] = React.useState([
    { key: 0, value: 'Male' },
    { key: 1, value: 'Female' },
    { key: 2, value: 'Other' }
  ]);


  const getData = async () => {
    setLoading(true)
    const data = await AsyncStorage.getItem("auth");
    setuserData(data)
    const payload = {
      token: data
    }

    ApiLinks.ShowProfile(payload).then((data: any) => {
      if (data.status == true) {
        setLoading(false)
        setEmail(data?.data?.email)
        setName(data?.data?.name)
        setProfile(data?.data?.profile)
        setCover(data?.data?.cover)
        setDescription(data?.data?.description)
        setCollege(data?.data?.college)
        setGender(data?.data?.gender)
        setIntrested(data?.data?.intrested)
        setInsta(data?.data?.insta)
        setSnap(data?.data?.snap)
        setTwitter(data?.data?.twitter)
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

  const SaveData = async () => {
    setLoading(true)
    const data = await AsyncStorage.getItem("auth");
    setuserData(data)
    const payload = {
      token: data,
      profile: profile,
      cover: cover,
      name: named,
      description: description,
      college: college,
      gender: gender,
      intrested: intrested,
      insta: insta,
      snap: snap,
      twitter: twitter
    }

    console.log(payload);


    ApiLinks.SaveProfile(payload).then((data: any) => {
      if (data.status == true) {
        setLoading(false)
        setAlertDisplayHolder(true)
        setAlertType("success")
        setAlertMessage(data.message)
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







  const [image2, setImage2] = React.useState<any>(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3,3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage2(result.assets[0]);
      
    }
  };

  const [image4, setImage4] = React.useState<any>(null);
  const pickCoverImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage4(result.assets[0]);
    }
  };


  const profileUplaod = async () => {
    const token: any = await AsyncStorage.getItem("auth");
    const data: any = {
      uri: image2.uri,
      type: 'image/jpg',
      name: 'uploadimage.jpg'
    }

    const body = new FormData();
    body.append("token", token);
    body.append("position", "profile");
    body.append("type", "profile");
    body.append('fileToUpload', data);
    console.log(body)
    axios.post("http://10.0.2.2/test/upload.php", body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then((data: any) => {
      if (data.status == 200) {
        setProfile(data.data.data)
        console.log(data.data.data, "profile");
        const payload = {
          token: token,
          profile: data?.data?.data,
          cover: cover,
          name: named,
          description: description,
          college: college,
          gender: gender,
          intrested: intrested,
          insta: insta,
          snap: snap,
          twitter: twitter
        }
        ApiLinks.SaveProfile(payload).then((data: any) => {
          if (data.status == true) {
            setLoading(false)
            setAlertDisplayHolder(true)
            setAlertType("success")
            setAlertMessage(data.message)
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
    }).catch((err: any) => {
      setLoading(false)
      setAlertDisplayHolder(true)
      setAlertType("error")
      setAlertMessage(err.message)
    });
  }



  const coverUplaod = async () => {
   
    const token: any = await AsyncStorage.getItem("auth");
    const data: any = {
      uri: image4.uri,
      type: 'image/jpg',
      name: 'uploadimage.jpg'
    }

    const body = new FormData();
    body.append("token", token);
    body.append("position", "cover");
    body.append("type", "cover");
    body.append('fileToUpload', data);
    console.log(body)
    axios.post("http://10.0.2.2/test/upload.php", body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then((data: any) => {
      if (data.status == 200) {
        setCover(data.data.data)
        const payload = {
          token: token,
          profile: profile,
          cover: data?.data?.data,
          name: named,
          description: description,
          college: college,
          gender: gender,
          intrested: intrested,
          insta: insta,
          snap: snap,
          twitter: twitter
        }
        ApiLinks.SaveProfile(payload).then((data: any) => {
          if (data.status == true) {
            setLoading(false)
            setAlertDisplayHolder(true)
            setAlertType("success")
            setAlertMessage(data.message)
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
    }).catch((err: any) => {
      setLoading(false)
      setAlertDisplayHolder(true)
      setAlertType("error")
      setAlertMessage(err.message)
    });
  }

  React.useEffect(() => {
    if(image4 != null){
      coverUplaod();
    }
  },[image4])
 

  React.useEffect(() => {
    if(image2 != null){
      profileUplaod();
    }
  },[image2])

  React.useEffect(() => {
    getData();
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerHolder}>
          <View style={styles.containerHolderCover}>
            <Pressable onPress={pickCoverImage} style={styles.containerHolderProfileUpload}><Icon name='camera' size={25}></Icon></Pressable>
            <Image source={{ uri: cover ? cover : "https://s3.amazonaws.com/popco/images/services/starter-page/img-placeholder.jpg" }} style={styles.containerHolderCoverImage} />
            <View style={styles.containerHolderProfile}>
              <Pressable onPress={pickImage}  style={styles.containerHolderProfileUpload}><Icon name='camera' size={25}></Icon></Pressable>
              <Image source={{ uri: profile ? profile : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }} style={styles.containerHolderProfileImage} />
            </View>
          </View>
        </View>

        <View style={styles.containerHolderInputs}>

          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>Email</Text>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="email-address" placeholder='email' value={email} onChangeText={setEmail}></TextInput>
          </View>

          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>Full Name</Text>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="default" placeholder='full name' value={named} onChangeText={setName}></TextInput>
          </View>

          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>About Me</Text>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="default" placeholder='about me' value={description} onChangeText={setDescription}></TextInput>
          </View>

          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>College</Text>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="default" placeholder='college/university' value={college} onChangeText={setCollege}></TextInput>
          </View>

          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>Gender</Text>
          <View style={styles.containerHolderInputsItem}>
            <SelectList
              search={false}
              setSelected={(val: string) => setGender(val)}
              data={items}
              save="value"
              placeholder='Gender'
              defaultOption={gender ? gender == "male" ? items[0] : gender == "female" ? items[1] : items[2] : items[0]}
              boxStyles={{ borderWidth: 0 }}
            />
          </View>

          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>Instagram</Text>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="url" placeholder='instagram link' value={insta} onChangeText={setInsta}></TextInput>
          </View>
          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>SnapChat</Text>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="url" placeholder='snapchat link' value={snap} onChangeText={setSnap}></TextInput>
          </View>

          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>Twitter</Text>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="url" placeholder='twitter link' value={twitter} onChangeText={setTwitter}></TextInput>
          </View>

          <Text style={{ marginTop: 5, paddingHorizontal: 10 }}>Instrested In</Text>
          <View style={styles.containerHolderInputsItem}>
            <SelectList
              search={false}
              setSelected={(val: string) => setValue(val)}
              data={items}
              save="value"
              placeholder='intrested in'
              defaultOption={intrested ? intrested == "male" ? items[0] : intrested == "female" ? items[1] : items[2] : items[1]}
              boxStyles={{ borderWidth: 0 }}
            />
          </View>
          <View style={styles.containerHolderButton}>
            <Pressable style={styles.containerHolderButtonItem} onPress={SaveData}>
              <Text style={styles.containerHolderButtonItemText}>save</Text>
            </Pressable>
          </View>
        </View>

      </View>
      <AlertMessage type={alertType} message={alertMessage} display={setAlertDisplayHolder} displayCon={alertDisplay} />

    </ScrollView>
  );
};

export default ProfileEdit;

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
    backgroundColor: "#eee",
  },
  containerHolderProfileUpload: {
    position: "absolute",
    bottom: 0,
    right: -10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
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
  containerHolderInputs: {
    position: "relative",
    width: "100%",
    height: "auto",
    paddingHorizontal: 10,
  },
  containerHolderInputsItem: {
    position: "relative",
    width: "100%",
    height: "auto",
    marginVertical: 10,
    borderWidth: .2,
    borderColor: "#444",
    borderRadius: 5
  },
  containerHolderInputsItemInput: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  containerHolderButton: {
    position: "relative",
    width: "100%",
    height: "auto",
    marginVertical: 20
  },
  containerHolderButtonItem: {
    borderRadius: 5,
    backgroundColor: "royalblue",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerHolderButtonItemText: {
    position: "relative",
    color: "white",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center"

  }


});
