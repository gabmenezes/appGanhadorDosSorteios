import React from 'react';
import { Input } from 'react-native-elements';
import inputStyles from '../style/inpuStyles';


const StyledInput = (props) => {

    return(
        <Input
        placeholder={props.placeholder}
        leftIcon={{ type: "font-awesome", name: props.leftIcon}}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        errorMessage={props.errorMessage}
        inputStyle={inputStyles.inputStyle}
        maxLength={props.maxLength || 70}
        inputContainerStyle={inputStyles.inputContainer}
        containerStyle={inputStyles.containerStyle}
        leftIconContainerStyle={inputStyles.leftIconContainerStyle}
        secureTextEntry={props.secureTextEntry}
        errorStyle={props.errorStyle}
      />
    )
}

export default StyledInput;