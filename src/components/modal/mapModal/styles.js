import { StyleSheet, Dimensions } from "react-native";
import { globalHeight, globalWidth } from "../../dimensions";
import { Colors } from "../../../constants";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  cont:{
    flex: 1,
    flexDirection: 'column',
    elevation: 10,
    borderRadius: 15,
    shadowRadius: 15,
    shadowOpacity: 0.34,
    shadowColor: Colors.black,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },



  back_button_View: {
    position:'absolute',
    zIndex:999999,
    right:globalWidth(0),
    top:globalHeight(15),
    alignItems: "flex-end",
    marginRight: globalWidth(20),
    marginVertical:globalHeight(10)
  },
  back_button: {
    width: globalHeight(20),
    height: globalHeight(20),
    resizeMode: "contain",
  },

  input:{
    backgroundColor:'white',
    paddingLeft:globalWidth(10),
    width:width-globalWidth(80),
    marginBottom:globalHeight(10)
  },
  btn:{
    marginBottom:globalHeight(10),
    width:width-globalWidth(75),

  },

  header:{
    marginTop:Platform.OS === 'ios' ?  30 : 0
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop:Platform.OS === 'ios' ? globalHeight(20) : 0
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerCont:{
    width:width,
    backgroundColor:'white'
  },
  footerCont:{
    // position:'absolute',
    width:width,
    alignItems:'center',
  backgroundColor:'white',
    paddingVertical:globalHeight(10),
  },
  btnFooter:{
    width:width-globalWidth(20),
  },
  absCont:{
    position:'absolute',
    zIndex:10,
    top:globalHeight(50),
    backgroundColor:'white',
    width:width-globalWidth(38),
    height:height-globalHeight(50),
  },
  contentMyDetails: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColorLight,
    marginVertical: globalHeight(17),
    marginHorizontal: globalWidth(20),
  },
  contentMyDetailsText: {
    color: Colors.black,
    marginBottom: globalHeight(8),
  },
});
