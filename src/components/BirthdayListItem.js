import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function BirthdayListItem(props) {
  const { item } = props;
  return (
    <TouchableOpacity style={styles.listitem}>
      <Image
        style={styles.listimage}
        source={{
          uri: "data:image/png;base64," + item.image,
        }}
      />
      <View style={styles.listtext}>
        <Text>{item.name}</Text>
        <Text>{item.email}</Text>
        <Text>{item.phone}</Text>
        <Text>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listitem: {
    padding: 10,
    flexDirection: "row",
    borderColor: "black",
  },
  listimage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: "darkgray",
  },
  listtext: {
    margin: 10,
  },
});
