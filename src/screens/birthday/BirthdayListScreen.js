import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import BirthdayListItem from "../../components/BirthdayListItem";
import { Context as BirthdayContext } from "../../context/BirthdayContext";

export default function BirthdayListScreen() {
  const { state } = useContext(BirthdayContext);
  const birthdays = state.data;

  return (
    <View>
      <FlatList
        data={birthdays}
        renderItem={(item) => {
          return <BirthdayListItem item={item.item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
