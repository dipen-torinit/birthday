import React, { useContext, useEffect } from "react";
import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
            <TouchableOpacity style={styles.listitem}>
              <Image
                style={styles.listimage}
                source={{
                  uri: "data:image/png;base64," + item.item.image,
                }}
              />
              <View style={styles.listtext}>
                <Text>{item.item.id}</Text>
                <Text>{item.item.name}</Text>
                <Text>{item.item.email}</Text>
                <Text>{item.item.phone}</Text>
                <Text>{item.item.date}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listitem: {
    padding: 10,
    flexDirection: "row",
  },
  listimage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  listtext: {
    margin: 10,
  },
});
