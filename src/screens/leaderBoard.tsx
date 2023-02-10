import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, Stack, SText } from "hydrostyles";
import React, { FC, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { RootStackParamList } from "../@types/navigation";
import { Wakatime } from "../api/wakatime";
import { Avatar } from "../components/avatar";
import { Header } from "../components/header";
import { colors, SCREEN_WIDTH } from "../constants";

type Props = NativeStackScreenProps<RootStackParamList, "leaderBoard">;

// interface Props{

// }

const initialState = {
  current_user: {
    page: 1,
    rank: 3,
    user: {
      city: {
        ascii_name: "Moscow",
        ascii_state: "Moscow",
        country: "Russia",
        country_code: "RU",
        id: "0a22cdb6-bad1-46f1-8bf8-f0747d6303b4",
        name: "Moscow",
        population: 10381222,
        state: "Moscow",
        timezone: "Europe/Moscow",
        title: "Moscow, Russia",
      },
      display_name: "@hydromoll",
      email: null,
      full_name: "",
      human_readable_website: "",
      id: "fd88ad8d-f8c7-413f-850c-9d4d80b9b6f4",
      is_email_public: false,
      is_hireable: false,
      photo: "https://wakatime.com/photo/fd88ad8d-f8c7-413f-850c-9d4d80b9b6f4",
      photo_public: true,
      username: "hydromoll",
      website: "",
    },
  },
  data: [
    {
      rank: 1,
      running_total: {
        daily_average: 18307,
        human_readable_daily_average: "5 hrs 5 mins",
        human_readable_total: "30 hrs 30 mins",
        languages: [
          { name: "C#", total_seconds: 62681.874 },
          { name: "Unity", total_seconds: 44601.768 },
          { name: "Csproj", total_seconds: 1419.029 },
          { name: "XML", total_seconds: 795.116 },
          { name: "textmate", total_seconds: 213.638 },
          { name: "GitIgnore file", total_seconds: 111.348 },
          { name: "Markdown", total_seconds: 20.989 },
        ],
        total_seconds: 109843.762,
      },
      user: {
        city: {
          ascii_name: "Moscow",
          ascii_state: "Moscow",
          country: "Russia",
          country_code: "RU",
          id: "0a22cdb6-bad1-46f1-8bf8-f0747d6303b4",
          name: "Moscow",
          population: 10381222,
          state: "Moscow",
          timezone: "Europe/Moscow",
          title: "Moscow, Russia",
          title_including_country: "Moscow, Russia",
        },
        display_name: "kasheroriginal",
        email: null,
        full_name: "kasheroriginal",
        human_readable_website: "",
        id: "7bd056a5-2aa1-4200-a81a-50b20a6f8776",
        is_email_public: false,
        is_hireable: true,
        location: null,
        photo:
          "https://wakatime.com/photo/7bd056a5-2aa1-4200-a81a-50b20a6f8776",
        photo_public: true,
        username: "kasheroriginal",
        website: "",
      },
    },
    {
      rank: 2,
      running_total: {
        daily_average: 12868,
        human_readable_daily_average: "3 hrs 34 mins",
        human_readable_total: "21 hrs 26 mins",
        languages: [
          { name: "TypeScript", total_seconds: 63427.760659 },
          { name: "JavaScript", total_seconds: 8475.084162 },
          { name: "CSS", total_seconds: 5267.370911 },
          { name: "JSON", total_seconds: 30.503575 },
          { name: "XML", total_seconds: 6.123603 },
          { name: "HTML", total_seconds: 3.844512 },
        ],
        total_seconds: 77210.687422,
      },
      user: {
        city: {
          ascii_name: "Moscow",
          ascii_state: "Moscow",
          country: "Russia",
          country_code: "RU",
          id: "0a22cdb6-bad1-46f1-8bf8-f0747d6303b4",
          name: "Moscow",
          population: 10381222,
          state: "Moscow",
          timezone: "Europe/Moscow",
          title: "Moscow, Russia",
          title_including_country: "Moscow, Russia",
        },
        display_name: "@crystlarock",
        email: null,
        full_name: "",
        human_readable_website: "",
        id: "c67263c9-a60d-4033-8b7f-0d31f2a14134",
        is_email_public: false,
        is_hireable: false,
        location: null,
        photo:
          "https://wakatime.com/photo/c67263c9-a60d-4033-8b7f-0d31f2a14134",
        photo_public: true,
        username: "crystlarock",
        website: "",
      },
    },
    {
      rank: 3,
      running_total: {
        daily_average: 4944,
        human_readable_daily_average: "1 hr 22 mins",
        human_readable_total: "8 hrs 14 mins",
        languages: [
          { name: "TypeScript", total_seconds: 20087.138854 },
          { name: "Swift", total_seconds: 6711.846254 },
          { name: "JSON", total_seconds: 998.736627 },
          { name: "Python", total_seconds: 739.540638 },
          { name: "Objective-C++", total_seconds: 679.488639 },
          { name: "CSS", total_seconds: 281.084494 },
          { name: "JavaScript", total_seconds: 164.037442 },
        ],
        total_seconds: 29661.872948,
      },
      user: {
        city: {
          ascii_name: "Moscow",
          ascii_state: "Moscow",
          country: "Russia",
          country_code: "RU",
          id: "0a22cdb6-bad1-46f1-8bf8-f0747d6303b4",
          name: "Moscow",
          population: 10381222,
          state: "Moscow",
          timezone: "Europe/Moscow",
          title: "Moscow, Russia",
          title_including_country: "Moscow, Russia",
        },
        display_name: "@hydromoll",
        email: null,
        full_name: "",
        human_readable_website: "",
        id: "fd88ad8d-f8c7-413f-850c-9d4d80b9b6f4",
        is_email_public: false,
        is_hireable: false,
        location: null,
        photo:
          "https://wakatime.com/photo/fd88ad8d-f8c7-413f-850c-9d4d80b9b6f4",
        photo_public: true,
        username: "hydromoll",
        website: "",
      },
    },
  ],
  language: null,
  modified_at: "2023-01-31T19:42:56Z",
  page: 1,
  range: {
    end_date: "2023-01-30",
    end_text: "Mon Jan 30th 2023",
    name: "last_7_days",
    start_date: "2023-01-24",
    start_text: "Tue Jan 24th 2023",
    text: "from Tue Jan 24th 2023 until Mon Jan 30th 2023",
  },
  timeout: 15,
  total_pages: 1,
  writes_only: false,
};

const formattedInitialState = [
  {
    name: "kasheroriginal",
    rank: 1,
    hours: 18307,
    dayliAverage: 18307,
    avatar: "https://wakatime.com/photo/7bd056a5-2aa1-4200-a81a-50b20a6f8776",
    languages: [
      "C#",
      "Unity",
      "Csproj",
      "XML",
      "textmate",
      "GitIgnore file",
      "Markdown",
    ],
  },
  {
    name: "@crystlarock",
    rank: 2,
    hours: 12868,
    dayliAverage: 12868,
    avatar: "https://wakatime.com/photo/c67263c9-a60d-4033-8b7f-0d31f2a14134",
    languages: ["TypeScript", "JavaScript", "CSS", "JSON", "XML", "HTML"],
  },
  {
    name: "@hydromoll",
    rank: 3,
    hours: 4944,
    dayliAverage: 4944,
    avatar: "https://wakatime.com/photo/fd88ad8d-f8c7-413f-850c-9d4d80b9b6f4",
    languages: [
      "TypeScript",
      "Swift",
      "JSON",
      "Python",
      "Objective-C++",
      "CSS",
      "JavaScript",
    ],
  },
];

export const LeaderBoard: FC<Props> = ({ route }) => {
  const { id, name } = route.params;

  const [data, setData] = useState(__DEV__ ? formattedInitialState : []);

  useEffect(() => {
    // if (__DEV__) return;
    (async () => {
      const token = await AsyncStorage.getItem("@token");
      if (token !== null) {
        const api = new Wakatime(token);
        const data = await api.fetchLeaderBoardData(id);
        if (data) {
          setData(data);
        }
      }
    })();
  }, []);

  return (
    <Container bg={colors.bg}>
      <Header title={name} />
      {/* <SText mt={50} color="white">
        {name}
      </SText> */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={({ item }) => (
          <Stack
            width={SCREEN_WIDTH - 80}
            fix
            bg={colors.view}
            pt={20}
            pb={20}
            pl={20}
            pr={20}
            br={20}
            mt={20}
            row
            aic
          >
            <SText color={colors.text} fw={800}>
              {item.rank + "."}
            </SText>
            <Avatar
              ml={10}
              width={40}
              height={40}
              borderRadius={25}
              source={{ uri: item.avatar }}
            />
            <Stack ml={10}>
              <SText fz={16} fw={600} color={colors.text}>
                {item.name}
              </SText>
              <SText mt={10} fw={500} color={colors.gray60}>
                {item.hours}
              </SText>
            </Stack>
          </Stack>
        )}
      />
    </Container>
  );
};
