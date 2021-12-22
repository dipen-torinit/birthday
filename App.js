import { BirthdayNavigator } from "./src/navigation/BirthdayNavigator";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as BirthdayProvider } from "./src/context/BirthdayContext";

export default function App() {
  return (
    <AuthProvider>
      <BirthdayProvider>
        <BirthdayNavigator />
      </BirthdayProvider>
    </AuthProvider>
  );
}
