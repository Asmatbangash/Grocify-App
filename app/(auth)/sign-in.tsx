import useSocialAuth from "@/hooks/useSocailAuth";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

export default function SignInScreen() {
  const { handleSocialAuth, loading } = useSocialAuth();

  const isGoogleClicked = loading === "oauth_google";
  const isLoading = isGoogleClicked;

  return (
    <View className="theme-screen-shell">
      <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/20" />
      <View className="absolute -right-18.5 top-40 h-72 w-72 rounded-full bg-primary/10" />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="theme-text-primary mb-4 text-lg font-bold">
          GROCIFY
        </Text>
        <Text className="theme-text-muted text-base">
          Plan smarter. Shop faster.
        </Text>
        <View>
          <Image
            source={require("@/assets/images/auth.png")}
            className="h-52 w-52"
          />
        </View>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <Pressable
          className={`theme-auth-card mb-3 h-14 flex-row items-center active:opacity-90 ${
            loading ? "opacity-70" : ""
          }`}
          disabled={isLoading}
          onPress={() => handleSocialAuth("oauth_google")}
        >
          <View className="h-8 w-8 items-center justify-center rounded-full border border-border bg-white">
            <Image
              source={require("@/assets/images/google.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>

          <Text className="theme-text-primary ml-3 flex-1 text-lg font-semibold">
            {isGoogleClicked ? "Connecting Google..." : "Continue with Google"}
          </Text>

          <FontAwesome name="angle-right" size={18} color="#5f6e66" />
        </Pressable>
      </View>
    </View>
  );
}
