import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavBarBackProps = {
  onBack: () => void;
  isLeft: boolean; // true si la flecha debe estar a la izquierda
};

export default function NavBarBack({ onBack, isLeft }: NavBarBackProps) {
  const insets = useSafeAreaInsets();
  const icons = {
    back: require("../assets/icons/left.png"),
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: insets.top + 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: "#3b82f6",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 3,
        justifyContent: isLeft ? "flex-start" : "flex-end",
      }}
    >
      <TouchableOpacity onPress={onBack}>
        <Image
          source={icons.back}
          style={{
            width: 28,
            height: 28,
            tintColor: "#fff",
            transform: [{ scaleX: isLeft ? 1 : -1 }], // invertir flecha si es derecha
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
