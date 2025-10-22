import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import AuthContext from "./src/contexts/auth";
import SubjectContext from "./src/contexts/subject";
import { theme } from "./src/styles/theme";
import Routes from "./src/routes/routes";

const config = {
   dependencies: {
      "linear-gradient": LinearGradient,
   },
};

export default function App() {
   return (
      <NativeBaseProvider theme={theme} config={config}>
         <NavigationContainer>
            <AuthContext>
               <SubjectContext>
                  <StatusBar barStyle="light-content" translucent />
                  <Routes />
               </SubjectContext>
            </AuthContext>
         </NavigationContainer>
      </NativeBaseProvider>
   );
}
