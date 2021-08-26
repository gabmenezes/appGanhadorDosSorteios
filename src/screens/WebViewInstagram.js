import React, { useState } from "react";
import { View, Modal, Dimensions  } from "react-native";
import { WebView } from 'react-native-webview';
import StyledButton from "../components/Styledbutton";

export default function WebViewInstagram({ navigation }) {
    const [ modalVisible, setModalVisible] = useState(true);

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
          transparent
        >
        
          <View style={{flex: 1}}>
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri: 'https://www.instagram.com/accounts/login'
              }}
              style={{ marginTop: 10, height: "70%" }}
            />
          </View>
          
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <StyledButton title="Fechar" onPress={() => {
            setModalVisible(false)
          }} />
          </View>
      </Modal>
      </>
    )
}