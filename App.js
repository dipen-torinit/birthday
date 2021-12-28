import { BirthdayNavigator } from "./src/navigation/BirthdayNavigator";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as BirthdayProvider } from "./src/context/BirthdayContext";
import { LogBox } from "react-native";

export default function App() {
  // Workaround for issue
  // https://github.com/firebase/firebase-js-sdk/issues/1847
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release",
  ]);

  return (
    <AuthProvider>
      <BirthdayProvider>
        <BirthdayNavigator />
      </BirthdayProvider>
    </AuthProvider>
  );
}
