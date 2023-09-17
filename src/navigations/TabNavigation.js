import * as React from "react";
import AddNavigation from "./AddNavigation";
import ChatNavigation from "./ChatNavigation";
import HomeNavigation from "./HomeNavigation";
import ProfileNavigation from "./ProfileNavigation";
import { globalHeight, globalWidth } from "../components";
import { Image, View, StyleSheet, Text, Platform } from "react-native";
import ApplicationsNavigation from "./ApplicationsNavigation";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AddName, AddScreenName, ApplicationsDataName,
  ApplicationsName,
  ChatName,
  Colors, CreateShopName, DeleteShopName, EditGoodsName, EditMyDetailsName,
  FilterName, FinancialFilterName, FinancialReportDataName, FinancialReportName, GoodsDataName, GoodsImgName,
  HomeName, MyDetailsScreenName,
  ProfileName, PromotionServicesName, SaveEditProfileName, SaveItemName,
  ShopDataName, WaitingName,MessagesName
} from "../constants";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.tabBarActiveTintColor,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          let imageSource = null;
          let imageSourceActive = null;
          if (route.name === HomeName) {
            imageSource = require("../assets/images/homeIcon.png");
            imageSourceActive = require("../assets/images/homeIconActive.png");
          }
          if (route.name === ApplicationsName) {
            imageSource = require("../assets/images/applicationsIcon.png");
            imageSourceActive = require("../assets/images/applicatiosIconActive.png");

          }
          if (route.name === AddName) {
            imageSource = require("../assets/images/addIcon.png");
            imageSourceActive = require("../assets/images/addIconActive.png");

          }
          if (route.name === ChatName) {
            imageSource = require("../assets/images/chatIcon.png");
            imageSourceActive = require("../assets/images/chatIconActive.png");

          }
          if (route.name === ProfileName) {
            imageSource = require("../assets/images/profileIcon.png");
            imageSourceActive = require("../assets/images/profileIconActive.png");

          }
          return (
            <View style={styles.container}>
              <Image
                style={styles.image}
                source={focused ? imageSourceActive : imageSource}
              />
              <Text style={styles.textStyle}>{route.name}</Text>
            </View>
          );
        },
        tabBarLabel: ({ focused, color, size }) => {
        },
      })}
    >
      <Tab.Screen
        name={HomeName}
        component={HomeNavigation}
        options={({ route }) => ({
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === FilterName) {
              return false;
            } else if (routeName === GoodsDataName) {
              return false;
            } else if (routeName === GoodsImgName) {
              return false;
            } else if (routeName === AddScreenName) {
              return false;
            } else if (routeName === EditGoodsName) {
              return false;
            }
            return true;
          })(route),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === FilterName) {
              return { display: "none" };
            } else if (routeName === GoodsDataName) {
              return { display: "none" };
            } else if (routeName === GoodsImgName) {
              return { display: "none" };
            } else if (routeName === AddScreenName) {
              return { display: "none" };
            }else if (routeName === EditGoodsName) {
              return { display: "none" };
            }
            return styles.tabBarStyle;
          })(route),
          tabBarButton: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === FilterName) {
              () => null;
            } else if (routeName === GoodsDataName) {
              () => null;
            } else if (routeName === GoodsImgName) {
              () => null;
            } else if (routeName === AddScreenName) {
              () => null;
            }else if (routeName === EditGoodsName) {
              () => null;
            }
          })(route),
        })}
      />
      <Tab.Screen
        name={ApplicationsName}
        component={ApplicationsNavigation}
        options={({ route }) => ({
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === ApplicationsDataName) {
              return false;
            }
            return true;
          })(route),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === ApplicationsDataName) {
              return { display: "none" };
            }
            return styles.tabBarStyle;
          })(route),
          tabBarButton: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === ApplicationsDataName) {
              () => null;
            }
          })(route),
        })}
      />
      <Tab.Screen name={AddName} component={AddNavigation}
                  options={({ route }) => ({
                    tabBarVisible: ((route) => {
                      const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                      if (routeName === SaveItemName) {
                        return false;
                      }
                      return true;
                    })(route),
                    tabBarStyle: ((route) => {
                      const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                      if (routeName === SaveItemName) {
                        return { display: "none" };
                      }
                      return styles.tabBarStyle;
                    })(route),
                    tabBarButton: ((route) => {
                      const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                      if (routeName === SaveItemName) {
                        () => null;
                      }
                    })(route),
                  })}
      />
      <Tab.Screen
        name={ChatName}
        component={ChatNavigation}
        options={({ route }) => ({
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === MessagesName) {
              return false;
            }
            return true;
          })(route),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === MessagesName) {
              return { display: "none" };
            }
            return styles.tabBarStyle;
          })(route),
          tabBarButton: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === MessagesName) {
              () => null;
            }
          })(route),
        })}
      />
      <Tab.Screen
        name={ProfileName}
        component={ProfileNavigation}
        options={({ route }) => ({
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === ShopDataName) {
              return false;
            } else if (routeName === MyDetailsScreenName) {
              return false;
            } else if (routeName === EditMyDetailsName) {
              return false;
            } else if (routeName === SaveEditProfileName) {
              return false;
            } else if (routeName === FinancialReportName) {
              return false;
            } else if (routeName === FinancialReportDataName) {
              return false;
            } else if (routeName === PromotionServicesName) {
              return false;
            } else if (routeName === DeleteShopName) {
              return false;
            } else if (routeName === FinancialFilterName) {
              return false;
            } else if (routeName === CreateShopName) {
              return false;
            } else if (routeName === WaitingName) {
              return false;
            }
            return true;
          })(route),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === ShopDataName) {
              return { display: "none" };
            } else if (routeName === MyDetailsScreenName) {
              return { display: "none" };
            } else if (routeName === EditMyDetailsName) {
              return { display: "none" };
            } else if (routeName === SaveEditProfileName) {
              return { display: "none" };
            } else if (routeName === FinancialReportName) {
              return { display: "none" };
            } else if (routeName === FinancialReportDataName) {
              return { display: "none" };
            } else if (routeName === PromotionServicesName) {
              return { display: "none" };
            } else if (routeName === DeleteShopName) {
              return { display: "none" };
            } else if (routeName === FinancialFilterName) {
              return { display: "none" };
            } else if (routeName === CreateShopName) {
              return { display: "none" };
            } else if (routeName === WaitingName) {
              return { display: "none" };
            }
            return styles.tabBarStyle;
          })(route),
          tabBarButton: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === ShopDataName) {
              () => null;
            } else if (routeName === MyDetailsScreenName) {
              () => null;
            } else if (routeName === EditMyDetailsName) {
              () => null;
            } else if (routeName === SaveEditProfileName) {
              () => null;
            } else if (routeName === FinancialReportName) {
              () => null;
            } else if (routeName === FinancialReportDataName) {
              () => null;
            } else if (routeName === PromotionServicesName) {
              () => null;
            } else if (routeName === DeleteShopName) {
              () => null;
            } else if (routeName === FinancialFilterName) {
              () => null;
            } else if (routeName === CreateShopName) {
              () => null;
            }else if (routeName === WaitingName) {
              () => null;
            }
          })(route),
        })}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: globalWidth(30),
    width: globalWidth(30),
    resizeMode: "contain",
  },
  textStyle: {
    fontSize: 10,
    color: Colors.black,
    lineHeight: globalHeight(12),
    textAlign: "center",
    fontWeight: "400",
    marginVertical: globalHeight(4),
  },
  tabBarStyle: {
    backgroundColor: "#F4FCFF",
    height: Platform.OS === "ios" ? globalHeight(90) : globalHeight(72),
  },
});
