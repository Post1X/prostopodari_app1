import React, { useState, useRef, useEffect } from "react";
import { styles } from "./styles";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import {
  approvedData,
  DeleteShopData,
  Loading,
  WaitingForm,
  BackButton,
  AppInput,
  globalHeight,
  globalWidth, ChooseImage,
} from "../../../../components";
import { ProfileScreenName, SET_CUSTOMER, WaitingName, globalStyles, BaseUrl } from "../../../../constants";
import axiosInstance from "../../../../networking/axiosInstance";
import sendIcon from "../../../../assets/images/sendIcon.png";
import ChatPlus from "../../../../assets/images/ChatPlus.png";
import { checkTokens } from "../../../../utils";

import io from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";

let socketNew = null;

export const MessagesScreen = ({ navigation, route }) => {
  const [chat, setChat] = useState([]);
  const [addInput, setAddInput] = useState("");
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [scrollToEnd, setScrollToEnd] = useState(true);
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const store = useSelector((st) => st.customer);
  const [token, setToken] = useState("");
  const [photo, setPhoto] = useState("");
  const user = route.params?.item;
  const state = route.params?.state;
  const url = BaseUrl + `chat/messages`;
  const url1 = BaseUrl + "chat/user";
  useEffect(() => {
    setTokFunc();
  }, []);

  useEffect(() => {
    if (photo) {
      photoAdd();
    }
  }, [photo]);

  const photoAdd = () => {
    socketNew.emit("send-img",photo);
    setPhoto('')
  };
  const setTokFunc = async () => {
    setVisible(true);
    let token = await checkTokens();
    setToken(token);
    socketConnectFunc(token);
  };

  const socketConnectFunc = (token) => {
    socketNew = io(state ? url : url1, {
      query: {
        token: token,
        buyer_id: user._id,
        seller_id: store._id,
        roomId: user.chatID,
      },
    });
    socketNew.on("connect", () => {
      socketNew.emit("getMessage");
      socketNew.emit("isRead");
    });
    getMessageFunc();
  };

  const getMessageFunc = () => {
    socketNew.on("messages", (messages) => {
      const arr = messages.messages;
      setChat([...arr]);
      setVisible(false);
      setScrollToEnd(true);
      isReadFunc(arr);
    });
  };

  const isReadFunc = (arr) => {
    const item = arr[arr.length - 1];
    if (item.role !== "seller" && !item.isRead) {
      socketNew.emit("isRead", item._id);
    }
  };
  const handleEve = (mess) => {
    if (addInput) {
      socketNew.emit("sendMessage", { text: mess });
    }
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

  return (
    <View style={styles.chatScrool}>
      <BackButton
        text={user.name}
        navigation={navigation}
        stylesBack={styles.backContainer}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          if (scrollToEnd && chat.length) {
            scrollViewRef.current.scrollToEnd({
              y: 0,
              animated: true,
            });
            setScrollToEnd(false);
          }
        }}>
        {chat.map((item, index) => {
          return (
            <View
              style={[styles.placeHolderImageViewText,
                item.role !== "seller" || item.role === "admin" ? styles.left : styles.right,
                item.isImage ? styles.placeHolderImageViewImg : null,
              ]}
              key={index}>
              {item.isImage ?
                <Image source={{ uri: BaseUrl + item.text }} style={styles.imgMsg} />
                :
                <Text style={[
                  globalStyles.titleText,
                  globalStyles.titleTextSmall,
                  globalStyles.weightLight,
                  styles.placeholderText,
                  { color: "white" },
                ]}>{item.text}</Text>
              }

            </View>
          );
        })}
      </ScrollView>
      <View style={styles.chatInputView}>
        {!state ?
          <TouchableOpacity onPress={requestCameraPermission}>
            <Image source={ChatPlus} style={styles.chatPlusImg} />
          </TouchableOpacity>
          : null}
        <AppInput
          style={styles.textInputChat}
          value={addInput}
          onChangeText={(evt) => {
            setAddInput(evt);
            setText("");
          }} />
        <TouchableOpacity style={styles.chatIconContainer} onPress={() => {
          handleEve(addInput);
          setAddInput("");
        }}>
          <Image source={sendIcon} style={styles.chatIcon} />
        </TouchableOpacity>
      </View>

      <Loading loading={visible} />
    </View>
  );
};
