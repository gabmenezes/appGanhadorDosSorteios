import React from 'react';
import { View } from 'react-native';
import buttonStyles from '../style/buttonStyles';

const Line = () => {

    return(
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              width: "85%",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          />
        </View>
    )
}

export default Line;

