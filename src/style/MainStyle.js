import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      // marginTop: 10,
      // borderColor: 'red',
      // borderWidth: 1,
    },
    maskedInput: {
      flexGrow: 1,
      height: 40,
      // fontsize: 18,
      borderColor: "grey",
      borderBottomWidth: 1,
      borderStyle: "solid",
      alignSelf: "flex-start",
    },
    containerInputMask: {
      flexDirection: "row",
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
    }
  });

  export default styles