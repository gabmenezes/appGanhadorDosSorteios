import React, { useState } from "react";
import { View, Modal, Dimensions  } from "react-native";
import { WebView } from 'react-native-webview';
import StyledButton from "../components/Styledbutton";
import { Button } from "react-native-elements";


export default function Teste({ navigation }){
    [ modalVisible, setModalVisible] = useState(true);

    let botScript = `
    // alert("injetou 3");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function comentar() {
  var i = 0;
  while (true) {
    var comment_text = document.getElementsByClassName("Ypffh")[0];

    if (comment_text) {
      var comment_text = document.getElementsByClassName("Ypffh")[0];
      comment_text.click();
      comment_text.focus();
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(comment_text, "teste"+i);

      var ev2 = new Event("input", { bubbles: true });
      comment_text.dispatchEvent(ev2);
      var submit_button = document.getElementsByClassName("y3zKF")[0];
      submit_button.click();
      await sleep(30000);
      i = i+1
    }
    await sleep(30000);
  }
}
comentar();` 


    return (
        <>
        <View style={{
          justifyContent: "center",
          flexDirection: "column", 
          alignItems:"center", 
          height: Dimensions.get('window').height,
        }}>
          <StyledButton 
            title="Entrar no Instagram" 
            onPress={() => setModalVisible(true)}
          />
          <StyledButton 
            title="Já estou logado" 
            onPress={() =>navigation.navigate('Home') }
          />
        </View>
        <Modal
          animationType={'slide'}
          visible={modalVisible}
          // onRequestClose={hide.bind(this)}
          transparent
        >
        
          <View style={{flex: 1}}>
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              // injectedJavaScript={botScript}
              source={{
                uri: 'https://www.instagram.com'
              }}
              style={{ marginTop: 10, height: "70%" }}
            />
          </View>
          
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <StyledButton title="Fechar" onPress={() => {
            setModalVisible(false)
            navigation.navigate('Teste')
          }} />
          </View>
      </Modal>
      </>
    )
}