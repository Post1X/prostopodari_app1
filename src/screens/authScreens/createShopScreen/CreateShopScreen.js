import { styles } from "./styles";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../networking/axiosInstance";
import cameraIcon from "../../../assets/images/cameraIcon.png";
import { setStore, checkStore } from "../../../utils";
import {
  AppButton,
  AppInput,
  BackButton,
  ChooseImage,
  Loading,
  TaxiData,
  MapModal, requestCameraPermission,
} from "../../../components";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import DatePicker from "react-native-date-picker";

import closeIcon from "../../../assets/images/closeIcon.png";
import bottomIcon from "../../../assets/images/bottomIcon.png";

import { BaseUrl, Colors, globalStyles, SET_CUSTOMER } from "../../../constants";
import SelectDropdown from "react-native-select-dropdown";

export const CreateShopScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const store = useSelector(st => st.customer);
  const shop = store.active_store;
  const routeShop = route?.params?.shop;
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState([]);
  const [proShop, setProShop] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [taxi, setTaxi] = useState("");
  const [photoColor, setPhotoColor] = useState(Colors.blue);
  const [countryText, setCountryText] = useState("");
  const [mapState, setMapState] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [dateTime, setDateTime] = useState("");
  const [dateTime1, setDateTime1] = useState("");
  const [dateTime2, setDateTime2] = useState("");
  const [dateTime3, setDateTime3] = useState("");
  const [dateNum, setDateNum] = useState(null);
  const [ref, setRef] = useState(undefined);
  const [activeText, setActiveText] = useState("не работает");
  const [location, setLocation] = useState({
    lat: 55.751244,
    lon: 37.618423,
    zoom: 7,
  });
  const [open, setOpen] = useState(false);

  const modalFuncMap = (st) => setMapState(st);

  const loadingFunc = (val) => setLoading(val);
  const [refs, setRefs] = useState();
  const onPressFunc = async () => {
    if (
      photo &&
      taxi &&
      name &&
      Object.keys(selectedCountry).length &&
      proShop &&
      dateTime &&
      dateTime1 &&
      ((activeText === "работает" && dateTime2 && dateTime3) || activeText !== "работает")
    ) {
      axiosFunc();
    } else if (!photo) {
      setPhotoColor(Colors.red);
    } else if (!name) {
      setError("Укажите название магазина");
    } else if (!Object.keys(selectedCountry).length) {
      setError("Укажите ваш город");
    } else if (!taxi) {
      setError("Укажите стоимость доставки");
    } else if (!proShop) {
      setError("Укажите описание магазина");
    } else if (!dateTime && !dateTime1) {
      setError("Укажите график работы");
    } else if ((activeText !== "работает" && !dateTime2 && !dateTime3) || activeText === "работает") {
      setError("Укажите график работы");
    }
  };

  const axiosFunc = async () => {
    setLoading(true);
    if (!routeShop) {
      try {
        const formData = new FormData();
        formData.append("city", selectedCountry?.name);
        formData.append("address", selectedCountry?.address);
        formData.append("lon", selectedCountry?.lon);
        formData.append("lat", selectedCountry?.lat);
        formData.append("distPrice", `${taxi[0]}${taxi[1]}`);
        formData.append("title", name);
        formData.append("about_store", proShop);
        formData.append("weekdays", JSON.stringify({
          from: dateTime,
          to: dateTime1,
          not_working: false,
        }));
        if (activeText === "не работает") {
          formData.append("weekends", JSON.stringify({
            not_working: true,
          }));
        } else {
          formData.append("weekends", JSON.stringify({
            from: dateTime2,
            to: dateTime3,
            not_working: false,
          }));
        }
        formData.append("logo", {
          uri: photo.uri,
          name: "avatar.jpg",
          type: photo.type,
        });
        const response = await axiosInstance.post(`/stores/my`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        await setStore(selectedCountry);
        if (!shop) {
          await activeShopFunc();
          setLoading(false);
        } else {
          navigation.replace("TabNavigation");
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    } else {
      //edit
      try {
        const formData = new FormData();
        formData.append("id", routeShop._id);
        formData.append("distPrice", `${taxi[0]}${taxi[1]}`);
        formData.append("address", selectedCountry?.address);
        formData.append("city", selectedCountry?.name);
        formData.append("lon", selectedCountry?.lon);
        formData.append("lat", selectedCountry?.lat);
        formData.append("title", name);
        formData.append("about_store", proShop);
        formData.append("weekdays", JSON.stringify({
          from: dateTime,
          to: dateTime1,
          not_working: false,
        }));
        if (activeText === "не работает") {
          formData.append("weekends", JSON.stringify({
            not_working: true,
          }));
        } else {
          formData.append("weekends", JSON.stringify({
            from: dateTime2,
            to: dateTime3,
            not_working: false,
          }));
        }
        if (photo && photo?.uri) {
          formData.append("logo", {
            uri: photo.uri,
            name: "avatar.jpg",
            type: photo.type,
          });
        }
        const response = await axiosInstance.put(`/stores/my?store_id=${routeShop._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        await setStore(selectedCountry);
        dispatch({
          type: SET_CUSTOMER,
          payload: {
            ...store,
            active_store: response.data.storeToReturn,
          },
        });
        navigation.replace("TabNavigation");
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log(routeShop)
    if (routeShop) {
      setPhoto(BaseUrl + "/" + routeShop.logo_url);
      setName(routeShop.title);
      setProShop(routeShop.about_store);
      setTaxi(routeShop.distance.$numberDecimal)
      setSelectedCountry({
        name:routeShop.city,
        address:routeShop.address,
        lon:routeShop.lon,
        lat:routeShop.lat
      })
    }
  }, []);

  const onChangeTextFunc = (e, set) => {
    set(e);
  };

  const requestCameraPermission = () => {
    try {
      ChooseImage(async (imageRes) => {
        if (!imageRes.didCancel) {
          setPhoto(imageRes.assets[0]);
        }
      });
    } catch (err) {
    }
  };
  const searchDataYandex = (st) => {
    axios.get(`https://geocode-maps.yandex.ru/1.x?apikey=da4e12cb-3403-409e-948c-c34e4dfaafaa&geocode=${countryText}&format=json`).then((res) => {
      setCountry(res.data.response.GeoObjectCollection.featureMember[0]);
      countryChangeFunc(res.data.response.GeoObjectCollection.featureMember[0],st);
    })
      .catch((e) => {
        setCountry([]);
        Alert.alert(
          "",
          "не найдено",
        );
        console.log(e, "ff");
      });
  };


  const activeShopFunc = async () => {
    try {
      const response = await axiosInstance.get("/users/profile/seller");
      dispatch({
        type: SET_CUSTOMER,
        payload: response.data.user_data,
      });
      setLoading(false);
      navigation.replace("TabNavigation");
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const countryChangeFunc = (it,state) => {
    var str = it.GeoObject.Point.pos;
    var stringArray = str.split(/(\s+)/);
    setLocation({
      lat: +stringArray[2],
      lon: +stringArray[0],
      zoom: 8,
      name:  it.GeoObject.metaDataProperty.GeocoderMetaData.Address?.Components[2].name,
      address:it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[3].name + ' ' + it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name
    });
    setSelectedCountry({
      lat: +stringArray[2],
      lon: +stringArray[0],
      zoom: 8,
      name: it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[2].name,
      address:it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[3].name + ' ' + it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name    });
    if(!state){
      modalFuncMap(false);
    }
  };

  const okayCountryFunc = () => {
    setError('')
    if (location.zoom === 8) {
      setSelectedCountry({
        ...location,
      });
      modalFuncMap(false);
    }
  };
  const setOpenFunc = (num) => {
    setDateNum(num);
    setOpen(true);
  };
  const funcSund = (st) => {
    if (st === "не работает") {
      setDateTime2("");
      setDateTime3("");
    }
    setError("");
    setActiveText(st);
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <View>
        {route?.params?.state && (
          <BackButton
            navigation={navigation}
            stylesBack={styles.backBtn}
          />
        )}
        <View style={styles.cameraContainer}>
          {photo ?
            <Image source={{ uri: typeof photo === "object" ? photo.uri : photo }} style={styles.containerImg} />
            :
            <View style={[styles.cameraContent, { borderColor: photoColor }]}>
              <Image source={cameraIcon} style={styles.cameraImg} />
              <Text
                style={[globalStyles.titleText, styles.cameraText, globalStyles.titleTextSmall4, globalStyles.weightLight]}>Добавьте
                фотографию или логотип магазина</Text>
            </View>
          }
          <AppButton
            text={"Загрузить"}
            stylesContainer={styles.buttonContainer}
            onPress={() => requestCameraPermission()}
          />
          <View style={styles.imageNameContainer}>
            {photo && !routeShop ? (
              <>
                <Text style={styles.logoText}>{photo.type}</Text>
                <TouchableOpacity style={styles.closeContainer} onPress={() => {
                  setPhotoColor(Colors.blue);
                  setPhoto("");
                }}>
                  <Image source={closeIcon} style={styles.closeIcon} />
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
        <View style={styles.contentContainer}>
          <AppInput
            placeholder={"Название магазина"}
            style={styles.inputContainer}
            onChangeText={(e) => onChangeTextFunc(e, setName)}
            value={name}
          />
          <TouchableOpacity style={styles.contentMyDetails} onPress={() => modalFuncMap(true)}>
            <Text
              style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.textAlignLeft, styles.contentMyDetailsText]}>{Object.keys(selectedCountry).length ? selectedCountry?.name + ' ' + selectedCountry?.address : "Город"}</Text>
          </TouchableOpacity>
          <View>
            <Text
              style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall4, styles.graphic]}>График
              работы магазина</Text>
            <View style={[globalStyles.row, styles.graphicContainer]}>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall]}>ПН-ПТ</Text>
              <TouchableOpacity style={[globalStyles.row, styles.graphicContent]} onPress={() => setOpenFunc(1)}>
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.graphicTime]}>{dateTime ? dateTime : "00-00"}</Text>
                <Image source={bottomIcon} style={styles.bottomIcon} />
              </TouchableOpacity>
              <Text style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall]}>до</Text>
              <TouchableOpacity style={[globalStyles.row, styles.graphicContent]} onPress={() => setOpenFunc(2)}>
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.graphicTime]}>{dateTime1 ? dateTime1 : "00-00"}</Text>
                <Image source={bottomIcon} style={styles.bottomIcon} />
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.row, styles.graphicContainer]}>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall]}>СБ-ВС</Text>
              <TouchableOpacity
                style={[globalStyles.row,
                  styles.graphicContent,
                  activeText === "работает" ? styles.activeTextCont : null,
                ]} onPress={() => funcSund("работает")}>
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.graphicTime]}>работает</Text>
              </TouchableOpacity>
              <Text style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall]}></Text>
              <TouchableOpacity
                style={[globalStyles.row,
                  styles.graphicContent,
                  activeText === "не работает" ? styles.activeTextCont : null,
                ]} onPress={() => funcSund("не работает")}>
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.graphicTime]}>не
                  работает</Text>
              </TouchableOpacity>
            </View>
            {activeText === "работает" ?
              <View style={[globalStyles.row, styles.graphicContainer]}>
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall]}></Text>
                <TouchableOpacity style={[globalStyles.row, styles.graphicContent]} onPress={() => setOpenFunc(3)}>
                  <Text
                    style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.graphicTime]}>{dateTime2 ? dateTime2 : "00-00"}</Text>
                  <Image source={bottomIcon} style={styles.bottomIcon} />
                </TouchableOpacity>
                <Text
                  style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall]}>до</Text>
                <TouchableOpacity style={[globalStyles.row, styles.graphicContent]} onPress={() => setOpenFunc(4)}>
                  <Text
                    style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.graphicTime]}>{dateTime3 ? dateTime3 : "00-00"}</Text>
                  <Image source={bottomIcon} style={styles.bottomIcon} />
                </TouchableOpacity>
              </View>
              : null}

          </View>
          <View style={styles.dropCont}>
            <SelectDropdown
              data={TaxiData}
              buttonStyle={styles.btnStyleDrop}
              dropdownStyle={styles.categoryInput}
              defaultButtonText={taxi ? taxi :"Доставка тариф за 1 км*"}
              rowTextStyle={styles.choosePhotoText}
              onSelect={(selectedItem) => {
                setError("");
                setTaxi(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
              }}
              rowTextForSelection={(selectedItem) => {
                return selectedItem;
              }} />
            <Text
              style={[globalStyles.titleText, globalStyles.titleTextSmall4, globalStyles.weightLight, styles.TextTaxi]}>*Выставьте
              тариф доставки, если покупатель превысит зону бесплатной доставки в 5 км</Text>
          </View>
          <View>
            <Text style={[globalStyles.titleText, globalStyles.titleTextSmall4, styles.inputBigText]}>Про магазин</Text>
            <AppInput
              style={styles.inputBig}
              onChangeText={(e) => onChangeTextFunc(e, setProShop)}
              value={proShop}
              editable
              numberOfLines={5}
              multiline
            />
          </View>
        </View>
        {error && (<Text style={globalStyles.error}>{error}</Text>)}
        <AppButton
          text={"Сохранить"}
          stylesContainer={styles.btnStyle}
          onPress={onPressFunc}
        />
      </View>
      <MapModal
        visible={mapState}
        modalFunc={modalFuncMap}
        selectedCountry={selectedCountry}
        setCountryText={setCountryText}
        onChangeTextFunc={onChangeTextFunc}
        countryText={countryText}
        country={country}
        searchDataYandex={searchDataYandex}
        location={location}
        okayCountryFunc={okayCountryFunc}
      />
      <DatePicker
        modal
        open={open}
        locale={"ru"}
        is24hourSource={"locale"}
        mode={"time"}
        date={date}
        onConfirm={(date) => {
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const m = '' + minutes
          const min = m.length === 1  ? `0${minutes}`: minutes

            setOpen(false);
          setError("");
          if (dateNum === 1) {
            setDateTime(`${hours}:${min}`);
            setDate(date);
          } else if (dateNum === 2) {
            setDateTime1(`${hours}:${min}`);
            setDate1(date);
          } else if (dateNum === 3) {
            setDateTime2(`${hours}:${min}`);
            setDate1(date);
          } else if (dateNum === 4) {
            setDateTime3(`${hours}:${min}`);
            setDate1(date);
          }
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Loading loading={loading} />
    </ScrollView>
  );
};
