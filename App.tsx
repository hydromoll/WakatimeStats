import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { MainNavigation } from "./src/navigation/main";

export default function App() {
  const [token, setToken] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const tokenCache = await AsyncStorage.getItem("token");
      if (tokenCache) {
        setToken(true);
        console.log("token", token);
        return;
      }
      setToken(false);
    })();
  }, []);

  return (
    <>
      <MainNavigation isAuth={token} />
      <StatusBar style="light" />
    </>
  );
}
