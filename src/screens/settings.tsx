import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Container, Stack, SText, TouchableStack } from "hydrostyles";
import { colors } from "../constants/colors";
import { SCREEN_WIDTH } from "../constants";
import { Button } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import { FlatList, Linking } from "react-native";
import { fetchContributors } from "../api";
import { Contributors } from "../@types/github";

type Props = NativeStackScreenProps<RootStackParamList, "settings">;

export const Settings: FC<Props> = ({ navigation }) => {
  const [contributors, setContributors] = useState<Contributors>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchContributors();
        if (data) {
          setContributors(data);
        }
      } catch (error) {
        alert("Ошибка при загрузке контрибьюторов");
      }
    })();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@token");
      navigation.navigate("auth");
    } catch (error) {
      console.log("error", error);
    }
  };

  //TODO: Add more contributors (fetch from github api)

  //create function that fetch contributors from github api

  // const fetchContributors = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.github.com/repos/hydromoll/wakatime-app/contributors`
  //     );
  //     const data = await response.json();
  //     console.log("data =>", data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  //generate contributors list

  return (
    <Container bg={colors.bg} ph={40}>
      <Stack mt={55} width={SCREEN_WIDTH - 80} aic>
        <SText color="white" fz={18} fw={600}>
          Settings
        </SText>

        <Stack width="100%" mt={40}>
          <SText color="white" fz={28} fw={600}>
            Contributors
          </SText>
          <FlatList
            data={contributors}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              width: SCREEN_WIDTH,
            }}
            renderItem={({ item: contributor }) => (
              <TouchableStack
                key={contributor.id}
                onPress={() => Linking.openURL(contributor.html_url)}
              >
                <Avatar
                  source={{
                    uri: contributor.avatar_url,
                  }}
                />
              </TouchableStack>
            )}
          />
        </Stack>
        <Button mt={50} bg={colors.red} title="Log out" onPress={logout} />
      </Stack>
    </Container>
  );
};

const Avatar = styled.Image`
  width: 75px;
  height: 75px;
  margin-left: 15px;
  border-radius: 50px;
  margin-top: 15px;
`;
