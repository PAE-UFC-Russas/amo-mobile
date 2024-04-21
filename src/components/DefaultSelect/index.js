import { FormControl, Select } from "native-base";

export default function DefaultSelect({
   placeholder,
   value,
   setValue,
   color,
   backgroundColor,
   error,
   items,
}) {
   return (
      <FormControl isInvalid={error ? true : false} isReadOnly>
         <Select
            selectedValue={value}
            accessibilityLabel={placeholder}
            minWidth="5/6"
            placeholder={placeholder}
            placeholderTextColor={color}
            borderColor={color}
            color={color}
            backgroundColor={backgroundColor}
            borderRadius={15}
            _selectedItem={{
               bg: color,
            }}
            _text={{
               fontSize: "3xl",
            }}
            onValueChange={setValue}
            borderWidth={1}
         >
            {items.map((item, index) => {
               return (
                  <Select.Item
                     key={index}
                     label={`${item}`}
                     value={`${item}`}
                  />
               );
            })}
         </Select>
         <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      </FormControl>
   );
}
