import React, { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, Stack, SText, TouchableStack } from "hydrostyles";
import { RootStackParamList } from "../@types/navigation";
import { Wakatime } from "../api/wakatime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LeaderBoardsResponse } from "../@types/wakatimeLeaderBoards";
import { colors, SCREEN_WIDTH } from "../constants";
import { FlatList } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "leaderBoards">;

const mockData = [
  {
    can_delete: false,
    can_edit: false,
    created_at: "2022-09-06T09:48:25Z",
    has_available_seat: false,
    id: "1ef5e9e5-ffc4-4aee-b738-be2bf092cc43",
    members_count: 3,
    members_with_timezones_count: 3,
    modified_at: "2023-01-18T10:09:13Z",
    name: "Who's better",
    time_range: "last_7_days",
  },
];

export const LeaderBoards: FC<Props> = ({ navigation }) => {
  const [leaderBoards, setLeaderBoards] = useState<
    LeaderBoardsResponse["data"]
  >(__DEV__ ? mockData : ([] as LeaderBoardsResponse["data"]));

  useEffect(() => {
    if (__DEV__) return;
    (async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        if (token === null) return;

        const api = new Wakatime(token);

        const data = await api.fetchLeaderBoards();
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
