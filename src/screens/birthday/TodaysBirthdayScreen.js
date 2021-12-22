import React, { useContext, useEffect } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as BirthdayContext } from "../../context/BirthdayContext";

export default function TodaysBirthdayScreen() {
  const authContext = useContext(AuthContext);
  const { state, getBirthday } = useContext(BirthdayContext);

  useEffect(() => {
    getBirthday({ token: authContext.state.token });
  }, []);

  return (
    <View>
      <FlatList
        data={state.data}
        renderItem={(item) => {
          return (
            <View style={{ padding: 10 }}>
              <Text>{item.item.id}</Text>
              <Text>{item.item.name}</Text>
              <Text>{item.item.email}</Text>
              <Text>{item.item.phone}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
