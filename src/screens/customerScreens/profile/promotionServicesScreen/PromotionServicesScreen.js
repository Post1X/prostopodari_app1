import React, { useState } from "react";
import { styles } from "./styles";
import { View, Text, Image, ScrollView } from "react-native";
import { AppButton, BackButton } from "../../../../components";
import promotionServicesMonster from "../../../../assets/images/promotionServicesMonster.png";
import line from "../../../../assets/images/line.png";
import { globalStyles } from "../../../../constants";
import axiosInstance from "../../../../networking/axiosInstance";
import WebView from "react-native-webview";

export const PromotionServicesScreen = ({ navigation,route }) => {
  const [url, setUrl] = useState("");
  const [ref,setRef] = useState(null);
  const state = route.params.state
  const axiosFunc = async () => {
    try {
      const response = await axiosInstance.post("/users/profile/seller/subscription", { value: 500 });
      setUrl(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    url ?
        <WebView
         ref={setRef} source={{ uri: url }} style={{ flex: 1 }} />
    :
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <BackButton navigation={navigation} />
        </View>
        <Image source={promotionServicesMonster} style={styles.pinkMonster} />
      </View>
      <View>
        <Text style={[globalStyles.titleText, globalStyles.titleTextBig, styles.titleText]}>Услуги продвижения</Text>
        <Text style={[globalStyles.titleText, globalStyles.weightLight, styles.contentText]}>
          Lorem ipsum dolor sit amet consectetur. Et eget est aenean lacinia neque. At vestibulum donec nisi pharetra.
          Pulvinar sed urna risus elit ullamcorper non erat viverra quis orci viverra augue.
        </Text>
        {state ?
          <Text
            style={[globalStyles.titleText,  globalStyles.titleTextSmall, styles.activeTextState]}>АКТИВНА</Text>
          :
          <Text
            style={[globalStyles.titleText,  globalStyles.titleTextSmall, styles.activeText]}>НЕАКТИВНА</Text>
        }
        <AppButton
          text={"Купить 10 продвижений"}
          stylesContainer={styles.containerBtn}
          onPress={() => {
            axiosFunc();
          }}
        />
      </View>
    </ScrollView>

  );
};
