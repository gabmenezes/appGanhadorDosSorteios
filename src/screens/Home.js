import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Inicio from "./Inicio";
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

        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Sair" onPress={() => {
                 AsyncStorage.removeItem("TOKEN");
                 navigation.reset({
                   index: 0,
                   routes: [{ name: "Login" }],
                 });
              }} />
            </DrawerContentScrollView>
          )
        }}
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
      </Drawer.Navigator>
    </>
  );
}
