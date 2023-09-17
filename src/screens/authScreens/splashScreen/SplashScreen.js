import React, { useState } from "react";
import { styles } from "./styles";
import { ChooseName, CreateShopName, globalStyles, SET_CUSTOMER, SET_SHOP } from "../../../constants";
import { Image, ScrollView, Text, View } from "react-native";

import giftImg from "../../../assets/images/gift.png";
import { AppButton, AppForm, Loading } from "../../../components";
import giftIcon from "../../../assets/images/giftIcon.png";
import paymentIcon from "../../../assets/images/paymentIcon.png";
import machineIcon from "../../../assets/images/machineIcon.png";
import giftText from "../../../assets/images/prostoPodariImg.png";
import { checkTokens, checkUser } from "../../../utils";
import axiosInstance from "../../../networking/axiosInstance";
import { useDispatch } from "react-redux";

export const SplashScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigationFunc = async (name) => {
    setLoading(true);
    const token = await checkTokens();
    if (token) {
      await axiosFunc();
    } else {
      setLoading(false);
      navigation.navigate(ChooseName);
    }
  };

  const axiosFunc = async () => {
    try {
      const response = await axiosInstance.get("/users/profile/seller");
      console.log(response)
      dispatch({
        type: SET_CUSTOMER,
        payload: response.data.user_data,
      });
      if (Object.keys(response?.data?.storesList).length) {

        navigation.replace("TabNavigation");
      } else {
        checkUser(response?.data?.user_data, navigation);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <View style={[globalStyles.flexCenter, styles.splashContainer]}>
        <View style={styles.headerContainer}>
          <Image source={giftImg} style={styles.giftImg} />
        </View>
        <AppForm>
          <View style={styles.giftImgContainer}>
            <Image source={giftText} style={styles.giftText} />
          </View>
          <Text style={[globalStyles.titleText, styles.platformText]}>
            Платформа по продаже подарков и сувенирной продукции
          </Text>
          <View style={styles.informationContainer}>
            <View style={[globalStyles.row, styles.formInformation]}>
              <Image source={giftIcon} style={styles.informationIcon} />
              <Text style={[globalStyles.titleText, styles.TextInformation]}>Подарки, цветы, сувениры</Text>
            </View>
            <View style={[globalStyles.row, styles.formInformation]}>
              <Image source={paymentIcon} style={styles.informationIcon} />
              <Text style={[globalStyles.titleText, styles.TextInformation]}>Выгодные цены</Text>
            </View>
            <View style={[globalStyles.row, styles.formInformation]}>
              <Image source={machineIcon} style={styles.informationIcon} />
              <Text style={[globalStyles.titleText, styles.TextInformation]}>Бесплатная доставка</Text>
            </View>
          </View>
          <AppButton
            text={"Далее"}
            stylesContainer={styles.buttonContainer}
            onPress={navigationFunc} />
        </AppForm>
      </View>
      <Loading loading={loading} />
    </ScrollView>
  );
};
