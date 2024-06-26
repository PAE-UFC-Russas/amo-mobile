import { Image } from "react-native";
import { Center, Text } from "native-base";

export default function AuthHeader(props) {
   return (
      <Center marginTop={4} marginBottom="6">
         <Image
            alt="Logo AMO"
            source={require("../../assets/logo_lightblue.png")}
            style={{ width: 60, height: 60 }}
         />
         <Text fontWeight="bold" color="#024284" fontSize="md">
            {props.children}
         </Text>
      </Center>
   );
}
