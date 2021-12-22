import React, { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";

export default function SignUpScreen({ navigation }) {
  const { signUp } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const executeSignIn = () => {
    signUp({ username: username, password: password });
  };

  return (
    <View>
      <TextInput
        placeholder="Enter username"
        style={styles.textInput}
        defaultValue={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter password"
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        defaultValue={password}
      />
      <Button
        title="Sign Up"
        onPress={() => {
          executeSignIn();
        }}
      />

      <Button
        title="Sign In"
        onPress={() => {
          navigation.goBack();
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
