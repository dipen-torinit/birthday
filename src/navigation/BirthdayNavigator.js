import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "../screens/auth/SingInScreen";
import SignUpScreen from "../screens/auth/SingUpScreen";
import BirthdayListScreen from "../screens/birthday/BirthdayListScreen";
import TodaysBirthdayScreen from "../screens/birthday/TodaysBirthdayScreen";
import { SCREENS } from "./BirthdayNavScreenNames";
import { Context as AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function BirthdayNavigator() {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {state.isAuthenticating ? (
        <Tab.Navigator>
          <Tab.Screen
            name={SCREENS.TodaysBirthday}
            component={TodaysBirthdayScreen}
          />
          <Tab.Screen
            name={SCREENS.BirthdayList}
            component={BirthdayListScreen}
          />
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
