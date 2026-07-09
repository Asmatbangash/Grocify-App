import React from "react";
import { Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Insights = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#07150f" : "#f8fdf9";
  const textColor = isDark ? "#f3fcf5" : "#113224";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View>
        <Text className="text-white" style={{ color: textColor }}>
          insights
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Insights;
