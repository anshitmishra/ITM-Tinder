import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';

interface ProfileViewProps { }

const ProfileView = (props: ProfileViewProps) => {
  const [flexDirection, setflexDirection] = React.useState("column");
  const save = () => {
    Alert.alert("asdasfas")
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.containerHolder}>
        <View style={styles.containerHolderCover}>
          <View style={styles.containerHolderProfile}>
          </View>
        </View>
        <View style={styles.containerHolderName}>
          <Text style={styles.containerHolderNameText}>Anshit mishra</Text>
        </View>
      </View>
      <View style={styles.containerHolderDec}>
        <Text style={styles.containerHolderDecHeading}>About me</Text>
        <Text style={styles.containerHolderDecText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo totam quidem ipsa facere illo error suscipit veniam at, nam beatae excepturi, reiciendis possimus harum libero architecto saepe quod earum delectus!</Text>
      </View>
      <View style={styles.containerHolderPhoto}>
        <Text style={styles.containerHolderPhotoHeading}>Photos</Text>
        <View style={styles.containerHolderPhotoContainer}>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
            <View style={styles.containerHolderPhotoContainerItem}>
            </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    backgroundColor: "white"
  },
  containerHolder: {
    position: "relative",
    width: "100%",
    height: 250,
    paddingVertical: 10,
  },
  containerHolderCover: {
    position: "relative",
    width: "100%",
    height: 150,
    display: "flex",
    borderRadius: 10,
    backgroundColor: "#f5f5f5"
  },
  containerHolderProfile: {
    position: "absolute",
    bottom: -75,
    left: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#eee"
  },
  containerHolderName: {
    position: "absolute",
    top: 170,
    right: 10,
    width: "45%",
  },
  containerHolderNameText: {
    fontSize: 19,
    fontWeight: "500",
    textTransform: "capitalize",
    color: "#444"
  },
  containerHolderDec: {
    position: "relative",
    width: "100%",
    padding: 10
  },
  containerHolderDecHeading: {
    position: "relative",
    width: "100%",
    fontSize: 17,
    fontWeight: "600",
    color: "#444"
  },
  containerHolderDecText: {
    position: "relative",
    width: "70%",
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 10,
    color: "#777"
  },
  containerHolderPhoto: {
    position: "relative",
    width: "100%",
  },
  containerHolderPhotoHeading: {
    position: "relative",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: "700",
    fontSize: 17,
    borderBottomWidth: .6,
    borderBottomColor: "#777",
    color: "#444"
  },
  containerHolderPhotoContainer: {
    position: "relative",
    width: "100%",
    marginVertical: 10,
    padding: 5,
    flexWrap:"wrap",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  containerHolderPhotoContainerItem: {
    position: "relative",
    width: "31%",
    maxWidth: 120,
    height: 100,
    margin: "1%",
    backgroundColor:"#f1f1f1"    
  }
});
