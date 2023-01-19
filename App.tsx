import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Auth } from "./src/screens/auth";

export default function App() {
  return (
    <Auth />
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your!</Text>
    //   <Text>Open up App.tsx to start!</Text>
    //   <View style={{ height: 50, width: 50, backgroundColor: "red" }}></View>
    //   <Pressable
    //     style={{ width: 300, height: 40, backgroundColor: "blue" }}
    //     onPress={() => console.log("object")}
    //   >
    //     <Text>Press me!</Text>
    //   </Pressable>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
