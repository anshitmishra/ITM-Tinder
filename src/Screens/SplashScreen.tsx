import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
interface SplashScreenProps {}

const SplashScreen = (props: SplashScreenProps) => {
  const [userData, setuserData] = React.useState<string | null>("")
  const navigation = useNavigation<any>();
  const getToken = async () => {
    try {
     const data = await AsyncStorage.getItem("auth");
     setuserData(data);
    } catch (error) {
     
    }
  }
    React.useEffect(() => {
      getToken();
      setTimeout(() =>  {
        if(userData == ""){
          navigation.dispatch(
            StackActions.replace('Home')
          );
        }else{
          navigation.dispatch(
            StackActions.replace('Login')
          );
        }
      },1500)
    },[])
    
  return (
    <View style={styles.container}>
      <Image style={styles.containerImage} source={require('../../assets/logo.png')} />
      <Text style={styles.containerHeading} >ITM Tinder </Text>
      <Text style={styles.containerSubHeading} >made by anshit mishra</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"
  },
  containerImage: {
    width:"50%",
    height:250,
    resizeMode:"contain"
  },
  containerHeading:{
    fontSize:30,
    fontWeight:"600"
  },
  containerSubHeading:{
    position:"relative",
    fontSize:14,
    fontWeight:"500",
    marginTop:10
  }
});
