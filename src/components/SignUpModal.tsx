import { Box, HStack, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, InputGroup, InputLeftElement, Divider, Text, useToast, Select } from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userSignUp } from '../api';


interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface IForm {
    name: string;
    email: string;
    username: string;
    password: string;
    currency: string;
    gender: string;
    language: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(userSignUp, {
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
    const onSubmit = ({ username, password, name, email, currency, gender, language, }: IForm) => {
        mutation.mutate({ username, password, name, email, currency, gender, language, });
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaUserCircle /></Box>} />
                            <Input {...register("name", { required: true })} variant={"filled"} placeholder="Name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaEnvelope /></Box>} />
                            <Input {...register("email", { required: true })} variant={"filled"} placeholder="Email" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaUserAlt /></Box>} />
                            <Input {...register("username", { required: true })} variant={"filled"} placeholder="Username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaLock /></Box>} />
                            <Input {...register("password", { required: true })} variant={"filled"} placeholder="Password" />
                        </InputGroup>
                        <Select
                            placeholder="currency option"
                            {...register("currency", { required: true })}
                        >
                            <option value="won">Korean Won</option>
                            <option value="usd">US Dollar</option>
                        </Select>
                        <Select
                            placeholder="gender option"
                            {...register("gender", { required: true })}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="female">Pass</option>
                        </Select>
                        <Select
                            placeholder="language option"
                            {...register("language", { required: true })}
                        >
                            <option value="kr">Korean</option>
                            <option value="en">English</option>
                        </Select>
                    </VStack>
                    <Button isLoading={mutation.isLoading} type='submit' mt={4} colorScheme='red' w="100%">Log in</Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>

        </Modal>

    )
}