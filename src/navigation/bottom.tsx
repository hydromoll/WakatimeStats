import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootStackParamList } from "../@types/navigation";
import { Settings } from "../screens/settings";
import { Stats } from "../screens/stats";
import { colors } from "../constants/colors";
import { Home, Settings as SettingsIcon } from "../components";
import { LeaderBoards } from "../screens/leaderBoards";

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
      <Tab.Screen
        name="home"
        component={Stats}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home fontSize={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="leaderBoards"
        component={LeaderBoards}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home fontSize={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon fontSize={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
