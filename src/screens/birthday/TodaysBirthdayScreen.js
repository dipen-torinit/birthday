import React, { useContext, useEffect } from "react";
import { FlatList, View } from "react-native";
import BirthdayListItem from "../../components/BirthdayListItem";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as BirthdayContext } from "../../context/BirthdayContext";
import { currentDate } from "../../utils/DateUtils";

export default function TodaysBirthdayScreen() {
  const authContext = useContext(AuthContext);
  const { state, getBirthday } = useContext(BirthdayContext);

  let birthdays;
  if (Array.isArray(state.data)) {
    birthdays = state.data.filter((e) => e.date === currentDate());
  } else {
    birthdays = state.data;
  }

  //Execute call to fetch all birthday from DB
  useEffect(() => {
    getBirthday({ token: authContext.state.token });
  }, []);

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
