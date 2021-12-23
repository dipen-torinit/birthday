import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SubmitButton(props) {
  const { label, disabled } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { backgroundColor: disabled ? "lightblue" : "blue" },
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
