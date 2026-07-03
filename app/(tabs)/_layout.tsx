import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>List</Label>
        <Icon src={require("@/assets/images/tabIcons/list.png")} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="planner">
        <Icon src={require("@/assets/images/tabIcons/add.png")} />
        <Label>Planner</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="insights">
        <Icon src={require("@/assets/images/tabIcons/bar-chart.png")} />
        <Label>Insights</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
