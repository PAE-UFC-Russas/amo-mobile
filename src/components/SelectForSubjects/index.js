import { FormControl, Select } from 'native-base';

export default function SelectForSubjects({placeholder, setValue, color, backgroundColor, error, items, width, justfyContent, alignItems}){
    return (
        <FormControl width='full' isInvalid={error?true:false}>
            <Select 
                alignItems={alignItems}
                justifyContent={justfyContent}
                accessibilityLabel={placeholder}
                width={width}
                minWidth='5/6'
                placeholder={placeholder}
                placeholderTextColor={color}
                borderColor={color}
                color={color}
                backgroundColor={backgroundColor}
                borderRadius={10}
                _selectedItem={{
                    bg: color
                }}
                _text={{
                    fontSize: '3xl'
                }}
                onValueChange={setValue}
            >
                {items.map((item, index)=>{
                    return <Select.Item key={index} label={`${item.nome}`} value={`${item.id},${item.nome}`}/>
                })}
            </Select>
            <FormControl.ErrorMessage>
                {error}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}