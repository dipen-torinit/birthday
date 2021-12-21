import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";

export default function SignUpScreen() {
  const { signUp } = useContext(AuthContext);

  return (
    <View>
      <Text>Sign In</Text>
      <Button
        title="Sign Up"
        onPress={() => {
          signUp({ username: "dipen@torinit.ca", password: "torinit@dipen" });
        }}
      />
    </View>
  );
}
