import React from 'react';
import {Button} from 'react-native-elements';
import buttonStyles from '../style/buttonStyles';

const StyledButton = (props) => {

    return(
        <Button
        title={props.title}
        onPress={props.onPress}
        buttonStyle={buttonStyles.buttonStyle}
        containerStyle={buttonStyles.containerStyle}
        disabledStyle={buttonStyles.disabledStyle}
      />
    )
}

export default StyledButton;