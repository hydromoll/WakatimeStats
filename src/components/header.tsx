import { useNavigation } from "@react-navigation/native";
import { Stack, SText } from "hydrostyles";
import React, { FC } from "react";
import { colors, SCREEN_WIDTH } from "../constants";

interface Props {
  title: string;
}

export const Header: FC<Props> = ({ title }) => {
  const { goBack } = useNavigation();
  return (
    <Stack mt={50} row aic width={SCREEN_WIDTH - 40} fix>
      <Stack width="20%" bg="red">
        <SText onPress={goBack} color={colors.text}>
          Back
        </SText>
      </Stack>
      <Stack width="60%" aic>
        <SText fz={19} fw={600} color={colors.text} numberOfLines={1}>
          {title}
        </SText>
      </Stack>
      <Stack width="20%">
        <SText color={colors.text}>Settings</SText>
      </Stack>
    </Stack>
  );
};
