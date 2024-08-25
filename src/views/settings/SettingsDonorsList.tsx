import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { NativeItem, NativeList, NativeText } from "@/components/Global/NativeComponents";

import Reanimated, { FadeIn, FadeOut } from "react-native-reanimated";

import datasets from "@/consts/datasets.json";
import InsetsBottomView from "@/components/Global/InsetsBottomView";

const SettingsDonorsList = () => {
  const [loading, setLoading] = React.useState(true);
  const [donors, setDonors] = React.useState<string[]>([]);

  useEffect(() => {
    fetch(datasets["kofi-supporters"])
      .then((response) => response.json())
      .then((data) => {
        setDonors(data.sort((a: any, b: any) => parseInt(b.Total) - parseInt(a.Total)));
        setLoading(false);
        console.log(data[0]);
      });
  }, []);

  return (
    <Reanimated.ScrollView
      style={{
        padding: 16,
        paddingTop: 0,
      }}
    >

      <NativeList inline animated>
        <View
          style={{
            backgroundColor: "#f1c40f15",
            height: 120,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 56,
            }}
          >
            💸❤️
          </Text>
        </View>
        <NativeItem animated>
          <NativeText variant="title">
            Merci à tous les donateurs qui soutiennent l'application !
          </NativeText>
          <NativeText variant="subtitle">
            Grâce à vous, l'application peut survivre et bénéficier de meilleures conditions pour évoluer jour après jour.
          </NativeText>
        </NativeItem>
      </NativeList>

      {loading && (
        <NativeList
          inline animated
          entering={FadeIn}
          exiting={FadeOut}
        >
          <NativeItem
            animated
            leading={<ActivityIndicator />}
          >
            <NativeText>
              Obtention des donateurs...
            </NativeText>
          </NativeItem>
        </NativeList>
      )}

      {donors.length > 0 && (
        <NativeList inline animated
          entering={FadeIn}
          exiting={FadeOut}
        >
          {donors.map((donor, index) => (
            <NativeItem
              key={index}
              endPadding={16}

              leading={
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  🫶
                </Text>
              }
              trailing={
                <NativeText
                  variant="body"
                  style={[
                    parseFloat(donor.Total) > 15 ? {
                      color: "#2ecc71",
                      fontFamily: "semibold",
                      fontSize: 18,
                    } : {},
                  ]}
                >
                  {parseFloat(donor.Total).toFixed(2)} €
                </NativeText>
              }
            >
              <NativeText variant="title">
                {donor.Name}
              </NativeText>
              {donor.DiscordUsername && (
                <NativeText variant="subtitle">
                  @{donor.DiscordUsername.split("#")[0]}
                </NativeText>
              )}
            </NativeItem>
          ))}
        </NativeList>
      )}

      <InsetsBottomView />

    </Reanimated.ScrollView>
  );
};

export default SettingsDonorsList;