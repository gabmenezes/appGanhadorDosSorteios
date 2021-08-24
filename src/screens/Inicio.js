import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Alert,
} from "react-native";
import {
  Text,
  Input,
  Button,
  CheckBox,
  ListItem,
  Icon,
} from "react-native-elements";
import buttonStyles from "../style/buttonStyles";
import inputStyles from "../style/inpuStyles";
import StyledButton from "../components/Styledbutton";
import Line from "../components/Line";
import StyledInput from "../components/StyledInput";
import botService from "../services/botService";
import userServices from "../services/userServices";
import { ActivityIndicator } from "react-native-paper";
import * as moment from 'moment';

export default function Inicio() {
  const [linkSorteio, setLinkSorteio] = useState(null);
  const [errorLinkSorteio, setErrorLinkSorteio] = useState(null);

  const [textoComentario, setTextoComentario] = useState(null);
  const [errorTextoComentario, setErrorTextoComentario] = useState(null);

  const [perfil, setPerfil] = useState(null);
  const [errorPerfil, setErrorPerfil] = useState(null);

  const [checkBoxPerfis, setCheckBoxPerfis] = useState(false);
  const [checkBoxAntes, setCheckBoxAntes] = useState(false);
  const [checkBoxDepois, setCheckBoxDepois] = useState(false);

  const [checkBoxRepetirMarcacao, setCheckBoxRepetirMarcacao] = useState(false);

  const [listaPerfis, setListaPerfis] = useState([]);

  const [isLoadingBot, setIsLoadingBot] = useState(false);
  const [tituloAlert, setTituloAlert] = useState(false);
  const [isLoadingPerfis, setLoadingPerfis] = useState(false);
  const [mensagemAlert, setMensagemAlert] = useState(false);

  const [quantidadeComentarios, setQuantidadeComentarios] =useState(null);

  useEffect(() => {
    console.log("============TEDSSS");
    botService.verificarBot().then((response) => {
      console.log("===========RESPONSESTATUS");
      console.log(response);
      setIsLoadingBot(response.statusBot)
    })
    .catch((err) => {
      console.log(err);
      // Alert.alert("Falha!", "Falha ao verificar status do bot");
      Alert.alert("Falha!", "Falha ao verificar status do bot");
    });

  }, []);

  const validateFields = () => {
    let error = false;
    setErrorLinkSorteio(null);
    setErrorTextoComentario(null);
    setTituloAlert(null);
    setMensagemAlert(null);

    console.log("==================")
    console.log(linkSorteio)
     const regexSorteioInsta = /https:\/\/www\.instagram\.com\/.*/gm;
    if (linkSorteio == null || linkSorteio== "" || !regexSorteioInsta.test(linkSorteio) ) {
      setErrorLinkSorteio("Por favor insira um link de sorteio válido");
      error = true;
    }

    console.log("==================")
    console.log(textoComentario)
    if (textoComentario == null || textoComentario== "") {
      setErrorTextoComentario("Por favor insira um comentário");
      error = true;
    }

    if (checkBoxPerfis == true && listaPerfis.length == 0) {
      console.log("Foraa")
        Alert.alert("Verifique!", "Se você deseja marcar perfis é necessário que haja pelo menos um perfil listado");
        error = true;
      }
      
      if (
        checkBoxPerfis == true &&
        listaPerfis.length > 0 &&
        checkBoxAntes == false &&
        checkBoxDepois == false
        ) {
          console.log("Dentrooo")
          Alert.alert("Verifique!", "Se você deseja marcar perfis é necessário que escolha se quer marcar antes ou depois");
          error = true;
        }
        console.log("Depois deles")

        setIsLoadingBot(false);
    return !error;
  };

  const iniciarBot = () => {
    setIsLoadingBot(true)
    if (validateFields()) {
      setIsLoadingBot(true)
      let ordemMarcacao = checkBoxAntes ? "antes" : "depois";
      const data = {
        tempoComentario: "45",
        textoComentario: textoComentario,
        repetirMarcacao: checkBoxRepetirMarcacao,
        linkSorteio: linkSorteio,
        antesOuDepois: ordemMarcacao,
        podeComentar: true,
        qtdComentarios: 0,
        podeMarcar: checkBoxPerfis,
        indexPerfil: 0
      };
      console.log("=========DATA")

      console.log("=========TENTANDO INICIAR=========")
      console.log(data)
      botService
        .iniciarBot(data)
        .then((response) => {
          console.log(response);
          if (response.statusCode == 200) {
            Alert.alert("Sucesso!", "Serviço iniciado!");
          } else if (response.statusCode == 401 && response.message.includes('Usuário inexistente')) {
            Alert.alert('Negado', response.message)
            setIsLoadingBot(false);
          }
        })
        .catch((err) => {
          setIsLoadingBot(false);
          Alert.alert("Falha!", err.message);
        });
    }
  };

  const pararBot = () => {
    if(isLoadingBot){
      botService
      .pararBot()
      .then((response) => {
        if (response.statusCode == 200) {
          console.log(response.quantidadeComentarios)
          Alert.alert("Sucesso!", "Serviço parado");
          setQuantidadeComentarios(response.quantidadeComentarios)
          setIsLoadingBot(false);
        }else{
          Alert.alert("Falha!", "Houve um problema ao acessar o servidor");
        }
      })
      .catch((err) => {
        Alert.alert("Falha!", "Houve um problema ao acessar o servidor");
      });
    }else{
      Alert.alert("Falha!", "Não existe bot iniciado no momento");
    }

  };

  const getPerfis = () => {
    console.log("====entrou");
    setLoadingPerfis(true);
    userServices.getPerfis()
      .then((perfis) => {
        console.log("dentro");
        console.log(perfis);
        setLoadingPerfis(false);
        setListaPerfis(perfis);
      })
      .catch((err) => {
        console.log("Fora");
        console.log(err);
        setLoadingPerfis(false);
        setTituloAlert("Falha!");
        setMensagemAlert(
          "Ocorreu um problema ao tentar buscar a lista de perfis, por favor tente novamente mais tarde"
        );
        Alert.alert(tituloAlert, mensagemAlert);
      });
  };

  const updatePerfis = () => {
    if(listaPerfis.length > 0){
      userServices.updatePerfis(listaPerfis)
        .then((perfis) => {
        
          console.log("=========LIST=========")
          if(perfis.statusCode == "200"){
            Alert.alert("Sucesso!", perfis.message);
          }else{
            Alert.alert("Falha!", "Falha ao salvar lista de perfis");
          }
          
        })
        .catch((err) => {
          console.log("erroo=====")
          Alert.alert("Falha!", "Falha ao salvar lista de perfis");
        });
    }else{
      Alert.alert("Falha!", "É necessário que pelo menos um perfil esteja na lista para salvá-la");
    }

  };

  return (
    <View>
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text h3>Inicio</Text>
        </View>

        <StyledInput
          placeholder="Link do sorteio"
          leftIcon="link"
          onChangeText={(value) => {
            setLinkSorteio(value);
            setErrorLinkSorteio(null);
          }}
          errorMessage={errorLinkSorteio}
        />

        <Line />

        {/* <View style={{ flexDirection: "row" }}>
          <Input
            placeholder="Espera"
            leftIcon={{ type: "font-awesome", name: "hourglass", size: 18 }}
            onChangeText={(value) => {
              setEmail(value);
              setErrorEmail(null);
            }}
            errorMessage={errorEmail}
            inputStyle={inputStyles.inputStyle}
            inputContainerStyle={inputStyles.inputContainer}
            containerStyle={{
              margin: 5,
              marginRight: -1,
              marginTop: 20,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
            leftIconContainerStyle={inputStyles.leftIconContainerStyle}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "35%",
            }}
          >
            <Text>Mínimo de 45 segundos</Text>
          </View>
        </View> */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* <Text>tempo mínimo de 45 segundos, por comentario</Text> */}
        </View>

        <Input
          placeholder="Texto do comentario"
          // leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(value) => {
            setTextoComentario(value);
            setErrorTextoComentario(null);
          }}
          errorMessage={errorTextoComentario}
          maxLength={40}
          inputStyle={inputStyles.inputStyle}
          inputContainerStyle={inputStyles.inputContainer}
          containerStyle={inputStyles.containerStyle}
          leftIconContainerStyle={inputStyles.leftIconContainerStyle}
        />

        <CheckBox
          center
          title="Marcar perfis"
          checkedIcon="check"
          containerStyle={{ backgroundColor: "#d8d8d8" }}
          checked={checkBoxPerfis}
          checkedColor="green"
          style={{ backgroundColor: "red" }}
          onPress={() => {
            if(!checkBoxPerfis){
              getPerfis();
            }
            setCheckBoxPerfis(!checkBoxPerfis);
          }}
        />

        {checkBoxPerfis && (
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 2, margin: 5 }}>
                <Input
                  style={{
                    borderRadius: 10,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "grey",
                    height: 20,
                    alignItems: "flex-start",
                    textDecorationLine: "none",
                    padding: 5,
                  }}
                  onChangeText={(value) => {
                    setErrorPerfil(null);
                    setPerfil(value);
                  }}
                  placeholder="Digite o perfil"
                  errorMessage={errorPerfil} // remeber to see later
                  maxLength={40}
                  autoFocus={true}
                  value={perfil}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  onSubmitEditing={() => {
                    const regexArroba = /@.*/gm;

                    console.log("===valid")
                    if (regexArroba.test(String(perfil))) {
                      setErrorPerfil("Por favor insira o perfil sem '@' ");
                    }else if (perfil == null || perfil == ""){
                      setErrorPerfil("Digite um perfil por gentileza");
                    } else {
                      setListaPerfis([{ name: perfil }, ...listaPerfis]);
                      setPerfil(null);
                    }
                  }}
                ></Input>
              </View>
              <View style={{ flex: 1, margin: 5, marginRight: 10 }}>
                <Button
                  title="Adicionar"
                  onPress={() => {
                    const regexArroba = /@.*/gm;

                    console.log("===valid")
                    if (regexArroba.test(String(perfil))) {
                      setErrorPerfil("Por favor insira o perfil sem '@' ");
                    }else if (perfil == null || perfil == ""){
                      setErrorPerfil("Digite um perfil por gentileza");
                    } else {
                      setListaPerfis([{ name: perfil }, ...listaPerfis]);
                      setPerfil(null);
                    }
                  }}
                  buttonStyle={buttonStyles.buttonStyle}
                ></Button>
              </View>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {isLoadingPerfis && <ActivityIndicator color="grey" />}

              {!isLoadingPerfis && listaPerfis.length > 0 && (
                <View style={{ width: "80%", height: 300 }}>
                  <ScrollView nestedScrollEnabled={true}>
                    {listaPerfis.map((l, i) => (
                      <ListItem
                        key={i}
                        bottomDivider
                        onPress={() => {
                          delete listaPerfis[i];
                          let novalista = listaPerfis.filter(function (el) {
                            return el != null;
                          });
                          setListaPerfis(novalista);
                        }}
                      >
                        <ListItem.Content>
                          {/* rightContent={<Icon name={"delete"} style={}/> } */}
                          <ListItem.Title>{l.name}</ListItem.Title>
                        </ListItem.Content>
                        <Icon name={"delete"} />
                      </ListItem>
                    ))}
                  </ScrollView>
                </View>
              )}
              <StyledButton title="Salvar" onPress={() => updatePerfis()} />

              <View style={{ flex: 1, flexDirection: "row" }}>
                <CheckBox
                  center
                  title="Marcar antes"
                  checkedIcon="check"
                  containerStyle={{ backgroundColor: "#d8d8d8" }}
                  checked={checkBoxAntes}
                  checkedColor="green"
                  onPress={() => {
                    if (checkBoxDepois) {
                      setCheckBoxDepois(false);
                    }
                    setCheckBoxAntes(!checkBoxAntes);
                  }}
                />
                <CheckBox
                  center
                  title="Marcar depois"
                  checkedIcon="check"
                  containerStyle={{ backgroundColor: "#d8d8d8" }}
                  checked={checkBoxDepois}
                  checkedColor="green"
                  onPress={() => {
                    if (checkBoxAntes) {
                      setCheckBoxAntes(false);
                    }
                    setCheckBoxDepois(!checkBoxDepois);
                  }}
                />
              </View>
            </View>

            <CheckBox
              center
              title="Repetir marcações"
              checkedIcon="check"
              containerStyle={{ backgroundColor: "#d8d8d8" }}
              checked={checkBoxRepetirMarcacao}
              checkedColor="green"
              onPress={() => {
                setCheckBoxRepetirMarcacao(!checkBoxRepetirMarcacao);
              }}
            />
          </View>
        )}

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          {isLoadingBot && <ActivityIndicator color="grey" />}

          {!isLoadingBot && (
            <StyledButton title="Iniciar" onPress={() => iniciarBot()} />
          )}

          <StyledButton title="Parar" onPress={() => pararBot()} />
        </View>
      {quantidadeComentarios > 0 &&
       <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
         marginBottom: 30,
       }}
     > 
      <Text style={{fontWeight: 'bold'}}>O bot realizou {quantidadeComentarios} comentário(s)</Text>
      </View>
      }
      </ScrollView>

    </View>
  );
}
