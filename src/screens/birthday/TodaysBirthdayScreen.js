import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";

export default function TodaysBirthdayScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>Todays Birthday</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}
