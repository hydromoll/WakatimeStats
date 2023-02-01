import styled from "styled-components/native";

interface Props {
  width?: number;
  height?: number;
  borderRadius?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
}

export const Avatar = styled.Image<Props>`
  height: ${({ height }) => height || 100}px;
  width: ${({ width }) => width || 100}px;
  border-radius: ${({ borderRadius }) => borderRadius || 50}px;
  margin-top: ${({ mt }) => mt || 0}px;
  margin-bottom: ${({ mb }) => mb || 0}px;
  margin-left: ${({ ml }) => ml || 0}px;
  margin-right: ${({ mr }) => mr || 0}px;
`;
