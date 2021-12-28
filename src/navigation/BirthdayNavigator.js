import React, { useContext, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "../screens/auth/SingInScreen";
import SignUpScreen from "../screens/auth/SingUpScreen";
import BirthdayListScreen from "../screens/birthday/BirthdayListScreen";
import TodaysBirthdayScreen from "../screens/birthday/TodaysBirthdayScreen";
import { SCREENS } from "./BirthdayNavScreenNames";
import { Context as AuthContext } from "../context/AuthContext";
import SettingsScreen from "../screens/SettingsScreen";
import AddBirthdayScreen from "../screens/birthday/AddBirthdayScreen";
import TakePictureScreen from "../screens/camera/TakePictureScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function BirthdayNavigator() {
  console.log("BirthdayNavigator");

  const { state, authenticate } = useContext(AuthContext);

  useEffect(() => {
    console.log("Check if user is already login!");
    authenticate();
  }, []);

  return (
    <NavigationContainer>
      {state.token ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === SCREENS.TodaysBirthday) {
                iconName = focused ? "today" : "today-outline";
              } else if (route.name === SCREENS.BirthdayList) {
                iconName = focused ? "list" : "list-outline";
              } else if (route.name === SCREENS.AddBirthdayTab) {
                iconName = focused ? "add" : "add-outline";
              } else if (route.name === SCREENS.Settings) {
                iconName = focused ? "settings" : "settings-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name={SCREENS.TodaysBirthday}
            component={TodaysBirthdayScreen}
          />
          <Tab.Screen
            name={SCREENS.BirthdayList}
            component={BirthdayListScreen}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name={SCREENS.AddBirthdayTab}
            component={AddBirthday}
          />
          <Tab.Screen name={SCREENS.Settings} component={SettingsScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name={SCREENS.SignIn} component={SignInScreen} />
          <Stack.Screen name={SCREENS.SignUp} component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function AddBirthday() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS.AddBirthday} component={AddBirthdayScreen} />
      <Stack.Screen name={SCREENS.TakePicture} component={TakePictureScreen} />
    </Stack.Navigator>
  );
}
