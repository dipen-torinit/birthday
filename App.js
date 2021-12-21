import { BirthdayNavigator } from "./src/navigation/BirthdayNavigator";
import { Provider as AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BirthdayNavigator />
    </AuthProvider>
  );
}
