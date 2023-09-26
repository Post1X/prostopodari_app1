import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import {
  Colors,
  globalStyles,
  SET_CUSTOMER,
  SET_CUSTOMER_DELETE,
  SET_SHOP_DELETE,
  SignInName,
  WaitingName,
} from "../../../constants";
import axiosInstance from "../../../networking/axiosInstance";
import {
  Loading,
  numberValidate,
  passwordValidate,
  pendingData,
  phoneValidation,
  validateEmail,
} from "../../../components";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppButton, AppForm, AppInput, BackButton } from "../../../components";

import line from "../../../assets/images/line.png";
import pinkMonster from "../../../assets/images/pinkMonster.png";
import giftIconPink from "../../../assets/images/giftIconPink.png";
import { removeTokens, setTokens } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";

export const SignupScreen = ({ navigation, route }) => {
  let dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("+778");
  const [password, setPassword] = useState("");
  const [legalName, setLegalName] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [dropDownstate, setDropDownstate] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [organizationInn, setOrganizationInn] = useState("");
  const [organizationOgrn, setOrganizationOgrn] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState([
    { name: "ИП", id: 1 },
    { name: "ООО", id: 2 },
    { name: "Самозанятый", id: 3 },
  ]);
  const user_data = useSelector((st) => st.customer);
  useEffect(() => {
    if (Object.keys(user_data).length) {
      setName(user_data.name);
      setEmail(user_data.email);
      setOrganizationInn(user_data.inn);
      setLegalName(user_data.legal_name);
      setOrganizationOgrn(user_data.ogrn);
      setPhone(user_data.phone_number);
      setCurrentAccount(user_data.bill_number);
      setDropDownstate(user_data.ip);
    }
  }, [user_data]);

  const onChangeTextFunc = (e, set) => {
    setError("");
    set(e);
  };

  const navigationFunc = async (nav) => {
    if (
      name &&
      password.length >= 8 &&
      legalName.length > 3 &&
      phone.length >= 8 &&
      organizationInn.length > 3 &&
      validateEmail(email) &&
      password === repPassword &&
      currentAccount.length === 16 &&
      currentAccount &&
      organizationOgrn.length > 3 &&
      dropDownstate
    ) {
      const data = {
        email,
        password,
        phone_number: phone,
        inn: organizationInn,
        ogrn: organizationOgrn,
        ip: dropDownstate,
        legal_name: legalName,
        bill_number: currentAccount,
        name,
      };
      await axiosFunc(data, nav);
    } else if (!name) {
      setError("Укажите Имя ");
    } else if (!validateEmail(email)) {
      setError("Укажите Email ");
    } else if (phone.length < 8) {
      setError("The Телефон you’ve entered is incorrect.");
    } else if (!password || password !== repPassword || password.length < 8 ) {
      setError("Укажите Пароль");
    } else if (!dropDownstate) {
      setError("Укажите ИП / ООО/ Самозанятый");
    } else if (legalName.length <= 3) {
      setError("Укажите Юридическое название");
    } else if (organizationInn.length <= 3) {
      setError("Укажите ИНН организации");
    } else if (organizationOgrn.length <= 3) {
      setError("Укажите ОГРН организации ");
    } else if (currentAccount.length !== 16) {
      setError("Укажите Рассчетный счет ");
    }
  };

  const axiosFunc = async (data, nav) => {
    setLoading(true);
    try {
      if (!Object.keys(user_data).length) {
        const response = await axiosInstance.post("/users/register/seller", data);
        dispatch({
          type: SET_CUSTOMER,
          payload: response.data.user_data,
        });

        await setTokens(response.data.token);
        console.log(response,'post')
      } else {
        const response = await axiosInstance.put("/users/sellers/try", data);
        dispatch({
          type: SET_CUSTOMER,
          payload: response.data.user_data,
        });
        console.log(response,'put')

      }

      navigation.replace(nav, { data: pendingData });
      setLoading(false);
    } catch (e) {
      console.log(e, "e");
      setError(e.response?.data?.error);
      setLoading(false);
    }
  };
  const loginPageFunc = async () => {
    if (Object.keys(user_data).length) {
      await removeTokens();
      dispatch({
        type: SET_CUSTOMER_DELETE,
      });
    }
    navigation.navigate(SignInName);
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, globalStyles.scrollContainer]}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            {!Object.keys(user_data).length && (
              <View style={styles.backContainer}>
                <BackButton navigation={navigation} />
              </View>
            )}
            <Image source={pinkMonster} style={styles.pinkMonster} />
            <View style={{ alignItems: "flex-end" }}>
              <Image source={line} style={styles.lineImg} />
            </View>
          </View>
          <View style={styles.formContainer}>
            <AppForm>
              <View style={styles.formHeader}>
                <Image source={giftIconPink} style={styles.giftIconPink} />
                <Text style={[styles.titleForm, globalStyles.titleText]}>Войти в учетную запись</Text>
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <AppInput
                    placeholder={"Имя"}
                    style={styles.input}
                    value={name}
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setName);
                    }} />
                  <AppInput
                    style={styles.input}
                    placeholder={"Email"}
                    value={email}
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setEmail);
                    }}
                  />
                  <AppInput
                    placeholder={"Телефон"}
                    style={styles.input}
                    keyboardType={"numeric"}
                    value={phone}
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setPhone);
                    }}
                  />
                  <AppInput
                    style={styles.input}
                    placeholder={"Пароль"}
                    secureTextEntry
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setPassword);
                    }}
                  />
                  <AppInput
                    placeholder={"Повторите пароль"}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setRepPassword);
                    }}
                  />
                  <View style={styles.dropCont}>
                    <SelectDropdown
                      data={dataCategories}
                      buttonStyle={styles.btnStyleDrop}
                      dropdownStyle={styles.categoryInput}
                      defaultButtonText={"ИП / ООО/ Самозанятый"}
                      rowTextStyle={styles.choosePhotoText}
                      onSelect={(selectedItem) => {
                        setDropDownstate(selectedItem.name);
                      }}

                      buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem.name;
                      }}
                      rowTextForSelection={(selectedItem) => {
                        return selectedItem.name;
                      }} />
                  </View>
                  <AppInput
                    style={styles.input}
                    placeholder={"Юридическое название"}
                    value={legalName}
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setLegalName);
                    }}
                  />
                  <AppInput
                    placeholder={"ИНН организации"}
                    value={organizationInn}
                    style={styles.input}
                    keyboardType={"numeric"}
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setOrganizationInn);
                    }}
                  />
                  <AppInput
                    style={styles.input}
                    placeholder={"ОГРН организации"}
                    value={organizationOgrn}
                    keyboardType={"numeric"}
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setOrganizationOgrn);
                    }}
                  />
                  <AppInput
                    style={styles.input}
                    placeholder={"Рассчетный счет (16 цифр) "}
                    keyboardType={"numeric"}
                    value={currentAccount}
                    onChangeText={(e) => {
                      onChangeTextFunc(e, setCurrentAccount);
                    }}
                  />
                </View>
                <Text style={styles.error}>{error}</Text>
                <AppButton
                  text={"Войти"}
                  onPress={() => navigationFunc(WaitingName)}
                />
              </View>
              <View style={styles.footerContainer}>
                <Text style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.weightLight]}>Есть
                  аккаунт?</Text>
                <TouchableOpacity onPress={() => loginPageFunc()}>
                  <Text
                    style={[globalStyles.titleText, globalStyles.titleTextSmall, styles.SignInTextBold]}>Войти</Text>
                </TouchableOpacity>
              </View>
            </AppForm>
          </View>
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </View>

  );
};
