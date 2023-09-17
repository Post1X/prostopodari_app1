import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../../../components";
import { Colors } from "../../../../constants";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.blueBackground,
  },
  back:{
    marginLeft:0
  },
  headerTextContainer:{
    paddingVertical:globalHeight(30),
    borderBottomWidth:1,
    borderBottomColor:Colors.borderGray,
  },
  headerPadding:{
    paddingHorizontal:globalWidth(20),
    paddingTop:globalHeight(13)
  },
  contentStyleText:{
    marginVertical:globalHeight(4)
  },
  between:{
    justifyContent:'space-between'
  },
  countryView:{
    marginVertical:globalHeight(14)
  },
  headerBorderWidth:{
    borderBottomWidth:1,
    borderBottomColor:Colors.borderGray
  },
  contData:{
    marginBottom:globalHeight(23)
  },
  priceView:{
    paddingVertical:globalHeight(26),
    backgroundColor:Colors.backgroundBLightBlue,
    borderBottomColor:Colors.borderGray,
    borderBottomWidth:1,
    paddingHorizontal:globalWidth(20)
  },
  messageIcon:{
    width:globalWidth(31),
    height:globalHeight(29),
    marginLeft:globalWidth(10),
    resizeMode:'contain'
  },
  footerCont:{
    paddingHorizontal:globalWidth(20),
    paddingVertical:globalHeight(20),
  },
  choosePhotoText: {
    color: Colors.black,
    marginTop: globalHeight(7),
  },
  btnStyleDrop: {
    width: "100%",
    backgroundColor: Colors.tifany,
    borderRadius: 8,
  },
  dropCont:{
    width:width-globalWidth(80)
  },
  applicationsContainer:{
    borderBottomWidth:1,
    borderBottomColor:Colors.borderColorLight,
    paddingTop:globalHeight(19),
    position:'relative'
  },
  changeContent:{
    marginLeft:globalWidth(21),
    marginRight:globalWidth(29)
  },
  imgForm:{
    width:globalWidth(85),
    height:globalHeight(85),
    marginTop:globalHeight(13),
    marginBottom:globalHeight(37),
    resizeMode:'contain'
  },
  textCont:{
    marginLeft:globalWidth(8),
  },
  priceText:{
    marginTop:globalHeight(11)
  },
  positView:{
    position:'absolute',
    right:globalWidth(29),
    bottom:globalHeight(47),
    zIndex:10
  }
});
