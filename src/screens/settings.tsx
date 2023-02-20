import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Container, Stack, SText, TouchableStack } from "hydrostyles";
import { colors } from "../constants/colors";
import { SCREEN_WIDTH } from "../constants";
import { Button } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import { FlatList, Linking, NativeModules } from "react-native";
import { fetchContributors } from "../api";
import { Contributors } from "../@types/github";
import { StorageKeys } from "../constants/storageKeys";
import { callbackPersist } from "../utils/cahcingFetch";

type Props = NativeStackScreenProps<RootStackParamList, "settings">;

export const Settings: FC<Props> = ({ navigation }) => {
  const [contributors, setContributors] = useState<Contributors>([]);
  console.log("NativeModules =>", NativeModules.DataSetter);
  useEffect(() => {
    (async () => {
      try {
        const data = await callbackPersist(
          StorageKeys.contributors,
          () => fetchContributors(),
          600
        );
        if (data) {
          setContributors(data);
        }
      } catch (error) {
        alert("Ошибка при загрузке контрибьюторов");
      }
    })();
  }, []);

  const saveDataToSharedGroup = () => {
    try {
      NativeModules.DataSetter.setData("Hello from react native");
    } catch (e) {
      console.log(e);
    }
  };

  const getDataFromSharedGroup = async () => {
    try {
      const cacheData = NativeModules.DataGetter.getConstants();
      console.log(cacheData);
    } catch (error) {
      console.log("Error =>", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@token");
      navigation.navigate("auth");
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("contributors =>", contributors);
  //TODO: Add more contributors (fetch from github api)

  return (
    <Container bg={colors.bg} ph={40}>
      <Stack mt={50} width={SCREEN_WIDTH - 80} aic>
        <Stack width="100%">
          <SText color={colors.text} fz={30} fw="bold" mt={50}>
            Contributors
          </SText>
        </Stack>
        <Stack width="100%">
          <FlatList
            data={contributors}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              width: SCREEN_WIDTH,
            }}
            renderItem={({ item: contributor }) => (
              <TouchableStack
                key={contributor.id}
                onPress={() => Linking.openURL(contributor.html_url)}
              >
                <Avatar
                  source={{
                    uri: contributor.avatar_url,
                  }}
                />
              </TouchableStack>
            )}
          />
        </Stack>
        <Button mt={50} bg={colors.red} title="Log out" onPress={logout} />
        {__DEV__ && (
          <>
            <Button
              mt={50}
              bg={colors.blue}
              title="Save data"
              onPress={saveDataToSharedGroup}
            />
            <Button
              mt={50}
              bg={colors.blue}
              title="Log data"
              onPress={getDataFromSharedGroup}
            />
          </>
        )}
      </Stack>
    </Container>
  );
};

const Avatar = styled.Image`
  width: 75px;
  height: 75px;
  margin-left: 15px;
  border-radius: 50px;
  margin-top: 15px;
`;
