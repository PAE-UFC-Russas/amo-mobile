import { Button } from "native-base";

export default function DefaultBlueButton({
   onPress,
   children,
   loading,
   disabled,
   bgColor,
}) {
   return (
      <Button
         mt={4}
         disabled={loading}
         borderRadius={12}
         bgColor={bgColor ? bgColor : "defaultBlue"}
         height={50}
         _text={{
            fontWeight: 700,
            color: "#fff",
            fontSize: "md",
         }}
         onPress={onPress}
         isDisabled={disabled}
      >
         {children}
      </Button>
   );
}
