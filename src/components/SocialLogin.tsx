import { Box, HStack, VStack, Divider, Text, Button } from '@chakra-ui/react';
import { FaGithub, FaFacebook, FaComment } from 'react-icons/fa';

export default function SocialLogin() {

    return (<Box mb={4}>
        <HStack my={8}>
            <Divider />
            <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">Or</Text>
            <Divider />
        </HStack>
        <VStack>
            <Button leftIcon={<FaGithub />} colorScheme={"gray"} w="100%">Continue with Github</Button>
            <Button leftIcon={<FaFacebook />} colorScheme={"facebook"} w="100%">Continue with Facebook</Button>
            <Button leftIcon={<FaComment />} colorScheme={"yellow"} w="100%" >Continue with Kakao</Button>
        </VStack>
    </Box>);
}


