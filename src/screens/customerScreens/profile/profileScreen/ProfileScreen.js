import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import rightIcon from "../../../../assets/images/rightIcon.png";
import bottomIcon from "../../../../assets/images/bottomIcon.png";
import shopIcon from "../../../../assets/images/shopIcon.png";
import place from "../../../../assets/images/place.png";
import {
  BaseUrl,
  Colors,
  CreateShopName,
  FinancialReportName, globalStyles,
  MyDetailsScreenName,
  PromotionServicesName,
  ShopDataName,
} from "../../../../constants";
import { ChangePasswordModal, ChangeShopModal, Loading } from "../../../../components";
import axiosInstance from "../../../../networking/axiosInstance";
import { useSelector } from "react-redux";

export const ProfileScreen = ({ navigation }) => {
  const store = useSelector(st => st.customer);
  const shop = store.active_store
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allShop, setAllShop] = useState([]);
  const [state,setState] = useState(false)
  const shopChangeFunc = (val) => {
    shopChangeFunc({ ...val });
  };
  useEffect(() => {
    allShopFunc();
    checkActiveFunc()
  }, []);
  const loadingFunc = (val) => setLoading(val);
  const modalFunc = (state) => setModalState(state);
  const navigationFunc = (nav) => {
    navigation.navigate(nav);
  };
  const createShopFunc = () => {
    navigation.navigate(CreateShopName, { state: true });
  };

  const checkActiveFunc = async () =>{
    try {
      const response = await axiosInstance.get("/users/check-sub");
      setState(response.data)
    } catch (e) {
      console.log(e);
    }
  };

  const allShopFunc = async () => {
    try {
      const response = await axiosInstance.get("/stores/my");
      setAllShop([...response.data]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
        <View style={styles.headerContainer}>
          <View style={[styles.headerShop, globalStyles.row]}>
            <View style={globalStyles.row}>
              <Image source={{ uri: BaseUrl + "/" + shop?.logo_url }} style={styles.shopIcon} />
              <View style={styles.containerHeaderText}>
                <Text
                  style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.textAlignLeft, styles.magazine]}>Магазин</Text>
                <Text
                  style={[globalStyles.titleText, globalStyles.titleTextSmall4, globalStyles.textAlignLeft, styles.shopName]}>{shop?.title}</Text>
                <View style={globalStyles.row}>
                  <Image source={place} style={styles.placeIcon} />
                  <Text
                    style={[globalStyles.titleText, globalStyles.weightLight, styles.placeText]}>{shop?.city} / {shop?.address}</Text>
                </View>
              </View>
            </View>
            <View style={styles.containerRight}>
              <Text style={[globalStyles.titleText, globalStyles.weightLight, styles.placeText, styles.idText]}>ID:
                {shop?._id.substring(15)}</Text>
              <TouchableOpacity style={styles.RightIconCont} onPress={() => navigation.navigate(ShopDataName, { shop })}>
                <Image source={rightIcon} style={styles.RightIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.addShopContainer}>
            <TouchableOpacity style={styles.changeShop} onPress={() => modalFunc(true)}>
              <Text style={[styles.headerFooterText, globalStyles.weightLight]}>Выбрать другой магазин</Text>
              <Image source={bottomIcon} style={styles.bottomIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => createShopFunc()}>
              <Text style={[styles.headerFooterText, styles.changeColorStyle, globalStyles.weightLight]}>Добавить
                магазин+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity style={[styles.buttonContainer, styles.activeInActiveContainer]}
                            onPress={() => navigation.navigate(PromotionServicesName,{state})}>
            <View style={styles.activeContainer}>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall4, styles.activeTextHeader]}>
                Услуги продвижения:
              </Text>
              {state ?
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.activeTextState]}>АКТИВНА</Text>
                :
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.activeText]}>НЕАКТИВНА</Text>
              }

            </View>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Описание магазина</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigationFunc(FinancialReportName)}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Финансовый отчет</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigationFunc(MyDetailsScreenName)}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Мои данные</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Частые вопросы</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Условия предоставления услуг</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Политика обработки персонал...</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={[globalStyles.titleText, globalStyles.weightLight]}>О приложении</Text>
            <Image source={rightIcon} style={styles.RightIcon} />
          </TouchableOpacity>
        </View>
        <ChangeShopModal
          visible={modalState}
          modalFunc={modalFunc}
          setModalState={setModalState}
          loadingFunc={loadingFunc}
          propsNavigation={navigation}
          allShop={allShop}
        />
      </ScrollView>
      <Loading loading={loading} />
    </View>
  );
};
