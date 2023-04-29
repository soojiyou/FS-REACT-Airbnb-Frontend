import { Stack, Box, HStack, VStack, Button, IconButton, useDisclosure, useColorMode, LightMode, useColorModeValue } from '@chakra-ui/react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';



export default function Header() {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode(); //colormode stored in local storage
    const logo = useColorModeValue("red.400", "red.200");
    // const modeicon = useColorModeValue(<FaMoon />, <FaSun />);
    const ModeIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <Stack justifyContent={'space-between'}
            alignItems="center"
            py={5} px={40}
            direction={{
                sm: "column",
                md: "row",
            }}
            spacing={{
                sm: 4,
                md: 0,
            }}
            borderBottomWidth={1}>
            <Box color={logo}>
                <FaAirbnb size={48} />
            </Box>
            <HStack spacing={2}>
                <IconButton onClick={toggleColorMode} variant={'ghost'} aria-label='Toggle dark mode' icon={<ModeIcon />} />
                <Button onClick={onLoginOpen}>Log in</Button>
                <LightMode>
                    <Button onClick={onSignUpOpen} colorScheme={'red'}>Sign Up</Button>
                </LightMode>
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    )
}