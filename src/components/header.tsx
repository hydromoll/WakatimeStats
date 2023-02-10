import { useNavigation } from "@react-navigation/native";
import { Stack, SText, TouchableStack } from "hydrostyles";
import React, { FC } from "react";
import { colors, SCREEN_WIDTH } from "../constants";
import { Back } from "./icons";

interface Props {
  title: string;
  canGoBack?: boolean;
}

export const Header: FC<Props> = ({ title, canGoBack, children }) => {
  const { goBack } = useNavigation();
  return (
    <Stack mt={50} row aic width={SCREEN_WIDTH - 40} fix>
      <Stack width="20%">
        {!canGoBack && (
          <TouchableStack
            onPress={goBack}
            width={30}
            height={30}
            aic
            justify="center"
          >
            <Back />
          </TouchableStack>
        )}
      </Stack>
      <Stack width="60%" aic>
        <SText fz={19} fw={600} color={colors.text} numberOfLines={1}>
          {title}
        </SText>
      </Stack>
      <Stack width="20%">{children}</Stack>
    </Stack>
  );
};
