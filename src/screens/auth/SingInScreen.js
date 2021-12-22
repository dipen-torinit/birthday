import React, { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { SCREENS } from "../../navigation/BirthdayNavScreenNames";

export default function SignInScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const executeSignIn = () => {
    signIn({ username: username, password: password });
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
        title="Sign In"
        onPress={() => {
          executeSignIn();
        }}
      />

      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate(SCREENS.SignUp);
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
