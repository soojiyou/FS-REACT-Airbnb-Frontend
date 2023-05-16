import { Box, HStack, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, InputGroup, InputLeftElement, Divider, Text, useToast } from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogIn } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    //react-hook-form과 chakra를 사용해 훌륭한 login modal가능
    //react-hook-form
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(usernameLogIn, {
        onMutate: () => {
            console.log("mutation starting");
        },
        onSuccess: (data) => {
            toast({
                title: "welcome back!",
                status: "success",
            });
            onClose();
            reset();
            queryClient.refetchQueries(["my-profile"]);
        },
        onError: (error) => {
            console.log("mutation has an error");
        },
    });
    const onSubmit = ({ username, password }: IForm) => {
        mutation.mutate({ username, password });
    };
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    // const [emailError, setEmailError] = useState("");
    // const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    //     const { name, value } = event.currentTarget;
    //     if (name === "username") {
    //         setUsername(value);
    //     } else if (name === "password") {
    //         setPassword(value);
    //     }
    // };
    // const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (!email.includes("@")) {
    //         setEmailError("please write a valid email");
    //     }
    //     console.log(username, password);
    // }
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as='form' onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaUserAlt /></Box>} />
                            <Input isInvalid={Boolean(errors.username?.message)} {...register("username", { required: "Please type a username.", })} variant={"filled"} placeholder="Username" />
                            <Text fontSize={"sm"} color="red.500">{errors.username?.message}</Text>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaLock /></Box>} />
                            <Input isInvalid={Boolean(errors.password?.message)} {...register("password", { required: "Please type a password.", })} type='password' variant={"filled"} placeholder="Password" />
                            <Text fontSize={"sm"} color="red.500">{errors.password?.message}</Text>
                        </InputGroup>
                    </VStack>
                    {mutation.isError ? (<Text color="red.500" textAlign={"center"} fontSize={"sm"}>Username or Password are Wrong</Text>) : null}
                    <Button
                        isLoading={mutation.isLoading}
                        type="submit"
                        mt={4}
                        colorScheme={"red"}
                        w="100%"
                    >Log in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>

        </Modal>

    )
}