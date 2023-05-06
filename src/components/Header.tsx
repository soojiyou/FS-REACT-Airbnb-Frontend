import { Stack, Box, HStack, VStack, Button, IconButton, useDisclosure, useColorMode, LightMode, useColorModeValue, Avatar, MenuButton, Menu, MenuList, MenuItem, useToast } from '@chakra-ui/react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import useUser from "../lib/useUser";
import { logOut } from '../api';


export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode(); //colormode stored in local storage
    const logo = useColorModeValue("red.400", "red.200");
    // const modeicon = useColorModeValue(<FaMoon />, <FaSun />);
    const ModeIcon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const onLogOut = async () => {
        const toastId = toast({
            title: "Login out...",
            description: "Sad to see you go...",
            status: "loading",
            position: "bottom-right",
        });

        setTimeout(() => {
            toast.update(toastId, {
                status: "success",
                title: "Done!",
                description: "See you later!",
            });
        }, 5000);
    };

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
                {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button onClick={onLoginOpen}>Log in</Button>
                            <LightMode>
                                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                                    Sign up
                                </Button>
                            </LightMode>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onLogOut}>
                                    Log out
                                </MenuItem>
                            </MenuList>
                        </Menu>

                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    )
}