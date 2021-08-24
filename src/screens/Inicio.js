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

  //   let botScript = `
  //     // alert("injetou 3");
  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  // async function comentar() {
  //   var i = 0;
  //   while (true) {
  //     // alert("dentro do while");
  //     var comment_text = document.getElementsByClassName("Ypffh")[0];
  //     if (comment_text) {
  //       var comment_text = document.getElementsByClassName("Ypffh")[0];
  //       comment_text.click();
  //       comment_text.focus();
  //       var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  //         window.HTMLTextAreaElement.prototype,
  //         "value"
  //       ).set;
  //       nativeInputValueSetter.call(comment_text, "teste"+i);

  //       var ev2 = new Event("input", { bubbles: true });
  //       comment_text.dispatchEvent(ev2);
  //       var submit_button = document.getElementsByClassName("y3zKF")[0];
  //       submit_button.click();
  //       await sleep(30000);
  //       i = i+1
  //     }
  //     await sleep(30000);
  //   }
  // }
  // comentar();`

  useEffect(() => {
    console.log("============TEDSSS");
    botService
      .verificarBot()
      .then((response) => {
        console.log("===========RESPONSESTATUS");
        console.log(response);
        setIsLoadingBot(response.statusBot);
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

    console.log("==================");
    console.log(linkSorteio);
    const regexSorteioInsta = /https:\/\/www\.instagram\.com\/.*/gm;
    if (
      linkSorteio == null ||
      linkSorteio == "" ||
      !regexSorteioInsta.test(linkSorteio)
    ) {
      setErrorLinkSorteio("Por favor insira um link de sorteio válido");
      error = true;
    }

    console.log("==================");
    console.log(textoComentario);
    if (textoComentario == null || textoComentario == "") {
      setErrorTextoComentario("Por favor insira um comentário");
      error = true;
    }

    if (checkBoxPerfis == true && listaPerfis.length == 0) {
      console.log("Foraa");
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
      console.log("Dentrooo");
      Alert.alert(
        "Verifique!",
        "Se você deseja marcar perfis é necessário que escolha se quer marcar antes ou depois"
      );
      error = true;
    }
    console.log("Depois deles");

    setIsLoadingBot(false);
    return !error;
  };

  const iniciarBot = () => {
    // setIsLoadingBot(true)
    if (validateFields()) {
      // setIsLoadingBot(true)
      let ordemMarcacao = checkBoxAntes ? "antes" : "depois";
      const data = {
        tempo_comentario: 30,
        comentario: textoComentario,
        repetirMarcacao: checkBoxRepetirMarcacao,
        linkSorteio: linkSorteio,
        antesOuDepois: ordemMarcacao,
        podeComentar: true,
        qtdComentarios: 0,
        marca_usuario: checkBoxPerfis,
        indexPerfil: 0,
        lista_usuario_marcar: listaPerfis,
      };
      console.log("=========TENTANDO INICIAR=========");
      console.log(data);
      // let botScripts = `
      // alert("Inicio7")
      // async function sleep(seconds) {
      //   var e = new Date().getTime() + (seconds * 1000);
      //   while (new Date().getTime() <= e) {
      //   }
      // }
      
      // function construirComentario(dados) {
      //     if (dados.marca_usuario) {
      //       var comment = dados.lista_usuario_marcar.map((usuario) => {
      //         return '@'+ usuario.trim()+ ' ' + dados.comentario 
      //       });
            
      //       if (dados.antes_depois.includes('depois')) {
      //         comment = dados.lista_usuario_marcar.map((usuario) => {
      //           return dados.comentario+ ' ' + '@' + usuario.trim() 
      //         });
      //       }
            
      //       return comment;
      //     }
          
      //     return [dados.comentario];
      //   }
        
      //   const comentar = async (dados) => {
      //     // alert("comentar")
      //     try {
      //       // await sleep(20);
      //       let comentarioCompleto = construirComentario(dados);
      //       // alert(comentarioCompleto)
         
      //       for (const comentarioAtual of comentarioCompleto) {
      //         // alert(comentarioAtual)
      //         var comment_text = document.getElementsByClassName("Ypffh")[0];
      //         if (comment_text) {
      //           alert("aqui")
      //       comment_text.click();
      //       comment_text.focus();
      //       var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      //         window.HTMLTextAreaElement.prototype,
      //         "value"
      //       ).set;
      //       alert("aqui2")
      //       nativeInputValueSetter.call(comment_text, comentarioAtual);
      //       var ev2 = new Event("input", { bubbles: true });
      //       comment_text.dispatchEvent(ev2);
      //       var submit_button = document.getElementsByClassName("y3zKF")[0];
      //       submit_button.click();
      //       alert("aqui3")
      //       await sleep(dados.tempo_comentario);
      //       alert("comentando")
              
      //         if (!dados.repetir_marcacao) {
      //           comentarioCompleto = [dados.comentario]
      //         }
      //     }
      //       }
      //       if (!dados.repetir_marcacao) {
      //         dados.marca_usuario = false;
      //       }
      //       comentar(dados);
        
      //     }catch (e) {
      //       console.log(e);
      //     }
      //   }
        
      //   comentar(${JSON.stringify(data)})
      // `;
      let botScripts = `  
      alert("noviususas")
      function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

      async function comentar(args) {
        var checkExist = setInterval(async function() {
          if (document.getElementsByClassName("Ypffh")[0]) {
             clearInterval(checkExist);
          }
       }, 100)
       if(checkExist){

         alert("vem muie")
         var comment_text = document.getElementsByClassName("Ypffh")[0];
         if(comment_text){

           alert("achoo")
           var comment_text = document.getElementsByClassName("Ypffh")[0];
           comment_text.click();
           comment_text.focus();
           var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
             window.HTMLTextAreaElement.prototype,
             "value"
           ).set;
           nativeInputValueSetter.call(comment_text, args.comentario);
     
           var ev2 = new Event("input", { bubbles: true });
           comment_text.dispatchEvent(ev2);
           var submit_button = document.getElementsByClassName("y3zKF")[0];
           submit_button.click();
           await sleep(args.tempo_comentario * 1000);
           await comentar(args)

       }

         }
          
        }
        comentar(${JSON.stringify(data)})
       `
      console.log("========Data==============")
      console.log(data)
      setLinkSorteio(linkSorteio);
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
            console.log(response.quantidadeComentarios);
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
    console.log("====entrou");
    setLoadingPerfis(true);
    userServices
      .getPerfis()
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
    if (listaPerfis.length > 0) {
      userServices
        .updatePerfis(listaPerfis)
        .then((perfis) => {
          console.log("=========LIST=========");
          if (perfis.statusCode == "200") {
            Alert.alert("Sucesso!", perfis.message);
          } else {
            Alert.alert("Falha!", "Falha ao salvar lista de perfis");
          }
        })
        .catch((err) => {
          console.log("erroo=====");
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

                    console.log("===valid");
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

                    console.log("===valid");
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
          {isLoadingBot && <ActivityIndicator color="grey" />}

          {!isLoadingBot && (
            <StyledButton title="Iniciar" onPress={() => iniciarBot()} />
          )}

          <StyledButton title="Parar" onPress={() => pararBot()} />
        </View>
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

      <Modal
        animationType={"slide"}
        visible={modalVisible}
        // onRequestClose={hide.bind(this)}
        transparent
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
    </View>
  );
}
