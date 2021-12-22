import React, { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as BirthdayContext } from "../../context/BirthdayContext";

export default function AddBirthdayScreen() {
  const authContext = useContext(AuthContext);
  const { state, addBirthday } = useContext(BirthdayContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const executeAddBirthday = () => {
    addBirthday({
      token: authContext.state.token,
      name: name,
      email: email,
      phone: phone,
      date: date,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Enter name"
        style={styles.textInput}
        defaultValue={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <TextInput
        placeholder="Enter email"
        style={styles.textInput}
        defaultValue={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter phone"
        style={styles.textInput}
        defaultValue={phone}
        onChangeText={(text) => {
          setPhone(text);
        }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter date"
        style={styles.textInput}
        defaultValue={date}
        onChangeText={(text) => {
          setDate(text);
        }}
        autoCapitalize="none"
      />

      <Button
        title="Add Birthday"
        onPress={() => {
          executeAddBirthday();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    margin: 10,
    backgroundColor: "lightgrey",
  },
});
