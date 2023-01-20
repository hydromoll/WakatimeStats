import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Auth } from "../screens/auth";
import { Stats } from "../screens/stats";
import { RootStackParamList } from "../@types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

interface Props {
  isAuth: boolean;
}

export const MainNavigation: FC<Props> = ({ isAuth }) => {
  console.log("IS AUTH", isAuth + "");
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuth ? "stats" : "auth"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="auth" component={Auth} />
        <Stack.Screen name="stats" component={Stats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};