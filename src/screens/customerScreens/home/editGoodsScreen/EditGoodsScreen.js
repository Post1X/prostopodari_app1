import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import {
  AppButton,
  MultipleImage,
  AppInput,
  Loading,
  TimeModal,
} from "../../../../components";
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from "react-native";

import closeIcon from "../../../../assets/images/closeIcon.png";
import { BaseUrl, CategoryName, Colors, globalStyles, HomeScreenName, SaveItemName } from "../../../../constants";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../networking/axiosInstance";
import cameraIcon from "../../../../assets/images/cameraIcon.png";

import SelectDropdown from "react-native-select-dropdown";
import active from "../../../../assets/images/active.png";
import noActive from "../../../../assets/images/noActive.png";

export const EditGoodsScreen = ({ navigation, route }) => {
  const item = route?.params?.data;
  const store = useSelector(st => st.customer);
  const shop = store.active_store;
  const [shopName, setShopName] = useState("");
  const [time, setTime] = useState("");//ff
  const [count, setCount] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [newImagesArray, setNewImagesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [photoColor, setPhotoColor] = useState(Colors.blue);
  const [error, setError] = useState("");
  const [timeVal, setTimeVal] = useState("");

  const timeFunc = (val) => {
    setTimeVal(val);
  };
  const modalFunc = (val) => {
    setModalState(val);
  };
  useEffect(() => {
    categoryFetch();
  }, []);
  useEffect(() => {
    const img  = Array.isArray(item.photo_list[0]) ? item.photo_list[0] : item.photo_list
    setShopName(item.title + "");
    // setTime(item.time_to_get_ready + "");
    if (item.time_to_get_ready === "Всегда в наличии") {
      setTime(item.time_to_get_ready + "");
    } else {
      setTime("Время готовности");
      setTimeVal(item.time_to_get_ready);
    }
    setShortDescription(item.short_description + "");
    setPrice(item.price + "");
    setCount(item.count + "");
    setImages(img);
  }, [item]);

  const deleteFunc = (val, state) => {
    if (state) {
      const arr = newImagesArray.filter(item => item.uri !== val);
      setNewImagesArray([...arr]);
    } else {
      const arr = images.filter(item => item !== val);
      setImages([...arr]);
    }
  };


  useEffect(() => {
    if (category) {
      setSubCategory("");
      setSubCategoryData([]);
      subCategoryFetch();
    }
  }, [category]);

  const addNumFunc = () => {
    if (count) {
      setCount(`${+count + 1}`);
    }
  };
  const minNumFunc = () => {
    if (count) {
      if (count !== `${0}`) {
        setCount(`${+count - 1}`);
      }
    }
  };

  const onChangeTextFunc = (e, set) => {
    setError("");
    set(e);
  };
  const categoryFetch = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategoryData(response.data.categories);
    } catch (e) {
      console.log(e);
    }
  };

  const subCategoryFetch = async () => {
    try {
      const response = await axiosInstance.get(`/sub-categories?category_id=${category._id}`);
      setSubCategoryData(response.data.subcategories);
    } catch (e) {
      setSubCategory("");
      setSubCategoryData([]);
      console.log(e);
    }
  };
  const onPressFunc = async () => {
    if (shopName && count && shortDescription && category && (Object.keys(images).length || Object.keys(newImagesArray).length) && price) {
      await axiosFunc();
    } else if (!Object.keys(images).length && !Object.keys(newImagesArray).length) {
      setPhotoColor(Colors.red);
    } else if (!shopName) {
      setError("Укажите Название магазина");
    } else if (!count) {
      setError("Укажите Количество на складе");
    } else if (!shortDescription) {
      setError("Укажите Описание товара");
    } else if (!category) {
      setError("но при редактировании надо чтобы категория не слетала");
    } else if (!price) {
      setError("Укажите Цена");
    }
  };
  const axiosFunc = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category_id", category._id);
      subCategory && formData.append("subcategory_id", subCategory._id);
      formData.append("title", shopName);
      formData.append("count", count);
      formData.append("time_to_get_ready", timeVal ? timeVal : time);
      formData.append("store_id", shop._id);
      formData.append("price", price);
      formData.append("short_description", shortDescription);
      formData.append("oldphoto_array", images);
      for (let i = 0; i < newImagesArray.length; i++) {
        formData.append(`photo_${i}`, {
          uri: newImagesArray[i].uri,
          name: "avatar.jpg",
          type: newImagesArray[i].type,
        });
      }
      const response = await axiosInstance.put(`/goods/?good_id=${item._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigation.replace(HomeScreenName);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const imageFunc = async () => {
    try {
      await MultipleImage(async (imageRes) => {
        if (Object.keys(newImagesArray).length) {
          setNewImagesArray([...imageRes, ...newImagesArray]);
          setPhotoColor(Colors.blue);
        } else {
          setPhotoColor(Colors.blue);
          setNewImagesArray([...imageRes]);
        }
      });
    } catch (err) {
    }
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground} />
        <View style={styles.headerContainer}>
          <Text style={styles.addText}>Добавить товар</Text>
          <View style={styles.cameraContainer}>
            <View>
              <TouchableOpacity style={[styles.AddPhotoContainer, { borderColor: photoColor }]}
                                onPress={() => imageFunc()}>
                <Image source={cameraIcon} style={styles.iconCameraStyle} />
              </TouchableOpacity>
            </View>
            <Text
              style={[globalStyles.titleText, globalStyles.titleTextSmall4, globalStyles.weightLight, styles.loadingText]}>Загрузите
              фотографии товара</Text>
            {Object.keys(images).length || Object.keys(newImagesArray).length ?
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contScroll}>
                {images.map((item, index) => {
                  return (
                    <View key={index} style={styles.imgCont}>
                      <TouchableOpacity style={styles.closeCont} onPress={() => {
                        deleteFunc(item);
                      }}>
                        <Image source={closeIcon} style={styles.closeIcon} />
                      </TouchableOpacity>
                      <Image key={index} source={{ uri: BaseUrl + "/" + item }}
                             style={styles.photosContainer} />
                    </View>
                  );
                })}
                {newImagesArray.map((item, index) => {
                  return (
                    <View key={index} style={styles.imgCont}>
                      <TouchableOpacity style={styles.closeCont} onPress={() => {
                        deleteFunc(item.uri, true);
                      }}>
                        <Image source={closeIcon} style={styles.closeIcon} />
                      </TouchableOpacity>
                      <Image source={{ uri: item.uri }}
                             style={styles.photosContainer} />
                    </View>
                  );
                })}
              </ScrollView>
              : null}
          </View>

        </View>
        <View style={styles.content}>
          <AppInput
            placeholder={"Название магазина"}
            style={styles.inputContainer}
            onChangeText={(e) => onChangeTextFunc(e, setShopName)}
            value={shopName}
          />

          <View style={styles.inputContainer}>
            <View>
              <TouchableOpacity style={[globalStyles.row, styles.activeContainer]}
                                onPress={() => {
                                  setTime("Всегда в наличии");
                                  timeFunc("");
                                }}>
                <Image source={time === "Всегда в наличии" ? active : noActive} style={styles.imgAct} />
                <Text style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.weightLight]}>Всегда в
                  наличии</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.row, styles.activeContainer]}
                                onPress={() => setTime("Время готовности")}>
                <Image source={time === "Время готовности" ? active : noActive} style={styles.imgAct} />
                <Text style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.weightLight]}>Время
                  готовности</Text>
              </TouchableOpacity>
              {time === "Время готовности" ?
                <TouchableOpacity onPress={() => modalFunc(true)} style={styles.vremyaStyle}>
                  <Text
                    style={[globalStyles.weightLight, globalStyles.titleTextSmall, styles.input]}>{timeVal ? timeVal : time}</Text>
                </TouchableOpacity>
                : null}
            </View>
          </View>
          <View>
            <TouchableOpacity style={[styles.btnAdd, styles.abslleft]} onPress={minNumFunc}>
              <Text style={styles.textAdd}>-</Text>
            </TouchableOpacity>
            <AppInput
              placeholder={"Количество на складе"}
              style={styles.addCont}
              value={count}
              keyboardType={"numeric"}
              onChangeText={(e) => onChangeTextFunc(e, setCount)}
            />
            <TouchableOpacity style={[styles.btnAdd, styles.absl]} onPress={addNumFunc}>
              <Text style={styles.textAdd}>+</Text>
            </TouchableOpacity>
          </View>
          <AppInput
            placeholder={"Цена"}
            style={styles.inputContainer}
            keyboardType={"numeric"}
            onChangeText={(e) => onChangeTextFunc(e, setPrice)}
            value={price}
          />
          <View style={styles.dropCont}>
            <SelectDropdown
              data={categoryData}
              buttonStyle={styles.btnStyleDrop}
              dropdownStyle={styles.categoryInput}
              defaultButtonText={"категория"}
              rowTextStyle={styles.choosePhotoText}
              onSelect={(selectedItem) => {
                setSubCategory("");
                setError("");
                setCategory(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(selectedItem) => {
                return selectedItem.title;
              }} />
          </View>
          {Object.keys(subCategoryData).length ? (
            <View style={styles.dropCont}>
              <SelectDropdown
                data={subCategoryData}
                buttonStyle={styles.btnStyleDrop}
                dropdownStyle={styles.categoryInput}
                defaultButtonText={"Подкатегория"}
                rowTextStyle={styles.choosePhotoText}
                onSelect={(selectedItem) => {
                  setSubCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(selectedItem) => {
                  return selectedItem.name;
                }} />
            </View>
          ) : null}
          <Text
            style={[globalStyles.titleText, globalStyles.titleTextSmall4, globalStyles.textAlignLeft, styles.titleInp]}>Описание
            товара</Text>
          <AppInput
            style={styles.inputBig}
            onChangeText={(e) => onChangeTextFunc(e, setShortDescription)}
            editable
            numberOfLines={5}
            multiline
            value={shortDescription}
          />
          {error && (<Text style={globalStyles.error}>{error}</Text>)}
          <AppButton
            text={"Опубликовать"}
            stylesContainer={styles.btnStyle}
            onPress={onPressFunc}
          />
        </View>
      </ScrollView>
      <TimeModal
        modalFunc={modalFunc}
        visible={modalState}
        timeFunc={timeFunc}
      />

      <Loading loading={loading} />
    </View>
  );
};
