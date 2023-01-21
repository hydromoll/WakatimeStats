import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, Stack, SText } from "hydrostyles";
import React, { FC, useEffect, useState } from "react";
import { LineChart, PieChart } from "react-native-chart-kit";
import styled from "styled-components/native";
import { Insights } from "../@types/insights";
import { RootStackParamList } from "../@types/navigation";
import { User } from "../@types/user";
import { Languages } from "../@types/wakatimeStats";
import { Wakatime } from "../api/wakatime";
import { colors, SCREEN_WIDTH } from "../constants";
import { chartConfig } from "../constants/configs";

type Props = NativeStackScreenProps<RootStackParamList, "stats"> & {
  user: User;
};
export const Stats: FC<Props> = () => {
  const [stats, setStats] = useState<Insights>({} as Insights);
  const [languages, setLanguages] = useState<Languages[]>([] as Languages[]);
  const [userData, setUserData] = useState<User>({} as User);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        if (token) {
          const user = new Wakatime(token);
          const [userRes, languagesStats, insights] = await Promise.all([
            user.getUser(),
            user.getStats(),
            user.getInsights(),
          ]);
          setUserData(userRes);
          setLanguages(languagesStats);
          setStats(insights);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    })();
  }, []);

  return (
    <Container bg={colors.bg}>
      <Stack aic mt={55} width={SCREEN_WIDTH} fix>
        <Stack row aic width="100%" justify="space-between" pl={40} pr={40}>
          <Stack>
            <SText fz={30} fw={700} color="white">
              {userData.username}
            </SText>
            <SText fz={18} fw={600} color="white">
              {userData.country}
            </SText>
          </Stack>
          <Image
            source={{
              uri:
                userData.photo + "?s=420&cache=false&time=1674125384.4396436",
            }}
          />
        </Stack>
        {"labels" in stats && (
          <LineChart
            data={stats}
            width={SCREEN_WIDTH - 32}
            height={(SCREEN_WIDTH - 32) / 1.3}
            chartConfig={chartConfig}
            bezier
          />
        )}
        <SText color={colors.text} fw={600}>
          Languages:
        </SText>
        <PieChart
          data={languages}
          width={SCREEN_WIDTH - 32}
          height={SCREEN_WIDTH / 2}
          chartConfig={chartConfig}
          accessor="total_seconds"
          backgroundColor="transparent"
          paddingLeft="-5"
        />
      </Stack>
    </Container>
  );
};

const Image = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

// const languageData = [
//   {
//     name: "TypeScript",
//     percent: 82.85,
//     total_seconds: 47138,
//     text: "13 hrs 5 mins",
//     color: langToColor["TypeScript"],
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "JSON",
//     percent: 7.53,
//     total_seconds: 4283,
//     text: "1 hr 11 mins",
//     color: langToColor["JSON"],
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "Other",
//     percent: 5.25,
//     total_seconds: 2985,
//     text: "49 mins",
//     color: langToColor["Other"],
//     legendFontColor: "#7F7F7F",
//   },
//   {
//     name: "Swift",
//     percent: 1.83,
//     total_seconds: 1041,
//     text: "17 mins",
//     color: langToColor["Swift"],
//     legendFontColor: "#7F7F7F",
//   },
//   {
//     name: "Git Config",
//     percent: 1.32,
//     total_seconds: 749,
//     color: langToColor["JSON"],
//     legendFontColor: "#7F7F7F",
//     text: "12 mins",
//   },
//   {
//     name: "Objective-C++",
//     percent: 0.39,
//     total_seconds: 219,
//     text: "3 mins",
//     color: langToColor["TypeScript"],
//     legendFontColor: "#7F7F7F",
//   },
//   {
//     name: "JavaScript",
//     percent: 0.25,
//     total_seconds: 143,
//     color: "rgba(131, 7, 44, 1)",
//     text: "2 mins",
//     legendFontColor: "#7F7F7F",
//   },
//   {
//     name: "Python",
//     percent: 0.24,
//     total_seconds: 138,
//     text: "2 mins",
//     legendFontColor: "#7F7F7F",
//     color: "rgba(131, 67, 234, 1)",
//   },
//   {
//     name: "Objective-C",
//     percent: 0.18,
//     total_seconds: 104.401133,
//     color: "rgba(131, 67, 234, 1)",
//     legendFontColor: "#7F7F7F",
//     text: "1 min",
//   },
//   {
//     name: "XML",
//     percent: 0.15,
//     total_seconds: 88.021328,
//     text: "1 min",
//     legendFontColor: "#7F7F7F",
//     color: "rgba(131, 67, 234, 1)",
//   },
// ];

// const langData = formatLanguage(languageData);

// const dataGraph = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43],
//       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//       strokeWidth: 8, // optional
//     },
//   ],
//   legend: ["Week stats"], // optional
// };

// const dg: typeof dataGraph = {
//   labels: ["01.12", "01.13", "01.14", "01.15", "01.16", "01.17", "01.18"],
//   datasets: [
//     {
//       data: [11788, 15666, 10144, 2113, 3682, 9302, 4087],
//       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//       strokeWidth: 8,
//     },
//   ],
//   legend: ["Week stats"],
// };
// interface Props {
//   user: User;
// }

// const data = [
//   {
//     name: "Seoul",
//     population: 21500000,
//     color: "rgba(131, 167, 234, 1)",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "Toronto",
//     population: 2800000,
//     color: "#F00",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "Beijing",
//     population: 527612,
//     color: "red",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "New York",
//     population: 8538000,
//     color: "#ffffff",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
//   {
//     name: "Moscow",
//     population: 11920000,
//     color: "rgb(0, 0, 255)",
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   },
// ];

// const langToColor = {
//   TypeScript: "rgb(49, 133, 156)",
//   JSON: "#1f77b4",
//   Other: "#1f9aef",
//   Swift: "#ffac45",
// };
