import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, View, Alert } from "react-native";
import { Text, Input, Button, Image } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import styles from "../style/MainStyle";
import usuarioService from "../services/userServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import inputStyles from "../style/inpuStyles";
import buttonStyles from "../style/buttonStyles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [tituloErro, setTituloErro] = React.useState(null);
  const [mensagemErro, setMensagemErro] = React.useState(null);
  const [isLoadingToken, setLoadingToken] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      if (token) {
        enterWithToken(token);
      }
    });
  }, []);

  const validateFields = () => {
    let error = false;
    setErrorEmail(null);
    setErrorPassword(null);

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email == null || !re.test(String(email).toLowerCase()) ||email == "") {
      setErrorEmail("Por favor insira um e-mail");
      error = true;
    }

    if (password == null || password=="") {
      setErrorPassword("Por favor insira uma senha");
      error = true;
    }
    setLoading(false);

    return !error;
  };

  const enter = () => {
    setLoading(true);
    
    if (validateFields()) {
      let data = {
        email: email.toLowerCase(),
        password: password,
      };
      usuarioService
        .login(data)
        .then((response) => {
          setLoading(false);
          if (response.status === 201) {
            
            navigation.reset({
              index: 0,
              routes: [{ name: "WebView" }],
            });
          } else {
            setTituloErro("Falha");
            setMensagemErro(response.message);
            // mensagemErro
            Alert.alert(
              tituloErro,
              "Ocorreu um problema no login, verifique seu usuário e senha e tente novamente"
            );
          }
        })
        .catch((error) => {
          Alert.alert(
            "Erro",
            "Ocorreu um problema no login, verifique seu usuário e senha e tente novamente"
          );
          setLoading(false);
        });
    }
  };

  const enterWithToken = (token) => {
    setLoadingToken(true);
    let data = {
      token,
    };

    usuarioService
      .loginWithToken(data)
      .then((response) => {
        setLoadingToken(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((error) => {
        setLoadingToken(false);
      });
  };

  return (
    <View style={styles.container}>
      {isLoadingToken && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <ActivityIndicator color="grey" />
        </View>
      )}

      {!isLoadingToken && (
        <>

<View style={{  backgroundColor: "gray", borderRadius:10, padding: 10 }}>
          <Image
            source={require("../public/images/ganhadorDosSorteios.png")}
            style={{ width: 200, height: 100, resizeMode: "stretch" }}
            PlaceholderContent={<ActivityIndicator />}
          />
          </View>

          <View
            style={{
              marginTop: 20,
              bordercolor: "red",
              alignItems: "center",
              justifyContent: "center",
              height: "40%",
            }}
          >
            <View style={{ height: 80, width: "90%", marginTop: 20 }}>
              <Input
                placeholder="E-mail"
                leftIcon={{ type: "font-awesome", name: "envelope" }}
                onChangeText={(value) => {
                  setEmail(value);
                  setErrorEmail(null);
                }}
                keyboardType="email-address"
                errorMessage={errorEmail}
                inputStyle={inputStyles.inputStyle}
                inputContainerStyle={inputStyles.inputContainer}
                containerStyle={inputStyles.containerStyle}
                leftIconContainerStyle={inputStyles.leftIconContainerStyle}
              />
            </View>

            <View
              style={{
                height: 80,
                marginTop: 20,
                marginBottom: 20,
                width: "90%",
              }}
            >
              <Input
                placeholder="Senha"
                leftIcon={{ type: "font-awesome", name: "lock", size: 30 }}
                onChangeText={(value) => {
                  setPassword(value);
                  setErrorPassword(null);
                }}
                secureTextEntry={true}
                errorMessage={errorPassword}
                keyboardReturnKey="teste"
                inputStyle={inputStyles.inputStyle}
                inputContainerStyle={inputStyles.inputContainer}
                containerStyle={inputStyles.containerStyle}
                leftIconContainerStyle={inputStyles.leftIconContainerStyle}
              />
            </View>
            {isLoading && <ActivityIndicator color="grey" />}

            {!isLoading && (
              <View style={{ width: 230, alignItems: "center" }}>
                <Button
                  title="Entrar"
                  onPress={enter}
                  style={{ borderWidth: 1, bodercolor: "black", width: 80 }}
                  buttonStyle={buttonStyles.buttonStyle}
                  containerStyle={buttonStyles.containerStyle}
                  disabledStyle={buttonStyles.disabledStyle}
                />
              </View>
            )}
          </View>
        </>
      )}

      <StatusBar style="auto" />
    </View>
  );
}
