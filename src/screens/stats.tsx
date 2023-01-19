import { Container, Stack, SText } from "hydrostyles";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import styled from "styled-components/native";
import { User } from "../@types/user";
import { colors } from "../constants";
import { formatLanguage } from "../utils/languageDataFormatter";

interface Props {
  user: User;
}

const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const langToColor = {
  TypeScript: "rgb(49, 133, 156)",
  JSON: "#1f77b4",
  Other: "#1f9aef",
  Swift: "#ffac45",
};

const languageData = [
  {
    name: "TypeScript",
    percent: 82.85,
    total_seconds: 47138,
    text: "13 hrs 5 mins",
    color: langToColor["TypeScript"],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "JSON",
    percent: 7.53,
    total_seconds: 4283,
    text: "1 hr 11 mins",
    color: langToColor["JSON"],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Other",
    percent: 5.25,
    total_seconds: 2985,
    text: "49 mins",
    color: langToColor["Other"],
    legendFontColor: "#7F7F7F",
  },
  {
    name: "Swift",
    percent: 1.83,
    total_seconds: 1041,
    text: "17 mins",
    color: langToColor["Swift"],
    legendFontColor: "#7F7F7F",
  },
  {
    name: "Git Config",
    percent: 1.32,
    total_seconds: 749,
    color: langToColor["JSON"],
    legendFontColor: "#7F7F7F",
    text: "12 mins",
  },
  {
    name: "Objective-C++",
    percent: 0.39,
    total_seconds: 219,
    text: "3 mins",
    color: langToColor["TypeScript"],
    legendFontColor: "#7F7F7F",
  },
  {
    name: "JavaScript",
    percent: 0.25,
    total_seconds: 143,
    color: "rgba(131, 7, 44, 1)",
    text: "2 mins",
    legendFontColor: "#7F7F7F",
  },
  {
    name: "Python",
    percent: 0.24,
    total_seconds: 138,
    text: "2 mins",
    legendFontColor: "#7F7F7F",
    color: "rgba(131, 67, 234, 1)",
  },
  {
    name: "Objective-C",
    percent: 0.18,
    total_seconds: 104.401133,
    color: "rgba(131, 67, 234, 1)",
    legendFontColor: "#7F7F7F",
    text: "1 min",
  },
  {
    name: "XML",
    percent: 0.15,
    total_seconds: 88.021328,
    text: "1 min",
    legendFontColor: "#7F7F7F",
    color: "rgba(131, 67, 234, 1)",
  },
];

const langData = formatLanguage(languageData);

const dataGraph = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 8, // optional
    },
  ],
  legend: ["Rainy Days"], // optional
};

const screenWidth = Dimensions.get("window").width;
export const Stats: FC<Props> = ({ user }) => {
  const chartConfig = {
    backgroundColor: colors.bg,
    backgroundGradientFrom: colors.bg,
    backgroundGradientTo: colors.bg,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
  return (
    // <Container>
    <>
      <Stack aic>
        <Image
          source={{
            uri: user.photo + "?s=420&cache=false&time=1674125384.4396436",
          }}
        />
        <SText color="white">{user.username}</SText>
        <SText color="white">{user.country}</SText>
        <LineChart
          data={dataGraph}
          width={screenWidth}
          height={256}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        />

        <SText>Languages:</SText>

        <PieChart
          data={langData}
          width={screenWidth - 32}
          height={screenWidth / 2}
          chartConfig={chartConfig}
          accessor="total_seconds"
          backgroundColor="transparent"
          paddingLeft="-5"
          //   center={[10, 50]}
          //   absolute
        />
      </Stack>
    </>
    // </Container>
  );
};

const Image = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;
