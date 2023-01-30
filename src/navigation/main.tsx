import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Auth } from "../screens/auth";
import { RootStackParamList } from "../@types/navigation";
import { BottomNavigation } from "./bottom";

const Stack = createStackNavigator<RootStackParamList>();

interface Props {
  isAuth: boolean;
}

export const MainNavigation: FC<Props> = ({ isAuth }) => {
  console.log(isAuth);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={!isAuth ? "stats" : "auth"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="auth"
          component={Auth}
          options={{ gestureEnabled: false }}
        />
        {/*create a new screen with canGoBack false*/}

        <Stack.Screen name="stats" component={BottomNavigation} />
        {/* <Stack.Screen name="stats" component={Stats} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
