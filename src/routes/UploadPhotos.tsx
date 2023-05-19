import { Box, Button, Container, FormControl, Heading, Input, VStack, useToast, } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useMutation } from "@tanstack/react-query";
import { getUploadURL } from "../api";


interface IForm {
    file: FileList
}


export default function UploadPhotos() {
    const { register, handleSubmit } = useForm<IForm>();
    const { room_id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(getUploadURL, {
        onSuccess: (data: any) => {
            toast({
                title: "Photo uploaded!",
                status: "success",
                position: "bottom-right",
            });
            console.log(data);
            // navigate(`/rooms/${data.id}`);
        },
    });
    useHostOnlyPage();
    const onSubmit = (data: any) => {
        mutation.mutate();
    }
    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{ base: 10, lg: 40, }} >
                <Container>
                    <Heading textAlign={"center"}>Upload a Photo</Heading>
                    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10}>
                        <FormControl>
                            <Input {...register("file")} type="file" accept="image/*" />
                        </FormControl>
                        <Button type="submit" w="full" colorScheme={"red"}>
                            Upload photos
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    );
}