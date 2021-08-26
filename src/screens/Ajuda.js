import * as React from "react";
import { View, ScrollView } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Unorderedlist from 'react-native-unordered-list';
import Line from "../components/Line";

export default function Ajuda() {
  return (
    <>
      <View>
      <ScrollView>
        <View style={{alignItems: "center", justifyContent: "center", margin: 20}}>
          <Text h3>Ajuda</Text>
        </View>
        <View style={{margin: 5}}>
          <Text style={{textAlign: 'center'}}h4>Adicionando o seu perfil do Instagram</Text>
          <View style={{marginLeft: 10}}>
            <Unorderedlist bulletUnicode={0x2023}><Text>Após autenticação você será redirecionado para uma tela onde terá dois botões, clique em logar no instagram.</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Coloque seus dados de acesso. Caso tenha autenticação de dois fatores, coloque-os também.</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Aguarde até a tela inicial do instagram e clique no botão em fechar no rodapé da página.</Text></Unorderedlist>
          </View>
        </View>
        <View style={{margin: 5}}>
          <Text style={{textAlign: 'center'}} h4>Configurando o robô para comentar.</Text>
          <View style={{marginLeft: 10}}>
            <Unorderedlist bulletUnicode={0x2023}><Text>Acesse o menu lateral</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Clique em Inicio</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Coloque o link da publicação do Instagram</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Coloque o comentário que será postado no Instagram</Text></Unorderedlist>
          </View>
        </View>
        <View style={{margin: 5}}>
          <Text style={{textAlign: 'center'}} h4>Configurando o robô para comentar, marcando usuários do instagram</Text>
          <View style={{marginLeft: 10}}>
            <Unorderedlist bulletUnicode={0x2023}><Text>Clique em marcar perfis</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Digite o perfil que deseja marcar</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Clique em adicionar</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Clique em salvar</Text></Unorderedlist>
          </View>
        </View>
        <View style={{margin: 5}}>
          <Text style={{textAlign: 'center'}} h4>Configurações adicionais</Text>
          <View style={{marginLeft: 10}}>
            <Unorderedlist Unorderedlist bulletUnicode={0x2023}><Text>Marcar Antes</Text>
              <Unorderedlist Unorderedlist bulletUnicode={0x2023}><Text>Marcando a funcionalidade "antes", a marcação do usuário do instagram ficará antes do comentário inserido. Ex: @fulano + comentário.</Text></Unorderedlist>
            </Unorderedlist>
            <Unorderedlist Unorderedlist bulletUnicode={0x2023}><Text>Marcar Depois</Text>
              <Unorderedlist Unorderedlist bulletUnicode={0x2023}><Text>Marcando a funcionalidade "depois", a marcação do usuário do instagram ficará depois do comentário inserido. Ex: comentário + @fulano.</Text></Unorderedlist>
            </Unorderedlist>
            <Unorderedlist Unorderedlist bulletUnicode={0x2023}><Text>Repetir marcações</Text>
              <Unorderedlist Unorderedlist bulletUnicode={0x2023}><Text>Marcando a funcionalidade, toda vez que chegar no ultimo usuário listado para ser marcado, o robô começará a marcar todos os usuários novamente.</Text></Unorderedlist>
            </Unorderedlist>
          </View>
        </View>
        <View style={{margin: 5}}>
            <Text style={{textAlign: 'center'}} h4>Como descubro o link do post?</Text>
          <View style={{marginLeft: 10}}>
            <Unorderedlist bulletUnicode={0x2023}><Text>Acesse o seu instagram pelo seu aplicativo no celular.</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Vá até a publicação desejada.</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Clique no ícone de três pontos na parte superior direita da publicação e acessando a opção "copiar link"</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Coloque o link no campo de link do instagram no aplicativo.</Text></Unorderedlist>
          </View>
        </View>
        <Text style={{textAlign: 'center'}}>Copyright - 2021 - Ganhador de Sorteios</Text>
      </ScrollView>
      </View>
    </>
  );
}

