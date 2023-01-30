import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, Stack, SText } from "hydrostyles";
import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { RootStackParamList } from "../@types/navigation";
import { UserResponse } from "../@types/wakatimeUser";
import { Button } from "../components";
import { colors } from "../constants";
import { useFetching } from "../hooks/useFetching";
import { apiKeyInvalid } from "../utils/validateToken";

type Props = NativeStackScreenProps<RootStackParamList, "auth">;

const err =
  "Invalid api key... check https://wakatime.com/settings for your key";

const tk = "waka_f7f59e45-5263-4ac3-873f-e48f642f04cb";
export const Auth: FC<Props> = ({ navigation }) => {
  const [token, setToken] = useState<string>(__DEV__ ? tk : "");
  const [fetching, isLoading, error] = useFetching(() => auth());
  const auth = async () => {
    if (token.length > 0) {
      const isValid = apiKeyInvalid(token);
      if (!isValid) {
        alert(err);
        return;
      }
    }
    try {
      const response = await fetch(
        `https://wakatime.com/api/v1/users/current/?api_key=${token}`
      );
      const data = (await response.json()) as UserResponse;
      console.log("data =>", data);
      if ("error" in data) {
        alert("Invalid token");
        throw new Error("Invalid token");
      }

      const user = {
        username: data.data.username,
        country: data.data.city.country,
        photo: data.data.photo,
        photoUrl: "",
      };

      await AsyncStorage.setItem("@token", token);
      navigation.navigate("stats", user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container ph={40} bg={colors.bg}>
      <Stack mt={128} width="100%">
        <SText fz={34} fw={700} color={colors.text}>
          Hello
        </SText>
        <SText fz={14} fw={400} color={colors.gray60}>
          Enter your wakatime api key to get started
        </SText>
        <Input value={token} onChangeText={setToken} />
        <Button
          title="Continue"
          onPress={fetching}
          loading={isLoading}
          bg={colors.light_purple}
          mt={64}
        />
        {/* <Button onPress={fetching}>
          <SText fz={16} fw={700} color={colors.white}>
            Continue
          </SText>
        </Button> */}
        {/* {isLoading && (
          <>
            <SText color={colors.text}>Loading...</SText>
          </>
        )} */}
        {Boolean(error) && (
          <>
            <SText color={colors.text}>Error {error + ""}</SText>
          </>
        )}
      </Stack>
    </Container>
  );
};

const Input = styled.TextInput`
  width: 100%;
  height: 58px;
  color: white;
  padding: 20px;
  border: 1px solid ${colors.view};
  border-radius: 20px;
  margin-top: 11px;
`;
