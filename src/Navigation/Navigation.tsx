import * as React from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Screens/Login';
import SignUp from '../Screens/signup';
import Verification from '../Screens/signup/verification';
import Profile from '../Screens/profile/profile';
import ProfileEdit from '../Screens/profile/editProfile';
import Icon from 'react-native-vector-icons/Feather';
import MessageMain from '../Screens/message/main';
import MessagePage from '../Screens/message/message';
import Home from '../Screens/home/home';
import Info from '../Screens/home/info';
import ProfileView from '../Screens/profile/profileView';

interface NavigationProps { }

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return <NavigationContainer>
    <Stack.Navigator initialRouteName='SplashScreen' >
      <Stack.Screen name="SplashScreen" options={{ headerShown: false }}>
        {() => <SplashScreen />}
      </Stack.Screen>

      {/* login */}
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      {/* login */}
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      {/* verification */}
      <Stack.Screen name="Verification" component={Verification} options={{ title: "Verification" }} />

      {/* Home */}
      <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
        title: "ITM Tinder", headerBackVisible: false, headerRight: () => (
          <Icon
            onPress={() => navigation.navigate('Message')}
            name="send"
            color={"#444"} size={25}
          />
        ),
      })} />
      {/* Info */}
      <Stack.Screen name="Info" component={Info} options={({ navigation }) => ({
        title: "ITM Tinder", headerBackVisible: false, headerRight: () => (
          <Icon
            onPress={() => navigation.navigate('Message')}
            name="send"
            color={"#444"} size={25}
          />
        ),
      })} />

      {/* profile view */}
      <Stack.Screen name="ProfileView" component={ProfileView} options={{ title: "Profile" }} />
      {/* profile */}
      <Stack.Screen name="Profile" component={Profile} options={({ navigation }) => ({
        title: 'Profile',
        headerRight: () => (
          <Icon
            onPress={() => navigation.navigate('EditProfile')}
            name="settings"
            color={"#444"} size={20}
          />
        ),
      })} />
      {/* edit profile */}
      <Stack.Screen name="EditProfile" component={ProfileEdit} options={{ title: "Edit Profile" }} />

      {/* message */}
      <Stack.Screen name="Message" component={MessageMain} options={{ title: "Messages" }} />
      {/* message page */}
      <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>

};

export default Navigation;

const styles = StyleSheet.create({
  container: {}
});
