import * as React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
interface ProfileEditProps { }

const ProfileEdit = (props: ProfileEditProps) => {
  const [value, setValue] = React.useState<string>("");
  const [items, setItems] = React.useState([
    { key: 0, value: 'Male' },
    { key: 1, value: 'Female' },
    { key: 2, value: 'Other' }
  ]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerHolder}>
          <View style={styles.containerHolderCover}>
            <View style={styles.containerHolderProfile}>

            </View>
          </View>
        </View>

        <View style={styles.containerHolderInputs}>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="email-address" placeholder='email'></TextInput>
          </View>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="default" placeholder='full name'></TextInput>
          </View>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="default" placeholder='about me'></TextInput>
          </View>
          <View style={styles.containerHolderInputsItem}>
            <SelectList
              search={false}
              setSelected={(val: string) => setValue(val)}
              data={items}
              save="value"
              placeholder='Gender'
              defaultOption={items[0]}
              boxStyles={{ borderWidth: 0 }}
            />
          </View>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="url" placeholder='instagram link'></TextInput>
          </View>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="url" placeholder='facebook link'></TextInput>
          </View>
          <View style={styles.containerHolderInputsItem}>
            <TextInput style={styles.containerHolderInputsItemInput} keyboardType="url" placeholder='twitter link' ></TextInput>
          </View>
          <View style={styles.containerHolderButton}>
            <Pressable style={styles.containerHolderButtonItem} >
              <Text style={styles.containerHolderButtonItemText}>save</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

export default ProfileEdit;

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
  containerHolderInputs: {
    position: "relative",
    width: "100%",
    height: "auto",
    paddingHorizontal: 10,
  },
  containerHolderInputsItem: {
    position: "relative",
    width: "100%",
    height: "auto",
    marginVertical: 10,
    borderWidth: .2,
    borderColor: "#444",
    borderRadius: 5
  },
  containerHolderInputsItemInput: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  containerHolderButton: {
    position: "relative",
    width: "100%",
    height: "auto",
    marginVertical: 20
  },
  containerHolderButtonItem: {
    borderRadius: 5,
    backgroundColor: "royalblue",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerHolderButtonItemText: {
    position: "relative",
    color: "white",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center"

  }


});
