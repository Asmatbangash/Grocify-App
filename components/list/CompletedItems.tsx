import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

const CompletedItems = () => {
  const { deleteItem, togglePurchased, items } = useGroceryStore();

  const completedItems = items.filter((item) => item.purchased);

  if (!completedItems.length) return null;
  return (
    <View className="theme-card-surface mt-3 rounded-3xl bg-secondary">
      <Text className="theme-text-muted text-sm font-semibold uppercase tracking-[1px]">
        Completed
      </Text>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className="theme-card-surface mt-3 flex-row items-center justify-between rounded-2xl bg-card p-2"
        >
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => togglePurchased(item.id)}
              className="h-6 w-6 items-center justify-center rounded-full bg-primary"
            >
              <FontAwesome6 name="check" size={12} color="#ffffff" />
            </Pressable>
            <Text className="theme-text-muted text-base line-through">
              {item.name}
            </Text>
          </View>

          <Pressable
            onPress={() => deleteItem(item.id)}
            className="theme-destructive-pill h-8 w-8 items-center justify-center"
          >
            <FontAwesome6 name="trash" size={12} color="#d45f58" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default CompletedItems;
