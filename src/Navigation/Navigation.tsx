import * as React from 'react';
import { Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Screens/Login';
import SignUp from '../Screens/signup';


interface NavigationProps { }
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../../assets/logo.png')}
    />
  );
}
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
    </Stack.Navigator>
  </NavigationContainer>

};

export default Navigation;

const styles = StyleSheet.create({
  container: {}
});
