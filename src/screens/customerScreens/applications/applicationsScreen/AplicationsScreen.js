import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Colors, globalStyles } from "../../../../constants";
import { ApplicationsData_, ApplicationsForm, FilterData, FilterForm, FormSubCategory } from "../../../../components";
import axiosInstance from "../../../../networking/axiosInstance";


export const AplicationsScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [banner,setBanner] = useState('')
  const [sort, setSort] = useState([
    {
      id: 1,
      name: "Все ",
      check: true,
      key: "all",
    },
    {
      id: 2,
      name: "Новые",
      check: false,
      key: "pending",
    },
    {
      id: 3,
      name: "Приняты",
      check: false,
      key: "approved",
    },
    {
      id: 1,
      name: "Собрано",
      check: false,
      key: "assembling",
    },
    {
      id: 1,
      name: "завершенные",
      check: false,
      key: "completed",
    },
    {
      id: 1,
      name: "Ожидает подтверждения",
      check: false,
      key: "accepted",
    },
    {
      id: 1,
      name: "Заказ в пути",
      check: false,
      key: "in_transit",
    },
    {
      id: 1,
      name: "Заказ cancelled",
      check: false,
      key: "cancelled",
    },
  ]);
  let [sortActive, setSortActive] = useState({
    id: 1,
    name: "Все ",
    check: false,
    key: "all",
  });
  const axiosFunc = async () => {
    try {
      const response = await axiosInstance.get("/orders/seller");
      setOrders(response.data);
      setOrdersData(response.data);
      setSortActive({
        id: 1,
        name: "Все ",
        check: false,
        key: "all",
      })
    } catch (e) {

    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axiosFunc();
      getBanner()

    });
    return unsubscribe;
  }, [navigation]);

  const getBanner = async () =>{
    try {
      const response = await axiosInstance.get('/goods/banner')
      setBanner(response.data.banner)
    } catch (e) {
      console.log(e)
    }
  }

  let checkFilterSort = (index) => {
    let arr = [];
    for (let i = 0; i < sort.length; i++) {
      sort[i].check = false;
    }
    sort[index].check = true;
    setSort([...sort]);
    if (sort[index].key !== "all") {
      for (let i = 0; i < ordersData.length; i++) {
        if (ordersData[i].status_id.name === sort[index].key) {
          arr.push(ordersData[i]);
        }
      }
      setOrders([...arr]);
    } else {
      setOrders([...ordersData]);
    }

    setSortActive({ ...sort[index] });
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightBold, globalStyles.titleTextBig, styles.textZakaz]}>Заказы</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {sort.map((item, index) => {
            return (
              <FilterForm
                item={item}
                index={index}
                key={index}
                check={checkFilterSort}
              />
            );
          })}
        </ScrollView>
      </View>
      {Object.keys(ApplicationsData_).length ?
        <FlatList
          data={orders}
          renderItem={({ item, index }) => {
            return (
              <ApplicationsForm
                item={item}
                key={index}
                navigation={navigation}
                orders={orders}
                banner={banner}
              />
            );
          }}
        /> :
        <View>
          <Text
            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, styles.noDataText]}>Нет
            активных заказов, нажмите на филтер “Все”</Text>
        </View>
      }
    </View>
  );
};
