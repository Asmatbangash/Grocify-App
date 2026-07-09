import { useGroceryStore } from "@/store/grocery-store";
import React from "react";
import { Text, View } from "react-native";

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased);
  const completedItems = items.filter((item) => item.purchased);
  const completionPercentage =
    items.length > 0 ? (completedItems.length / items.length) * 100 : 0;

  return (
    <View className="theme-hero-card">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/80">
        Today
      </Text>

      <Text className="mt-1 text-3xl font-extrabold text-primary-foreground">
        Your Grocery Board
      </Text>

      <Text className="mt-1 text-sm text-primary-foreground/80">
        {pendingItems.length} pending · {completedItems.length} completed
      </Text>

      <View className="theme-hero-progress-track mt-4">
        <View
          className="theme-hero-progress-bar"
          style={{ width: `${completionPercentage}%` }}
        />
      </View>
    </View>
  );
};

export default ListHeroCard;
