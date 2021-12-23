import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function InputField(props) {
  return (
    <View>
      <TextInput {...props} style={styles.textInput}></TextInput>
      {props.errorMessage !== "" && (
        <Text style={styles.textError}>{props.errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    margin: 10,
    backgroundColor: "lightgrey",
  },
  textError: { marginStart: 10, marginBottom: 10, color: "red" },
});
