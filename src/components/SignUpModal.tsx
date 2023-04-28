import { Box, HStack, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, InputGroup, InputLeftElement, Divider, Text } from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import SocialLogin from './SocialLogin';


interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaUserCircle /></Box>} />
                            <Input variant={"filled"} placeholder="Name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaEnvelope /></Box>} />
                            <Input variant={"filled"} placeholder="Email" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaUserAlt /></Box>} />
                            <Input variant={"filled"} placeholder="Username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.600"><FaLock /></Box>} />
                            <Input variant={"filled"} placeholder="Password" />
                        </InputGroup>
                    </VStack>
                    <Button mt={4} colorScheme='red' w="100%">Log in</Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>

        </Modal>

    )
}