import React from "react";
import { StyleSheet, Text, View } from "react-native"

const MainData = () => {
    return (
        <>
            <View>
                <Text style={Style.mainContainer}> hello how are you </Text>
            </View>
        </>
    );
};

const Style = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default MainData;