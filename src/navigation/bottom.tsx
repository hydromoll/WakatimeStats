import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootStackParamList } from "../@types/navigation";
import { Settings } from "../screens/settings";
import { Stats } from "../screens/stats";
import { colors } from "../constants/colors";

const Tab = createBottomTabNavigator<RootStackParamList>();

export const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg,
        },
      }}
    >
      <Tab.Screen name="home" component={Stats} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
};
