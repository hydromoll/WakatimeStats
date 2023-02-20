import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stack, SText } from "hydrostyles";
import React, { FC, useEffect, useState } from "react";
import { NativeModules, Platform, ScrollView } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import styled from "styled-components/native";
import { LineChartData } from "../@types/lineChart";
import { INativeModules } from "../@types/nativeModules";
import { RootStackParamList } from "../@types/navigation";
import { User } from "../@types/user";
import { Languages } from "../@types/wakatimeStats";
import { Wakatime } from "../api/wakatime";
import { colors, SCREEN_WIDTH } from "../constants";
import { chartConfig } from "../constants/configs";
import { callbackPersist } from "../utils/cahcingFetch";
import { secondToHrsAndMin } from "../utils/convertTime";

type Props = NativeStackScreenProps<RootStackParamList, "stats"> & {
  user: User;
};
//TODO: remove any
const promiseValidator = (
  promise: PromiseSettledResult<any>,
  setter: (data: any) => void
) => {
  if (promise.status === "fulfilled") {
    setter(promise.value);
  }
};

const nativeModules = NativeModules.DataSetter as INativeModules;

export const Stats: FC<Props> = ({ navigation }) => {
  const [stats, setStats] = useState<LineChartData>({} as LineChartData);
  const [languages, setLanguages] = useState<Languages[]>([] as Languages[]);
  const [userData, setUserData] = useState<User>({} as User);
  const [allTime, setAllTime] = useState("");

  const allTimeSetter = (value: string) => {
    setAllTime(value);
    Platform.OS === "ios" && nativeModules.setData(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        console.log("TOKEN =>", token);
        if (token !== null) {
          const user = new Wakatime(token);
          const [userRes, languagesStats, insights, allTime] =
            await Promise.allSettled([
              callbackPersist("@user", () => user.getUser(), 600),
              callbackPersist("@stats", () => user.getStats(), 600),
              callbackPersist("@insights", () => user.getInsights(), 0),
              callbackPersist("@allTime", () => user.getAllTime(), 15),
            ]);
          promiseValidator(userRes, setUserData);
          promiseValidator(languagesStats, setLanguages);
          promiseValidator(insights, setStats);
          promiseValidator(allTime, allTimeSetter);
        }
      } catch (error) {
        console.log("ERROR", error);
        alert("Token is expired");
        navigation.navigate("auth");
      }
    })();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack aic mt={55} width={SCREEN_WIDTH} fix>
        <Stack row aic width="100%" justify="space-between" pl={40} pr={40}>
          <Stack>
            <SText fz={30} fw={700} color={colors.text}>
              {userData.username}
            </SText>
            <SText fz={18} fw={600} color={colors.text}>
              {userData.country}
            </SText>
            {allTime !== "" && (
              <SText fz={13} mt={8} fw={600} color={colors.text}>
                All time: {allTime}
              </SText>
            )}
          </Stack>
          <Image
            source={{
              uri: userData.photo + "?s=420&cache=false",
            }}
          />
        </Stack>
        {"labels" in stats && (
          <LineChart
            data={stats}
            width={SCREEN_WIDTH - 48}
            height={(SCREEN_WIDTH - 32) / 1.3}
            chartConfig={chartConfig}
            bezier
            formatYLabel={(value) => secondToHrsAndMin(+value)}
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
    </ScrollView>
  );
};

const Image = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;
