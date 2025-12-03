import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useCommunity } from "../context/CommunityContext";

type NavBarProps = {
  modo: "6x6" | "4x4";
  toggleModo: () => void;
};

export default function NavBar({ modo, toggleModo }: NavBarProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { theme, assets } = useCommunity();

  const icons = {
    home: require("../assets/icons/home.png"),
    swap: require("../assets/icons/swap.png"),
  };

  if (!theme || !assets) return null;

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: insets.top + 10,
        paddingBottom: 10,
        backgroundColor: theme.primaryDark,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 3,
      }}
    >
      {/* Botón Home */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={icons.home}
          style={{ width: 28, height: 28, tintColor: "#fff" }}
        />
      </TouchableOpacity>

      {/* Botón Modo (icono + texto juntos) */}
      <TouchableOpacity
        onPress={toggleModo}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600", marginRight: 5 }}>
          {modo === "6x6" ? "VOLEIBOL 6x6" : "MINIVOLEY 4x4"}
        </Text>
        <Image
          source={icons.swap}
          style={{ width: 22, height: 22, tintColor: "#fff", marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}
