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
      {/* profile */}
      <Stack.Screen name="Profile" component={Profile} options={({ navigation }) => ({
              title: 'Profile',
              headerRight: () => (
                <Icon
                  onPress={() => navigation.navigate('EditProfile')}
                  name="settings"
                  color={"#444"} size={20 }
                />
              ),
            })} />
      {/* edit profile */}
      <Stack.Screen name="EditProfile" component={ProfileEdit} options={{ title: "Edit Profile" }} />
    </Stack.Navigator>
  </NavigationContainer>

};

export default Navigation;

const styles = StyleSheet.create({
  container: {}
});
