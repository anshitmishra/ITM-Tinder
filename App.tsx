import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/Navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from './src/Screens/utils/socket';


export default function App() {
  const [userData, setuserData] = React.useState<string | null>("")
  React.useEffect(() => {
    getData();
  }, [])
  // const getToken = () => {
  //   try {

  //     socketSave(data)
  //   } catch (error) {

  //   }
  // }
  const getData = async () => {

    try {
      const value = await AsyncStorage.getItem('auth')
      if (value !== null) {
        // value previously stored
        console.log(socket.id, "ASDsfdafsdas");

        socket.emit("save_socket", { user: value });

        console.log(value, "ASDas");
      }
    } catch (e) {
      // error reading value
    }
  }

  // const socketSave = () => {

  // } 

  return (
    <>
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
