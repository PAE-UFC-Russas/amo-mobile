import { Button } from "native-base";

export default function DefaultBlueButton({ onPress, children, loading }) {
   return (
      <Button
         disabled={loading}
         alignItems={"center"}
         bgColor="defaultBlue"
         borderRadius="2xl"
         width={80}
         height={60}
         onPress={onPress}
         _text={{
            fontWeight: 800,
            color: "#fff",
         }}
      >
         {children}
      </Button>
   );
}
