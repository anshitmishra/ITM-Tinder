import * as React from 'react';
import { Image, View, StyleSheet, TextInput, Pressable, Text, Alert, } from 'react-native';

interface SignUpProps {
  navigation: any
}

const SignUp = (props: SignUpProps) => {
  const [email, setEmail] = React.useState<string>("")
  const [name, setName] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")

  const onLogin = () => {
    props.navigation.navigate("Verification", { emails: "anshitmishra03@gmail.com" })
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
        <Pressable style={styles.containerButton} onPress={onLogin}>
          <Text style={styles.containerButtonText}>SignUp</Text>
        </Pressable>
      </View>
      <View style={styles.containerItem}>
        <Pressable onPress={onLogin}>
          <Text style={styles.containerText}>already have Account?? Login</Text>
        </Pressable>
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
