import { FormControl, Select } from 'native-base';

export default function SelectForSubjects({placeholder, value, setValue, color, backgroundColor, error, items, width, justfyContent, alignItems}){
    return (
        <FormControl isInvalid={error?true:false}>
            <Select 
                alignItems={alignItems}
                justifyContent={justfyContent}
                width={width}
                selectedValue={value} 
                accessibilityLabel={placeholder}
                minWidth='5/6'
                placeholder={placeholder}
                placeholderTextColor={color}
                borderColor={color}
                color={color}
                backgroundColor={backgroundColor}
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