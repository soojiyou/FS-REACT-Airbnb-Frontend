import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
    const { search } = useLocation();
    const toast = useToast()
    const QueryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(githubLogIn, {
        onMutate: () => {
            console.log("mutation starting");
        },
        onSuccess: (data) => {
            toast({
                title: "welcome back!",
                description: "Happy to have you back!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            QueryClient.refetchQueries(["my-profile"]);
            navigate("/");
        },
        onError: (error) => {
            console.log("mutation has an error");
        },
    })



    const confirmLogin = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) {
            mutation.mutate(code);
        }
    }
    useEffect(() => {
        confirmLogin();
    })
    return (
        <VStack justifyContent={"center"} mt={40}>
            <Heading>Processing log in...</Heading>
            <Text> Don't go anywhere.</Text>
            <Spinner size="lg" />
        </VStack>
    );
}