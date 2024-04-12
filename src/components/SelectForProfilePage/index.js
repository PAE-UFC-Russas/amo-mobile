import { FormControl, Select } from 'native-base';

export default function SelectForProfilePage({placeholder, setValue, color, error, items, backgroundColor, borderWidth}){
    return (
        <FormControl isInvalid={error?true:false} isReadOnly>
            <Select 
                borderWidth={borderWidth}
                backgroundColor={backgroundColor}
                accessibilityLabel={placeholder}
                minWidth='5/6'
                placeholder={placeholder}
                placeholderTextColor={color}
                borderColor={color}
                color={color}
                borderRadius={15}
                _selectedItem={{
                    bg: color
                }}
                _text={{
                    fontSize: '3xl'
                }}
                onValueChange={setValue}
            >
                {items.map((item, index)=>{
                    return <Select.Item key={index} label={`${item.nome}`} value={`${item.id}`}/>
                })}
            </Select>
            <FormControl.ErrorMessage>
                {error}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}