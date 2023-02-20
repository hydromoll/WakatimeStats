import React, { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, Stack, SText, TouchableStack } from "hydrostyles";
import { RootStackParamList } from "../@types/navigation";
import { Wakatime } from "../api/wakatime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LeaderBoardsResponse } from "../@types/wakatimeLeaderBoards";
import { colors, SCREEN_WIDTH } from "../constants";
import { FlatList } from "react-native";
import { callbackPersist } from "../utils/cahcingFetch";
import { StorageKeys } from "../constants/storageKeys";

type Props = NativeStackScreenProps<RootStackParamList, "leaderBoards">;

export const LeaderBoards: FC<Props> = ({ navigation }) => {
  const [leaderBoards, setLeaderBoards] = useState<
    LeaderBoardsResponse["data"]
  >([] as LeaderBoardsResponse["data"]);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        if (token === null) return;

        const api = new Wakatime(token);

        const data = await callbackPersist(
          StorageKeys.leaderBoards,
          () => api.fetchLeaderBoards(),
          60
        );
        if (data) {
          setLeaderBoards(data.data);
        }
      } catch (error) {
        console.log("Ошибка получения лидерборда", error);
      }
    })();
  }, []);

  return (
    <Container bg={colors.bg}>
      <Stack mt={50}>
        <SText color={colors.text} fz={30} fw="bold" mt={50}>
          LeaderBoards
        </SText>
        <FlatList
          data={leaderBoards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableStack
              mt={30}
              width={SCREEN_WIDTH - 80}
              pb={20}
              pt={20}
              pl={20}
              br={10}
              fix
              bg={colors.view}
              onPress={() => {
                navigation.navigate("leaderBoard", {
                  id: item.id,
                  name: item.name,
                });
              }}
            >
              <SText color={colors.text}>{item.name}</SText>
            </TouchableStack>
          )}
        />
      </Stack>
    </Container>
  );
};
