import { Box, Button, Container, FormControl, Heading, Input, VStack, useToast, } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api";


interface IForm {
    file: FileList
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}


export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomID } = useParams();
    const toast = useToast();
    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            toast({
                title: "Photo uploaded!",
                status: "success",
                isClosable: true,
                description: "Feel free to upload more images.",
            });
            console.log("createphoto");
            reset();
        }
    });


    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            if (roomID) {
                createPhotoMutation.mutate({
                    description: "I love react",
                    file: `https://imagedelivery.net/4s73Pl-MmCdSbYSBZ8DZKA/${result.id}/public`,
                    roomID,
                });
            }
            console.log("roomID", roomID);
            console.log("uploadimgage", result);
        },
    });
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            });
            console.log("uploadurl", data);
        },
    });

    useHostOnlyPage();
    const onSubmit = () => {
        uploadURLMutation.mutate();
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
                        <Button isLoading={
                            createPhotoMutation.isLoading ||
                            uploadImageMutation.isLoading ||
                            uploadURLMutation.isLoading
                        } type="submit" w="full" colorScheme={"red"}>
                            Upload photos
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    );
}