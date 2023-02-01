import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface AlertProps {
    display:Function,
    displayCon:boolean,
    message: string,
    type: string | "error" | "success" | "info",
}

const AlertMessage = (props: AlertProps) => {
    const [display, setDisplay] = React.useState<boolean>(false);
    const [color, setColor] = React.useState<string>("#c9b787");
    const [bgcolor, setBgColor] = React.useState<string>("#f8e8c0");
    React.useEffect(() => {
        if(props.message != ""){
            setDisplay(true);
        }
        if(props.type == "error"){
            setBgColor("#f93d5a");
            setColor("#fff");
        }else if(props.type == "success"){
           
        }else if(props.type == "info"){
            setBgColor("#f8e8c0");
            setColor("#c9b787");
        }else{
            setBgColor("#d1f4da");
            setColor("#709e69");
        }
        setTimeout(() => {
            setDisplay(false);
            props.display(false);
        },1000)
    }, [props.displayCon])
    return (
        <View style={[styles.container, { backgroundColor: bgcolor, display: display == true ? "flex" : "none" }]}>
            <Text style={[styles.containerMessage, { color: color }]} numberOfLines={2}>{props.message}</Text>
        </View>
    );
};

export default AlertMessage;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 5,
        alignSelf: "center",
        width: "95%",
        height: "auto",
        padding: 10,
        borderRadius: 10,
    },
    containerMessage: {
        position: "relative",
        padding: 5,
        fontSize:16,
        fontWeight:"500"
    }
});
