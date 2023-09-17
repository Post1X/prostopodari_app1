import React, { createRef, useRef } from "react";
import { styles } from "./styles";
import { EditGoodsName, globalStyles } from "../../../../constants";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { AppButton, ImgForm } from "../../../../components";
import Carousel from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import backWhite from "../../../../assets/images/backWht.png";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const GoodsDataScreen = ({ navigation, route }) => {
  const store = useSelector((st) => st.customer);
  const data = route.params.item;
  console.log(data)
  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <View style={styles.cont}>
        <View>
          <LinearGradient
            start={{ x: 0.0, y: 0.05 }}
            end={{ x: 0, y: 1.0 }}
            locations={[0, 0.5, 0.6]}
            colors={["rgba(6, 6, 6, 0.54)", "rgba(0, 0, 0, 0.00)"]}
            style={styles.linearGradient}>
            <TouchableOpacity style={styles.bckCont} onPress={() => navigation.goBack()}>
              <Image source={backWhite} style={styles.bckImg} />
            </TouchableOpacity>
            <Carousel
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={0.65}
              firstItem={0}
              sliderWidth={width}
              itemWidth={width}
              data={data.photo_list}
              useScrollView={true}
              renderItem={({ item, index }) => {
                return (
                  <ImgForm
                    item={item}
                    index={index}
                    data={data.photo_list}
                    navigation={navigation}
                  />);
              }}
              containerCustomStyle={{ overflow: "visible" }}
              contentContainerCustomStyle={{ overflow: "visible" }}
            />
          </LinearGradient>
          <View style={styles.content}>
            <Text
              style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, styles.textCont]}>{data.category_id?.title}</Text>
            <Text
              style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, styles.textCont]}>{data.subcategory_id?.name}</Text>
            <View style={[globalStyles.row, styles.rowCont]}>
              <Text style={[globalStyles.titleText, globalStyles.textAlignLeft, styles.textCont]}>{data.price} р</Text>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, styles.textCont]}>{data.count} шт</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, globalStyles.titleTextSmall]}>Время
                готовности: <Text style={styles.grayText}>{data.time_to_get_ready}</Text></Text>
            </View>
            <View style={styles.taxiContainer}>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightLight, globalStyles.titleTextSmall]}>Стоимость доставки за 1 км: <Text style={styles.grayText}>{data.store_id.distance.$numberDecimal} р</Text></Text>
            </View>
            <View>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, styles.ops]}>Описание</Text>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, globalStyles.weightLight]}>{data.short_description}</Text>
              <Text
                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall4, globalStyles.weightLight, styles.idText]}>ID: {data.store_id._id.substring(0, 15)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.btnView}>
          <AppButton
            text={"Редактировать"}
            stylesContainer={styles.btnCont}
            stylesText={styles.btnText}
            onPress={() =>{
              navigation.navigate(EditGoodsName,{data})}}
          />
        </View>
      </View>
    </ScrollView>
  );
};
