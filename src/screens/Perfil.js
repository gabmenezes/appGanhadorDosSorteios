import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledButton from "../components/Styledbutton";
import Line from "../components/Line";
import StyledInput from "../components/StyledInput";
import instagramService from "../services/instagramService";
import { ActivityIndicator } from "react-native-paper";

export default function Perfil({ navigation }) {
  const [usuarioInstagram, setUsuarioInstagram] = useState(null);
  const [errorUsuarioInstagram, setErrorUsuarioInstagram] = useState(null);
  const [senhaInstagram, setSenhaInstagram] = useState(null);
  const [errorSenhaInstagram, setErrorSenhaInstagram] = useState(null);
  const [tituloAlert, setTituloAlert] = useState(null);
  const [mensagemAlert, setMensagemAlert] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const logout = (navigation) => {
    AsyncStorage.removeItem("TOKEN");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const validateFields = () => {
    let error = false;
    setErrorUsuarioInstagram(null);
    setErrorSenhaInstagram(null);

    const regexArroba = /@.*/gm;

    if (regexArroba.test(String(usuarioInstagram))) {
      setErrorUsuarioInstagram("Por favor insira o usuario sem '@' ");
      error = true;
    }

    if (usuarioInstagram == null || usuarioInstagram=="") {
      setErrorUsuarioInstagram("Por favor insira um usuário");
      error = true;
    }

    if (senhaInstagram == null || senhaInstagram== "") {
      setErrorSenhaInstagram("Por favor insira uma senha");
      error = true;
    }
    setLoading(false);

    return !error;
  };

  const enviarLoginInstagram = () => {
    setLoading(true);
    if (validateFields()) {
      const data = {
        user: usuarioInstagram,
        password: senhaInstagram,
      };
      instagramService
        .login(data)
        .then((response) => {
          if (response.result) {
            setLoading(false);
            setTituloAlert("Sucesso!");
            setMensagemAlert(response.message);
            Alert.alert(tituloAlert, mensagemAlert);
          } else {
            setLoading(false);
            setTituloAlert("Falha");
            setMensagemAlert(response.message);
            Alert.alert(tituloAlert, mensagemAlert);
          }
        })
        .catch((error) => {
          setLoading(false);
          setTituloAlert("Falha");
          setMensagemAlert(
            "Houve algum problema no cadastro do Instagram, tente novamente mais tarde"
          );
          Alert.alert(tituloAlert, mensagemAlert);
        });
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text h3>Perfil</Text>
        </View>

        <StyledInput
          placeholder=" Usuário do Instagram sem '@'"
          leftIcon="instagram"
          onChangeText={(value) => {
            setErrorUsuarioInstagram(null)
            setUsuarioInstagram(value);
          }}
          maxLength={15}
          errorMessage={errorUsuarioInstagram}
        />

        <StyledInput
          placeholder=" Senha do instagram"
          leftIcon="lock"
          onChangeText={(value) => {
            setSenhaInstagram(value);
            setErrorSenhaInstagram(null)
          }}
          maxLength={15}
          secureTextEntry={true}
          errorMessage={errorSenhaInstagram}
          />

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {isLoading && <ActivityIndicator color="grey" />}
          {!isLoading && (
            <StyledButton
              onPress={() => enviarLoginInstagram()}
              title="Cadastrar"
            />
          )}
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <StyledButton
            onPress={() => logout(navigation)}
            title="Sair do aplicativo"
          />
        </View>

        <Line />
      </ScrollView>
    </View>
  );
}
