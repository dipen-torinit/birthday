import React, { useContext } from "react";
import { Button, View } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

export default function SettingsScreen() {
  const { signOut } = useContext(AuthContext);

  const executeSignOut = () => {
    signOut();
  };

  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          executeSignOut();
        }}
      />
    </View>
  );
}
