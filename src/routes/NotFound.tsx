import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <VStack bg="gray.100" justifyContent={"center"} minH="100vh">
            <Heading>Page Not Found.</Heading>
            <Text> It Seems that you are lost.</Text>
            <Link to="/">
                <Button colorScheme={"red"} variant={"link"}>Go Home &rarr;</Button> </Link>
        </VStack>
    );
}