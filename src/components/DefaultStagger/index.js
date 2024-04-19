import {  Center } from "native-base";

export default function DefaultStagger({children}){
    return (
      <Center bottom={25} right={25} position='absolute'>
        {children}
      </Center>
    )
  };