import React from "react";
import { styles } from "./styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import winIcon from "../../../assets/images/winIcon.png";
import { SwitchTogglesCustom } from "../../switchTogglesCustom";
import { BaseUrl, globalStyles, GoodsDataName } from "../../../constants";

export function FormGoods({item,index,navigation,proFunc}) {
  const img  = Array.isArray(item.photo_list[0]) ? item.photo_list[0][0] : item.photo_list[0]

  return (
    <TouchableOpacity style={styles.containerForm} onPress={()=>navigation.navigate(GoodsDataName,{item})}>
      <View style={styles.imgFormCont}>
        <Image source={{uri : BaseUrl + '/' + img}} style={styles.imgForm} />
      </View>
      <View style={styles.formContent}>
        <View style={styles.goodsText}>
          <Text style={[globalStyles.titleText,globalStyles.weightLight,globalStyles.titleTextSmall,globalStyles.textAlignLeft,]}>{item?.title}</Text>
        </View>
        <View style={styles.toggleContainer}>
          <SwitchTogglesCustom
            item={item}
            trueFalse={item.is_promoted}
            title={"Продвигать"}
            proFunc={proFunc}
            img={winIcon}
            topViewStyle={styles.toggleSwitch}
          />
        </View>
        <View style={styles.formFooterContainer}>
          <Text style={[globalStyles.titleText,globalStyles.weightBold,globalStyles.titleTextSmall]}>{item.price} р</Text>
          <Text style={[globalStyles.titleText,globalStyles.weightLight,globalStyles.titleTextSmall]}>{item.count} шт</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
