import { styles } from "./styles";
import React from "react";
import { View, TouchableOpacity, Image, } from "react-native";
import Modal from "react-native-modal";
import closeIcon from "../../../assets/images/closeIcon.png";
import wing from "../../../assets/images/wing.png";
import place from "../../../assets/images/place.png";
import search from "../../../assets/images/search.png";

import { AppInput, AppButton } from "../../../components";
import { YaMap, Marker, Suggest, Circle } from "react-native-yamap";


export function MapModal(props) {

  return (
    <Modal
      visible={props.visible}
      testID={"modal"}
      style={{ padding: 0, margin: 0 }}
      backdropColor={"rgba(250, 250, 250, 0.5)"}
    >
      <View style={styles.container}>
        <YaMap
          userLocationIcon={{ uri: "https://www.clipartmax.com/png/middle/180-1801760_pin-png.png" }}
          initialRegion={props.location}
          showUserPosition={false}
          rotateGesturesEnabled={false}
          zoomEnabled={true}
          nightMode={false}
          mapType={"vector"}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}>
          <Marker
            point={props.location}
            scale={2}
            source={wing}
          />
        </YaMap>
        <View style={styles.footerCont}>
          <View style={styles.back_button_View}>
            <TouchableOpacity onPress={() => {
              props.modalFunc(false);
            }}>
              <Image source={closeIcon} style={styles.back_button} />
            </TouchableOpacity>
          </View>
          <View>
            <Image source={place} style={styles.placeIcon} />
            <AppInput
              placeholder={"Введите адрес"}
              style={styles.input}
              value={props.countryText}
              onChangeText={(e) => props.onChangeTextFunc(e, props.setCountryText)}
            />
            <TouchableOpacity style={styles.searchCont} onPress={()=>props.searchDataYandex(true)}>
              <Image source={search} style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>
          <AppButton
            text={"Найти адрес"}
            stylesContainer={styles.btn}
            onPress={()=>props.searchDataYandex(false)}
          />
        </View>
      </View>
    </Modal>
  );
}
