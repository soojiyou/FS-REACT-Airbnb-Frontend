import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { Box, Grid, GridItem, HStack, Heading, Image, Skeleton, Text, VStack, Avatar, Container, Button } from "@chakra-ui/react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaStar } from "react-icons/fa";
import { IReview } from "../types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function RoomDetail() {
    const { roomID } = useParams();
    const { isLoading, data } = useQuery([`rooms`, roomID], getRoom);
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<IReview[]>([`rooms`, roomID, `reviews`], getRoomReviews)
    const [dates, setDates] = useState<Date[]>();
    //useQuery 사용할떄 state를 query key 으로 사용하면 state가 변할때마다 자동으로 useQuery 다시 실행
    const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(["check", roomID, dates], checkBooking,
        {
            cacheTime: 0,
            enabled: dates !== undefined,
        });
    // console.log("data", data, data.name);
    // console.log("reviewdata", reviewsData);
    return <Box mt={10}
        px={{
            base: 10,
            lg: 40,
        }}>
        <Helmet>
            <title>{data ? data.name : "Loading..."}</title>
        </Helmet>
        <Skeleton height={"43px"} width={"40%"} isLoaded={!isLoading}>
            <Heading>{data?.name}</Heading>
        </Skeleton>
        <Grid
            mt={8}
            rounded="xl"
            overflow={"hidden"}
            gap={2}
            height="60vh"
            templateRows={"1fr 1fr"}
            templateColumns={"repeat(4, 1fr)"}
        >
            {[0, 1, 2, 3, 4].map((index) => (
                <GridItem
                    colSpan={index === 0 ? 2 : 1}
                    rowSpan={index === 0 ? 2 : 1}
                    overflow={"hidden"}
                    key={index}
                >
                    <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                        {data?.photos && data.photos.length > 4 ? (
                            <Image
                                objectFit={"cover"}
                                w="100%"
                                h="100%"
                                src={data?.photos[index].file}
                            />
                        ) : null}
                    </Skeleton>
                </GridItem>
            ))}
        </Grid>
        <Grid gap={20} templateColumns={"2fr 1fr"} maxW="container.lg">
            <Box>
                <HStack mt={10} w={"40%"} justifyContent={"space-between"}>
                    <VStack alignItems={"flex-start"}>
                        <Skeleton isLoaded={!isLoading} height={"30px"}>
                            <Heading fontSize={"2xl"}>House hosted by {data?.owner.name} </Heading>
                        </Skeleton>
                        <Skeleton isLoaded={!isLoading} height={"30px"}>
                            <HStack justifyContent={"flex-start"} w="100%">
                                <Text>{data?.rooms} room{data?.rooms === 1 ? "" : "s"}</Text>
                                <Text>·</Text>
                                <Text>{data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}</Text>
                            </HStack>
                        </Skeleton>
                    </VStack>
                    <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
                </HStack>
                <Box mt={10}>
                    <Heading mb={5} fontSize={"2xl"}>
                        <HStack>
                            <FaStar /> <Text>{data?.rating}</Text>
                            <Text>∙</Text>
                            <Text>
                                {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Heading>
                    <Container mt={16} maxW="container.lg" marginX="none">
                        <Grid gap={5} templateColumns={"1fr 1fr"}>
                            {reviewsData?.map((review, index) => <VStack alignItems={"flex-start"} key={index}>
                                <HStack>
                                    <Avatar name={review.user.name} src={review.user.avatar} size={"md"} />
                                    <VStack spacing={0} alignItems={"flex-start"}><Heading fontSize={"md"}>{review.user.name}</Heading>
                                        <HStack spacing={1}>
                                            <FaStar size="12px" />
                                            <Text>{review.rating}</Text>
                                        </HStack>
                                        <Text>{review.payload}</Text>
                                    </VStack>
                                </HStack>

                            </VStack>)}
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Box pt={10}>
                <Calendar
                    goToRangeStartOnSelect
                    onChange={setDates}
                    prev2Label={null}
                    next2Label={null}
                    minDetail="month"
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
                    selectRange
                />
                <Button
                    disabled={!checkBookingData?.ok}
                    isLoading={isCheckingBooking && dates !== undefined}
                    my={5}
                    w="100%"
                    colorScheme={"red"}
                >
                    Make booking
                </Button>
                {!isCheckingBooking && !checkBookingData?.ok ? (
                    <Text color="red.500">Can't book on those dates, sorry.</Text>
                ) : null}
            </Box>
        </Grid>

    </Box>;
}