import { useDisclose, Box, Center, Stagger, IconButton, Icon, HStack } from "native-base";
import { MaterialIcons, Entypo } from '@expo/vector-icons'; 

export default function ForumStagger({children}){
    const {
      isOpen,
      onToggle
    } = useDisclose();

    return (
      <Center bottom={25} right={25} position='absolute'>
        <Box>
          <Stagger visible={isOpen} initial={{
              opacity: 0,
              scale: 0,
              translateY: 34
            }} 
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: 'spring',
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true
                }
              }
            }} 
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true
                }
              }
            }}
          >
            {children}
          </Stagger>
        </Box>
        <HStack alignItems='center'>
          <IconButton variant='solid' borderRadius='full' size='lg' onPress={onToggle} bg='cyan.400' icon={<Icon as={Entypo} size='6' name='dots-three-horizontal' color='warmGray.50' _dark={{
          color: 'warmGray.50'
        }} />} />
        </HStack>
      </Center>
    )
  };