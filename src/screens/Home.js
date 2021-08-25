import * as React from "react";
// import { View } from 'react-native';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, Input, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Inicio from "./Inicio";
import Perfil from "./Perfil";
import Teste from "./Teste";
import Ajuda from "./Ajuda";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,

} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function Home({ navigation }) {
  return (
    <>
      <Icon
        name="bars"
        size={30}
        color="#000"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{ margin: 10 }}
      />
      <Drawer.Navigator
        initialRouteName="Inicio"
        activeColor="white"
        labelStyle={{ fontSize: 12 }}
        barStyle={{ backgroundColor: "white" }}
      >
        <Drawer.Screen
          name="Inicio"
          component={Inicio}
          options={{
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        {/* <Drawer.Screen
          name="Perfil"
          component={Perfil}
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        /> */}

        <Drawer.Screen
          name="Ajuda"
          component={Ajuda}
          options={{
            tabBarLabel: "Ajuda",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="help" color={color} size={26} />
            ),
          }}
        />

{/* <Drawer.Screen
          name="Teste"
          component={Teste}
          options={{
            tabBarLabel: "Teste",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="help" color={color} size={26} />
            ),
          }}
        /> */}
      </Drawer.Navigator>
    </>
  );
}
