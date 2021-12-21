import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { SCREENS } from "../../navigation/BirthdayNavScreenNames";

export default function SignInScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);

  return (
    <View>
      <Text>Sign In</Text>
      <Button
        title="Sign In"
        onPress={() => {
          signIn({ username: "dipen@torinit.ca", password: "torinit@dipen" });
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
