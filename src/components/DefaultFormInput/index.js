import { useState } from "react";
import { FormControl, Input } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function DefaultFormInput({
  label,
  placeholder,
  value,
  setValue,
  color,
  error,
  helperText,
  type,
  maxLength,
}) {
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const PasswordVisibility = () => {
    return (
      <MaterialIcons
        onPress={() => setHiddenPassword(!hiddenPassword)}
        color={color === "#024284" ? "#024284" : "#024284"}
        size={24}
        style={{ marginRight: 10 }}
        name={hiddenPassword ? "visibility" : "visibility-off"}
      />
    );
  };

  const HandleChangePassword = (text) => {
    setValue(text.replace(/( )+/g, ""));
  };

  maxLength = !maxLength ? 32 : maxLength;
  type = !type ? "text" : type;

  if (type === "text")
    return (
      <FormControl isInvalid={error ? true : false}>
        {label && (
          <FormControl.Label
            _text={{
              color: color,
            }}
          >
            {label}
          </FormControl.Label>
        )}
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
          borderWidth={3}
        />
        {error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
        {helperText && (
          <FormControl.HelperText>{helperText}</FormControl.HelperText>
        )}
      </FormControl>
    );
  else
    return (
      <FormControl isInvalid={error ? true : false}>
        {label && (
          <FormControl.Label
            _text={{
              color: color,
            }}
          >
            {label}
          </FormControl.Label>
        )}
        <Input
          type={hiddenPassword ? "password" : "text"}
          InputRightElement={<PasswordVisibility />}
          variant="outline"
          placeholder={placeholder}
          placeholderTextColor={color}
          color={color}
          borderColor={color}
          borderRadius={15}
          value={value}
          maxLength={maxLength}
          onChangeText={HandleChangePassword}
          borderWidth={3}
        />
        {error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
        {helperText && (
          <FormControl.HelperText>{helperText}</FormControl.HelperText>
        )}
      </FormControl>
    );
}
