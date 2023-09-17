import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { CategoryData, FormCategory, BackButton } from "../../../../components";

import Goods from "../../../../assets/images/allGoodsIcon.png";
import { globalStyles } from "../../../../constants";
import axiosInstance from "../../../../networking/axiosInstance";
import { useSelector } from "react-redux";

export const CategoryScreen = ({ navigation, route }) => {
  let [category, setCategory] = useState([]);
  const user = useSelector((st) => st.customer);
  const [allGoods, setAllGoods] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  let getCategory = async () => {
    try {
      let response = await axiosInstance.get(`/categories?seller_id=${user._id}`);
      setCategory(response.data.categories);
      allGoodsFunc(response.data.categories);
    } catch (e) {
      console.log(e.response);
    }
  };

  const allGoodsFunc = (cat) => {
    let num = 0;
    for (let i = 0; i < cat.length; i++) {
      num = num + cat[i].productCount;
    }
    setAllGoods(num);
  };

  return (
    <View style={styles.container}>
      <BackButton
        text={"Категории"}
        navigation={navigation}
      />
      <View>
        <View style={styles.containerForm}>
          <View style={globalStyles.row}>
            <View>
              <Image source={Goods} style={styles.img} />
            </View>
            <View>
              <Text style={[globalStyles.titleText]}>Все товары</Text>
              <Text
                style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall4, globalStyles.textAlignLeft]}>{allGoods} товаров</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={category}
          renderItem={({ item, index }) => {
            return (
              <FormCategory
                item={item}
                key={index}
                checkSubCategory={route.params.checkSubCategory}
                index={index}
                navigation={navigation}
              />
            );
          }} />
      </View>
    </View>
  );
};
