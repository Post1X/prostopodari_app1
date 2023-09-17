import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../../../components";
import { Colors } from "../../../../constants";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({

  headerContainer: {
    backgroundColor: Colors.blueBackground,
  },
  addText: {
    marginLeft: globalWidth(27),
    fontWeight: "600",
    color: Colors.titleColor,
    fontSize: globalWidth(25),
    marginBottom: globalHeight(43),
    marginTop: globalHeight(13),
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  AddPhotoContainer: {
    width: globalWidth(94),
    height: globalWidth(94),
    borderWidth: 1.6,
    borderRadius: 12,
    borderColor: Colors.blue,
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  photosContainer: {
    width: globalWidth(94),
    height: globalWidth(94),
    borderRadius: 12,
    marginHorizontal: globalWidth(10),
  },
  iconCameraStyle: {
    width: globalWidth(45),
    height: globalHeight(35),
    resizeMode: "contain",
  },
  addCont:{
    textAlign:"center",
    marginBottom: globalHeight(30),
  },
  contScroll: {
    marginVertical: globalHeight(10),
  },
  loadingText: {
    marginTop: globalHeight(20),
    marginBottom:globalHeight(8),
    color: Colors.gray,
  },
  inputContainer: {
    marginBottom: globalHeight(30),
  },
  content: {
    paddingTop: globalHeight(23),
  },
  inputBig: {
    paddingTop: 0,
    borderWidth: 1,
    paddingBottom: 0,
    marginBottom: globalHeight(50),
    textAlignVertical: "top",
    height: globalHeight(139),
    borderRadius: 8,
  },
  btnStyle: {
    marginBottom: globalHeight(20),
  },
  choosePhotoText: {
    color: Colors.black,
    marginTop: 7,
  },
  btnStyleDrop: {
    width: width - globalWidth(40),
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderRadius: 6,
    borderColor: Colors.borderGray,
    textAlign: "left",
  },
  btnAdd:{
    width:globalWidth(28),
    height:globalWidth(28),
    position:'absolute',
  },
  imgPlusMinus:{
    width:globalWidth(28),
    height:globalWidth(28),
    resizeMode:'contain'
  },
  textAdd:{
    color:Colors.titleColor,
    fontSize:globalWidth(20),
    textAlign:'center'
  },
  dropCont: {
    alignItems: "center",
    marginBottom: globalHeight(20),
  },
  titleInp: {
    marginLeft: globalWidth(20),
  },

  imgCont: {
    position: "relative",
  },
  closeCont: {
    width: globalWidth(20),
    height: globalWidth(20),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: globalWidth(10),
    zIndex: 10,
  },
  closeIcon: {
    width: globalWidth(11),
    height: globalWidth(11),
  },
  absl:{
    right:globalWidth(20),
    zIndex:1000
  },
  abslleft:{
    left:globalWidth(20),
    zIndex:1000
  },
  imgAct:{
    width:globalWidth(18),
    height:globalWidth(18),
    marginRight:globalWidth(6)
  },
  activeContainer:{
    marginHorizontal:globalWidth(20),
    marginBottom:globalWidth(15)
  },
  vremyaStyle:{
    borderBottomWidth:1,
    borderBottomColor:Colors.borderGray,
    marginHorizontal:globalWidth(20),
    alignItems:'center',
    paddingVertical:globalHeight(5)
  }
});
