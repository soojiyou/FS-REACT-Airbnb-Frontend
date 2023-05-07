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
            <Button as="a" href="https://github.com/login/oauth/authorize?client_id=d049c38387c8383af63e&scope=read:user,user:email" leftIcon={<FaGithub />} colorScheme={"gray"} w="100%">Continue with Github</Button>
            <Button leftIcon={<FaFacebook />} colorScheme={"facebook"} w="100%">Continue with Facebook</Button>
            <Button leftIcon={<FaComment />} colorScheme={"yellow"} w="100%" >Continue with Kakao</Button>
        </VStack>
    </Box>);
}


