import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, Modal } from "react-native";
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
import * as moment from "moment";
import { WebView } from "react-native-webview";

export default function Inicio() {
  const [linkSorteio, setLinkSorteio] = useState(null);
  const [errorLinkSorteio, setErrorLinkSorteio] = useState(null);

  const [comentarioTempo , setComentarioTempo] = useState(60);
  const [errorComentarioTempo , setErrorComentarioTempo] = useState(false);

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

  const [quantidadeComentarios, setQuantidadeComentarios] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [botScript, setBotScript] = useState("");

  useEffect(() => {
    // botService
    //   .verificarBot()
    //   .then((response) => {
    //     setIsLoadingBot(response.statusBot);
    //   })
    //   .catch((err) => {
    //     // Alert.alert("Falha!", "Falha ao verificar status do bot");
    //     Alert.alert("Falha!", "Falha ao verificar status do bot");
    //   });
  }, []);

  const validateFields = () => {
    let error = false;
    setErrorLinkSorteio(null);
    setErrorTextoComentario(null);
    setTituloAlert(null);
    setMensagemAlert(null);
    setErrorComentarioTempo(null);

    const onlyNumber = /^[0-9]*$/gm

    if (comentarioTempo < 60 || comentarioTempo == "" || comentarioTempo == null
    || !onlyNumber.test(comentarioTempo)) {
      setErrorComentarioTempo("Mínimo de 60 segundos.")
      error = true;
    }

    const regexSorteioInsta = /https:\/\/www\.instagram\.com\/.*/gm;

    if (
      linkSorteio == null ||
      linkSorteio == "" ||
      !regexSorteioInsta.test(linkSorteio)
    ) {
      setErrorLinkSorteio("Por favor insira um link de sorteio válido");
      error = true;
    }

    if (textoComentario == null || textoComentario == "") {
      setErrorTextoComentario("Por favor insira um comentário");
      error = true;
    }

    if (checkBoxPerfis == true && listaPerfis.length == 0) {
      Alert.alert(
        "Verifique!",
        "Se você deseja marcar perfis é necessário que haja pelo menos um perfil listado"
      );
      error = true;
    }

    if (
      checkBoxPerfis == true &&
      listaPerfis.length > 0 &&
      checkBoxAntes == false &&
      checkBoxDepois == false
    ) {

      Alert.alert(
        "Verifique!",
        "Se você deseja marcar perfis é necessário que escolha se quer marcar antes ou depois"
      );
      error = true;
    }

    setIsLoadingBot(false);
    return !error;
  };

  const iniciarBot = () => {
    if (validateFields()) {
      let ordemMarcacao = checkBoxAntes ? "antes" : "depois";
      const horaAtual = new Date();
      const horasAFrente = horaAtual.setHours(horaAtual.getHours()+ 3)

      const data = {
        tempo_comentario: comentarioTempo,
        comentario: textoComentario,
        repetir_marcacao: checkBoxRepetirMarcacao,
        linkSorteio: linkSorteio,
        antes_depois: ordemMarcacao,
        podeComentar: true,
        qtdComentarios: 0,
        marca_usuario: checkBoxPerfis,
        indexPerfil: 0,
        lista_usuario_marcar: listaPerfis,
        dataParada: horasAFrente
      };

      let botScripts = `
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    
    function construirComentario(dados) {
      var comment = []
      if (dados.marca_usuario) {
        comment = dados.lista_usuario_marcar.map((usuario) => {
          return '@'+ usuario.name.trim()+ ' ' + dados.comentario 
        });
    
        if (dados.antes_depois.includes('depois')) {
          comment = dados.lista_usuario_marcar.map((usuario) => {
            return dados.comentario+ ' ' + '@' + usuario.name.trim() 
          });
        }
        return comment;
      }
    
      return [dados.comentario];
    }
    
    async function comentar(args) {

        var horaAtual = new Date()
        args.dataParada = new Date(args.dataParada)

        if(horaAtual > args.dataParada){

          args.dataParada = new Date(args.dataParada.setMinutes(args.dataParada.getMinutes() + 180));
          args.podeComentar = false
        }
        var checkExist = setInterval(async function() {
          if (document.getElementsByClassName("Ypffh")[0]) {
            clearInterval(checkExist);
          }
        }, 100)
        if(checkExist){
          var comment_text = document.getElementsByClassName("Ypffh")[0];
          
          if(!args.podeComentar){
            var comment_text = document.getElementsByClassName("Ypffh")[0];
            comment_text.click();
            comment_text.focus();
            var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLTextAreaElement.prototype,
              "value"
            ).set;
            nativeInputValueSetter.call(comment_text, 'Pausa automática de 30 min');
            await sleep( 1800 * 1000);
        args.podeComentar = true
       }
    
       if(comment_text){
         let comentarioCompleto = construirComentario(args);
         for (var comentarioAtual of comentarioCompleto) {
    
         var comment_text = document.getElementsByClassName("Ypffh")[0];
         comment_text.click();
         comment_text.focus();
         var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
           window.HTMLTextAreaElement.prototype,
           "value"
         ).set;
         nativeInputValueSetter.call(comment_text, comentarioAtual);
    
         var ev2 = new Event("input", { bubbles: true });
         comment_text.dispatchEvent(ev2);
         var submit_button = document.getElementsByClassName("y3zKF")[0];
         submit_button.click();
         await sleep(args.tempo_comentario * 1000);
        }
        if (!args.repetir_marcacao) {
          args.marca_usuario = false;
        }
        await comentar(args)
        }
       }
      }
      comentar(${JSON.stringify(data)})
       `

      if (linkSorteio.includes('?utm_medium=copy_link')) {
        setLinkSorteio(linkSorteio.replace('/?utm_medium=copy_link', ''))
      } else if (linkSorteio.includes('/?utm_source=ig_web_copy_link')) {
        setLinkSorteio(linkSorteio.replace('/?utm_source=ig_web_copy_link', ''))
      } else if (linkSorteio.slice(-1) == "/") {
        setLinkSorteio(linkSorteio.substring(0 , linkSorteio.length - 1))
      }

      setBotScript(botScripts);
      setModalVisible(true);
    }
  };

  const pararBot = () => {
    if (isLoadingBot) {
      botService
        .pararBot()
        .then((response) => {
          if (response.statusCode == 200) {
            Alert.alert("Sucesso!", "Serviço parado");
            setQuantidadeComentarios(response.quantidadeComentarios);
            setIsLoadingBot(false);
          } else {
            Alert.alert("Falha!", "Houve um problema ao acessar o servidor");
          }
        })
        .catch((err) => {
          Alert.alert("Falha!", "Houve um problema ao acessar o servidor");
        });
    } else {
      Alert.alert("Falha!", "Não existe bot iniciado no momento");
    }
  };

  const getPerfis = () => {
    setLoadingPerfis(true);
    userServices
      .getPerfis()
      .then((perfis) => {
        setLoadingPerfis(false);
        setListaPerfis(perfis);
      })
      .catch((err) => {
        setLoadingPerfis(false);
        setTituloAlert("Falha!");
        setMensagemAlert(
          "Ocorreu um problema ao tentar buscar a lista de perfis, por favor tente novamente mais tarde"
        );
        Alert.alert(tituloAlert, mensagemAlert);
      });
  };

  const updatePerfis = () => {
    if (listaPerfis.length > 0) {
      userServices
        .updatePerfis(listaPerfis)
        .then((perfis) => {
          
          if (perfis.statusCode == "200") {
            Alert.alert("Sucesso!", perfis.message);
          } else {
            Alert.alert("Falha!", "Falha ao salvar lista de perfis");
          }
        })
        .catch((err) => {
          
          Alert.alert("Falha!", "Falha ao salvar lista de perfis");
        });
    } else {
      Alert.alert(
        "Falha!",
        "É necessário que pelo menos um perfil esteja na lista para salvá-la"
      );
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

        <View style={{ flexDirection: "row" }}>
          <Input
            placeholder="Segundos"
            leftIcon={{ type: "font-awesome", name: "hourglass", size: 18 }}
            onChangeText={(value) => {
              setComentarioTempo(value);
              setErrorComentarioTempo(null);
            }}

            keyboardType= "numeric"
            errorMessage={errorComentarioTempo}
            inputStyle={inputStyles.inputStyle}
            inputContainerStyle={inputStyles.inputContainer}
            containerStyle={{
              // borderColor: 'green', 
              // borderStyle: 'solid', 
              // borderWidth: 2,
              margin: 5,
              marginRight: -1,
              marginTop: 20,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: 'center'
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
            <Text>Mínimo de 60 segundos</Text>
          </View>
        </View>
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
            if (!checkBoxPerfis) {
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

                    
                    if (regexArroba.test(String(perfil))) {
                      setErrorPerfil("Por favor insira o perfil sem '@' ");
                    } else if (perfil == null || perfil == "") {
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

                    
                    if (regexArroba.test(String(perfil))) {
                      setErrorPerfil("Por favor insira o perfil sem '@' ");
                    } else if (perfil == null || perfil == "") {
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
          {/* {isLoadingBot && <ActivityIndicator color="grey" />} */}

          {!isLoadingBot && (
            <StyledButton title="Iniciar" onPress={() => {
              iniciarBot()
            }} />
          )}
        </View>
        <Modal
          animationType={"slide"}
          visible={modalVisible}
        >
          <View style={{ flex: 1 }}>
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              injectedJavaScript={botScript}
              source={{
                uri: `${linkSorteio}/comments`,
              }}
              style={{ marginTop: 10, height: "70%" }}
            />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <StyledButton title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
        {quantidadeComentarios > 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              O bot realizou {quantidadeComentarios} comentário(s)
            </Text>
          </View>
        )}
        
      </ScrollView>
    </View>
  );
}
