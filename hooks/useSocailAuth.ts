import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();
  const handleSocialAuth = async (strategy: "oauth_google") => {
    if (loading) return;
    setLoading(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (!createdSessionId || !setActive) {
        Alert.alert("Sign-in Failed", "signing-in failed. Please try again.");
        return;
      }
      await setActive({ session: createdSessionId });
      Alert.alert("Sign-in Successful", "You have successfully signed in.");
    } catch (error) {
      console.error("Error during social auth:", error);
      Alert.alert(
        "Sign-in Error",
        "An error occurred during sign-in. Please try again.",
      );
    } finally {
      setLoading(null);
    }
  };
  return { loading, handleSocialAuth };
};

export default useSocialAuth;
