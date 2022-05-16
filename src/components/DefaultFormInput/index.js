import { useState } from 'react';
import { FormControl, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function DefaultFormInput({children, placeholder, value, setValue, color, error, type, maxLength}){
    const [hiddenPassword, setHiddenPassword] = useState(true);

    const PasswordVisibility = () => {
        return <MaterialIcons
            onPress={()=>setHiddenPassword(!hiddenPassword)}
            color={color === "tertiaryBlue"?"#52D6FB":"#fff"}
            size={24}
            style={{marginRight: 10}}
            name={hiddenPassword ? "visibility" : "visibility-off"}/>
    }

    const HandleChangePassword = (text) => {
        setValue(text.replace(/[^a-z0-9]/gi,''));
    }

    maxLength = !type?32:type
    type = !type?'text':type

    if(type === 'text')
        return (
            <FormControl isInvalid={error?true:false}>
                {children}
                <Input
                    variant="outline"
                    placeholder={placeholder}
                    placeholderTextColor={color}
                    color={color}
                    borderColor={color}
                    borderRadius={15}
                    value={value}
                    maxLength={maxLength}
                    onChangeText={setValue}
                />
                <FormControl.ErrorMessage>
                    {error}
                </FormControl.ErrorMessage>
            </FormControl>
        )
    else
        return (
            <FormControl isInvalid={error?true:false}>
                {children}
                <Input
                    type={hiddenPassword?"password":"text"}
                    InputRightElement={<PasswordVisibility/>}
                    variant="outline"
                    placeholder={placeholder}
                    placeholderTextColor={color}
                    color={color}
                    borderColor={color}
                    borderRadius={15}
                    value={value}
                    maxLength={maxLength}
                    onChangeText={HandleChangePassword}
                />
                <FormControl.ErrorMessage>
                    {error}
                </FormControl.ErrorMessage>
            </FormControl>
        )
}