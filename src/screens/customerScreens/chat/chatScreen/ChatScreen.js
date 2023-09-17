import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Colors, globalStyles } from "../../../../constants";
import { ChatData_, FinancialForm } from "../../../../components";
import { ChatForm } from "../../../../components/form/chatForm";
import axiosInstance from "../../../../networking/axiosInstance";


export const ChatScreen = ({ navigation }) => {
  const [active, setActive] = useState("За сегодня");
  const [data, setData] = useState([]);
  const [dataState, setDataState] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosFunc();
  }, []);

  const axiosFunc = async () => {
    try {
      const response = await axiosInstance.get(`/chat/im`);
      const filterArr = response.data.filter((it) => it.priority === "admin");
      setData(response.data);
      changeStateFunc("За сегодня", response.data);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const changeStateFunc = (st, dataFunc) => {
    setLoading(true);
    if (st === "Тех.поддержка") {
      const filterArr = dataFunc.filter((it) => it.priority === "admin");
       setDataState([...dataFunc]);
      setLoading(false);
    } else if (st === "Все") {
      setDataState([...dataFunc]);
      setLoading(false);
    } else if (st === "За сегодня") {
      const newDate = new Date().toLocaleDateString("en-GB");
      const filterArr = dataFunc.filter((it) => {
        let a = new Date(it.date).toLocaleDateString("en-GB");
        return a === newDate;
      });
      setLoading(false);
      setDataState([...filterArr]);
    }
    setActive(st);
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
      <View style={styles.headerContainer}>
        <Text
          style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightBold, globalStyles.titleTextBig]}>Сообщения</Text>
        <View style={[globalStyles.row, styles.headerFooter]}>
          <TouchableOpacity
            style={active === "За сегодня" && styles.activeText}
            onPress={() => changeStateFunc("За сегодня", data)}>
            <Text style={[
              globalStyles.titleText,
              globalStyles.weightLight,
              globalStyles.titleTextSmall,
              styles.headerFooterText,
              active === "За сегодня" && styles.activeTextContent,
            ]}>За сегодня</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={active === "Все" && styles.activeText}
            onPress={() => changeStateFunc("Все", data)}>
            <Text style={[
              globalStyles.titleText,
              globalStyles.weightLight,
              globalStyles.titleTextSmall,
              styles.headerFooterText,
              active === "Все" && styles.activeTextContent,
            ]}>Все</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={active === "Тех.поддержка" && styles.activeText}
            onPress={() => changeStateFunc("Тех.поддержка", data)}>
            <Text style={[
              globalStyles.titleText,
              globalStyles.weightLight,
              globalStyles.titleTextSmall,
              styles.headerFooterText,
              active === "Тех.поддержка" && styles.activeTextContent,
            ]}>Тех.поддержка</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={dataState}
        renderItem={({ item, index }) => {
          return (
            <ChatForm
              item={item}
              key={index}
              navigation={navigation}
            />
          );
        }} />
    </View>
  );
};
