import { Grid, VStack, HStack, Box, Image, Heading, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { FaStar, FaRegHeart, FaCamera } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'


interface IRoomProps {
    imageUrl: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
    pk: number;
    isOwner: boolean;
}


export default function Room({
    imageUrl,
    name,
    rating,
    city,
    country,
    price,
    pk,
    isOwner,
}: IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300");
    const navigate = useNavigate();
    const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/rooms/${pk}/photos`);
    }
    return (
        <Link to={`/rooms/${pk}`}>
            <VStack alignItems={"flex-start"}>
                <Box w="100%" position="relative" overflow={"hidden"} rounded="3xl" mb={2}>
                    {imageUrl ? (
                        <Image minH="280" src={imageUrl} />
                    ) : (
                        <Box minH="280px" h="100%" w="100%" p={10} bg="green.400" />
                    )}
                    <Button onClick={onCameraClick} variant={"unstyled"} position="absolute" top={0} right={0} color="white">
                        {isOwner ? <FaCamera size="20px" /> : <FaRegHeart size="20px" />}
                    </Button>
                </Box>
                <Box>
                    <Grid gap={2} templateColumns={"5fr 1fr"}>
                        <Text as="b" noOfLines={1} fontSize="md">{name}</Text>
                        <HStack spacing={1} alignItems="center">
                            <FaStar size={12} />
                            <Text fontSize={"sm"}>{rating}</Text>
                        </HStack>
                    </Grid>

                    <Text fontSize="sm" color={gray}>{city}, {country}</Text>
                </Box>
                <Text fontSize="sm" color={gray}><Text as="b">$ {price}</Text>/ night</Text>
            </VStack>
        </Link>

    )
}