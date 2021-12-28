import React, { useContext, useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import {
  isNotEmpty,
  isValidPassword,
  isValidUsername,
} from "../../common/Validation";
import InputField from "../../components/InputField";
import SubmitButton from "../../components/SubmitButton";
import { Context as AuthContext } from "../../context/AuthContext";
import { SCREENS } from "../../navigation/BirthdayNavScreenNames";

export default function SignInScreen({ navigation }) {
  //Context
  const { state, signIn } = useContext(AuthContext);
  const executeSignIn = () => {
    signIn({ username: username.value, password: password.value });
  };

  //Local state
  const [disableActionButton, setDisableActionButton] = useState(true);
  const [formFields, setFormField] = useState({
    username: { value: "", error: "" },
    password: { value: "", error: "" },
  });
  const { username, password } = formFields;

  useEffect(() => {
    if (
      isNotEmpty(formFields.username.value) &&
      isNotEmpty(formFields.password.value)
    ) {
      setDisableActionButton(
        isNotEmpty(formFields.username.error) ||
          isNotEmpty(formFields.password.error)
      );
    }
  }, [formFields]);

  //After text change
  const afterTextChange = (fieldname, fieldvalue) => {
    let errorMessage = "";
    switch (fieldname) {
      case "username":
        errorMessage = isValidUsername(fieldvalue)
          ? ""
          : "Username should contain 8 or more character";
        break;
      case "password":
        errorMessage = isValidPassword(fieldvalue)
          ? ""
          : "Password should contain 8 or more character";
        break;
    }

    setFormField({
      ...formFields,
      [fieldname]: { value: fieldvalue, error: errorMessage },
    });

    /**
     * Once the value is set we want to verify if their is any error and based on that we want to enable/disable button
     * but setState(setFormField) is asynchronous call so we will not get the latest updated value on this line from "formFields".
     *
     * For that we need to use useEffect hook, it will get callled once the "formFields" is updated properly
     **/
  };

  return (
    <View>
      {state.error !== "" && (
        <Text style={{ color: "red" }}>{state.error.message}</Text>
      )}
      <InputField
        placeholder="Enter username"
        defaultValue={username.value}
        errorMessage={username.error}
        onChangeText={(text) => {
          afterTextChange("username", text);
        }}
        autoCapitalize="none"
      />
      <InputField
        placeholder="Enter password"
        defaultValue={password.value}
        errorMessage={password.error}
        onChangeText={(text) => {
          afterTextChange("password", text);
        }}
        secureTextEntry={true}
      />
      <SubmitButton
        label="Sign In"
        disabled={disableActionButton}
        onPress={() => {
          executeSignIn();
        }}
      />

      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate(SCREENS.SignUp);
        }}
      />
    </View>
  );
}
