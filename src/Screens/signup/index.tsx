import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SignUpProps { }

const SignUp = (props: SignUpProps) => {
  return (
    <View style={styles.container}>
      {/* progress bar */}
      <View style={styles.containerProgress}>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop:30
  },
  containerProgress: {
    position:"relative",
    width:"100%",
    paddingVertical:1,
    backgroundColor:"royalblue"
  }
});
