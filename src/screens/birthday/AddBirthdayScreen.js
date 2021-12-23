import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import {
  isNotEmpty,
  isValidDate,
  isValidEmail,
  isValidName,
  isValidPhone,
} from "../../common/Validation";
import InputField from "../../components/InputField";
import SubmitButton from "../../components/SubmitButton";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as BirthdayContext } from "../../context/BirthdayContext";

export default function AddBirthdayScreen() {
  //Context
  const authContext = useContext(AuthContext);
  const { addBirthday } = useContext(BirthdayContext);
  const executeAddBirthday = () => {
    const { name, email, phone, date } = formFields;
    addBirthday({
      token: authContext.state.token,
      name: name.value,
      email: email.value,
      phone: phone.value,
      date: date.value,
    });
  };

  //Local states
  const [disableActionButton, setDisableActionButton] = useState(true);
  const [formFields, setFormField] = useState({
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    phone: { value: "", error: "" },
    date: { value: "", error: "" },
  });
  const { name, email, phone, date } = formFields;

  useEffect(() => {
    setDisableActionButton(
      isNotEmpty(formFields.name.error) ||
        isNotEmpty(formFields.email.error) ||
        isNotEmpty(formFields.phone.error) ||
        isNotEmpty(formFields.date.error)
    );
  }, [formFields]);

  //After text change
  const afterTextChange = (fieldname, fieldvalue) => {
    let errorMessage = "";
    switch (fieldname) {
      case "name":
        errorMessage = isValidName(fieldvalue) ? "" : "Please enter valid name";
        break;
      case "email":
        errorMessage = isValidEmail(fieldvalue) ? "" : "Incorrect email";
        break;
      case "phone":
        errorMessage = isValidPhone(fieldvalue) ? "" : "Incorrect phone";
        break;
      case "date":
        errorMessage = isValidDate(fieldvalue) ? "" : "Invalid date";
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
      <InputField
        placeholder="Enter name"
        defaultValue={name.value}
        errorMessage={name.error}
        onChangeText={(text) => {
          afterTextChange("name", text);
        }}
      />
      <InputField
        placeholder="Enter email"
        defaultValue={email.value}
        errorMessage={email.error}
        onChangeText={(text) => {
          afterTextChange("email", text);
        }}
        autoCapitalize="none"
      />
      <InputField
        placeholder="Enter phone"
        defaultValue={phone.value}
        errorMessage={phone.error}
        onChangeText={(text) => {
          afterTextChange("phone", text);
        }}
        autoCapitalize="none"
      />
      <InputField
        placeholder="Enter birthdate(DD/MM/YYYY)"
        defaultValue={date.value}
        errorMessage={date.error}
        onChangeText={(text) => {
          afterTextChange("date", text);
        }}
        autoCapitalize="none"
      />

      <SubmitButton
        label="Add Birthday"
        disabled={disableActionButton}
        onPress={() => {
          executeAddBirthday();
        }}
      />
    </View>
  );
}