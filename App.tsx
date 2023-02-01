import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { MainNavigation } from "./src/navigation/main";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [appLoading, setAppLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const tokenCache = await AsyncStorage.getItem("@token");
        console.log("TOKEN", tokenCache);
        if (tokenCache !== null) {
          setIsAuth(true);
          console.log("token", isAuth);
          return;
        }
        setIsAuth(false);
      } catch (error) {
        console.log("APP ERROR", error);
      } finally {
        setAppLoading(false);
      }
    })();
  }, []);

  if (appLoading) {
    return null;
  }

  return (
    <>
      <MainNavigation isAuth={isAuth} />
      <StatusBar style="light" />
    </>
  );
}
