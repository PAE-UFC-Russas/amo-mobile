import React from "react";
import { View, Avatar, ScrollView } from "native-base";
import { Text } from "react-native";

export default function Notification({ notification, lastWeek }) {
  const DateToString = (date) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return day + "/" + month + "/" + year;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          borderColor: "#024284",
          borderWidth: 1.5,
          marginTop: 10,
          borderRadius: 10,
          alignItems: "center",
          padding: "1%",
          height: 100,
        }}
      >
        <Avatar
          bg="tertiaryBlue"
          size="lg"
          source={{
            uri: notification.avatar_remetente,
          }}
          alignSelf={"center"}
          marginRight="2%"
        />
        <View style={{ margin: 5 }} width="4/5">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {notification.remetente}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "300", marginRight: 15 }}>
              {DateToString(notification.data)}
            </Text>
          </View>
          <Text numberOfLines={1} style={{ fontSize: 14 }}>
            {notification.mensagem}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: "200" }}>
            {notification.tipo}
          </Text>
        </View>
      </View>
      {lastWeek[0] == notification.id && (
        <Text style={{ fontSize: 25, color: "#024284", marginTop: "10%" }}>
          Anteriores
        </Text>
      )}
    </View>
  );
}
