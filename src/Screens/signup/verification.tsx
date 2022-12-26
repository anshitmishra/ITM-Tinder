import * as React from 'react';
import { Image, View, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface VerificationProps {
    navigation: any
}

const Verification = (props: VerificationProps) => {
    const [code, setCode] = React.useState<string>("")
    // const onLogin = () => {
    //     props.navigation.navigate("Profile")
    // }

    const onLogin = async () => {
        try {
          await AsyncStorage.setItem("auth", "ASd");
          // Configure axios headers
        props.navigation.navigate("Profile")
          
        } catch (error) {
          Promise.reject(error);
        }
      };
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/verification.png')} style={styles.ImageProp} />
            <View style={[styles.containerItem, styles.shadowProp]}>
                <TextInput style={styles.containerInput} maxLength={6} placeholder='verification code'
                    autoComplete='sms-otp'
                    keyboardType='decimal-pad'
                    onChangeText={setCode} value={code}
                />
            </View>
            <View style={styles.containerItem}>
                {/* onPress={onPress} */}
                <Pressable style={styles.containerButton} onPress={onLogin}>
                    <Text style={styles.containerButtonText}>verify account</Text>
                </Pressable>
            </View>
            <View style={styles.containerItem}>
                <Pressable onPress={onLogin}>
                    <Text style={styles.containerText}>don't recive email resend</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Verification;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
        paddingHorizontal: 10,
        backgroundColor: "white",
        display: "flex",
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
