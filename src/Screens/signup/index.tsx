import * as React from 'react';
import { Image, View, StyleSheet, TextInput, Pressable, Text, Alert, } from 'react-native';
import List from '../../apis/list';
import AlertMessage from '../utils/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignUpProps {
  navigation: any
}

const SignUp = (props: SignUpProps) => {
  const [alertDisplay, setAlertDisplay] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<string>("")
  const [alertMessage, setAlertMessage] = React.useState<string>("")
  const setAlertDisplayHolder = (data: boolean) => {
    setAlertDisplay(data)
  }
  const [loading, setLoading] = React.useState<boolean>(false)

  const ApiLinks = List();



  const [email, setEmail] = React.useState<string>("")
  const [name, setName] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")


  const Signup = () => {
    if (email == "" || password == "") {
      setAlertDisplayHolder(true)
      setAlertType("error")
      setAlertMessage("email or password is empty")
    } else {
      const payload = {
        'email': email,
        'password': password,
        'fullname': name
      }
      setLoading(true)
      ApiLinks.Signup(payload).then((data: any) => {
        if (data?.status == "false") {
          setAlertDisplayHolder(true)
          setAlertType("error")
          setAlertMessage(data.message)
          setLoading(false)
        } else {
          if(data.message == "account created succesfully."){
            setAlertDisplayHolder(true)
            setAlertType("success")
            setAlertMessage(data.message)
            getToken(data?.data?.token)
          }else{
            setAlertDisplayHolder(true)
            setAlertType("error")
            setAlertMessage(data?.message)
          }
          setLoading(false)
        }
      }).catch((err) => {
        setLoading(false)
        setAlertDisplayHolder(true)
        setAlertType("error")
        setAlertMessage(err.message)
      });
    }
  }
  


  const onLogin = () => {
    props.navigation.navigate("Home")
  }


  const getToken = async (data: string) => {
    try {
      await AsyncStorage.setItem("auth", `${data}`);
      onLogin();
    } catch (error) {
      setLoading(false)
      setAlertDisplayHolder(true)
      setAlertType("error")
      setAlertMessage("something is worng in login contact developer")
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/signup.png')} style={styles.ImageProp} />
      <View style={[styles.containerItem, styles.shadowProp]}>
        <TextInput style={styles.containerInput} placeholder='Email'
          keyboardType="email-address"
          autoComplete='email' onChangeText={setEmail} value={email} />
      </View>
      <View style={[styles.containerItem, styles.shadowProp]}>
        <TextInput style={styles.containerInput} placeholder='Full Name'
          keyboardType="default"
          autoComplete='name' onChangeText={setName} value={name} />
      </View>
      <View style={[styles.containerItem, styles.shadowProp]}>
        <TextInput style={styles.containerInput} placeholder='Password'
          secureTextEntry={true}
          autoComplete='password'
          onChangeText={setPassword} value={password}
        />
      </View>

      <View style={styles.containerItem}>
        {/* onPress={onPress} */}
        <Pressable style={styles.containerButton} onPress={Signup}>
          <Text style={styles.containerButtonText}>{loading == true ? "creating account..." : "signup"}</Text>
        </Pressable>
      </View>
      <View style={styles.containerItem}>
        <Pressable onPress={() => {props.navigation.navigate("Login")}}>
          <Text style={styles.containerText}>already have Account?? Login</Text>
        </Pressable>
      </View>
      <AlertMessage type={alertType} message={alertMessage} display={setAlertDisplayHolder} displayCon={alertDisplay} />

    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  containerItem: {
    position: "relative",
    width: "90%",
    height: "auto",
    margin: 10,
  },
  containerInput: {
    position: "relative",
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 17,
    fontWeight: "500"
  },
  containerButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "royalblue",
    borderRadius: 7
  },
  containerButtonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    color: "white",
  },
  shadowProp: {
    borderWidth: .2,
    borderColor: "#444",
    shadowColor: '#f0f0fd',
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 3,
    elevation: 1,
    borderRadius: 8,
  },
  ImageProp: {
    width: "100%",
    height: "50%",
    resizeMode: "contain"
  },
  containerText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    opacity: .4
  }
});
