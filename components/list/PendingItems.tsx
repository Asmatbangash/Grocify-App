import { GroceryItem, useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

const priorityPillBg = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

const priorityPillText = {
  low: "text-priority-low-foreground",
  medium: "text-priority-medium-foreground",
  high: "text-priority-high-foreground",
};

const PendingItems = ({ item }: { item: GroceryItem }) => {
  const { deleteItem, togglePurchased, updateQuantity } = useGroceryStore();

  return (
    <View className="theme-card-surface">
      <View className="flex-row items-start gap-3">
        <Pressable
          className="theme-card-surface mt-1 size-6 items-center justify-center rounded-full border-2 border-border bg-card p-0"
          onPress={() => togglePurchased(item.id)}
        />

        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="theme-text-primary flex-1 text-lg font-semibold">
              {item.name}
            </Text>
            <View
              className={`rounded-full px-3 py-1 ${priorityPillBg[item.priority]}`}
            >
              <Text
                className={`text-xs font-bold uppercase ${priorityPillText[item.priority]}`}
              >
                {item.priority}
              </Text>
            </View>
          </View>

          <View className="mt-2 flex-row items-center gap-2">
            <View className="theme-accent-pill">
              <Text className="theme-text-muted text-xs font-semibold">
                {item.category}
              </Text>
            </View>
          </View>

          <View className="mt-3 flex-row items-center gap-2">
            <Pressable
              className="theme-control-pill h-8 w-8 items-center justify-center"
              onPress={() =>
                updateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
            >
              <FontAwesome6 name="minus" size={12} color="#3b5a4a" />
            </Pressable>

            <Text className="theme-text-primary min-w-9 text-center text-base font-semibold">
              {item.quantity}
            </Text>

            <Pressable
              className="theme-control-pill h-8 w-8 items-center justify-center"
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <FontAwesome6 name="plus" size={12} color="#3b5a4a" />
            </Pressable>
          </View>
        </View>

        <Pressable
          className="theme-destructive-pill h-9 w-9 items-center justify-center"
          onPress={() => deleteItem(item.id)}
        >
          <FontAwesome6 name="trash" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default PendingItems;
