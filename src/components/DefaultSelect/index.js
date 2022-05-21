import { FormControl, Select } from 'native-base';

export default function DefaultFormInput({placeholder, value, setValue, color, error, items}){
    return (
        <FormControl isInvalid={error?true:false}>
            <Select 
                selectedValue={value} 
                accessibilityLabel={placeholder}
                minWidth="5/6"
                placeholder={placeholder}
                placeholderTextColor={color}
                borderColor={color}
                color={color}
                borderRadius={15}
                _selectedItem={{
                    bg: {color}
                }}
                _text={{
                    fontSize: "3xl"
                }}
                onValueChange={setValue}
            >
                {items.map((item, index)=>{
                    return  <Select.Item key={index} label={`${item}`} value={`${item}`}/>
                })}
            </Select>
            <FormControl.ErrorMessage>
                {error}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}