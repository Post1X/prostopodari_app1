import { styles } from "./styles";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import Modal from "react-native-modal";
import closeIcon from "../../../assets/images/closeIcon.png";
import { AppButton, AppInput } from "../../core";
import axiosInstance from "../../../networking/axiosInstance";
import { globalStyles } from "../../../constants";

export function ArciveModal(props) {


  return (
    <Modal
      visible={props.visible}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      testID={"modal"}
      swipeDirection="down"
      backdropColor={"rgba(250, 250, 250, 0.5)"}
      backdropOpacity={1}
      style={styles.modalContainer}
      onSwipeComplete={() => {
        props.modalFunc(false);
      }}
      onBackButtonPress={() => {
        props.modalFunc(false);
      }}>
      <View style={styles.modalContent}>
        <View style={styles.back_button_View}>
          <TouchableOpacity onPress={() => {
            props.modalFunc(false);
          }}>
            <Image source={closeIcon} style={styles.back_button} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <AppButton
            text={"архив"}
            onPress={() => props.onPressFuncArcive(false)}
            stylesContainer={styles.button}
            stylesText={styles.stylesText}
          />
          <AppButton
            text={"В наличии"}
            onPress={() => props.onPressFuncArcive(true)}
            stylesContainer={styles.button}
            stylesText={styles.stylesText}
          />
          <AppButton
            text={"все"}
            onPress={() => props.onPressFuncArcive("все")}
            stylesContainer={styles.button}
            stylesText={styles.stylesText}
          />
        </View>
      </View>
    </Modal>
  );
}
