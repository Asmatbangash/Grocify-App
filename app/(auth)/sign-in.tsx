import useSocialAuth from "@/hooks/useSocailAuth";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

export default function SignInScreen() {
  const { handleSocialAuth, loading } = useSocialAuth();

  const isGoogleClicked = loading === "oauth_google";
  const isLoading = isGoogleClicked;

  return (
    <>
      {/* decorative elements */}
      <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40" />
      <View className="absolute -right-18.5 top-40 h-72 w-72 rounded-full bg-primary/70 dark:bg-background/35" />
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-lg font-bold mb-4">GROCIFY</Text>
        <Text className="text-white text-base">Plan smarter. Shop faster.</Text>
        <View>
          <Image
            source={require("@/assets/images/auth.png")}
            className="w-52 h-52"
          />
        </View>
      </View>

      <View className="flex-1 items-center justify-center">
        <Pressable
          className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${
            loading ? "opacity-70" : ""
          }`}
          disabled={isLoading}
          onPress={() => handleSocialAuth("oauth_google")}
        >
          <View className="h-8 w-8 items-center justify-center rounded-full bg-white border-amber-50 border">
            <Image
              source={require("@/assets/images/google.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>

          <Text className="ml-3 flex-1 text-lg font-semibold text-white">
            {isGoogleClicked ? "Connecting Google..." : "Continue with Google"}
          </Text>

          <FontAwesome name="angle-right" size={18} color="#5f6e66" />
        </Pressable>
      </View>
    </>
  );
}
