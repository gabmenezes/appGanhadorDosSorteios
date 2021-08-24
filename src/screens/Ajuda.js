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
            <Unorderedlist bulletUnicode={0x2023}><Text>Acesse o menu lateral</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Clique em Perfil</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Adicione seu perfil sem o @</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Coloque sua senha do instagram</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Clique em cadastrar</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Aguarde o retorno do servidor, se foi bem sucedido.</Text></Unorderedlist>
            <Text>Observação: Nesta atualização 1.0, o aplicativo do robô vencedor ainda não faz autenticação de dois fatores. Para que tudo ocorra perfeitamente, remova a autenticação de dois fatores do seu perfil, caso esteja habilitada.</Text>
            <Text>Importante: O robô não salva seus dados do instagram no banco de dados. Uma vez conectado no seu perfil o instagram gera cookies de autenticação. São eles que usaremos para conexões futuras.</Text>
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
            <Unorderedlist bulletUnicode={0x2023}><Text>Acesse o instagram</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Clique em comentar no post do Instagram</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Pegue o link na url, no canto superior do navegador</Text></Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023}><Text>Você também consegue acesso ao link clicando no íconde de três pontos na parte superior direita da publicação e acessando a opção "copiar link"</Text></Unorderedlist>
            <Text>Exemplo de link de um post do Instagram: https://www.instagram.com/p/CRcQjn1jJd3/</Text>
            <Text>Note que o link tem um código no final. Caso o link não esteja neste padrão, possivelmente vai dar erro.</Text>
          </View>
        </View>
        <Text style={{textAlign: 'center'}}>Copyright - 2021 - Robô Vencedor</Text>
      </ScrollView>
      </View>
    </>
  );
}

