import { Container, Stack, SText } from "hydrostyles";
import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { User } from "../@types/user";
import { UserResponse } from "../@types/wakatimeUser";
import { colors } from "../constants";
import { useFetching } from "../hooks/useFetching";
import { Stats } from "./stats";
interface Props {
  hello?: string;
}

export const Auth: FC<Props> = () => {
  const tk = "waka_f7f59e45-5263-4ac3-873f-e48f642f04cb";
  const [token, setToken] = useState<string>(tk);
  const [fetching, isLoading, error] = useFetching(() => auth());
  const [user, setUser] = useState<User>({} as User);
  const auth = async () => {
    if (token.length > 0) {
      const response = await fetch(
        `https://wakatime.com/api/v1/users/current/?api_key=${token}`
      );
      const data = (await response.json()) as UserResponse;
      console.log("data =>", data);
      setUser({
        username: data.data.username,
        country: data.data.city.country,
        photo: data.data.photo,
      });
      if ("error" in data) {
        throw new Error(data.error);
      }
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
        <Button onPress={() => fetching()}>
          <SText fz={16} fw={700} color={colors.white}>
            Continue
          </SText>
        </Button>
        {isLoading && (
          <>
            <SText color={colors.text}>Loading...</SText>
          </>
        )}
        {Boolean(error) && (
          <>
            <SText color={colors.text}>Error {error + ""}</SText>
          </>
        )}
        <Stats user={user} />
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

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin-top: 64px;
  background-color: ${colors.light_purple};
`;
