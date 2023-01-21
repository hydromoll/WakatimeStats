import { SText } from "hydrostyles";
import React, { FC } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../constants";

interface Props extends StyledButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

interface StyledButtonProps {
  mt?: number;
  bg?: string;
}

export const Button: FC<Props> = ({ title, onPress, loading, mt, bg }) => {
  return (
    <ButtonWrapper mt={mt} onPress={onPress} disabled={loading} bg={bg}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <SText fz={16} fw={700} color={colors.white}>
          {title}
        </SText>
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.TouchableOpacity<StyledButtonProps>`
  width: 100%;
  height: 56px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin-top: ${({ mt }) => (mt ? mt : 0)}px;
  background-color: ${({ bg }) => bg || colors.light_purple};
`;
