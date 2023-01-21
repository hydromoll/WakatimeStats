import React, { FC } from "react";
import { Container, Stack, SText } from "hydrostyles";
import { colors } from "../constants/colors";
import { SCREEN_WIDTH } from "../constants";
import { Button } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "settings">;

export const Settings: FC<Props> = ({ navigation }) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@token");
      navigation.navigate("auth");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container bg={colors.bg} ph={40}>
      <Stack mt={55} width={SCREEN_WIDTH - 80} aic>
        <SText color="white">Settings</SText>
        <Button mt={50} bg={colors.red} title="Log out" onPress={logout} />
      </Stack>
    </Container>
  );
};
